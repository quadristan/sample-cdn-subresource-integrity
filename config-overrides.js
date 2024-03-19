const CspHtmlWebpackPlugin = require("csp-html-webpack-plugin");
const { SubresourceIntegrityPlugin } = require("webpack-subresource-integrity");

const CDN_ORIGIN = "http://localhost:4001";
const CDN_ADDRESS = `${CDN_ORIGIN}/`;

const cspConfigPolicy = {
  "default-src": "'none'",
  "object-src": "'none'",
  "base-uri": "'self'",
  "connect-src": "*", // it is blocked by cors anyway
  "worker-src": ["'self'", CDN_ORIGIN],
  "img-src": ["'self'", "blob:", "data:", "content:", CDN_ORIGIN],
  "font-src": ["'self'", CDN_ORIGIN],
  "frame-src": ["'self'", CDN_ORIGIN],
  "manifest-src": ["'self'", CDN_ORIGIN],
  "style-src": [
    "'self'",
    CDN_ORIGIN,
    "'unsafe-inline'", // needed for material UI :(
  ],
  "script-src": [
    "'strict-dynamic'", // base one
  ],
};

module.exports = function override(config, env) {
  if (process.env.NODE_ENV === "production") {
    config.plugins.push(
      new CspHtmlWebpackPlugin(cspConfigPolicy, {
        nonceEnabled: {
          "script-src": true,
          "style-src": false, // i found out that this breaks material-ui :(
        },
      })
    );
    // CND address here
    config.output.publicPath = CDN_ADDRESS;
  }
  config.plugins.push(new SubresourceIntegrityPlugin());
  config.output.crossOriginLoading = "anonymous";

  return config;
};
