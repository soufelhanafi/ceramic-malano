import React from "react"
import { connect } from "react-redux"
import { Spin, Row } from "antd"
import PurchasesList from "./purchasesList"
import TopComponent from "./topComponent"
import purchaseActions from "../../redux/purchase/actions"
import styles from "./styles.module.scss"
import PurchaseModal from "./purchaseModal"
// import EditPurchaseModal from "./editPurchaseModal"
// import DeletePurchase from "./deleteModal"

class Purchases extends React.Component {

  componentDidMount(){
    const {size, page, sort, order} = this.props
    this.props.dispatch({
      type: purchaseActions.LOAD_PURCHASES,
      payload:{size, page, sort, order}
    })
  }

  render(){
    const {loading} = this.props
    return(
      <Spin spinning={loading}>
        <Row className={styles.purchasesMainComponent}>
          <TopComponent />
          <PurchasesList />
        </Row>

          <PurchaseModal/>
          {/*<EditPurchaseModal />
          <DeletePurchase />
          */}
      </Spin>
    )
  }
}

const mapStateToProps = state=>{
  return state.purchases
}

export default connect(mapStateToProps)(Purchases)
