import React from 'react'
import { Route, IndexRoute } from 'react-router'

import MainLayout from './components/MainLayout';

import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import BrowsePage from './pages/BrowsePage';
import SpotifyConfirmationPage from './pages/SpotifyConfirmationPage';
import PlaylistsPage from './pages/PlaylistsPage';
import TestAPIPage from './pages/TestAPIPage';
import NotFoundPage from './pages/NotFoundPage';


//Order of routes matter!! * be last
const routes = (
  <Route path="/">
    <IndexRoute                     component={IndexPage} />
    <Route path="login"           component={LoginPage} />
    <Route component={MainLayout}>
      <Route path="confirm/spotify"	component={SpotifyConfirmationPage} />
      <Route path="browse"          component={BrowsePage} />
      <Route path="playlists"       component={PlaylistsPage} />
      {/* <Route path="/testapi"        component={TestAPIPage} /> */}
      <Route path="*"               component={NotFoundPage} />
    </Route>
  </Route>
);

export default routes;
