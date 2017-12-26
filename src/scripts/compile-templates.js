var packInfo = require('../../package.json');
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var partials = require('partials');
var Mustache = require('mustache');

function getOutputDir() {
  return path.join(__dirname, '..', '..', 'build');
}

function getOutputTemplateDir() {
  return path.join(getOutputDir(), 'templatesPrecompiled');
}

function getOutputHtmlDir() {
  return path.join(getOutputDir(), 'html');
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
  let finalHtmlFile = path.join(directory, filename);
  console.log(`Writing data: ${data} to ${finalHtmlFile}`);
  fs.writeFileSync(finalHtmlFile, data);
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
      let dataFile = path.join(__dirname, '..', data);
      let jsonData = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
      let rendered = Mustache.render(templateData, jsonData, loadPartials());
      writeDataToHtmlFile(rendered, outputHtmlDirectory, htmlFileName);
    }
  }
}

preCompileTemplates(packInfo.templatesDirectory);
convertOrganismsToHtml(process.argv.slice(2)[0]);
