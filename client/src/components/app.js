import React , { Component } from 'react';
import {Route, Switch} from 'react-router-dom';

import Home from './pages/home';
import Header from './header';
import Footer from './footer';
import RequireAuth from './auth/require_auth';
import RequireUnAuth from './auth/require_unauth';

import Signin from './auth/signin';
import Signup from './auth/signup';
import Signout from './auth/signout';

import Posts from './pages/posts';
import NewPosts from './pages/posts_new';
import ShowPosts from './pages/posts_show';
import EditPost from './pages/posts_edit';

import NewComment from './pages/comments_new';
import EditComment from './pages/comments_edit';

const Main = () => (
  <main>
    <Header />
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path="/signin" component={RequireUnAuth(Signin)} />
      <Route path="/signout" component={Signout} />
      <Route path="/signup" component={RequireUnAuth(Signup)} />
      <Route path="/posts/new" component={RequireAuth(NewPosts)} />
      <Route path="/posts/:id/edit" component={RequireAuth(EditPost)} />
      <Route path="/posts/:id/comments/:comment_id/edit" component={RequireAuth(EditComment)} />
      <Route path="/posts/:id/comments/new" component={RequireAuth(NewComment)} />
      <Route path="/posts/:id" component={ShowPosts} />
      <Route path="/posts" component={Posts} />
    </Switch>
    <Footer />
  </main>
)

const App = () => (
  <div>
    <Main />
  </div>
)

export default App;
