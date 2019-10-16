import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SearchSpotify from "./components/SearchSpotify";
import Artist from "./components/Artist";
import Album from "./components/Album";
import logo from "./logo.svg";
import "./App.css";

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React, its good!
//         </a>
//       </header>
//     </div>
//   );
// }

function Home() {
  return (
    <div className="search-box">
      <div>
        <Link to="/search">Search</Link>
      </div>
    </div>
  );
}

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Route exact path="/" render={routeProps => <Home />} />
          <Route
            path="/search"
            render={routeProps => <SearchSpotify {...routeProps} />}
          />
          <Route
            path="/artist/:id"
            render={routeProps => <Artist {...routeProps} />}
          />
          <Route
            path="/album/:id"
            render={routeProps => <Album {...routeProps} />}
          />
        </Router>
      </div>
    );
  }
}

export default App;
