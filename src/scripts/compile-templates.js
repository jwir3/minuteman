var packInfo = require('../../package.json');
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var partials = require('partials');
var Mustache = require('mustache');

function getOutputTemplateDir() {
  return path.join('build', 'templatesPrecompiled');
}

function getOutputHtmlDir() {
  return path.join('build', 'html');
}

/**
 * Pre-compiles templates by replacing 'XX'-{atoms,molecules,cells,organs} and
 * copies them to the build/templatesPrecompiled directory.
 */
function preCompileTemplates(templatesDirectory) {
  // for each of the directories in the templates dir
  let templateDirs = fs.readdirSync(templatesDirectory);
  let outputTemplateDir = getOutputTemplateDir();
  mkdirp(outputTemplateDir);
  for (let dirIdx in templateDirs) {
    let inputTemplateDir = templateDirs[dirIdx];
    let fullNextDirPath = path.join(templatesDirectory, inputTemplateDir);
    let outputTemplatePrefix = '';
    if (fs.statSync(fullNextDirPath).isDirectory()) {
      // Remove the prefix 'XX-', if it exists.
      let dirRegex = /[0-9]+\-(.*)/;
      outputTemplatePrefix = inputTemplateDir.replace(dirRegex, '$1');
    }

    // copy each file from this input directory over to the output directory
    let templateFiles = fs.readdirSync(path.join(templatesDirectory, inputTemplateDir));
    for (let templateIdx in templateFiles) {
      let templateFileName = templateFiles[templateIdx];
      let templatePath = path.join(templatesDirectory, inputTemplateDir, templateFileName);
      copy(templatePath, path.join(outputTemplateDir, outputTemplatePrefix + '-' + templateFileName));
    }
  }
}

function copy(inputPath, outputPath) {
  fs.copyFileSync(inputPath, outputPath);
}

function loadPartials() {
  return partials(path.join(getOutputTemplateDir(), '*.mustache'));
}

function writeDataToHtmlFile(data, directory, filename) {
  mkdirp(directory);
  fs.writeFileSync(path.join(directory, filename), data);
}

function convertOrganismsToHtml(data) {
  let outputHtmlDirectory = getOutputHtmlDir();
  let outputTemplateDir = getOutputTemplateDir();
  let files = fs.readdirSync(outputTemplateDir);
  let organismRegex = /organisms-(.*)\.mustache/;
  for (let fileIdx in files) {
    let nextFile = files[fileIdx];
    if (nextFile.match(organismRegex)) {
      let htmlFileName = nextFile.replace(organismRegex, '$1.html');
      let templateData = fs.readFileSync(path.join(outputTemplateDir, nextFile),
                                         'utf-8');
      let rendered = Mustache.render(templateData, data, loadPartials());
      writeDataToHtmlFile(rendered, outputHtmlDirectory, htmlFileName);
    }
  }
}

preCompileTemplates(packInfo.templatesDirectory);
convertOrganismsToHtml(process.argv.slice(2)[0]);
