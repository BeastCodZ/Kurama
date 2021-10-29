const { prefix } = require("../config");
const { Schema, model } = require("mongoose");

// We declare new schema.
const guildSettingSchema = new Schema({
  guildID: {
    type: String,
  },
  prefix: {
    type: String,
    default: prefix,
  },
  role: {
    type: String,
}
});


module.exports = model("guild_settings", guildSettingSchema);