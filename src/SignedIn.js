import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { UserSession } from 'blockstack'
import EditMe from './EditMe'
import Kingdom from './Kingdom'
import NavBar from './NavBar'
import OptionsList from './OptionsList'
import OtherKingdoms from './OtherKingdoms'
import { appConfig, ME_FILENAME } from './constants'
import './SignedIn.css'
import fs from 'fs'
import FileInput from './FileReader'


class SignedIn extends Component {

  constructor(props) {
    super(props)
    this.userSession = new UserSession({ appConfig })
    this.state = {
      me: {},
      savingMe: false,
      savingKingdown: false,
      redirectToMe: false
    }

    this.loadMe = this.loadMe.bind(this)
    this.saveMe = this.saveMe.bind(this)
    this.signOut = this.signOut.bind(this)
  }

  componentWillMount() {
    this.loadMe()
  }

  loadMe() {

    const options = { decrypt: false }
    this.userSession.getFile(ME_FILENAME, options)
    .then((content) => {
      if(content) {
        const me = JSON.parse(content)
        this.setState({me, redirectToMe: false})
      } else {
        const me = null

        this.setState({me, redirectToMe: true})
      }
    })

    this.userSession.getFile("HELLO", options)
      .then((content) => {
       console.log(content)
      })

  }

  saveMe(me) {
    this.setState({me, savingMe: true})
    const options = { encrypt: false }
    this.userSession.putFile(ME_FILENAME, JSON.stringify(me), options)
    .finally(() => {
      this.setState({savingMe: false})
    })
    var test = "Hello"

    this.userSession.putFile("HELLO", test, options)
      .finally(() => {
        console.log("Done");
      })

  }

  signOut(e) {
    e.preventDefault()
    this.userSession.signUserOut()
    window.location = '/'
  }

  render() {
    console.log(this.userSession.loadUserData().profile.name)
    const realName = this.userSession.loadUserData().profile.name
    const username = this.userSession.loadUserData().username
    const me = this.state.me
    const redirectToMe = this.state.redirectToMe
    if(redirectToMe) {
      // User hasn't configured her animal
      if(window.location.pathname !== '/me') {
        return (
          <Redirect to="/me" />
        )
      }
    }

    if(window.location.pathname === '/') {
      return (
        <Redirect to={`/kingdom/${username}`} />
      )
    }


    return (
      <div className="SignedIn">
      <NavBar username={username} realName={realName} signOut={this.signOut}/>
      <Switch>
              <Route
                path='/animals'
                render={
                  routeProps => <OptionsList
                  type="animals"
                  {...routeProps} />
                }
              />
              <Route
                path='/territories'
                render={
                  routeProps => <OptionsList
                  type="territories"
                  {...routeProps} />
                }
              />
              <Route
                path='/others'
                render={
                  routeProps => <OtherKingdoms
                  type="territories"
                  {...routeProps} />
                }
              />
              <Route
                path='/me'
                render={
                  routeProps => <EditMe
                  me={me}
                  saveMe={this.saveMe}
                  username={username}
                  {...routeProps} />
                }
              />
              <Route
                path={`/kingdom/${username}`}
                render={
                  routeProps => <Kingdom
                  myKingdom={true}
                  protocol={window.location.protocol}
                  ruler={username}
                  currentUsername={username}
                  realm={window.location.origin.split('//')[1]}
                  {...routeProps} />
                }
              />
              <Route
                path='/kingdom/:protocol/:realm/:ruler'
                render={
                  routeProps => <Kingdom
                  myKingdom={false}
                  protocol={routeProps.match.params.protocol}
                  realm={routeProps.match.params.realm}
                  ruler={routeProps.match.params.ruler}
                  currentUsername={username}
                  {...routeProps} />
                }
              />
      </Switch>
        <FileInput/>
      </div>
    );
  }
}

export default SignedIn
