import React, { Component } from "react";
import { SpotifyContext } from "../util/spotify_context";

class SearchSpotify extends Component {
  constructor(props) {
    super(props);
    let spotifyApi = this.context;
    this.state = {
      searchValue: "",
      artistList: [],
      albumList: [],
      songsList: []
    };
  }

  componentDidMount() {
    // api call to get the search term details
  }

  getSearchResult() {
    spotifyApi.getMyCurrentPlaybackState().then(response => {
      this.setState({
        nowPlaying: {
          name: response.item.name,
          albumArt: response.item.album.images[0].url
        }
      });
    });
  }

  render() {
    return (
      <div>
        <input type="text"></input>
        <button>Search</button>
      </div>
    );
  }
}

SearchSpotify.contextType = SpotifyContext;

export default SearchSpotify;
