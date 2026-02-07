const fs = require('fs');
const { exec } = require('child_process');

console.log("Starting debug runner...");
const child = exec('node src/index.js', { cwd: __dirname });

child.stdout.on('data', (data) => {
    fs.appendFileSync('debug_stdout.log', data);
});

child.stderr.on('data', (data) => {
    fs.appendFileSync('debug_stderr.log', data);
});

child.on('close', (code) => {
    fs.appendFileSync('debug_info.log', `Child process exited with code ${code}`);
});

// kill after 5 seconds to capture startup errors without hanging
setTimeout(() => {
    child.kill();
    fs.appendFileSync('debug_info.log', '\nTerminated process after 5s');
}, 5000);
