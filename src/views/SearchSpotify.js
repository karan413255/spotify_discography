import React, { Component } from "react";
import { SpotifyContext } from "../util/spotify_context";
// import axios from "axios";
// import spotify_search from "../constants/search";
// import labels from "../constants/labels";
// import Album from "../components/album";
import Artist from "../components/artist";
import Label from "../components/label";
import query_string from "query-string";
import { Route } from "react-router-dom";
import pageLoaderHOC from "../components/hoc";

class SearchSpotify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: this.props.location.state
        ? this.props.location.state.searchValue
          ? this.props.location.state.searchValue
          : ""
        : "",
      searchType: this.props.location.state
        ? this.props.location.state.searchType
          ? this.props.location.state.searchType
          : "Label"
        : "Label",
      artistList: [],
      albumsList: [],
      isError: false,
      isLoading: false
    };
  }
  componentDidMount() {
    let spotify = this.context;
    console.log(`Spotify Context Token: ${spotify.getAccessToken()}`);
    if (this.state.searchType && this.state.searchValue) {
      this.getSearchResult();
    }
  }
  getSearchResult = () => {
    let artistList;
    const token = localStorage.getItem("token");
    console.log("storage token: " + token);
    this.setState({ isLoading: true });
    if (this.state.searchType === "Artist") {
      const query = {
        query: `artist:${this.state.searchValue}`,
        type: "artist",
        market: "from_token",
        limit: 50,
        offset: 0
      };
      fetch(
        "https://api.spotify.com/v1/search?" + query_string.stringify(query),
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
        .then(async res => {
          console.log(res.status);
          if (res.status === 200) {
            return res.json();
          } else if (res.status === 401) {
            localStorage.removeItem("token");
            let data = await res.json();
            throw new Error(data);
          }
        })
        .then(res => {
          console.log(res);
          artistList = res.artists.items;
          this.setState({ artistList, isLoading: false });
        })
        .catch(e => {
          console.log(e);
          this.setState(state => ({
            isError: !state.isError,
            isLoading: !state.isLoading
          }));
        });
    } else if (this.state.searchType === "Label") {
      const query = {
        q: this.state.searchValue,
        type: "label"
      };
      fetch(
        "https://api.discogs.com/database/search?" +
          query_string.stringify(query),
        {
          method: "GET",
          headers: {
            Authorization:
              "Discogs key=BSpPEtIlRNFpFoJuOjgC, secret=PBhnbfxxNCAjHoXSrNkpyzMtxXUsVdkK"
          }
        }
      )
        .then(res => {
          if (res.status === 200) {
            return res.json();
          } else if (res.status === 500) {
          }
        })
        .then(res => {
          const labelsList = res.results;
          this.setState({ labelsList, isLoading: false });
        })
        .catch(e => console.log(e));
    }
  };

  handleSearchType = e => {
    e.preventDefault();
    this.setState({ searchType: e.target.value });
  };

  render() {
    const SearchPageLoaderHOC = pageLoaderHOC(SearchPage);
    return (
      <div className="search">
        <div className="search-dropdown">
          <select
            name="Search by type"
            defaultChecked="Label"
            onChange={e => {
              e.persist();
              this.setState({ searchType: e.target.value });
            }}
          >
            <option value="Label">Label</option>
            <option value="Artist">Artist</option>
          </select>
        </div>
        <div className="search-box">
          <input
            type="text"
            onChange={e => this.setState({ searchValue: e.target.value })}
          ></input>
          <button onClick={this.getSearchResult} type={"submit"}>
            Search
          </button>
        </div>
        <SearchPageLoaderHOC {...this.state} />
      </div>
    );
  }
}

const SearchPage = ({ labelsList, artistList, searchType }) => {
  return (
    <>
      {/* labels list */}
      {searchType === "Label" ? (
        <div className="search-label">
          <h3 className="search-label--header">Labels</h3>
          <div className="search-label--widget">
            {labelsList
              ? labelsList.map(label => <Label key={label.id} label={label} />)
              : null}
          </div>
        </div>
      ) : null}
      {/* album list
      <div className="search-album">
        <h3 className="search-album--header">Albums</h3>
        <div className="search-album--widget">
          {albumsList
            ? albumsList.map(album => (
                <Album key={album["id"]} album={album} />
              ))
            : null}
        </div>
      </div> */}

      {/* artist list */}
      {searchType === "Artist" ? (
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
      ) : null}
    </>
  );
};

SearchSpotify.contextType = SpotifyContext;

export default SearchSpotify;
