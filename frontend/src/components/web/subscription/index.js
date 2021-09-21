import React, { useRef, useEffect, useState } from "react";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import SubscriptionSuccess from "./subscriptionSuccess";
import { Link, Redirect } from 'react-router-dom'

async function callApi() {
  const username =
    "AaF86S4sN9kbR4f7knuQ1PlrNN4r4vy-lc5BB7QlPSioE_-afo4_Zo1KuZwIHQGZCxcD-H7GkWINDB1I";
  const password =
    "ECq96Rl1DZNL7ub5Ihsn3YS9DRRdTIePS_ZC4eBjbNrmEzHK-q9tAJue2VrjoIWKhDkDhjg6ITZ79LKc";
  var details = {
    grant_type: "client_credentials",
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

  headers = await {
    "Content-Type": "application/json",
    Authorization: "Bearer " + jsonData.access_token,
  };

  console.log(headers);
  var data = localStorage.getItem("user");
  var dataJson = JSON.parse(data);

  console.log("user", dataJson);
  formBody = JSON.stringify({
    plan_id: "P-71B637456K182173KMDJWQ5Q",
    start_time: "2022-02-27T06:00:00Z",
    subscriber: {
      name: {
        given_name: dataJson.name,
        surname: " ",
      },
      email_address: dataJson.email,
    },
    application_context: {
      brand_name: "example",
      locale: "en-US",
      shipping_preference: "SET_PROVIDED_ADDRESS",
      user_action: "SUBSCRIBE_NOW",
      payment_method: {
        payer_selected: "PAYPAL",
        payee_preferred: "IMMEDIATE_PAYMENT_REQUIRED",
      },
      return_url: "http://127.0.0.1:3000/subscriptionSuccess",
      cancel_url: "http://127.0.0.1:3000/subscriptionError",
    },
  });

  response = await fetch(
    "https://api-m.sandbox.paypal.com/v1/billing/subscriptions",
    {
      method: "POST",
      headers: headers,
      body: formBody,
    }
  );

  jsonData = await response.json();
  console.log("2nd response");
  console.log(jsonData);

  var paymentUrl = await jsonData.links[0].href;
  console.log("link", paymentUrl);
  window.location.href = paymentUrl;
}

export default function Subscription(props) {
    const [subscriptionStatus, setSubscriptionStatus] = useState(false)
    var subscriptionId;
    var subLocation;
  useEffect(() => {
    (async () => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var data = localStorage.getItem("user");
      var dataJson = JSON.parse(data);

      var raw = JSON.stringify({
        name: dataJson.name,
        email: dataJson.email
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      await fetch("http://localhost:3001/api/user/getUserDetails", requestOptions)
        .then((response) => response.text())
        .then((result) => {
            console.log(result)
            var data = JSON.parse(result)
            subscriptionId = data.subscriptionId
            if(subscriptionId) {
                setSubscriptionStatus(true)
            }
        })
        .catch((error) => console.log("error", error));
    })();
  }, []);

  return (
    <div style={{ marginTop: "5%", padding: 30 }}>
      {console.log(subscriptionStatus)}
      {!subscriptionStatus ?
      <button
        className="subbutton"
        style={{
          width: "10%",
          height: 50,
          shape: "rect",
          color: "blue",
          layout: "horizontal",
          label: "subscribe",
          tagline: true,
          marginBottom: "5%",
        }}
        onClick={(event) => {
          callApi();
        }}
      >
        + PayPal Subscribe
      </button> :
      <div>
          <SubscriptionSuccess />
        </div> 
}
    </div>
  );
}
