import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

class NavBar extends Component {
  render() {
    const username = this.props.username;
    const realName = this.props.realName;
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
        <Link className="navbar-brand" to="/">
          Decemia
        </Link>

        <div className="collapse navbar-collapse" id="navbarsExampleDefault">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to={`/kingdom/${username}`}>
                Your Kingdom
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/animals">
                Animals
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/territories">
                Territories
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/others">
                Other Kingdoms
              </Link>
            </li>
          </ul>
        </div>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/me">
              {realName}
            </Link>
          </li>
        </ul>
        <button
          className="btn btn-primary"
          onClick={this.props.signOut.bind(this)}
        >
          Sign out
        </button>
      </nav>
    );
  }
}

export default NavBar;
