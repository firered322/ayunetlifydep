const express = require("express");
const bodyParser = require("body-parser");
var favicon = require("serve-favicon");
var path = require("path");
var firebase = require("firebase");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

// Initialize Firebase
var config = {
  apiKey: "AIzaSyD_6w5G5MpAEkO6yOuwi5e75XgiiD-yPGc",
  authDomain: "ayu-website.firebaseapp.com",
  databaseURL: "https://ayu-website.firebaseio.com",
  projectId: "ayu-website",
  storageBucket: "ayu-website.appspot.com",
  messagingSenderId: "10869753092"
};
firebase.initializeApp(config);

// Get ref to firebase DB
var database = firebase.database();

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/products", (req, res) => {
  // res.render("products");
  res.sendFile(__dirname + "/products.html");
});
app.get("/contact", (req, res) => {
  res.sendFile(__dirname + "/contact.html");
});
app.get("/news", (req, res) => {
  res.sendFile(__dirname + "/news.html");
});
app.get("/response", (req, res) => {
  res.sendFile(__dirname + "/response.html");
});
app.get("/success", (req, res) => {
  res.sendFile(__dirname + "/success.html");
});

app.post("/contact", (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let contact = req.body.phone;
  let message = req.body.message;
  let findus = req.body.findus;
  let key = email.split(".")[0];
  database.ref(`/users/${key}`).set({
    name: name,
    phone: contact,
    email: email,
    message: message,
    foundusthrough: findus
  });
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
