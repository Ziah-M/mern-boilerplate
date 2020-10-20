// Handles validation errors thrown by Mongoose
// or other DB errors
// -> returns a relevant error message that can be propogated
// in the HTTP request-response cycle

// Adds meaningful error messages when handling errors
// thrown by Mongoose operations

/*
Errors not thrown because of a Mongoose validator violation
    will contain an associated error code
e.g. violation of 'unique' constraint
    will return a different error object
        from validation errors
        therefore use getUniqueErrorMessage()

*/

const getErrorMessage = (err) => {
  let message = "";
  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = getUniqueErrorMessage(err);
        break;
      default:
        "Something went wrong";
    }
  } else {
    for (let errName in err.errors) {
      if (err.errors[errName].message) message = err.errors[errName].message;
    }
  }
  return message;
};

const getUniqueErrorMessage = (err) => {
  let output;
  try {
    let fieldName = err.message.substring(
      err.message.lastIndexOf(".$") + 2,
      err.message.lastIndexOf("_1")
    );
    output =
      fieldName.charAt(0).toUpperCase() +
      fieldName.slice(1) +
      " already exists";
  } catch (ex) {
    output = "Unique field already exists";
  }
  return output;
};

export default getErrorMessage;
