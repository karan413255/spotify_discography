import React, { Component } from "react";
import "../App.css";
import album from "../constants/album";
import { Route } from "react-router-dom";

class Album extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // call spotify album details api to get album details
    this.getAlbumDetails();
  }

  getAlbumDetails = () => {};

  render() {
    return (
      <div className="albumPage">
        <div className="album-navbar">
          <div className="album-name">{album.name}</div>
        </div>
        <div className="album-main">
          <div className="album-info">
            <div className="album-image">
              <img src={album.images[1].url} alt={album.name}></img>
            </div>
            <div className="album-artists">
              <ul>
                {album.artists.map(artist => (
                  <li key={artist.id}>{artist.name}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="album-tracks">
            <ol>
              {album.tracks.items.map(track => (
                <li key={track.id}>{track.name}</li>
              ))}
            </ol>
          </div>
          <div className="album_date">{album.release_date}</div>
          <div className="album_label">
            <Route
              render={({ history }) => (
                <a
                  href=""
                  onClick={() => {
                    history.push({
                      pathname: "/search/",
                      state: {
                        searchValue: album.label,
                        searchType: "label"
                      }
                    });
                  }}
                >
                  {album.label}
                </a>
              )}
            ></Route>
          </div>
        </div>
      </div>
    );
  }
}

export default Album;
