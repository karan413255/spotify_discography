import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SearchSpotify from "./views/SearchSpotify";
import Artist from "./views/Artist";
import Album from "./views/Album";
import "./App.css";
import { spotifyApi, SpotifyContext } from "./util/spotify_context";
import Label from "./views/Label";

class Home extends Component {
  render() {
    return (
      <div>
        {this.props.loggedIn ? (
          <div className="search-box">
            <Link to="/search">
              <span className="search-placeholder">Search</span>
            </Link>
          </div>
        ) : (
          <div className="search-box">
            <a href="http://localhost:8888">
              <span className="search-placeholder">Login to Spotify</span>
            </a>
          </div>
        )}
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
      // console.log(spotifyApi.getAccessToken());
    }
    this.state = {
      loggedIn: token ? true : false
      // nowPlaying: { name: "Not Checked", albumArt: "" }
    };
  }

  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  render() {
    return (
      <div className="spotify-discography-home">
        <Router>
          <SpotifyContext.Provider value={spotifyApi}>
            <Route
              exact
              path="/"
              render={routeProps => (
                <SearchSpotify {...routeProps} loggedIn={this.state.loggedIn} />
              )}
            />
            <Route
              path="/search"
              render={routeProps => <SearchSpotify {...routeProps} />}
            />
            <Route
              path="/artist/:id"
              render={routeProps => <Artist {...routeProps} />}
            />
            <Route
              path="/album/:id"
              render={routeProps => <Album {...routeProps} />}
            />
            <Route
              path="/label/:id"
              render={routeProps => <Label {...routeProps} />}
            ></Route>
          </SpotifyContext.Provider>
        </Router>
      </div>
    );
  }
}

export default App;
