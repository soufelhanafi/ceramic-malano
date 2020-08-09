
import * as React from 'react';
import { Row, Col} from "antd"
import {Link, withRouter} from "react-router-dom"
import { connect } from "react-redux"
import logo1 from "../../assets/images/logo1.jpeg"

import styles from "./styles.module.scss"


class TobBar extends React.Component {
  render() {
    return (
      <Row>
        <Col span={24} className={styles.main_top_bar}>
          <Col span={1} className={styles.logo_container}>
            <img src={logo1} alt="logo" />
          </Col>
          <Col className={styles.menu_items_container}>
            <div className={styles.menu_item_container}>
              <p className={styles.menu_item}>Dashboard</p>
            </div>
            <div className={`${styles.menu_item_container} ${this.props.location.pathname === "/clients" ? styles.menu_item_container_selected : ""}`}>
              <Link to="/clients">
                <p className={styles.menu_item}>Clients</p>
              </Link>
            </div>
            <div className={`${styles.menu_item_container} ${this.props.location.pathname === "/purchases" ? styles.menu_item_container_selected : ""}`}>
              <Link to="/purchases">
                <p className={`${styles.menu_item}`}>Achats</p>
              </Link>
            </div>
            <div className={`${styles.menu_item_container} ${this.props.location.pathname === "/products" ? styles.menu_item_container_selected : ""}`}>
              <Link className={styles.menu_item} to="/products">
                <p className={styles.menu_item}>Produit</p>
              </Link>
            </div>
          </Col>
        </Col>
      </Row>
    );
  }
}


const mapStateToProps = state=>{
  return state
}

export default connect(mapStateToProps)(withRouter(TobBar));
