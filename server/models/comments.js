var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var commentSchema = new Schema({
    text: String,
    createdAt: {type: Date, default: Date.now },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        email: String
    }
});

module.exports = mongoose.model("comments", commentSchema);
