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

Here's an example scss file:

```scss
$side-bar-width: 250px;

.side-bar {
   display: inline-block;
   width: $side-bar-width;
}
```

Note that the identifier is defined with a $ in the first column and that there is a semicolon at the end.

Here's the resulting .ts file that's generated:

```javascript
// This file was automatically generated. Do not edit by hand.

export const SideBarWidth = 250;
```
