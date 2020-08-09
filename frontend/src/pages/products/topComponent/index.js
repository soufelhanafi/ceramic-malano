import React from "react"
import { connect } from "react-redux"
import { Row, Col, Button, Input } from "antd"
import productActions from "../../../redux/products/actions"
import styles from "./styles.module.scss"

const { Search } = Input;

class TopComponent extends React.Component {

  showAddModal = e =>{
    e.preventDefault()
    this.props.dispatch({
      type: productActions.SET_STATE,
      payload:{showAddModal: true}
    })
  }

  showAddCategoryModal = e =>{
    e.preventDefault()
    this.props.dispatch({
      type: productActions.SET_STATE,
      payload:{showAddCategoryModal: true}
    })
  }

  onSearch = (value)=>{
    const {size, page, sort, order} = this.props
    this.props.dispatch({
      type: productActions.LOAD_PRODUCTS,
      payload:{size, page, sort, order, search:value}
    })
  }

  onChange = e =>{
    const value = e.target.value
    if(!value){
      const {size, page, sort, order} = this.props
      this.props.dispatch({
        type: productActions.LOAD_PRODUCTS,
        payload:{size, page, sort, order}
      })
    }
  }

  render(){
    return(
        <Row justify="space-between" align="top" className={styles.topComponentContainer}>
          <Col md={12}>
            <Button onClick={this.showAddModal} type="primary" style={{marginRight:10}}>Ajouter un Produit</Button>
            <Button onClick={this.showAddCategoryModal} type="primary">Ajouter une Catégorie</Button>
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
  return state.products
}

export default connect(mapStateToProps)(TopComponent)
