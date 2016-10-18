var NpmInstallPlugin = require("npm-install-webpack-plugin");

module.exports = {
    entry: "./dist/TickManager.js",
    output: {
        path: __dirname,
        filename: "build/bundle.js"
    },
	plugins: [
        new NpmInstallPlugin({dev: false})],
    module: {
        loaders: [
        ]
    }
};