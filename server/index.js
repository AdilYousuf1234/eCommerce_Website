require('dotenv').config()
const express = require("express");
const User = require("./models/user")
const usersRouter = require('./routers/userRouter')
//const request = require('request');
const bodyParser = require('body-parser');
var axios = require('axios');
var qs = require('qs');
urlParser = bodyParser.urlencoded({
  extended:false
})


var cors = require('cors')

const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors())

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use('/api/user/', usersRouter)
app.get('/merchantlogin', (req, res) => res.sendFile(__dirname + "/index.html"));
app.post('/createTracker',urlParser,async (req, res) => {
  var transactionId = req.body.transactionId; //"84X38287GM0254605";
  var trackingNumber = req.body.trackingNumber;//"443844607820";
  var status = req.body.status;//"SHIPPED";
  var carrier = req.body.carrier;//"FEDEX";
  var accessToken;
  var data = qs.stringify({
    'grant_type': 'client_credentials',
    'return_autnn_scheme': 'true',
    'response_type': 'token' 
  });
  var config = {
    method: 'post',
    url: 'https://api.sandbox.paypal.com/v1/oauth2/token',
    headers: { 
      'Authorization': 'Basic QWFGODZTNHNOOWtiUjRmN2tudVExUGxyTk40cjR2eS1sYzVCQjdRbFBTaW9FXy1hZm80X1pvMUt1WndJSFFHWkN4Y0QtSDdHa1dJTkRCMUk6RUNxOTZSbDFEWk5MN3ViNUloc24zWVM5RFJSZFRJZVBTX1pDNGVCamJOcm1FekhLLXE5dEFKdWUyVnJqb0lXS2hEa0Roamc2SVRaNzlMS2M=', 
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data : data
  };
  await axios(config)
  .then(function (response) {
    accessToken = response.data.access_token
    console.log(accessToken);
  })
  .catch(function (error) {
    console.log(error);
  });
  

var data = `{"trackers": [ { "transaction_id": "${transactionId}", "tracking_number": "${trackingNumber}", "status": "${status}", "carrier": "${carrier}" } ] }';`
var config = {
  method: 'post',
  url: 'https://api-m.sandbox.paypal.com/v1/shipping/trackers-batch',
  headers: { 
    'Content-Type': 'application/json', 
    'Authorization': `Bearer ${accessToken}`
  },
  data : data
};

await axios(config)
.then(function (response) {
  console.log(response.data);
  res.send('Success');
})
.catch(function (error) {
  console.log(error);
});
});


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
