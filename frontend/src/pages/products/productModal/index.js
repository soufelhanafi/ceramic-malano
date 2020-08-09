import React from "react"
import { Modal, Form, Input, Button, Spin, Alert,Row, Col, Select } from 'antd';
import NumberFormat from 'react-number-format'
import { connect } from "react-redux"
import productActions from "../../../redux/products/actions"
import styles from "./styles.module.scss"


class ProductModal extends React.Component {
  state = {
    amountError: false,
    quantityError: false
  }

  handleCancel = e =>{
    e.preventDefault()
    this.props.dispatch({
      type:productActions.SET_STATE,
      payload: {showAddModal: false}
    })
  }

  handleSubmit = e=>{
    e.preventDefault()
    const { form, dispatch } = this.props
    form.validateFields((error, values) => {
      if(!error){
        if(!this.state.price){
          this.setState({ amountError: true })
          return
        }
        if(!this.state.quantity){
          this.setState({ quantityError: true })
          return
        }
        dispatch({
          type: productActions.ADD_NEW_PRODUCT,
          payload: {newProduct:{...values, unitPrice: this.state.price, quantity: this.state.quantity}}
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
    const { showAddModal, categories, loadingInModal, showErrorMessage, message} = this.props
    const { getFieldDecorator } = this.props.form;

    return (
      <Modal
        title="Basic Modal"
        visible={showAddModal}
        width={700}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={null}
        destroyOnClose={true}
      >
        <Spin spinning={loadingInModal} tip="Loading...">
        {showErrorMessage&&<Alert message={message} type="error" banner />}
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item label="Le nom du produit">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Le nom du produit Obligatoire.' }],
              })(
                <Input/>,
              )}
            </Form.Item>
            <Form.Item label="La marque">
              {getFieldDecorator('mark', {
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
                {rules: [{ required: true, message: 'La Catégorie du produit est obligatoire' }],},
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
                  className={`amount_container  ${this.state.amountError &&
                    'amount_container_error'}`}
                >
                  <label className={`amount_label amount_label_required`}>Prix d'unité</label>
                  <NumberFormat
                    placeholder="0,00 dhs"
                    className={
                      'react-number-format ' +
                      (this.state.amountError && 'react-number-format_error')
                    }
                    decimalSeparator=","
                    decimalScale={2}
                    fixedDecimalScale={2}
                    thousandSeparator={' '}
                    suffix={' €'}
                    onValueChange={e => this.onValueChange(e)}
                  />
                  {this.state.amountError && (
                    <span className={'amount_error'}>Champs obligatoire !</span>
                  )}
                </Col>
                <Col
                  xs={24}
                  sm={24}
                  lg={10}
                  className={`amount_container  ${this.state.quantityError &&
                    'amount_container_error'}`}
                >
                  <label className={`amount_label amount_label_required`}>Quantité d'unité</label>
                  <NumberFormat
                    className={
                      'react-number-format ' +
                      (this.state.quantityError && 'react-number-format_error')
                    }
                    placeholder="0"
                    thousandSeparator={' '}
                    onValueChange={e => this.onQuantityChage(e)}
                  />
                  {this.state.quantityError && (
                    <span className={'amount_error'}>Champs obligatoire !</span>
                  )}
                </Col>
            </Row>
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

const WrappedProductModalForm = Form.create({ name: 'add_product_modal' })(ProductModal);

export default connect(mapStateToProps)(WrappedProductModalForm)
