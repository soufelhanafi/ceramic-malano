import React from "react"
import { Modal, Form, Icon, Input, Button, Spin, Alert, Select, Row, Col, InputNumber } from 'antd';
import { connect } from "react-redux"
import purchaseActions from "../../../../redux/purchase/actions"
import clientsActions from "../../../../redux/clients/actions"
import productActions from "../../../../redux/products/actions"
import { IdcardOutlined} from '@ant-design/icons';
import styles from "./styles.module.scss"

const { Option } = Select;
let id = 1;
class PurchaseModalForm extends React.Component {
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
        let purchaseItems  = []
        const {product,totalProductPrice,numberOfUnity,unitPrice} = values
        for(let i = 0; i < product.length;i++){
          if(product[i]){
            purchaseItems.push({totalPrice:totalProductPrice[i], productId:product[i],numberOfUnity:numberOfUnity[i],unitPrice:unitPrice[i]})
          }
        }
        dispatch({
          type: purchaseActions.ADD_NEW_PURCHASE,
          payload: {
            newPurchase:{
              totalToPay:values.totalPrice,
              restToPay:values.remainingAmount,
              totalPaid:values.totalPaid,
              reference:values.reference,
              clientId:values.client,
              cine:values.cine,
              purchaseItems,
            }
          }
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

  onSelectP = (id,key) => {
    const {products} = this.props.products
    for(let i = 0; i<products.length; i++){
      if(products[i].id === id){
        this.setState({product:products[i]})
        this.props.form.setFieldsValue({[`unitPrice[${key}]`]: products[i].unitPrice})
      }
    }
  }

  calculePurchase = (k,e) =>{
    const num = parseFloat(e.target.value)
    const unitPrice = this.props.form.getFieldValue(`unitPrice[${k}]`)
    let totalPrice = this.props.form.getFieldValue(`totalPrice`)
    const totalProductPrice = this.props.form.getFieldValue(`totalProductPrice[${k}]`)
    if(unitPrice){
      totalPrice += num * unitPrice - totalProductPrice
      this.props.form.setFieldsValue({totalPrice,totalPaid:totalPrice,remainingAmount:0,[`totalProductPrice[${k}]`]:num * unitPrice})
    }
  }

  changeUnitPrice = (k,e) => {
    const num = parseFloat(e.target.value)
    let totalPrice = this.props.form.getFieldValue("totalPrice")
    const numberOfUnity = this.props.form.getFieldValue(`numberOfUnity[${k}]`)
    const totalProductPrice = this.props.form.getFieldValue(`totalProductPrice[${k}]`)
    debugger
    if(totalPrice>=0 && numberOfUnity>=0){
      totalPrice += num * numberOfUnity - totalProductPrice
      this.props.form.setFieldsValue({totalPrice,totalPaid:totalPrice,remainingAmount:0, [`totalProductPrice[${k}]`]:num * numberOfUnity})
    }
  }

  onChangeTotalPrice = (totalPrice)=>{
    this.props.form.setFieldsValue({totalPrice,totalPaid:totalPrice,remainingAmount:0})
  }

  onChangePaidAmount = (totalPaid) =>{
    let totalPrice = this.props.form.getFieldValue("totalPrice")
    this.props.form.setFieldsValue({totalPaid:totalPaid,remainingAmount:totalPrice-totalPaid})
  }

  remove = k => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
    const unitPrice = this.props.form.getFieldValue(`unitPrice[${k}]`)
    let totalPrice = this.props.form.getFieldValue(`totalPrice`)
    const num = this.props.form.getFieldValue(`numberOfUnity[${k}]`)
    debugger
    if(unitPrice){
      totalPrice -= num * unitPrice
      this.props.form.setFieldsValue({totalPrice,totalPaid:totalPrice,remainingAmount:0})
    }
  };

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(id++);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  };


  render(){
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const {loading, showErrorMessage, message} = this.props.purchases
    const { clients } = this.props.clients
    const { products } = this.props.products
    const options = clients.map((d,index) => <Option key={index} value={d.id}>{d.fullName}</Option>);
    const optionsP = products.map((d,index) => <Option key={index} value={d.id}>{d.name} ({d.quantity})</Option>);

    // made the dynamic Form
    getFieldDecorator('keys', { initialValue: [0] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => (
      <Row type="flex" justify="space-between" >
        <Col md={5}>
          <Form.Item label="Produit">
            {getFieldDecorator(
              `product[${k}]`,
              {rules:[
                { required: true, message: "Produit obligatoire" },
              ]},
            )(
              <Select
                showSearch
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                onSearch={this.handleSearchP}
                onSelect={(id)=>this.onSelectP(id, k)}
                notFoundContent={null}
              >
                {optionsP}
              </Select>,
            )}
          </Form.Item>
        </Col>
        <Col md={5}>
          <Form.Item label="Prix d'unité">
            {getFieldDecorator(`unitPrice[${k}]`, {
              rules: [{ required: true, message: 'Prix d\'unité Obligatoire!' }],
            })(
              <InputNumber onBlur={up=>this.changeUnitPrice(k,up)} />,
            )}
          </Form.Item>
        </Col>
        <Col md={5}>
          <Form.Item label="Nombre d'unité">
            {getFieldDecorator(
              `numberOfUnity[${k}]`,
              {
                initialValue:0,
                rules:[
                { required: true, message: "Nombre d'unité obligatoire" },
              ]},
            )(
              <InputNumber onBlur={e=>this.calculePurchase(k, e)} min={0} />,
            )}
          </Form.Item>
        </Col>
        <Col md={5}>
          <Form.Item label="Somme">
            {getFieldDecorator(`totalProductPrice[${k}]`, {
              initialValue:0,
              rules: [{ required: true, message: 'Prix d\'unité Obligatoire!' }],
            })(
              <InputNumber />,
            )}
          </Form.Item>
        </Col>
        <Col md={2}>
          {keys.length > 1 ? (
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              onClick={() => this.remove(k)}
            />
          ) : null}
        </Col>
      </Row>
    ));
    return (
        <Spin spinning={loading} tip="Loading...">
        {showErrorMessage&&<Alert message={message} type="error" banner />}
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Row type="flex" justify="space-between">
              <Col md={12}>
                <Form.Item label="Référence">
                  {getFieldDecorator('reference', {
                    rules: [{ required: true, message: 'Référence Obligatoire!' }],
                  })(
                    <Input />,
                  )}
                </Form.Item>
              </Col>
            </Row>
            <h3>Informations sur le client!</h3>
            <Row type="flex" justify="space-between" >
              <Col span={11}>
                <Form.Item label="Client">
                  {getFieldDecorator(
                    'client',
                    {rules:[
                      { required: true, message: "Client obligatoire" },
                    ]},
                  )(
                    <Select
                      showSearch
                      defaultActiveFirstOption={false}
                      showArrow={false}
                      filterOption={false}
                      onSearch={this.handleSearch}
                      onSelect={this.onSelect}
                      notFoundContent={null}
                    >
                      {options}
                    </Select>,
                  )}
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item label="CINE">
                  {getFieldDecorator('cine', {
                    rules: [{ required: true, message: 'CINE Obligatoire!' }],
                  })(
                    <Input
                      disabled
                      prefix={<IdcardOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    />,
                  )}
                </Form.Item>
              </Col>
            </Row>
            <h3>La liste des produit!</h3>
            {formItems}
            <Row  type="flex" justify="space-between" >
              <Col md={8}>
                <Form.Item>
                  <Button type="primary" onClick={this.add} style={{ width: '60%' }}>
                    <Icon type="plus" /> Ajouter un produit
                  </Button>
                </Form.Item>
              </Col>
            </Row>

            <Row type="flex" justify="space-between" >
              <Col md={5}>
                <Form.Item label="Somme total">
                  {getFieldDecorator(
                    'totalPrice',
                    {
                      initialValue:0,
                      rules:[
                      { required: true, message: "Montant Total obligatoire" },
                    ]},
                  )(
                    <InputNumber min={0} onChange={am=>this.onChangeTotalPrice(am)}  />,
                  )}
                </Form.Item>
              </Col>
              <Col md={5}>
                <Form.Item label="Montant payé">
                  {getFieldDecorator(
                    'totalPaid',
                    {
                      initialValue:0,
                      rules:[
                      { required: true, message: "Montant payé obligatoire" },
                    ]},
                  )(
                    <InputNumber min={0} onChange={am=>this.onChangePaidAmount(am)}  />,
                  )}
                </Form.Item>
              </Col>
              <Col md={5}>
                <Form.Item label="Montant Restant">
                  {getFieldDecorator('remainingAmount', {
                    initialValue:0,
                  })(
                    <InputNumber min={0} disabled/>,
                  )}
                </Form.Item>
              </Col>
            </Row>

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
    )
  }
}

const mapStateToProps = state=>{
  return state
}

const WrappedPurchaseModalForm = Form.create({ name: 'add_purchse_modal' })(PurchaseModalForm);

export default connect(mapStateToProps)(WrappedPurchaseModalForm)
