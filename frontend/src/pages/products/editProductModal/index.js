import React from "react"
import { Modal, Form, Select, Input, Button, Spin, Alert, Row, Col,InputNumber } from 'antd';
import { connect } from "react-redux"
import productActions from "../../../redux/products/actions"
import styles from "./styles.module.scss"


class EditClientModal extends React.Component {

  state = {
    price: this.props.productToEdit.price
  }

  handleCancel = e =>{
    e.preventDefault()
    this.props.dispatch({
      type:productActions.SET_STATE,
      payload: {showEditModal: false, productToEdit:{}}
    })
  }

  handleSubmit = e=>{
    e.preventDefault()
    const { form, dispatch,productToEdit } = this.props
    form.validateFields((error, values) => {
      if(!error){
        dispatch({
          type: productActions.UPDATE_PRODUCT,
          payload: {productToEdit: {...productToEdit, ...values}}
        })
      }
    })
  }
  onValueChange = input => {
    if (input.floatValue) {
      this.setState({ price: input.floatValue, amountError: false })
      return
    }
    this.setState({ amount: false, amountError: true })
  }

  onQuantityChage = input =>{
    if (input.floatValue) {
      this.setState({ quantity: input.floatValue, quantityError: false })
      return
    }
    this.setState({ quantity: false, quantityError: true })
  }
  render(){
    const { showEditModal, productToEdit, loading, showErrorMessage, message, categories} = this.props
    const { getFieldDecorator } = this.props.form;
    console.log("productToEditproductToEditproductToEdit");
    return (
      <Modal
        title="Basic Modal"
        visible={showEditModal}
        width={700}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={null}
        destroyOnClose={true}
      >
        <Spin spinning={loading} tip="Loading...">
        {showErrorMessage&&<Alert message={message} type="error" banner />}
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item label="Le nom du produit">
              {getFieldDecorator('name', {
                initialValue:productToEdit.name,
                rules: [{ required: true, message: 'Le nom du produit Obligatoire.' }],
              })(
                <Input/>,
              )}
            </Form.Item>
            <Form.Item label="La marque">
              {getFieldDecorator('mark', {
                initialValue:productToEdit.mark,
                rules: [
                  { required: true, message: 'La marque Obligatoire!' },
                ],
              })(
                <Input />,
              )}
            </Form.Item>
            <Form.Item label="Catégorie">
              {getFieldDecorator(
                'catId',
                {
                  initialValue:productToEdit.catId,
                  rules: [{ required: true, message: 'La Catégorie du produit est obligatoire' }],},
              )(
                <Select
                  showSearch
                  filterOption={(input, option) => {
                    return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }}
                  onSelect={v=>console.log(v)}
                >
                  {categories.map(item => {
                    return (
                      <Select.Option key={item.id} value={item.id}>
                        {item.name}
                      </Select.Option>
                    )
                  })}
                </Select>,
              )}
            </Form.Item>
            <Row type="flex" justify="space-between" align="middle">
                <Col
                  xs={24}
                  sm={24}
                  lg={10}
                >
                  <Form.Item label="Prix d'unité">
                    {getFieldDecorator('unitPrice', {
                      initialValue:productToEdit.unitPrice,
                      rules: [
                        { required: true, message: 'Prix d\'unité Obligatoire!' },
                      ],
                    })(
                      <InputNumber min={0} />,
                    )}
                  </Form.Item>
                </Col>
                <Col
                  xs={24}
                  sm={24}
                  lg={10}
                >
                  <Form.Item label="Quantité">
                    {getFieldDecorator('quantity', {
                      initialValue:productToEdit.quantity,
                      rules: [
                        { required: true, message: 'Quantité Obligatoire!' },
                      ],
                    })(
                      <InputNumber min={0} />,
                    )}
                  </Form.Item>
                </Col>
            </Row>
            <Form.Item label="Déscription">
              {getFieldDecorator('description', {
                initialValue:productToEdit.description,
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

const WrappedClientModalForm = Form.create({ name: 'edit_product_modal' })(EditClientModal);

export default connect(mapStateToProps)(WrappedClientModalForm)
