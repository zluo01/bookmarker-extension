const path = require('path');

module.exports = {
    mode: "none",
    context: path.resolve(__dirname, "src"),
    entry: {
        // Background scripts.
        "background/index.js": "./background/index.js",
        // Content scripts.
        // "content/index.js": "./content/index.js"
    },
    output: {
        path: path.resolve(__dirname, "build/scripts"),
        filename: "[name]"
    }
};