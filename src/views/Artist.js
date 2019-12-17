import React, { Component } from "react";
import artist from "../constants/artist";
import Album from "../components/album";

class Artist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
      singles: [],
      artist: this.props.location.state.artist
    };
  }

  componentDidMount() {
    const releases = artist.items;
    let albums = [];
    let singles = [];
    releases.forEach(release => {
      if (release.album_group === "album") {
        albums.push(release);
      } else if (release.album_group === "single") {
        singles.push(release);
      }
    });
    albums.sort(this.compareDate);
    singles.sort(this.compareDate);
    this.setState({ albums, singles });
  }

  compareDate = (a1, a2) => {
    if (a1.release_date > a2.release_date) return -1;
    else if (a1.release_date < a2.release_date) return 1;
    return 0;
  };

  render() {
    const { albums, singles, artist } = this.state;
    if (albums === null) {
      return "Loading...";
    }
    return (
      <div className="artistPage">
        <div className="artist-navbar">
          <div className="artist-image">
            <img src={artist.images[1].url} alt={artist.name}></img>
          </div>
          <div className="artist-name">{artist.name}</div>
          {artist.genres.length > 0 && (
            <div className="album-genres">
              <div>Genres</div>
              <ul>
                {artist.genres.map(genre => (
                  <li key={genre}>{genre}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="artist-main">
          <div className="artist-info">
            <div>Releases</div>

            {/* artist albums */}
            <div className="artist-albums">
              {/* album releases */}
              {albums.length > 0 && (
                <div>
                  Albums
                  {albums.map(album => (
                    <Album key={album.id} album={album} />
                  ))}
                </div>
              )}
            </div>

            {/* single releases */}
            {singles.length > 0 && (
              <div className="artist-singles">
                <div>
                  Singles
                  {singles.map(single => (
                    <Album key={single.id} album={single} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Artist;
