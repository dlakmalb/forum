import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

import Login from './containers/Login';
import Dashboard from './containers/Dashboard';
import Posts from './containers/Posts';
import Comments from './containers/Comments';
import NotFound from './components/NotFound';
import AddComments from './containers/AddComment';
import AddPost from './containers/AddPost';
import DeletePosts from './containers/DeletePosts';
import PendingPosts from './containers/PendingPosts';
import RegisterUser from "./containers/RegisterUser";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Switch>
            <Route path="/approved-posts" exact component={Dashboard} />
            <Route path="/add-post" exact component={AddPost} />
            <Route path="/delete-posts" exact component={DeletePosts} />
            <Route path="/pending-posts" exact component={PendingPosts} />
            <Route path="/:page/comment/:id" exact component={AddComments} />
            <Route path="/posts" exact component={Posts} />
            <Route path="/register-user" exact component={RegisterUser} />
            <Route path="/post/:id" exact component={Comments} />
            <Route path="/not-found" exact component={NotFound} />
            <Route path="/" exact component={Login} />
            <Redirect to="/not-found" />
        </Switch>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
