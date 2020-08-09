import React from "react"
import { connect } from "react-redux"
import { Table, Button } from "antd"
import productActions from "../../../redux/products/actions"
import styles from "./styles.module.scss"

class ProductsList extends React.Component {

  columns = [
    {
    title: 'Nom du produit',
    dataIndex: 'name',
    key: 'name',
    sorter: true
  },
  {
    title: 'La marque',
    dataIndex: 'mark',
    key: 'mark',
    sorter: true
  },
  {
    title: 'Quantité',
    dataIndex: 'quantity',
    key: 'quantity',
    sorter: true,
    render: text=>
    (<span>
      {Number(text).toLocaleString('fr-FR')}
    </span>)
  },{
    title: 'Prix d\'unité',
    dataIndex: 'unitPrice',
    key: 'unitPrice',
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
    width: 200,
    render: (record)=>
        (
          <div className={styles.actionsContainer}>
            <span className={styles.actionsContainer_edit} onClick={(e)=> this.showEditModal(e, record)}>Editer</span>
            <span className={styles.actionsContainer_delete} onClick={(e)=> this.showDeleteModal(e, record)}>Supprimer</span>
          </div>
        )
  },
  ]

  showEditModal = (e, record) =>{
    e.preventDefault()
    this.props.dispatch({
      type: productActions.SET_STATE,
      payload: { showEditModal: true, productToEdit:record }
    })
  }

  showDeleteModal = (e, record) =>{
    e.preventDefault()
    this.props.dispatch({
      type: productActions.SET_STATE,
      payload: { showDeleteModal: true, productToDelete: record }
    })
  }

  handleTableChange = (pagination, filters, sorter) => {
    const order = sorter.order ? (sorter.order.includes("asc")?"asc":"desc") : null
    const sort = sorter.column?sorter.field:null
    this.props.dispatch({
      type: productActions.LOAD_PRODUCTS,
      payload:{size:pagination.pageSize, page: pagination.current, sort, order}
    })
  }


  render(){
    const {products, page, totalElements, size} = this.props

    return(
          <Table
            columns={this.columns}
            dataSource={products}
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
  return state.products
}

export default connect(mapStateToProps)(ProductsList)
