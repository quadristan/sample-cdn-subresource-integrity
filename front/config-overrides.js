const CspHtmlWebpackPlugin = require("csp-html-webpack-plugin");

const { SubresourceIntegrityPlugin } = require("webpack-subresource-integrity");

const CDN_ORIGIN = "http://localhost:4001";
const CDN_ADDRESS = `${CDN_ORIGIN}/`;
const ALLOWED_BACKEND_ORIGINS = ["http://localhost:4002"];

module.exports = function override(config, env) {
  if (process.env.NODE_ENV === "production") {
    // CND address here
    config.output.publicPath = CDN_ADDRESS;
  }
  config.output.crossOriginLoading = "anonymous";

  config.plugins.push(
    new CspHtmlWebpackPlugin(
      {
        "script-src": ["'self'", CDN_ORIGIN],
        "style-src": [
          "'self'",
          ...ALLOWED_BACKEND_ORIGINS,
          CDN_ORIGIN,
          "'unsafe-inline'", // required for material UI :(
        ],
        "connect-src": ["'self'", ...ALLOWED_BACKEND_ORIGINS, CDN_ORIGIN], // we allow to fetch() resources from CDN
      },
      {
        // DO NOT ENABLE NONCE, THIS IS A STATIC WEBSITE
        nonceEnabled: {
          "script-src": false,
          "style-src": false,
        },
        hashEnabled: {
          "script-src": true,
          "style-src": true,
        },
        hashingMethod: "sha384",
      }
    )
  );
  //
  config.plugins.push(new SubresourceIntegrityPlugin());

  return config;
};
