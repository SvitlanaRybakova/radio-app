const crypto = require("crypto");

module.exports = class Encrypt {
  static encrypt(password) {
    return (
      crypto
       
        .createHmac("sha256", "Radio Listener")
        .update(password)
        .digest("hex") 
    );
  }
};