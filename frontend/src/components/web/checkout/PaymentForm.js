import React, { useRef, useEffect, useState } from "react";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";

function handleTransactionDetails(order) {
  var transactionDetails = {
    transactionId: order.purchase_units[0].payments.captures[0].id,
    transactionAmount:
      order.purchase_units[0].payments.captures[0].amount.value,
    createdTime: order.purchase_units[0].payments.captures[0].create_time,
    shippingAddress: order.purchase_units[0].shipping.address,
  };
  var data = localStorage.getItem("user");
  var dataJson = JSON.parse(data);

  var reqBody = {
    name: dataJson.name,
    email: dataJson.email,
    transactionDetails: transactionDetails,
  };

  var axios = require("axios");

  var config = {
    method: "put",
    url: "http://localhost:3001/api/user/updateTransaction",
    headers: {
      "Content-Type": "application/json",
    },
    data: reqBody,
  };

  axios(config)
    .then(function (response) {
      var res = JSON.stringify(response.data);
      var data = JSON.parse(res);
      console.log(data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

export default function PaymentForm(props) {
  console.log("LOGGING INNNNN");
  console.log(props);
  const paypal = useRef();
  const total_price = Number(
    new URLSearchParams(window.location.search).get("total_price")
  );
  console.log(props);

  const orderDetails = props.orderDetail;
  const userAddressDetails = localStorage.getItem("userDetails");
  var userDetails = localStorage.getItem("user");
  userDetails = JSON.parse(userDetails);
  const userName = userDetails.name;

  console.log(userAddressDetails);

  const [status, setStatus] = useState("default");
  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Cool looking table",
                amount: {
                  currency_code: "USD",
                  value: orderDetails.cart.cartPrice,
                },
                shipping: {
                  address: JSON.parse(userAddressDetails),
                  name: { full_name: userName },
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log(order);
          handleTransactionDetails(order);
          setStatus("success");
          console.log("after setsuccess");
        },
        onError: (err) => {
          console.log(err);
          setStatus("error");
        },
      })
      .render(paypal.current);
  }, []);

  let paymentStatus = null;

  if (status === "success") {
    paymentStatus = (
      <Alert severity={status}>
        <AlertTitle>Success</AlertTitle>
        This isrt a success alert — <strong>check it out!</strong>
      </Alert>
    );
  } else if (status === "error") {
    paymentStatus = (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        This is an error alert — <strong>check it out!</strong>
      </Alert>
    );
  }
  return (
    <div>
      <div ref={paypal}></div>
      {paymentStatus}
    </div>
  );
}
