import React, { Component } from "react";
import { Link } from "react-router-dom";
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
import axios from "axios";
import { useRef, useEffect, useState } from "react";
import Home from '../../web/home';
import { useHistory } from "react-router-dom";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";



const getCode = () => {
  return new URLSearchParams(window.location.search).get("code");
};

const callHomePage = (userData,props) => {
    console.log("inside home hage")
    // this.context.router.push({ //browserHistory.push should also work here
    //     pathname: "/",
    //     state: { userData}
    //   }); 
    //props.history.push('/');
    // return (<Home userData={userData}/>);
    return (<Redirect to={{
        pathname: "/",
        state: { userData}
      }} />)
} 

export default function PaypalLogin(props) {
    const [userData,setUserData] = useState({});
    const [redirectData,setRedirectData]= useState(false);
   useEffect(() => {
    (async () => {
    const code = getCode();
    const username =
      "AaF86S4sN9kbR4f7knuQ1PlrNN4r4vy-lc5BB7QlPSioE_-afo4_Zo1KuZwIHQGZCxcD-H7GkWINDB1I";
    const password =
      "ECq96Rl1DZNL7ub5Ihsn3YS9DRRdTIePS_ZC4eBjbNrmEzHK-q9tAJue2VrjoIWKhDkDhjg6ITZ79LKc";
    var details = {
      grant_type: "authorization_code",
      code: code,
    };
    var headers = {
      Authorization: "Basic " + btoa(`${username}:${password}`),
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    };

    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    console.log("1st body");
    console.log(formBody);
    console.log("1st header");
    console.log(headers);

    var response = await fetch(
      "https://api-m.sandbox.paypal.com/v1/oauth2/token",
      {
        method: "POST",
        headers: headers,
        body: formBody,
      }
    );

    var jsonData = await response.json();
    console.log("1st response");
    console.log(jsonData);
    const refreshToken = jsonData.refresh_token;

    //2nd api
    details = {
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    };
    formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    response = await fetch("https://api-m.sandbox.paypal.com/v1/oauth2/token", {
      method: "POST",
      headers: headers,
      body: formBody,
    });

    jsonData = await response.json();
    console.log("2nd response");
    console.log(jsonData);
    const accessToken = jsonData.access_token;

    //3rd api
    headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    };
    response = await fetch(
      "https://api-m.sandbox.paypal.com/v1/identity/oauth2/userinfo?schema=paypalv1.1",
      {
        method: "GET",
        headers: headers,
      }
    );

    jsonData = await response.json();
    console.log("3rd response");
    var paypalUserData = {
      "name": jsonData.name,
      "email": jsonData.emails[0].value
    }
    console.log(paypalUserData);
    var paypalUserDataString = JSON.stringify(paypalUserData);
    localStorage.setItem("user", paypalUserDataString)

    
    var data = JSON.stringify({
      "name": paypalUserData.name,
      "email": paypalUserData.email,
      "password": "123"
    });
    
    var config = {
      method: 'post',
      url: 'http://localhost:3001/api/user/create',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });

    setUserData({name:jsonData.name,email:jsonData.emails[0].value})
    setRedirectData(true);
})();
}, []);
  
  let rstate = null;
  if(redirectData===false) rstate=(<div>Loading....</div>);
  else rstate=(<Redirect to={{
    pathname: "/",
    userData: { userData}
  }} />)
  return (

    <div>
       {rstate} 
    </div>
   )

}
