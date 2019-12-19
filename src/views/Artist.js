import React, { Component } from "react";
// import artist from "../constants/artist";
import Album from "../components/album";
import query_string from "query-string";

class Artist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
      singles: [],
      artist: "",
      isLoading: true
    };
  }

  componentDidMount() {
    this.getArtistDetails();
  }

  async getArtistDetails() {
    const token = localStorage.getItem("token");
    const id = this.props.match.params.id;

    console.log(id);
    console.log(this.artist);
    if (!this.artist) {
      console.log("artist id called");
      const response = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      let data;
      console.log("got artist id data");
      console.log(response);
      if (response.status === 200) {
        data = await response.json();
      } else if (response.status === 401) {
        console.log(response.json());
      }
      console.log(data);
      this.setState({ artist: data });
    }
    const query = {
      include_groups: "album,single,compilation,appears_on",
      market: "from_token",
      limit: 50,
      offset: 0
    };
    fetch(
      `https://api.spotify.com/v1/artists/${id}/albums?${query_string.stringify(
        query
      )}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
      .then(res => {
        console.log("artist data called");
        if (res.status === 200) {
          return res.json();
        } else if (res.status === 401) {
          console.log(res.json());
          throw new Error(res.text);
        }
      })
      .then(res => {
        console.log(res);
        const releases = res.items;
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
        this.setState({ albums, singles, isLoading: false });
      })
      .catch(error => {
        this.setState({ isLoading: false });
        console.log(error);
      });
  }

  compareDate = (a1, a2) => {
    if (a1.release_date > a2.release_date) return -1;
    else if (a1.release_date < a2.release_date) return 1;
    return 0;
  };

  render() {
    const { albums, singles, artist, isLoading } = this.state;
    if (isLoading) {
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
