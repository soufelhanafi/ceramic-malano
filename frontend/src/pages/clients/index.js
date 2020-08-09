import React from "react"
import { connect } from "react-redux"
import { Spin, Row } from "antd"
import ClientsList from "./clientsList"
import TopComponent from "./topComponent"
import clientActions from "../../redux/clients/actions"
import styles from "./styles.module.scss"
import ClientModal from "./clientModal"
import EditClientModal from "./editClientModal"
import DeleteClient from "./deleteModal"

class Clients extends React.Component {

  componentDidMount(){
    const {size, page, sort, order} = this.props
    this.props.dispatch({
      type: clientActions.LOAD_CLIENTS,
      payload:{size, page, sort, order}
    })
  }

  render(){
    const {loading} = this.props
    return(
      <Spin spinning={loading}>
        <Row className={styles.clientsMainComponent}>
          <TopComponent />
          <ClientsList />
        </Row>
        <ClientModal/>
        <EditClientModal />
        <DeleteClient />
      </Spin>
    )
  }
}

const mapStateToProps = state=>{
  return state.clients
}

export default connect(mapStateToProps)(Clients)
