import React from "react"
import { connect } from "react-redux"
import { Spin, Row } from "antd"
import ProductsList from "./productsList"
import TopComponent from "./topComponent"
import productActions from "../../redux/products/actions"
import styles from "./styles.module.scss"
import ProductModal from "./productModal"
import EditProductModal from "./editProductModal"
import DeleteProduct from "./deleteModal"
import CategoryModal from "./categoryModal"

class Products extends React.Component {

  componentDidMount(){
    const {size, page, sort, order} = this.props
    this.props.dispatch({
      type: productActions.LOAD_PRODUCTS,
      payload:{size, page, sort, order}
    })
    this.props.dispatch({
      type: productActions.LOAD_CATEGORIES,
    })
  }

  render(){
    const {loading, showEditModal} = this.props
    return(
      <Spin spinning={loading}>
        <Row className={styles.clientsMainComponent}>
          <TopComponent />
          <ProductsList />
        </Row>
        <ProductModal/>
        {showEditModal && <EditProductModal />}
        <DeleteProduct />
        <CategoryModal />
      </Spin>
    )
  }
}

const mapStateToProps = state=>{

  return state.products
}

export default connect(mapStateToProps)(Products)
