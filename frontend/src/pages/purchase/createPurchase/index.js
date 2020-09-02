import React from "react"
import { connect } from "react-redux"
import productActions from "../../../redux/products/actions"
import PurchaseModalForm from "./purchaseForm"
import styles from "./styles.module.scss"

class PurchaseModal extends React.Component {
  state = {
    client:{}
  }

  componentDidMount(){
    const {size, page, sort, order} = this.props.products
    this.props.dispatch({
      type: productActions.LOAD_PRODUCTS,
      payload:{size, page, sort, order}
    })
  }
  render(){
    return (
      <div className={styles.createPurchaseComponent}>
        <PurchaseModalForm />
      </div>
    )
  }
}

const mapStateToProps = state=>{
  return state
}

export default connect(mapStateToProps)(PurchaseModal)
