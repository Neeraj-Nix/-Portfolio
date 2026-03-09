const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

function processFiles() {
  const dirs = ['app', 'components'];
  dirs.forEach(d => {
    if (fs.existsSync(d)) {
      walkDir(d, function(filePath) {
        if (filePath.endsWith('.js') || filePath.endsWith('.jsx')) {
          let content = fs.readFileSync(filePath, 'utf8');
          
          // Replace text colors
          content = content.replace(/\btext-(zinc|gray|slate|white|black)(-\d{2,3})?(\/\d+)?\b/g, 'text-[#0066ff]');
          content = content.replace(/\bdark:text-(zinc|gray|slate|white|black)(-\d{2,3})?(\/\d+)?\b/g, '');

          // Replace background colors
          content = content.replace(/\bbg-(zinc|gray|slate|white|black)(-\d{2,3})?(\/\d+)?\b/g, 'bg-[#ffffff]');
          content = content.replace(/\bdark:bg-(zinc|gray|slate|white|black)(-\d{2,3})?(\/\d+)?\b/g, '');

          // Replace border colors
          content = content.replace(/\bborder-(zinc|gray|slate|white|black)(-\d{2,3})?(\/\d+)?\b/g, 'border-[#0066ff]');
          content = content.replace(/\bdark:border-(zinc|gray|slate|white|black)(-\d{2,3})?(\/\d+)?\b/g, '');

          // Clean up double spaces from removed dark: classes
          content = content.replace(/\s{2,}/g, ' ');

          fs.writeFileSync(filePath, content, 'utf8');
        }
      });
    }
  });
}

processFiles();
console.log('Colors replaced successfully!');
