const fs = require("fs");
const path = require("path");

const configPath = path.join(__dirname, "title.config.json");
const templatePath = path.join(__dirname, "src", "index.template.html");
const outputPath = path.join(__dirname, "src", "index.html");

const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));

const template = fs.readFileSync(templatePath, "utf-8");

const output = template.replace(
  "<title>{{ TITLE }}</title>",
  `<title>${config.title}</title>`,
);

fs.writeFileSync(outputPath, output);

console.log("index.html wurde generiert mit dem Titel:", config.title);
