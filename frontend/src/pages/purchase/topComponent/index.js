import React from "react"
import { connect } from "react-redux"
import { Row, Col, Input } from "antd"
import {Link} from "react-router-dom"
import purchaseActions from "../../../redux/purchase/actions"
import styles from "./styles.module.scss"

const { Search } = Input;

class TopComponent extends React.Component {

  showAddModal = e =>{
    e.preventDefault()
    this.props.dispatch({
      type: purchaseActions.SET_STATE,
      payload:{showAddModal: true}
    })
  }

  onSearch = (value)=>{
    const {size, page, sort, order} = this.props
    this.props.dispatch({
      type: purchaseActions.LOAD_PURCHASES,
      payload:{size, page, sort, order, search:value}
    })
  }

  render(){
    return(
        <Row justify="space-between" align="top" className={styles.topComponentContainer}>
          <Col md={12}>
            <Link to={"/purchases/create-purchase"} type="primary">Ajouter un achat</Link>
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
  return state.purchases
}

export default connect(mapStateToProps)(TopComponent)
