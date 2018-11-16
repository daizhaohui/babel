const babel = require('@babel/core');
const path = require('path');
const fs = require('fs');
const filename = path.resolve(__dirname, "demo.js");
const code = fs.readFileSync(filename, "utf8");
const cwd = process.cwd();
const autoAssignPlugin = require('./index');
//const decoratorPlugin = require('@babel/plugin-proposal-decorators');

babel.transform(code, {
    presets: ["@babel/preset-env"],
    plugins: [
        autoAssignPlugin,
        ["@babel/plugin-proposal-decorators", {
            "legacy": true
        }]
    ]
}, (err, result) => {
    if (!err) {
        fs.writeFileSync(path.resolve(cwd, "output/autoAssignDemo.js"), result.code, 'utf-8');
    } else {
        console.log(err);
    }
});