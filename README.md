# gulp-sass-vars-to-js
Gulp plugin to export sass variables to JavaScript

## Helps keep your code and sass styles in sync

This gulp plugin enables you to reference your Sass variables in your TypeScript code. 

First install gulp-sass-vars-to-js
```
npm install gulp-sass-vars-to-js --save-dev
```

Here's an example gulpfile.js to extract variables from your .scss file and output them to a .ts file.

```javascript
var gulp = require('gulp');
var rename = require('gulp-rename');
var sassVarsToJs = require('gulp-sass-vars-to-js');

gulp.task('sassvars', function() {
    gulp.src(['style/source.scss'])
        .pipe(sassVarsToJs())
        .pipe(rename('sassvars.ts'))
        .pipe(gulp.dest('generated'))
})

gulp.task('default', ['sassvars'], function() {
})
```
