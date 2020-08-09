import React from "react"
import { connect } from "react-redux"
import { Row, Col, Button, Input } from "antd"
import clientActions from "../../../redux/clients/actions"
import styles from "./styles.module.scss"

const { Search } = Input;

class TopComponent extends React.Component {

  showAddModal = e =>{
    e.preventDefault()
    this.props.dispatch({
      type: clientActions.SET_STATE,
      payload:{showAddModal: true}
    })
  }

  onSearch = (value)=>{
    const {size, page, sort, order} = this.props
    this.props.dispatch({
      type: clientActions.LOAD_CLIENTS,
      payload:{size, page, sort, order, search:value}
    })
  }

  onChange = e =>{
    const value = e.target.value
    if(!value){
      const {size, page, sort, order} = this.props
      this.props.dispatch({
        type: clientActions.LOAD_CLIENTS,
        payload:{size, page, sort, order}
      })
    }
  }

  render(){
    return(
        <Row justify="space-between" align="top" className={styles.topComponentContainer}>
          <Col md={12}>
            <Button onClick={this.showAddModal} type="primary">Ajouter un client</Button>
          </Col>
          <Col md={12}>
            <Search
              className={styles.searchInput}
              placeholder="Chercher"
              onSearch={value => this.onSearch(value)}
              onChange={this.onChange}
            />
          </Col>
        </Row>
    )
  }
}

const mapStateToProps = state=>{
  return state.clients
}

export default connect(mapStateToProps)(TopComponent)
