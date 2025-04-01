const fs = require("fs");
const path = require("path");

const packageJsonPath = path.join(__dirname, "package.json");
const templatePath = path.join(__dirname, "README.template.md");
const outputPath = path.join(__dirname, "README.md");

const packageData = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
const version = packageData.version;

// README-Vorlage einlesen
let readmeContent = fs.readFileSync(templatePath, "utf8");

readmeContent = readmeContent.replace(/{{VERSION}}/g, version);

fs.writeFileSync(outputPath, readmeContent);

console.log(`README.md wurde aktualisiert auf Version ${version}`);
