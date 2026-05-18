const fs = require('fs');
const path = require('path');

const templatePath = path.join(__dirname, 'template.html');
const stylePath = path.join(__dirname, 'style.css');
const scriptPath = path.join(__dirname, 'script.js');
const dataPath = path.join(__dirname, 'eventSchedule.js');
const outputPath = path.join(__dirname, 'index.html');

// Read all necessary files
const htmlTemplate = fs.readFileSync(templatePath, 'utf8');
const cssContent = fs.readFileSync(stylePath, 'utf8');
const scriptContent = fs.readFileSync(scriptPath, 'utf8');
const dataContent = fs.readFileSync(dataPath, 'utf8'); // This will contain 'const eventSchedule = [...]'

// Inject content into the HTML template
let finalHtml = htmlTemplate.replace('/* INJECT_CSS_HERE */', cssContent);
finalHtml = finalHtml.replace('/* INJECT_JS_HERE */', scriptContent);

// Inject the data directly into the script tag, ensuring it's available globally for the script.js
// We need to make sure 'eventSchedule' is a global variable or accessible in script.js's scope.
// By injecting it before scriptContent and keeping it as a 'const' declaration, it will be in the same scope.
finalHtml = finalHtml.replace('/* INJECT_DATA_HERE */', dataContent);


// Write the final HTML to index.html
fs.writeFileSync(outputPath, finalHtml, 'utf8');

console.log('Successfully built index.html');
