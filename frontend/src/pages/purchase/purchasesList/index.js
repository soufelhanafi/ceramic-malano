import React from "react"
import { connect } from "react-redux"
import { Table, Button } from "antd"
import purchaseActions from "../../../redux/purchase/actions"
import styles from "./styles.module.scss"

class PurchasesList extends React.Component {

  columns = [
    {
    title: 'Référence',
    dataIndex: 'reference',
    key: 'reference',
    sorter: true
  },
  {
    title: 'Client',
    dataIndex: 'clientName',
    key: 'clientName',
    sorter: true
  },
  {
    title: 'CINE',
    dataIndex: 'cine',
    key: 'cine',
    sorter: true
  },{
    title: 'Montant Total',
    dataIndex: 'totalToPay',
    key: 'totalToPay',
    sorter: true,
    render: text=>
        (<span>
          {Number(text).toLocaleString('fr-FR', {
              minimumFractionDigits: 2,
            })}
            dhs
        </span>)
  },
  {
    title: 'Reste à payer',
    dataIndex: 'restToPay',
    key: 'restToPay',
    sorter: true,
    render: text=>
        (<span>
          {Number(text).toLocaleString('fr-FR', {
              minimumFractionDigits: 2,
            })}
            dhs
        </span>)
  },
  ]

  showEditModal = (e, record) =>{
    e.preventDefault()
    this.props.dispatch({
      type: purchaseActions.SET_STATE,
      payload: { showEditModal: true, purchaseToEdit:record }
    })
  }

  showDeleteModal = (e, record) =>{
    e.preventDefault()
    this.props.dispatch({
      type: purchaseActions.SET_STATE,
      payload: { showDeleteModal: true, purchaseToDelete:record }
    })
  }

  handleTableChange = (pagination, filters, sorter) => {
    const order = sorter.order ? sorter.order.includes("asc")?"asc":"desc" : null
    const sort = sorter.column?sorter.field:null
    this.props.dispatch({
      type: purchaseActions.LOAD_CLIENTS,
      payload:{size:pagination.pageSize, page: pagination.current, sort, order}
    })
  }


  render(){
    const {purchases, page, totalElements, size} = this.props
    return(
          <Table
            columns={this.columns}
            dataSource={purchases}
            onChange={this.handleTableChange}
            pagination={{
                  current: parseInt(page),
                  total: parseInt(totalElements),
                  pageSize: parseInt(size),
                }}
           />
    )
  }
}

const mapStateToProps = state=>{
  return state.purchases
}

export default connect(mapStateToProps)(PurchasesList)
