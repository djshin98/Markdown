var { src, dest, series, watch, parallel } = require("gulp");
var markdown = require("gulp-markdown");
var inject = require("gulp-inject-string");
var concat = require("gulp-concat");
var del = require("del");

function md() {
    return src("./src/*.md")
        .pipe(markdown())
        .pipe(dest("./tmp"));
}

function js() {
    return src("./src/*.js")
        .pipe(concat("main.js"))
        .pipe(dest("./dist/js/"));
}

var preString = "<html><head><script src='js/main.js'></script></head><body>";

function htmlInject() {
    return src("./tmp/*.html")
        .pipe(inject.prepend(preString))
        .pipe(inject.append("</body></html>"))
        .pipe(dest("./dist"));
}

function clean() {
    return del(["./dist"]);
}

function watchFiles() {
    watch("./src/*.md", md);
    watch("./src/*.js", js);
    watch("./tmp/*.html", htmlInject);
}

exports.rebuild = series([clean, watchFiles, js, md, htmlInject]);
exports.default = parallel([watchFiles, series([js, md, htmlInject])]);