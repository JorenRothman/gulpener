const gulpener = require('./dist/gulpener');
const GulpUglify = require('gulp-uglify');
const sass = require('gulp-dart-sass');

const [jsBuild, jsWatch] = gulpener.default({
    name: 'js',
    inGlobs: ['assets/src/js/main.js'],
    watchGlobs: ['assets/src/js/**/*.js'],
    outFolder: 'assets/dist/js',

    pipes: [[GulpUglify, {}]],
});

gulpener.default({
    name: 'scss',
    inGlobs: ['assets/src/scss/main.scss'],
    watchGlobs: ['assets/src/scss/**/*.scss'],
    outFolder: 'assets/dist/css',
    isProduction: false,
    pipes: [
        [
            sass,
            { outputStyle: 'expanded' },
            { outputStyle: 'compressed' },
            [['error', sass.logError]],
        ],
    ],
});

exports.default = jsBuild;
