const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./model/User.js");

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Server connection OK!");
});

module.exports.user = async (event) => {
  const { name, password } = event.pathParameters;
  try {
    let foundUser = await User.findOne({ name });
    if (foundUser && (await bcrypt.compare(password, foundUser.password))) {
      return {
        statusCode: 200,
        body: JSON.stringify(foundUser),
      };
    } else {
      return {
        statusCode: 401,
        body: JSON.stringify({
          error: "Invalid credentials",
        }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Internal Server Error",
      }),
    };
  }
};

module.exports.createUser = async (event) => {
  const parsedBody = JSON.parse(event.body);
  const { name, password, password2, address, email } = parsedBody;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const userNameExists = await User.findOne({ name: name });
    if (!userNameExists) {
      let user = {
        name: name,
        password: hashedPassword,
        address: address,
        email: email,
        points: 0,
      };
      let newUser = await User.create(user);
      return {
        statusCode: 200,
        body: JSON.stringify(newUser),
      };
    } else {
      return {
        body: JSON.stringify("User already exists!"),
      };
    }
  } catch (error) {
    return {
      body: JSON.stringify(error),
    };
  }
};

module.exports.updateUser = async (event) => {
  const parsedBody = JSON.parse(event.body);
  const { name, score } = parsedBody;
  try {
    await User.findOneAndUpdate(
      { name: name },
      { $inc: { points: score } },
      { new: true }
    );
    const responseBody = await User.find({}, { name: 1, points: 1 }).sort({
      points: "desc",
    });
    return {
      statusCode: 200,
      body: JSON.stringify(responseBody),
    };
  } catch (error) {
    console.log(error);
    return {
      body: JSON.stringify(error),
    };
  }
};
