const usersRouter = require("express").Router();
const User = require("../models/user");

// get all users
usersRouter.get("/", (request, response) => {
  User.find({}).then((users) => {
    response.json(users);
  });
});

// get particular user
usersRouter.post("/login", async (request, response, next) => {
  var body = request.body;
  var userTarget;
  await User.findOne({ email: body.email }).then((user) => {
    userTarget = user;
  });
  // check password validation
  if (body.password === userTarget.password) {
    response.json(userTarget);
  } else {
    response.json();
  }
});

usersRouter.post("/create", (request, response, next) => {
  const body = request.body;
  if (body.name === undefined) {
    return response.status(400).json({ error: "content missing" });
  }

  const user = new User({
    name: body.name,
    email: body.email,
    password: body.password,
  });

  user.save().then((savedUser) => {
    response.json(savedUser);
  });
});

// update transaction
usersRouter.put("/updateTransaction", async (request, response, next) => {
  const body = request.body;
  var userDetails;
  await User.findOne({ email: body.email }).then((user) => {
    userDetails = user;
  });
  newtransactionDetails = userDetails.transactionDetails;
  newtransactionDetails.push(body.transactionDetails);
  userDetails.transactionDetails = newtransactionDetails;

  await User.findOneAndUpdate({ email: body.email }, userDetails, { new: true })
    .then((updatedUser) => {
      response.json(updatedUser);
    })
    .catch((error) => next(error));
});

// update subscription
usersRouter.put("/updateSubscription", async (request, response, next) => {
  const body = request.body;
  var userDetails;
  await User.findOne({ email: body.email }).then((user) => {
    userDetails = user;
  });
  // newtransactionDetails = userDetails.subsription;
  // newtransactionDetails.push(body.transactionDetails);
  // userDetails.transactionDetails = newtransactionDetails;
  userDetails.subscriptionId = body.subscriptionId;

  await User.findOneAndUpdate({ email: body.email }, userDetails, { new: true })
    .then((updatedUser) => {
      console.log(updatedUser)
      response.json(updatedUser);
    })
    .catch((error) => next(error));
});

usersRouter.put("/updateTransaction", async (request, response, next) => {
  const body = request.body;
  var userDetails;
  await User.findOne({ email: body.email }).then((user) => {
    userDetails = user;
  });
  newtransactionDetails = userDetails.transactionDetails;
  newtransactionDetails.push(body.transactionDetails);
  userDetails.transactionDetails = newtransactionDetails;

  await User.findOneAndUpdate({ email: body.email }, userDetails, { new: true })
    .then((updatedUser) => {
      response.json(updatedUser);
    })
    .catch((error) => next(error));
});

usersRouter.post("/getUserDetails", (request, response) => {
  User.findOne({ email: request.body.email }).then((user) => {
    response.json(user);
  });
});
module.exports = usersRouter;
