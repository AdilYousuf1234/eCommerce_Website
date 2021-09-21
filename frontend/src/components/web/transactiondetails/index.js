import React from "react";

class TransactionDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: [],
      calledApi: false,
      transactionStatus: [],
      fetchedTransactionDetails: false,
      orderDetails: [],
    };

    this.getUserDetails();
  }

  fetchUserDetails = (local_trackingDetails) => {
    var axios = require("axios");
    var data = localStorage.getItem("user")
    var dataJson = JSON.parse(data)

    var data = JSON.stringify({
      email: dataJson.email,
    });

    var config = {
      method: "post",
      url: "http://localhost:3001/api/user/getUserDetails",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        local_trackingDetails = response.data.transactionDetails;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  getUserDetails = async () => {
    var data = localStorage.getItem("user")
    var dataJson = JSON.parse(data)
    var local_transactionDetails,
      local_trackingDetails = [],
      access_token;
    var axios = require("axios");
    var qs = require("qs");
    var data = qs.stringify({
      grant_type: "client_credentials",
      return_autnn_scheme: "true",
      response_type: "token",
    });
    var config = {
      method: "post",
      url: "https://api.sandbox.paypal.com/v1/oauth2/token",
      headers: {
        Authorization:
          "Basic QWFGODZTNHNOOWtiUjRmN2tudVExUGxyTk40cjR2eS1sYzVCQjdRbFBTaW9FXy1hZm80X1pvMUt1WndJSFFHWkN4Y0QtSDdHa1dJTkRCMUk6RUNxOTZSbDFEWk5MN3ViNUloc24zWVM5RFJSZFRJZVBTX1pDNGVCamJOcm1FekhLLXE5dEFKdWUyVnJqb0lXS2hEa0Roamc2SVRaNzlMS2M=",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    await axios(config)
      .then(function (response) {
        console.log(response.data.access_token);
        access_token = response.data.access_token;
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log(access_token);
    data = JSON.stringify({
      email: dataJson.email,
    });

    config = {
      method: "post",
      url: "http://localhost:3001/api/user/getUserDetails",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        local_transactionDetails = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });

    local_transactionDetails.transactionDetails.map(async (transaction) => {
      config = {
        method: "get",
        url:
          "https://api-m.sandbox.paypal.com/v1/shipping/trackers/" +
          transaction.transactionId +
          "-1234",
        headers: {
          Authorization: "Bearer " + access_token,
        },
      };

      await axios(config)
        .then(function (response) {
          local_trackingDetails = local_trackingDetails.concat(response.data);
        })
        .catch(function (error) {
          local_trackingDetails = local_trackingDetails.concat({
            status: "Not Available",
            carrier: "Not Available",
          });
        })
        .then(() => {
          console.log("iin");
          console.log(local_trackingDetails);
          console.log(local_transactionDetails);
          if (
            local_trackingDetails.length ==
            local_transactionDetails.transactionDetails.length
          ) {
            this.setState({
              userDetails: local_transactionDetails,
              transactionStatus: local_trackingDetails,
              calledApi: true,
              fetchedTransactionDetails: true,
            });
          }
        });
    });
  };

  render() {
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
      <div>
        {this.state.calledApi &&
          this.state.userDetails.transactionDetails.map((details, index) => (
            <div style={card}>
              <div class="container">
                <h4>
                  <b>Order Details</b>
                </h4>
                <p>
                  Status :{" "}
                  {this.state.fetchedTransactionDetails && (
                    <span>
                      {console.log(this.state.transactionStatus)}
                      {this.state.transactionStatus[index].status}
                      {console.log(this.state.transactionStatus)}
                    </span>
                  )}
                </p>
                <p>
                  Carrier :{" "}
                  {this.state.fetchedTransactionDetails && (
                    <span>{this.state.transactionStatus[index].carrier}</span>
                  )}
                </p>
                <p>
                  Shipping Address :{" "}
                  <span>{details.shippingAddress.address_line_1}</span>
                  <span>{details.shippingAddress.admin_area_2}</span>
                  <span>{details.shippingAddress.admin_area_1}</span>
                  <span>{details.shippingAddress.postal_code}</span>
                  <span>{details.shippingAddress.country_code}</span>
                </p>
                <p>
                  Amount : <span>{details.transactionAmount}</span>
                </p>
                <p>
                  Time : <span>{`${new Date(`${details.createdTime}`).toString()}`}</span>
                </p>
              </div>
            </div>
          ))}
      </div>
    );
  }
}

export default TransactionDetails;
