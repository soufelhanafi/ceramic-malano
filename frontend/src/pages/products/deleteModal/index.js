import React from "react"
import {Modal, Button, Alert, Spin} from "antd"
import {connect} from "react-redux"
import productActions from "../../../redux/products/actions"
import styles from "./styles.module.scss"

class DeleteProduct extends React.Component {
  handleCancel = e =>{
    e.preventDefault()
    this.props.dispatch({
      type:productActions.SET_STATE,
      payload: {showDeleteModal: false, productToDelete: {}}
    })
  }

  handleSubmit=e=>{
    e.preventDefault()
    this.props.dispatch({
      type: productActions.DELETE_PRODUCT,
    })
  }
  render(){
    const {loadingInModal, showDeleteModal, productToDelete} = this.props

    let message = `Voulez vous vraiment supprimer le produit ${productToDelete.name}.`
    message = productToDelete.quantity > 0 ? message +` Il y a encore ${productToDelete.quantity} unité dans le stock`:message+""
    return(
        <Modal
            title="Delete Client"
            visible={showDeleteModal}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            destroyOnClose={true}
            footer={null}
          >
          <Spin spinning={loadingInModal} >
            <Alert style={{fontSize: 16}} message={message} type="error" banner showIcon={false} />
          <div className={styles.footer}>
            <div>
              <Button type="danger" onClick={this.handleSubmit}>
                Confirmer
              </Button>
            </div>
            <div>
              <Button onClick={this.handleCancel}>Annuler</Button>
            </div>
          </div>
          </Spin>
        </Modal>
    )
  }
}

const mapStateToProps = state=>{
  return state.products
}


export default connect(mapStateToProps)(DeleteProduct)
