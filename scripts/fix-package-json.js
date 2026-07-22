const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PACKAGES_DIR = path.join(ROOT, 'packages', '@react-ui');

function listReactUiPackages() {
  return fs.readdirSync(PACKAGES_DIR).filter((name) => {
    const pkgPath = path.join(PACKAGES_DIR, name, 'package.json');
    return fs.existsSync(pkgPath);
  });
}

const reactUiPackages = new Set(listReactUiPackages().map((n) => `@xiaoye-react/${n}`));

const packageJsonFiles = listReactUiPackages().map((name) =>
  path.join(PACKAGES_DIR, name, 'package.json')
);

const report = {
  removedMantineTests: [],
  invalidWorkspaceRefs: [],
  peerMantineReplacements: [],
};

packageJsonFiles.forEach((filePath) => {
  const raw = fs.readFileSync(filePath, 'utf8');
  const json = JSON.parse(raw);
  let modified = false;

  const depSections = ['dependencies', 'devDependencies', 'peerDependencies'];

  depSections.forEach((section) => {
    if (!json[section]) return;

    // 1. Remove @mantine-tests/* entries
    Object.keys(json[section]).forEach((depName) => {
      if (depName.startsWith('@mantine-tests/')) {
        report.removedMantineTests.push({
          file: filePath,
          section,
          package: depName,
          version: json[section][depName],
        });
        delete json[section][depName];
        modified = true;
      }
    });

    // 2. Check workspace:* references to non-existent packages
    Object.keys(json[section]).forEach((depName) => {
      if (json[section][depName] === 'workspace:*') {
        const scope = depName.split('/')[0];
        if (scope !== '@react-ui' && !reactUiPackages.has(depName)) {
          report.invalidWorkspaceRefs.push({
            file: filePath,
            section,
            package: depName,
          });
        }
      }
    });

    // 3. Replace @mantine/* with @xiaoye-react/* in peerDependencies
    if (section === 'peerDependencies') {
      Object.keys(json[section]).forEach((depName) => {
        if (depName.startsWith('@mantine/')) {
          const newName = depName.replace('@mantine/', '@xiaoye-react/');
          report.peerMantineReplacements.push({
            file: filePath,
            oldName: depName,
            newName,
            version: json[section][depName],
          });
          json[section][newName] = json[section][depName];
          delete json[section][depName];
          modified = true;
        }
      });
    }
  });

  // Remove empty dependency sections
  depSections.forEach((section) => {
    if (json[section] && Object.keys(json[section]).length === 0) {
      delete json[section];
      modified = true;
    }
  });

  if (modified) {
    fs.writeFileSync(filePath, `${JSON.stringify(json, null, 2)}\n`, 'utf8');
  }
});

console.log(JSON.stringify(report, null, 2));
