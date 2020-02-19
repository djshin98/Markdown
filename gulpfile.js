var { src, dest, series } = require("gulp");
var markdown = require("gulp-markdown");
var del = require("del");

function md() {
    return src("./*.md")
        .pipe(markdown())
        .pipe(dest("./dist"));
}

function clean() {
    return del(["./dist"]);
}
exports.default = series([clean, md]);