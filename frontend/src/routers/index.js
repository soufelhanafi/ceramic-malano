import React from "react"
import {HashRouter, Switch} from "react-router-dom"
import PrivateRouter from "./privateRoutes"
import PublicRouter from "./publicRoutes"
import { connect } from "react-redux"
import ContentLoader from 'react-content-loader'
import {Row, Col} from "antd"

class AppRouter extends React.Component {

  render(){
    const {authorized, loadingCurrentUser} = this.props
    if(loadingCurrentUser){
      return (
        <Row justify="center" align="middle">
          <Col span={6} />
          <Col span={12} style={{marginTop:100}}>
            <ContentLoader viewBox="0 0 380 70">
              {/* Only SVG shapes */}
              <rect x="80" y="20" rx="4" ry="4" width="300" height="13" />
              <rect x="80" y="40" rx="3" ry="4" width="300" height="13" />
              <rect x="80" y="60" rx="4" ry="4" width="300" height="13" />
            </ContentLoader>
            <ContentLoader viewBox="0 0 380 70">
              {/* Only SVG shapes */}
              <rect x="80" y="20" rx="4" ry="4" width="300" height="13" />
              <rect x="80" y="40" rx="3" ry="4" width="300" height="13" />
              <rect x="80" y="60" rx="4" ry="4" width="300" height="13" />
            </ContentLoader>
          </Col>
        </Row>
      )

    }
    return (
      <HashRouter>
        <Switch>
          {authorized?<PrivateRouter />:<PublicRouter />}
        </Switch>
      </HashRouter>
    )
  }
}

const mapStateToProps = state=>{
  return state.users
}
export default connect(mapStateToProps)(AppRouter)
