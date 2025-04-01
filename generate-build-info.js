const fs = require("fs");
const path = require("path");

const packageJsonPath = path.join(__dirname, "package.json");
const publicDir = path.join(__dirname, "public");

// Sicherstellen, dass der Ordner existiert
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const buildDate = new Date().toISOString();
const packageData = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

const buildInfo = {
  version: packageData.version,
  buildDate: buildDate,
};

const buildInfoPath = path.join(publicDir, "build-info.json");
fs.writeFileSync(buildInfoPath, JSON.stringify(buildInfo, null, 2));

console.log("Build-Informationen generiert:", buildInfo);
