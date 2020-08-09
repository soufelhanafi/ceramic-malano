
import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Layout} from "antd"
import Typography from '@material-ui/core/Typography';
import TopBar from "../../components/topBar"

import PrivateComponent from "../../pages/private"
import ClientsPage from "../../pages/clients"
import ProductsPage from "../../pages/products"
import PurchasesPage from "../../pages/purchase"
import styles from "./styles.module.scss"

const { Header, Content, Footer } = Layout;

const PRouter = ()=>{
  return (
      <>

        <Route exact={true} path="/clients" component={ClientsPage} />
        <Route exact={true} path="/products" component={ProductsPage} />
        <Route exact={true} path="/purchases" component={PurchasesPage} />
        <Route render={() => <Redirect to="/clients" />} />
      </>
  )
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © Ceramic Milano '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


class PrivateRouter extends React.Component {
  render() {
    return (
      <Layout className={`${styles.mainLayout} layout`}>
        <Header className={styles.header}>
          <TopBar />
        </Header>
        <Content style={{ padding: '50px 50px' }}>
          <div className="site-layout-content">
            <PRouter />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}><Copyright /></Footer>
      </Layout>
    );
  }
}

export default PrivateRouter ;
