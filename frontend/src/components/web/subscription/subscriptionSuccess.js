import React, { useRef, useEffect, useState, Suspense } from "react";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";

const getCode = () => {
  return new URLSearchParams(window.location.search).get("subscription_id");
};
export default function SubscriptionSuccess(props) {
  const [subscriptionData, setSubscriptionData] = useState(null);

  useEffect(() => {
    (async () => {
      var subId = getCode();
      if (!subId) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var data = localStorage.getItem("user");
        var dataJson = JSON.parse(data);

        var raw = JSON.stringify({
          name: dataJson.name,
          email: dataJson.email,
        });

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        await fetch(
          "http://localhost:3001/api/user/getUserDetails",
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => {
            console.log(result);
            var data = JSON.parse(result);
            subId = data.subscriptionId;
          })
          .catch((error) => console.log("error", error));
      }

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
      console.log(subId);

      response = await fetch(
        "https://api-m.sandbox.paypal.com/v1/billing/subscriptions/" + subId,
        {
          method: "GET",
          headers: headers,
        }
      );

      jsonData = await response.json();
      console.log("2nd response");
      console.log(jsonData);
      setSubscriptionData(jsonData);

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var data = localStorage.getItem("user");
      var dataJson = JSON.parse(data);
      console.log(dataJson);

      var raw = JSON.stringify({
        email: dataJson.email,
        subscriptionId: jsonData.id,
      });

      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      await fetch(
        "http://localhost:3001/api/user/updateSubscription",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var data = localStorage.getItem("user");
      var dataJson = JSON.parse(data);

      var raw = JSON.stringify({
        name: dataJson.name,
        email: dataJson.email,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      await fetch(
        "http://localhost:3001/api/user/getUserDetails",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          console.log(result);
          var data = JSON.parse(result);
          subId = data.subscriptionId;
          localStorage.setItem("user", result);
        })
        .catch((error) => console.log("error", error));
    })();
  }, []);

  // const paypal = useRef();

  // console.log(props);

  // const orderDetails = props.orderDetail;
  // // console.log(typeof props);

  // useEffect(() => {

  //   const script = document.createElement('script');

  //   script.src = 'https://www.paypal.com/sdk/js?client-id=AaF86S4sN9kbR4f7knuQ1PlrNN4r4vy-lc5BB7QlPSioE_-afo4_Zo1KuZwIHQGZCxcD-H7GkWINDB1I&vault=true&intent=subscription';
  //   script.async = true;

  //   document.body.appendChild(script);

  //   return () => {
  //     document.body.removeChild(script);
  //   }
  //   window.paypal
  //     .Buttons({
  //       createSubscription: function(data, actions) {
  //           return actions.subscription.create({
  //             'plan_id': 'P-71B637456K182173KMDJWQ5Q' // Creates the subscription
  //           });
  //       },
  //       onApprove: async (data, actions) => {
  //           console.log(data)
  //         console.log('You have successfully created subscription ' + data.subscriptionID);

  //       },
  //       onError: (err) => {

  //         console.log("error",err);
  //       },
  //     })
  //     .render(paypal.current);
  // }, []);

  const card = {
    boxShadow: " 0 4px 8px 0 rgba(0,0,0,0.2)",
    transition: "0.3s",
    width: "40%",
    marginTop: "8rem",
    marginBottom: "8rem",
    marginLeft: "3rem",
    padding: "3rem",
  };

  return (
    // <div>

    //   <div style={{marginTop:'5%'}}ref={paypal}></div>
    // </div>
    <div style={{ marginTop: "5%" }}>
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        Subscribed successfully
      </Alert>

      <div>
        {subscriptionData && (
          <div style={card}>
            <div class="container">
              <h4>
                <b>Subscription Details</b>
              </h4>
              <p>Status :{subscriptionData.status}</p>
              <p>Subscription Id :{subscriptionData.id}</p>
              <p>Plan Id :{subscriptionData.plan_id}</p>
              <p>Start Time :{subscriptionData.start_time}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
