import React, { Component } from "react";
import { SpotifyContext } from "../util/spotify_context";
import axios from "axios";
import spotify_search from "../constants/search";
import Album from "../components/album";
import Artist from "../components/artist";

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
    this.getSearchResult();
  }

  getSearchResult = () => {
    // axios.get("https://api.spotify.com/v1/search", {
    //   params: {
    //     q: "armin van buuren",
    //     type: "album,artist,track",
    //   },
    //   headers: {
    //     Authorization:
    //       "Bearer AQCz9GKyEI3XZ9ti40NumeXdCKnSlu_plCOSecLUNvHdVJ3W8NKELCpyZ2msO1yAN2KK_wbmqRIXdDGc6YnYnjrLxwgjNEbCxlANgzD5GT_YkhssuFc0Dkaq98zIilwJnvE5EcQyKDYF7M7NieqDyk2HQbDUpuR9Vkz4tfQJsBUoEkJOF5r7Bp2cycCKtN5bzH-jmKPm0FhnwgjiEYNAcTJJkl0jGFKkvSRjXOxCzf6pZjoCTF6TbFut8hepeY22pT9dmCLth6qYbQVV2jxcoDOrtWGYdihSudvYOVFftxik-U-CK61tLOHE1HzvLPR7LvvKFkDqYoS2UcBGuEJ8hFDpIzkkdiRyOZ0HxAqmQZscDlmJoMGYZReQNAjiA88zZ6KX-fcxxHZ0VTKqAtNirp0ia-ouN5icUMjwjFWzlmjdhNds3ZXqMY1YfSW_4JyaHDT04mFtzyBTLJIPNjwHxseCJsHHfWYa9QIV6vb1kP4v5sK9u43LbJ5cXCxmOcUqX7bRzV1VIui4jru09KHOxWM5Kkll9Uk89OkG5CHhPkNP-J3C_GOtM4Cp&state=VxPdCxu3GDMn88XG"
    //   }
    // });
    // this.spotifyApi.search("armin van buuren").then(response => {
    //   console.log(response);
    // });
    // this.spotifyApi.getMyCurrentPlaybackState().then(response => {
    //   this.setState({
    //     nowPlaying: {
    //       name: response.item.name,
    //       albumArt: response.item.album.images[0].url
    //     }
    //   });
    // });

    var albumsList = spotify_search.albums.items;
    var artistsList = spotify_search.artists.items;
    this.setState({
      albumList: albumsList,
      artistList: artistsList
    });
  };

  render() {
    var { albumList, artistList } = this.state;
    return (
      <div>
        <div className="search-box">
          <input type="text"></input>
          <button>Search</button>
        </div>

        {/* album list */}
        {/* <div className="search-album">
          <h3 className="search-album--header">Albums</h3>
          <div className="search-album--widget">
            {albumList
              ? albumList.map(album => (
                  <Album key={album["id"]} album={album} />
                ))
              : null}
          </div>
        </div> */}

        {/* artist list */}
        <div className="search-artist">
          <h3 className="search-artist--header">Artists</h3>
          <div className="search-artist--widget">
            {artistList
              ? artistList.map(artist => (
                  <Artist key={artist.id} artist={artist} />
                ))
              : null}
          </div>
        </div>
      </div>
    );
  }
}

SearchSpotify.contextType = SpotifyContext;

export default SearchSpotify;