import gulp from 'gulp'
import { deleteSync } from 'del'
import typescript from 'gulp-typescript'
import babel from 'gulp-babel'
import uglify from 'gulp-uglify'
import browserify from 'gulp-browserify'

async function  clear() {
    await deleteSync(['dist'])
}

function build(cb) {
    return gulp.src('./src/index.ts')
                .pipe(typescript())
                .pipe(babel({
                    presets: ['@babel/preset-env']
                }))
                // .pipe(uglify())
                .pipe(gulp.dest('./dist'))
}


export default gulp.series(
    clear,
    build
)
