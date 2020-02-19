var { src, dest, series, watch } = require("gulp");
var markdown = require("gulp-markdown");
var inject = require("gulp-inject-string");
var del = require("del");

function md() {
    return src("./*.md")
        .pipe(markdown())
        .pipe(dest("./tmp"));
}


function htmlInject() {
    return src("./tmp/*.html")
        .pipe(inject.prepend("<html><head></head><body>"))
        .pipe(inject.append("</body></html>"))
        .pipe(dest("./dist"));
}

function clean() {
    return del(["./dist"]);
}

function watchFiles() {
    watch("./*.md", md);
    watch("./tmp/*.html", htmlInject);
}

exports.rebuild = series([clean, watchFiles, md]);
exports.default = series([watchFiles, md, htmlInject]);