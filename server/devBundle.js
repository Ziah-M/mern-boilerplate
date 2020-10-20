import webpack from "webpack";
import webpackMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import webpackConfig from "./../webpack.config.client.js";
import config from "../config/config";

// Webpack to compile the client-side code when the server is run
// Compiles & bundles the client React code & places it in dist/bundle.js

// Configures the express app to use webpack middleware
// to compile, bundle & serve code
// and enable hot reloading in dev mode

const compile = (app) => {
  if (config.env === "development") {
    const compiler = webpack(webpackConfig);
    const middleware = webpackMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
    });
    app.use(middleware);
    app.use(webpackHotMiddleware(compiler));
  }
};

export default {
  compile,
};
