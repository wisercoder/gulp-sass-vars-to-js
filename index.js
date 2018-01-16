var through = require('through2');
var PluginError = require('plugin-error');

var PLUGIN_NAME = 'gulp-sass-vars-to-js';

function createJavaScriptIdentifier(sassId) {
    var items = sassId.split('-');
    var casedItems = items.map(function (s) {
        return s ? (s[0].toUpperCase() + s.substr(1)) : '';
    });
    return casedItems.join('');
}

function processSass(sass) {
    var lines = sass.split(/(?:\r\n|\r|\n)/g);
    var stream = through();
    stream.write('// This file was automatically generated. Do not edit by hand.\n\n');
    lines.forEach(function (line, index) {
        var match = line.match(/^\$(.*)\s*:\s*(.*);/);
        if (match) {
            var name = createJavaScriptIdentifier(match[1]);
            var value = match[2];
            var v;
            if (value[0] >= '0' && value[0] <= '9')
                v = parseInt(value, 10);
            else
                v = '"' + value + '"';
            stream.write("export const " + name + " = " + v + ";\n");
        }
    });
    return stream;
}

function gulpSassVarsToJs() {
    return through.obj(function (file, encoding, callback) {
        if (file.isNull()) {
            return callback(null, file);
        }
        if (file.isStream()) {
            this.emit('error', new PluginError(PLUGIN_NAME, 'Streams not supported!'));
        }
        else if (file.isBuffer()) {
            var input = String(file.contents);
            file.contents = processSass(input);
            return callback(null, file);
        }
    });
}

module.exports = gulpSassVarsToJs;
