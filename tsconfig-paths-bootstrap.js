//this file is used to bootstrap tsconfig-paths in nodejs environment
const tsConfigPaths = require("tsconfig-paths");

const baseUrl = "./dist/"; // Either absolute or relative path. If relative it's resolved to current working directory.
tsConfigPaths.register({
    baseUrl,
    paths: {
        "@/*": [
            "src/*"
        ]
    },
});