import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

class Login extends Component {
  constructor(props) {
    super(props);
  }

  handleSign(e) {
    
    var axios = require("axios")
    e.preventDefault()

    var email = document.getElementById("email").value
    var password = document.getElementById("password").value

    var axios = require('axios');
    var data = JSON.stringify({
      "email": email,
      "password": password
    });

    var config = {
      method: 'post',
      url: 'http://localhost:3001/api/user/login',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios(config)
    .then(function (response) {
      var res = JSON.stringify(response.data);
      var data = JSON.parse(res)

      if (res === '""') {
        console.log("user not found")
      } else {
        console.log("authenticated")
        var val = JSON.stringify(data)
        localStorage.removeItem("user");
        localStorage.setItem('user', val);
        var data = localStorage.getItem("user")
        console.log(data)
      }
    })
    .then(() => {
      window.location.href = "http://localhost:3000/"
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  render() {
    const classes = this.props.classes;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div>
          {/*banner*/}
          <div className="banner-top">
            <div className="container">
              <h3>Login</h3>
              <h4>
                <Link to="/">Home</Link>
                <label>/</label>Login
              </h4>
              <div className="clearfix"> </div>
            </div>
          </div>
          {/*login*/}
          <div className="login">
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <form className={classes.form} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={this.handleSign}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link to="/register" className="forg-right">
                      Register
                    </Link>
                  </Grid>
                </Grid>

              </form>
              <span id='lippButton'></span>
            
            </div>
          </div>
        </div>
      </Container>
    );
  }
}

export default () => {
  const classes = useStyles();
  return <Login classes={classes} />;
};
