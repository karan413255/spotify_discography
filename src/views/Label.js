import React, { Component } from "react";
import "../App.css";
// import label from "../constants/label";
// import searchLabel from "../constants/search";
import Album from "../components/album";
import AlbumList from "../components/album_list";
import Artist from "../components/artist";
import query_string from "query-string";
import { Route, Redirect } from "react-router-dom";
import pageLoaderHOC, { PageLoaderRenderProps } from "../components/hoc";

export default class Label extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
      singles: [],
      compilations: [],
      artists: [],
      label: null,
      isLoading: true,
      isError: false
    };
  }

  componentDidMount() {
    // get label details from discogs
    this.getLabelDetails();
    // get albums, artists of label from spotify search api
    // const releases = searchLabel.albums.items;
    // const artists = searchLabel.artists.items;
    // let albums = [];
    // let singles = [];
    // let compilations = [];
    // releases.forEach(release => {
    //   if (release.album_type === "album") {
    //     albums.push(release);
    //   } else if (release.album_type === "single") {
    //     singles.push(release);
    //   } else if (release.album_type === "compilation") {
    //     compilations.push(release);
    //   }
    // });
    // albums.sort(this.compareDate);
    // singles.sort(this.compareDate);
    // compilations.sort(this.compareDate);

    // this.setState({ albums, singles, compilations, artists });
  }

  compareDate = (a1, a2) => {
    if (a1.release_date > a2.release_date) return -1;
    else if (a1.release_date < a2.release_date) return 1;
    return 0;
  };

  getLabelDetails = () => {
    this.setState({
      isLoading: true
    });
    const token = localStorage.getItem("token");
    fetch("https://api.discogs.com/labels/" + this.props.match.params.id, {
      method: "GET",
      headers: {
        Authorization:
          "Discogs key=BSpPEtIlRNFpFoJuOjgC, secret=PBhnbfxxNCAjHoXSrNkpyzMtxXUsVdkK"
      }
    })
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else if (res.status === 500) {
          console.log(res.json());
          throw new Error(res.text());
        }
      })
      .then(res => {
        console.log(res);
        this.setState({ label: res });
        const name = res.name
          .replace(/\([0-9]+\)$/g, "")
          .replace(/[&\/\\#,+\(\)$~%\.!^'"\;:*?\[\]<>{}]/g, "");
        const query = {
          query: `label:"${name}"`,
          type: "album,artist,playlist",
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
            if (res.status === 200) {
              return res.json();
            } else if (res.status === 401) {
              localStorage.removeItem("token");
              await res.json();
              console.error(res.json());
              throw new Error("invalid token");
            }
          })
          .then(async res => {
            console.log(res);
            let artists = res.artists.items;
            let releases = res.albums.items;
            let nextAlbums = res.albums.next;
            let nextArtists = res.artists.next;
            let data, response;
            while (nextAlbums !== null) {
              response = await fetch(nextAlbums, {
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
              nextAlbums = data.albums.next;
              // console.log(nextAlbums);
              Array.prototype.push.apply(releases, data.albums.items);
            }
            while (nextArtists !== null) {
              let response = await fetch(nextArtists, {
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
              nextArtists = data.artists.next;
              Array.prototype.push.apply(artists, data.artists.items);
              // console.log(nextArtists);
            }
            let albums = [];
            let singles = [];
            let compilations = [];
            releases.forEach(release => {
              if (release.album_type === "album") {
                albums.push(release);
              } else if (release.album_type === "single") {
                singles.push(release);
              } else if (release.album_type === "compilation") {
                compilations.push(release);
              }
            });
            albums.sort(this.compareDate);
            singles.sort(this.compareDate);
            compilations.sort(this.compareDate);
            console.log("albums");
            console.log(albums.length);
            console.log("singles");
            console.log(singles.length);
            console.log("compilations");
            console.log(compilations.length);
            console.log("artists");
            console.log(artists.length);
            this.setState({ albums, singles, compilations, artists });
            this.setState({
              isLoading: false
            });
          })
          .catch(e => {
            console.error(e);
            this.setState({
              isError: true,
              isLoading: false
            });
          });
      })
      .catch(e => console.error(e));
  };

  render() {
    const LabelPageLoaderHOC = pageLoaderHOC(LabelDetails);
    return <LabelPageLoaderHOC {...this.state} />;
    // return (
    //   <PageLoaderRenderProps {...this.state}>
    //     {props => <LabelDetails {...props} />}
    //   </PageLoaderRenderProps>
    // );
  }
}

const LabelDetails = ({ label, albums, singles, compilations, artists }) => {
  return (
    <div className="labelPage">
      {label && (
        <div className="label-navbar">
          <div className="labelName">{label.name}</div>
          <div className="label-info">
            <div className="label-image">
              {label.images && label.images.length > 0 && (
                <img src={label.images[0].uri} alt={label.name}></img>
              )}
            </div>
            <div className="label-profile">{label.profile}</div>
            {label.sublabels && label.sublabels.length > 0 && (
              <div className="label-sublabels">
                <div>Sub Labels</div>
                <ul>
                  {label.sublabels.map(sublabel => (
                    <Route
                      key={sublabel.id}
                      render={({ history }) => (
                        <li key={sublabel.id}>
                          <a
                            href=""
                            onClick={() =>
                              history.push(`/label/${sublabel.id}`)
                            }
                          >
                            {sublabel.name}
                          </a>
                        </li>
                      )}
                    ></Route>
                  ))}
                </ul>
              </div>
            )}
            {label.parent_label && (
              <div className="label-parent_label">
                <span>Parent Label:</span>
                <Route
                  render={({ history }) => (
                    <a
                      href=""
                      onClick={() => {
                        history.push(`/label/${label.parent_label.id}`);
                      }}
                    >
                      {label.parent_label.name}
                    </a>
                  )}
                ></Route>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="label-main">
        {/* Label Releases */}
        <div className="label-releases">
          <div>Label Releases</div>
          {/* album releases */}
          {/* album list component */}
          {albums.length > 0 && (
            // <div>
            //   Albums
            //   {albums.map(album => (
            //     <Album key={album.id} album={album} />
            //   ))}
            // </div>
            <AlbumList albums={albums} />
          )}

          {/* single releases */}
          {singles.length > 0 && (
            <div>
              Singles
              {singles.map(single => (
                <Album key={single.id} album={single} />
              ))}
            </div>
          )}

          {/* single releases */}
          {compilations.length > 0 && (
            <div>
              Compilations
              {compilations.map(compilation => (
                <Album key={compilation.id} album={compilation} />
              ))}
            </div>
          )}
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
};
