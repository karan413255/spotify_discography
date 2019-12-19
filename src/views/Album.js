import React, { Component } from "react";
import "../App.css";
// import album from "../constants/album";
import { Route, Link } from "react-router-dom";

class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      album: ""
    };
  }

  componentDidMount() {
    // call spotify album details api to get album details
    this.getAlbumDetails();
  }

  getAlbumDetails = () => {
    const token = localStorage.getItem("token");
    const id = this.props.match.params.id;
    fetch("https://api.spotify.com/v1/albums/" + id, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else if (res.status === 401) {
          console.log(res.json());
          throw new Error(res.text);
        }
      })
      .then(res => {
        console.log(res);
        this.setState({ album: res, isLoading: false });
      })
      .catch(error => {
        this.setState({ isLoading: false });
        console.log(error);
      });
  };

  render() {
    const { isLoading, album } = this.state;
    if (isLoading) {
      return <div>Loading...</div>;
    }
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
                  <Link to={`/artist/${artist.id}`}>
                    <li key={artist.id}>{artist.name}</li>
                  </Link>
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
