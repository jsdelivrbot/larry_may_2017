const Posts = require('../models/posts');

exports.getAllPosts = function(req, res, next) {
  Posts.find({}).populate("comments").exec(function(err, posts) {
    if(err) {
      return next(err);
    } else {
      res.json(posts);
    }
  });
}

exports.newPosts = function(req, res, next) {
  const content = req.body.content;
  const title = req.body.title;

  if(!req.user) {
    return res.status(422).send({error: 'You must be signed in to create a posts'});
  }
  if(!content || !title) {
    return res.status(422).send({error: 'You must provide a post content and title!'});
  }

  const newPost = {title: title, content: content, author:{id: req.user.id, email: req.user.email}};
  Posts.create(newPost, function(err, post) {
    if(err) {
      return next(err);
    } else {
      res.json(post);
    }
  });

}

exports.getOnePost = function(req, res, next) {
  Posts.findById(req.params.id).populate("comments").exec(function(err, foundPost) {
    if(err) {
      return next(err);
    } else {
      res.json(foundPost);
    }
  });
}

exports.deletePost = function(req, res, next) {
  const query = {_id: req.params.id};

  Posts.remove(query, function(err, posts) {
    if(err) {
      return next(err);
    } else {
      res.json(posts);
    }
  });
}

exports.editPost = function(req, res, next) {
  const post = req.body;
  const query = req.params.id;

  const update = {
    '$set': {
      title: post.title,
      content: post.content
    }
  };

  Posts.findByIdAndUpdate(query, update).populate("comments").exec(function(err, post) {
    if(err){
      return next(err);
    } else {
      res.json(post);
    }
  });
}
