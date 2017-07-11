var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var postsSchema = new Schema({
    title: String,
    createdAt: {type: Date, default: Date.now},
    content: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        email: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "comments"
        }
    ]
});

var Posts = mongoose.model("posts", postsSchema);

module.exports = Posts;
