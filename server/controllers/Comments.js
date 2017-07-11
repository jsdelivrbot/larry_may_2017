const Comments = require('../models/comments');
const Post = require('../models/posts');

exports.newComment = function(req, res, next) {
  const comment = req.body.comment;

  if(!req.user) {
    return res.status(422).send({error: 'You must be signed in to create a posts'});
  }
  if(!comment) {
    return res.status(422).send({error: 'You must provide a comment!'});
  }

  const newComment = {text: comment, author: {id: req.user.id, email: req.user.email}};

  Post.findById(req.params.id, function(err, post) {
    if(err) {
      return next(err);
    } else {
      Comments.create(newComment, function(err, comment) {
        if(err) {
          return next(err);
        } else {
          post.comments.push(comment);
          post.save();
          res.json(comment);
        }
      });
    }
  });
}

exports.getComments = function(req, res, next) {
  Comments.find({}, function(err, comments) {
    if(err) {
      return next(err);
    } else {
      res.json(comments);
    }
  })
}

exports.editComment = function(req, res, next) {
  const comment = req.body.text;
  const query = req.params.comment_id;

  const update = {
    '$set': {
      text: comment
    }
  };

  Comments.findByIdAndUpdate(query, update, function(err, comment) {
    if(err) {
      return next(err);
    } else {
      res.json(comment);
    }
  });
}

exports.deleteComment = function(req, res, next) {
  const query = {_id: req.params.comment_id};

  Comments.remove(query, function(err, comments) {
    if(err) {
      return next(err);
    } else {
      res.json(comments);
    }
  });
}
