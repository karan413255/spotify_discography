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
      compilations: [],
      appearson: [],
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

    const response = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    let data;
    // console.log(response);
    if (response.status === 200) {
      data = await response.json();
    } else if (response.status === 401) {
      localStorage.removeItem("token");
      console.log(response.json());
    }
    this.setState({ artist: data });

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
        if (res.status === 200) {
          return res.json();
        } else if (res.status === 401) {
          localStorage.removeItem("token");
          console.log(res.json());
          throw new Error(res.text);
        }
      })
      .then(async res => {
        console.log(res);
        let releases = res.items;
        let next = res.next;
        let data, response;
        while (next) {
          response = await fetch(next, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          if (response.status === 200) {
            data = await response.json();
          } else if (response.status === 401) {
            localStorage.removeItem("token");
            console.log(response);
          }
          // console.log(data);
          next = data.next;
          // console.log(next);
          Array.prototype.push.apply(releases, data.items);
        }
        let albums = [];
        let singles = [];
        let compilations = [];
        let appearson = [];
        releases.forEach(release => {
          if (release.album_group === "album") {
            albums.push(release);
          } else if (release.album_group === "single") {
            singles.push(release);
          } else if (release.album_group === "compilation") {
            compilations.push(release);
          } else if (release.album_group === "appears_on") {
            appearson.push(release);
          }
        });
        albums.sort(this.compareDate);
        singles.sort(this.compareDate);
        compilations.sort(this.compareDate);
        appearson.sort(this.compareDate);
        this.setState({
          albums,
          singles,
          compilations,
          appearson,
          isLoading: false
        });
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
    const {
      albums,
      singles,
      artist,
      isLoading,
      compilations,
      appearson
    } = this.state;
    if (isLoading) {
      return "Loading...";
    }
    return (
      <div className="artistPage">
        <div className="artist-navbar">
          <div className="artist-image">
            {artist.images.length > 0 && (
              <img src={artist.images[0].url} alt={artist.name}></img>
            )}
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

            {/* compilation releases */}
            {compilations.length > 0 && (
              <div className="artist-compilations">
                <div>
                  Compilation
                  {compilations.map(compilation => (
                    <Album key={compilation.id} album={compilation} />
                  ))}
                </div>
              </div>
            )}

            {/* appears on releases */}
            {appearson.length > 0 && (
              <div className="artist-appearson">
                <div>
                  Appears On
                  {appearson.map(album => (
                    <Album key={album.id} album={album} />
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
