import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Form, Icon, Input, Button, Spin} from 'antd';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import logo1 from "../../assets/images/logo1.jpeg"
import styles from "./styles.module.scss"
import { connect } from "react-redux"
import userActions from "../../redux/users/actions"

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © Ceramic Milano '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

class LoginPage extends React.Component {

  handleSubmit = e =>{
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: userActions.LOGIN,
          payload:{...values}
        })
      }
    });
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    const {loading, showErrorMessage, message} = this.props
    return(
      <Grid container component="main" className={styles.login}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={styles.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={styles.paper}>
            <Avatar className={styles.avatar}>
              <img src={logo1} alt="logo1"/>
            </Avatar>
            <Typography component="h1" variant="h5">
              Se connecter
            </Typography>
            <Spin spinning={loading} tip="Loading...">
              <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item label="Email">
                  {getFieldDecorator('email', {
                    rules: [{ required: true, message: 'Email Obligatoire!' }],
                  })(
                    <Input
                      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    />,
                  )}
                </Form.Item>
                <Form.Item label="Mot de passe">
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Mot de passe Obligatoire!' }],
                  })(
                    <Input
                      prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      type="password"
                    />,
                  )}
                </Form.Item>
                {showErrorMessage && (
                  <Grid container>
                    <Grid item xs>
                      <p style={{color:"red", alignText:"center"}}>{message}</p>
                    </Grid>
                    <Grid item>
                    </Grid>
                  </Grid>
                )}
                <Button
                  htmlType="submit"
                  variant="contained"
                  color="primary"
                  className={styles.submit}
                >
                  Se connecter
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Mot de passe oublié ?
                    </Link>
                  </Grid>
                  <Grid item>
                  </Grid>
                </Grid>
              </Form>
            </Spin>
            <Box mt={5}>
              <Copyright />
            </Box>
          </div>
        </Grid>
      </Grid>
    )
  }
}
const mapStateToProps = state=>{
  return state.users
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(LoginPage);
export default connect(mapStateToProps)(WrappedNormalLoginForm)
