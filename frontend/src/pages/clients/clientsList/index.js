import React from "react"
import { connect } from "react-redux"
import { Table, Button } from "antd"
import clientActions from "../../../redux/clients/actions"
import styles from "./styles.module.scss"

class ClientsList extends React.Component {

  columns = [
    {
    title: 'Nom Complet',
    dataIndex: 'fullName',
    key: 'fullName',
    sorter: true
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    sorter: true
  },
  {
    title: 'CINE',
    dataIndex: 'cine',
    key: 'cine',
    sorter: true
  },{
    title: 'Télé',
    dataIndex: 'tele',
    key: 'tele',
    sorter: true
  },{
    title: 'Reste',
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
    title: 'Action',
    key: 'Action',
    width: 230,
    render: (record)=>
        (
          <div className={styles.actionsContainer}>
            <span className={styles.actionsContainer_edit} onClick={(e)=> this.showEditModal(e, record)}>Editer</span>
            <span className={styles.actionsContainer_delete} onClick={(e)=> this.showDeleteModal(e, record)}>Supprimer</span>
            <span className={styles.actionsContainer_purchase} onClick={(e)=> this.showPurchaseModal(e, record)}>Achat</span>
          </div>
        )
  },
  ]

  showEditModal = (e, record) =>{
    e.preventDefault()
    this.props.dispatch({
      type: clientActions.SET_STATE,
      payload: { showEditModal: true, clientToEdit:record }
    })
  }

  showDeleteModal = (e, record) =>{
    e.preventDefault()
    this.props.dispatch({
      type: clientActions.SET_STATE,
      payload: { showDeleteModal: true, clientToDelete:record }
    })
  }

  showPurchaseModal = (e, record) => {
    e.preventDefault()
    console.log(record);
  }

  handleTableChange = (pagination, filters, sorter) => {
    const order = sorter.order ? sorter.order.includes("asc")?"asc":"desc" : null
    const sort = sorter.column?sorter.field:null
    this.props.dispatch({
      type: clientActions.LOAD_CLIENTS,
      payload:{size:pagination.pageSize, page: pagination.current, sort, order}
    })
  }


  render(){
    const {clients, page, totalElements, size} = this.props
    return(
          <Table
            columns={this.columns}
            dataSource={clients}
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
  return state.clients
}

export default connect(mapStateToProps)(ClientsList)
