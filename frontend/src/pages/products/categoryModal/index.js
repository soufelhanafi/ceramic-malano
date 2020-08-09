import React from "react"
import { Modal, Form, Input, Button, Spin, Alert } from 'antd';
import { connect } from "react-redux"
import productActions from "../../../redux/products/actions"
import styles from "./styles.module.scss"


class CategoryModal extends React.Component {

  handleCancel = e =>{
    e.preventDefault()
    this.props.dispatch({
      type:productActions.SET_STATE,
      payload: {showAddCategoryModal: false}
    })
  }

  handleSubmit = e=>{
    e.preventDefault()
    const { form, dispatch } = this.props
    form.validateFields((error, values) => {
      if(!error){
        dispatch({
          type: productActions.ADD_CATEGORY,
          payload: {newCat:{...values}}
        })
      }
    })
  }
  render(){
    const { showAddCategoryModal} = this.props
    const { getFieldDecorator } = this.props.form;
    const {loading, showErrorMessage, message} = this.props
    return (
      <Modal
        title="Ajouter une catégorie"
        visible={showAddCategoryModal}
        width={700}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={null}
        destroyOnClose={true}
      >
        <Spin spinning={loading} tip="Loading...">
        {showErrorMessage&&<Alert message={message} type="error" banner />}
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item label="Nom de la catégorie">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Nom de la catégorie Obligatoire!' }],
              })(
                <Input
                />,
              )}
            </Form.Item>
            <Form.Item label="Déscription">
              {getFieldDecorator('description', {
              })(
                <Input.TextArea rows={4} />,
              )}
            </Form.Item>
            <div className={styles.footer}>
              <div>
                <Button type="primary" htmlType="submit">
                  Valider
                </Button>
              </div>
              <div>
                <Button onClick={this.handleCancel}>Annuler</Button>
              </div>
            </div>
          </Form>
        </Spin>
      </Modal>
    )
  }
}

const mapStateToProps = state=>{
  return state.products
}

const WrappedCategoryModalForm = Form.create({ name: 'add_category_modal' })(CategoryModal);

export default connect(mapStateToProps)(WrappedCategoryModalForm)
