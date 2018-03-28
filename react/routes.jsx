import React from 'react'
import { Route, IndexRoute } from 'react-router'

import MainLayout from './components/MainLayout';
import RootLayout from './components/RootLayout';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import BrowsePage from './pages/BrowsePage';
import PlaylistsPage from './pages/PlaylistsPage';
import FriendsPage from './pages/FriendsPage';
import TestAPIPage from './pages/TestAPIPage';
import NotFoundPage from './pages/NotFoundPage';


//Order of routes matter!! * be last
const routes = (
  <Route path="/" component={RootLayout}>
    <IndexRoute                     component={IndexPage} />
    <Route path="login"           component={LoginPage} />
    <Route component={MainLayout}>
      <Route path="browse"          component={BrowsePage} />
      <Route path="playlists"       component={PlaylistsPage} />
      <Route path="friends"         component={FriendsPage} />
      {/* <Route path="/testapi"        component={TestAPIPage} /> */}
      <Route path="*"               component={NotFoundPage} />
    </Route>
  </Route>
);

export default routes;
