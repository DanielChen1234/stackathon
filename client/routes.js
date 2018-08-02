import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import {HomePage} from './components'

/**
 * COMPONENT
 */
class Routes extends Component {

  render() {
    return (
      <Switch>
        <Route path="/" component={HomePage} />
      </Switch>
    )
  }
}
// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default Routes
