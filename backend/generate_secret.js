const fs = require('fs');
const crypto = require('crypto');
const secret = crypto.randomBytes(32).toString('hex');
console.log(secret);
fs.writeFileSync('jwt_secret.txt', secret);
