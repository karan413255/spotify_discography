import React, { Component } from "react";
import "../App.css";
import label from "../constants/label";
import searchLabel from "../constants/search";
import Album from "../components/album";
import Artist from "../components/artist";

export default class Label extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
      artists: []
    };
  }

  componentDidMount() {
    // get label details from discogs
    this.getLabelDetails();
    // get albums, artists of label from spotify search api
    const albums = searchLabel.albums.items;
    const artists = searchLabel.artists.items;
    albums.sort(this.compareDate);

    this.setState({ albums, artists });
  }

  compareDate = (a1, a2) => {
    if (a1.release_date > a2.release_date) return -1;
    else if (a1.release_date < a2.release_date) return 1;
    return 0;
  };

  getLabelDetails = () => {};

  render() {
    const { albums, artists } = this.state;
    return (
      <div className="labelPage">
        <div className="label-navbar">
          <div className="labelName">{label.name}</div>
        </div>
        <div className="label-main">
          <div className="label-info">
            <div className="label-image">
              <img src={label.images[0].uri} alt={label.name}></img>
            </div>
            <div className="label-profile">{label.profile}</div>
          </div>

          {/* Label Releases */}
          <div className="label-releases">
            <div>Releases</div>
            <ol>
              {albums
                ? albums.map(album => <Album key={album.id} album={album} />)
                : null}
            </ol>
          </div>

          {/* Label Artist list */}
          <div className="search-artist">
            <h3 className="search-artist--header">Artists</h3>
            <div className="search-artist--widget">
              {artists
                ? artists.map(artist => (
                    <Artist key={artist.id} artist={artist} />
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
