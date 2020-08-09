import React from "react"
import {Modal, Button, Alert, Spin} from "antd"
import {connect} from "react-redux"
import clientActions from "../../../redux/clients/actions"
import styles from "./styles.module.scss"

class DeleteClient extends React.Component {
  handleCancel = e =>{
    e.preventDefault()
    this.props.dispatch({
      type:clientActions.SET_STATE,
      payload: {showDeleteModal: false, clientToDelete: {}}
    })
  }

  handleSubmit=e=>{
    e.preventDefault()
    this.props.dispatch({
      type: clientActions.DELETE_CLIENT,
    })
  }
  render(){
    const {loadingInModal, showDeleteModal, clientToDelete} = this.props
    
    let message = `Voulez vous vraiment supprimer le clinet ${clientToDelete.fullName}.`
    message = clientToDelete.totalToPay > 0 ? message +` Il a encore une dette de ${clientToDelete.totalToPay}dhs à payer`:message+""
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
  return state.clients
}


export default connect(mapStateToProps)(DeleteClient)
