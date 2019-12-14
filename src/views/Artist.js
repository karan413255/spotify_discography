import React, { Component } from "react";
import artist from "../constants/artist";
import Album from "../components/album";

class Artist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: []
    };
  }

  componentDidMount() {
    const albums = artist.items;
    albums.sort(this.compareDate);
    this.setState({ albums });
  }

  compareDate = (a1, a2) => {
    if (a1.release_date > a2.release_date) return -1;
    else if (a1.release_date < a2.release_date) return 1;
    return 0;
  };

  render() {
    const { albums } = this.state;
    if (albums === null) {
      return "Loading...";
    }
    return (
      <div className="artistPage">
        <div className="artist-navbar">
          {/* <div className="artist-name">{album.name}</div> */}
        </div>
        <div className="artist-main">
          <div className="artist-info">
            <div className="artist-image">
              {/* <img src={artist.images[1].url} alt={artist.name}></img> */}
            </div>
            <div className="artist-albums">
              {albums
                ? albums.map(album => <Album key={album.id} album={album} />)
                : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Artist;
