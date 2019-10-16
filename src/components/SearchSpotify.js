import React, { Component } from "react";

class SearchSpotify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue = "",
      artistList = [],
      albumList = [],
      songsList = []
    }
  }
  
  componentDidMount() {
    // api call to get the search term details
  }

  render() {
    return <div>
    </div>;
  }
}

export default SearchSpotify;
