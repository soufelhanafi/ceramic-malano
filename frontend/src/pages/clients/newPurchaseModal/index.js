import React from "react"
import { Modal, Form, Icon, Input, Button, Spin, Alert } from 'antd';
import { connect } from "react-redux"
import clientActions from "../../../redux/clients/actions"
import { IdcardOutlined, PhoneOutlined } from '@ant-design/icons';
import styles from "./styles.module.scss"


class ClientModal extends React.Component {

  handleCancel = e =>{
    e.preventDefault()
    this.props.dispatch({
      type:clientActions.SET_STATE,
      payload: {showAddModal: false}
    })
  }

  handleSubmit = e=>{
    e.preventDefault()
    const { form, dispatch } = this.props
    form.validateFields((error, values) => {
      if(!error){
        dispatch({
          type: clientActions.ADD_NEW_CLIENT,
          payload: {newClient:{...values}}
        })
      }
    })
  }
  render(){
    const { showAddModal} = this.props
    const { getFieldDecorator } = this.props.form;
    const {loading, showErrorMessage, message} = this.props
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
        <Spin spinning={loading} tip="Loading...">
        {showErrorMessage && <Alert message={message} type="error" banner />}
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item label="Nom complet">
              {getFieldDecorator('fullName', {
                rules: [{ required: true, message: 'Nom complet Obligatoire!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                />,
              )}
            </Form.Item>
            <Form.Item label="Email">
              {getFieldDecorator('email', {
                rules: [
                  { required: true, message: 'Email Obligatoire!' },
                  {
                    type: 'email',
                    message: "Cette adresse email n'est pas valide",
                  },
                ],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                />,
              )}
            </Form.Item>
            <Form.Item label="CINE">
              {getFieldDecorator('cine', {
                rules: [{ required: true, message: 'CINE Obligatoire!' }],
              })(
                <Input
                  prefix={<IdcardOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                />,
              )}
            </Form.Item>
            <Form.Item label="Téléphone">
              {getFieldDecorator('tele', {
                rules: [
                    { required: true, message: 'Téléphone Obligatoire!' },
                    {
                      pattern:/^(?:(?:\+|00)212|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
                      message: "Ce numéro de téléphone n'est pas valide",
                    }
                  ],
              })(
                <Input
                  prefix={<PhoneOutlined type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                />,
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
  return state.clients
}

const WrappedClientModalForm = Form.create({ name: 'add_client_modal' })(ClientModal);

export default connect(mapStateToProps)(WrappedClientModalForm)
