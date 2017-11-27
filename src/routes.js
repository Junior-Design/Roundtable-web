// src/routes.js
import React from 'react'
import { Route, IndexRoute } from 'react-router'
import MainLayout from './components/MainLayout';
import IndexPage from './components/IndexPage';
import LoginPage from './components/LoginPage';
import BrowsePage from './components/BrowsePage';
import ConnectPage from './components/ConnectPage';
import ConnectSpotifyPage from './components/ConnectSpotifyPage';
import PlaylistsPage from './components/PlaylistsPage';
import NotFoundPage from './components/NotFoundPage';

const routes = (
  <Route path="/" component={MainLayout}>
    <IndexRoute component={IndexPage}/>
    <Route path="/login" component={LoginPage}/>
    <Route path="/browse" component={BrowsePage}/>
    <Route path="/connect" exact component={ConnectPage}/>
    <Route path="/connect/spotify" component={ConnectSpotifyPage}/>
    <Route path="/playlists" component={PlaylistsPage}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);

export default routes;