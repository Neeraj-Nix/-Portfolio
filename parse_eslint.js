const fs = require('fs');
const results = require('./eslint.json');
let log = '';
results.forEach(r => {
  if(r.errorCount > 0) {
    log += r.filePath + '\n';
    r.messages.forEach(m => {
      log += `  Line ${m.line}: ${m.message}\n`;
    });
  }
});
fs.writeFileSync('eslint_errors.txt', log, 'utf8');
