const crypto = require('crypto');

exports.getHashedString = (string) => {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(string).digest('base64');
    return hash;
}