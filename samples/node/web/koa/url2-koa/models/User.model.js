const mongoose = require('mongoose');

const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: String,
  password: String,
});

UserSchema
  .virtual('userInfo')
  .get(function() {
    return {
      username: this.username,
    }
  });


module.exports = mongoose.model('User', UserSchema);
