import { signOut } from "./api-auth";

function authenticate(jwt = "", cb = (f) => f) {
  // ensure code is running in a browser and has access to session Storage
  if (typeof window !== "undefined")
    sessionStorage.setItem("jwt", JSON.stringify(jwt));
  cb();
}

// returns either the stored credentials or false
function isAuthenticated() {
  if (typeof window == "undefined") return false;

  if (sessionStorage.getItem("jwt"))
    return JSON.parse(sessionStorage.getItem("jwt"));
  else return false;
}

function clearJWT(cb) {
  if (typeof window !== "undefined") sessionStorage.removeItem("jwt");

  cb();
  // clears the cookie in case cookie is used for auth
  signout().then((data) => {
    document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  });
}

export default { authenticate, isAuthenticated, clearJWT };
