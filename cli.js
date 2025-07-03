const path = require('path');
const fs = require('fs-extra');
const { execSync } = require('child_process');

function copyTemplate(targetDir) {
  const templateDir = path.join(__dirname, '..');
  fs.copySync(templateDir, targetDir, {
    filter: (src) => {
      // Exclude node_modules, .git, and the cli script itself
      return !src.includes('node_modules') && !src.includes('.git') && !src.endsWith('cli.js');
    }
  });
}

function main() {
  const args = process.argv.slice(2);
  if (args.length < 1) {
    console.error('Usage: npx create-nativewind-app <project-directory>');
    process.exit(1);
  }
  const targetDir = path.resolve(process.cwd(), args[0]);
  if (fs.existsSync(targetDir)) {
    console.error(`Directory ${targetDir} already exists.`);
    process.exit(1);
  }
  fs.mkdirSync(targetDir);
  copyTemplate(targetDir);
  // Remove package-lock.json and .gitignore from template copy
  fs.removeSync(path.join(targetDir, 'package-lock.json'));
  fs.removeSync(path.join(targetDir, '.git'));
  // Re-init git
  execSync('git init', { cwd: targetDir, stdio: 'inherit' });
  console.log('Project created!');
  console.log('Next steps:');
  console.log(`  cd ${args[0]}`);
  console.log('  npm install');
  console.log('  npm run android # or npm run ios');
}

main();
