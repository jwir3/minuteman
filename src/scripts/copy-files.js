var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');

var jsSrcPath = path.join(__dirname, '..');
var libPath = path.join(__dirname, '..', 'lib');
var menuPath = path.join(__dirname, '..', 'menu');

var dstJsPath = path.join(__dirname, '..', '..', 'build', 'src');
var dstLibPath = path.join(__dirname, '..', '..', 'build', 'src', 'lib');
var dstMenuPath = path.join(__dirname, '..', '..', 'build', 'src', 'menu');

function copyJavascriptFilesToAssetsDirectory(src, dst) {
  mkdirp(dst);

  let files = fs.readdirSync(src);
  let jsFileExtRegex = /(.*)\.js/;
  for (let fileIdx in files) {
    let nextFile = files[fileIdx];
    if (nextFile.match(jsFileExtRegex)) {
      fs.copyFileSync(path.join(src, nextFile), path.join(dst, nextFile));
    }
  }
}

copyJavascriptFilesToAssetsDirectory(jsSrcPath, dstJsPath);
copyJavascriptFilesToAssetsDirectory(libPath, dstLibPath);
copyJavascriptFilesToAssetsDirectory(menuPath, dstMenuPath);
