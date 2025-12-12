const express = require("express");
const server = express();
const port = 3000;
const cors = require("cors");
const mongoose = require("mongoose");
const Product = require("./models/product"); //getting Product model
const User = require("./models/user"); //getting user model
const bcrypt = require("bcrypt"); //for hashing password
const jwt = require("jsonwebtoken"); //
require("dotenv").config();
const { DB_URI, SECRET_KEY } = process.env;

//setting up middleware
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

//connecting to database and starting server
//connect to mongoDB
mongoose
  .connect(DB_URI)
  .then(() => {
    server.listen(port, () => {
      console.log(`Connected to DB\nServer is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

server.get("/", (request, response) => {
  response.send("LIVE!");
});

server.get("/products", async (request, response) => {
  try {
    await Product.find().then((result) => response.status(200).send(result));
  } catch (error) {
    console.log(error.message);
  }
});

/* here,all the routes and CRUD will be written  */

/* $authentication routes */
//register route
server.post("/create-user", async (request, response) => {
  const { username, password } = request.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const newuser = new User({
      username,
      password: hashedPassword,
    });
    await newuser.save();
    response.send({ message: "Great,User registered successfully" });
  } catch (error) {
    response
      .status(500)
      .send({ message: "user name already exists,please try again" });
  }
});

//login route
server.post("/login", async (request, response) => {
  const { username, password } = request.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return response
        .status(404)
        .send({ message: "User is not found in the database" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return response
        .status(403)
        .send({ message: "please check username or password" });
    }

    const jwtToken = jwt.sign({ id: user._id, username }, SECRET_KEY);
    return response
      .status(201)
      .send({ message: "User Authenticated", token: jwtToken });
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});
//login route ends here

server.post("/add-product", async (request, response) => {
  const { productName, brand, image, price } = request.body;
  const id = crypto.randomUUID();
  const product = new Product({
    productName,
    brand,
    price,
    image,
    id,
  });

  try {
    await product
      .save()
      .then((result) =>
        response.status(201).send(`${productName} added\nwith id: ${id}`)
      );
  } catch (error) {
    console.log(error.message);
  }
});

server.delete("/products/:id", async (request, response) => {
  const { id } = request.params;
  try {
    await Product.findByIdAndDelete(id).then((result) => {
      console.log(result);
      response.status(200).send(result);
    });
  } catch (error) {
    console.log(error.message);
  }
});

server.patch("/products/:id", async (request, response) => {
  const prodId = request.params.id;
  const { productName, brand, image, price, id } = request.body;

  try {
    await Product.findByIdAndUpdate(prodId, {
      productName,
      brand,
      image,
      price,
      id,
    }).then((result) =>
      response.status(200).send(`${productName} edited\nwith id: ${prodId}`)
    );
  } catch (error) {
    console.log(error.message);
  }
});
