const Authentication = require('./controllers/authentication');
const Posts = require('./controllers/Posts');
const Comments = require('./controllers/Comments');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', {session: false});

module.exports = function(app) {
  app.get('/', requireAuth, Authentication.getUser);
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
  app.post('/posts', requireAuth, Posts.newPosts);
  app.get('/posts', Posts.getAllPosts);
  app.get('/posts/:id', Posts.getOnePost);
  app.put('/posts/:id', requireAuth, Posts.editPost);
  app.delete('/posts/:id', requireAuth, Posts.deletePost);
  app.post('/posts/:id/comments', requireAuth, Comments.newComment);
  app.get('/posts/:id/comments', requireAuth, Comments.getComments);
  app.put('/posts/:id/comments/:comment_id', requireAuth, Comments.editComment);
  app.delete('/posts/:id/comments/:comment_id', requireAuth, Comments.deleteComment);
}
