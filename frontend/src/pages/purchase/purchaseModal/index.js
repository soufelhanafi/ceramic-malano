import React from "react"
import { Modal} from 'antd';
import { connect } from "react-redux"
import purchaseActions from "../../../redux/purchase/actions"
import clientsActions from "../../../redux/clients/actions"
import productActions from "../../../redux/products/actions"
import PurchaseModalForm from "./purchaseForm"

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

  handleCancel = e =>{
    e.preventDefault()
    this.props.dispatch({
      type:purchaseActions.SET_STATE,
      payload: {showAddModal: false}
    })
  }

  handleSubmit = e=>{
    e.preventDefault()
    const { form, dispatch } = this.props
    form.validateFields((error, values) => {
      if(!error){
        const {client, product} = this.state
        const newPurchase = {
          productId: product.id,
          productName: product.name,
          clientId: client.id,
          clientName: client.fullName,
        }
        dispatch({
          type: purchaseActions.ADD_NEW_PURCHASE,
          payload: {newPurchase:{...values,...newPurchase}}
        })
      }
    })
  }

  searchForClients = search=>{
    const {size, page, sort, order} = this.props.clients
    this.props.dispatch({
      type: clientsActions.LOAD_CLIENTS,
      payload:{size, page, sort, order, search}
    })
  }

  handleSearch = search => {
    const {size, page, sort, order} = this.props.clients
    this.props.dispatch({
      type: clientsActions.LOAD_CLIENTS,
      payload:{size, page, sort, order, search}
    })
  };

  onSelect = id => {
    const {clients} = this.props.clients
    for(let i = 0; i<clients.length; i++){
      if(clients[i].id === id){
        this.setState({client:clients[i]})
        this.props.form.setFieldsValue({cine:clients[i].cine})
      }
    }
  }

  handleSearchP = search => {
    const {size, page, sort, order} = this.props.products
    this.props.dispatch({
      type: productActions.LOAD_PRODUCTS,
      payload:{size, page, sort, order, search}
    })
  };

  onSelectP = id => {
    const {products} = this.props.products
    for(let i = 0; i<products.length; i++){
      if(products[i].id === id){
        this.setState({product:products[i]})
        this.props.form.setFieldsValue({unitPrice: products[i].unitPrice})
      }
    }
  }

  calculePurchase = num =>{
    const unitPrice = this.props.form.getFieldValue("unitPrice")
    if(unitPrice){
      const totalPrice = num * unitPrice
      this.props.form.setFieldsValue({totalPrice,totalPaid:totalPrice,remainingAmount:0})
    }
  }

  changeUnitPrice = up => {
    const totalPrice = this.props.form.getFieldValue("totalPrice")
    const numberOfUnity = this.props.form.getFieldValue("numberOfUnity")
    if(totalPrice>=0 && numberOfUnity>=0){
      const total = up * numberOfUnity
      this.props.form.setFieldsValue({totalPrice:total,totalPaid:total,remainingAmount:0})
    }
  }

  calculRemainingAmout = amount =>{
    debugger
    const remainingAmount = this.props.form.getFieldValue("totalPrice") - amount
    this.props.form.setFieldsValue({remainingAmount})
  }

  render(){
    const {showAddModal} = this.props.purchases
    return (
      <Modal
        title="Ajout un achat"
        visible={showAddModal}
        width={700}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={null}
        destroyOnClose={true}
      >
        <PurchaseModalForm />
      </Modal>
    )
  }
}

const mapStateToProps = state=>{
  return state
}

export default connect(mapStateToProps)(PurchaseModal)
