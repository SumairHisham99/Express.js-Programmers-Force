const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const {adminSigninRoutes,adminCategoryRoutes,adminUserRoutes,
  adminProductRoutes,adminIpRoutes,userSigninRoutes,userProductsRoutes} = require('./src/controllers/index');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send(`// Admin Signin Api's <br/>
  POST localhost:3000/super-admin/login (Required [email (type string), password (type string)])<br/>
  POST localhost:3000/super-admin/logout<br/>
  <br/>
  // Admin User Api's [body {name, email, password, role}]<br/>
  POST localhost:3000/admin/register-user (Required [name(type string), email(type string), password(type string), role(type string)])<br/>
  POST localhost:3000/admin/update-user (Required id(type integer), body optional)<br/>
  POST localhost:3000/admin/delete-user (Required id(type integer), body optional)<br/>
  GET  localhost:3000/admin/get-allusers<br/>
  <br/>
  // Admin Product Api's [body {name, categoryid, description, price}]<br/>
  POST localhost:3000/admin/register-product (Required [name(type string), categoryid(type string), price(type integer)])<br/>
  POST localhost:3000/admin/update-product (Required id(type integer), body optional)<br/>
  POST localhost:3000/admin/delete-produet (Required id(type integer), body optional)<br/>
  GET  localhost:3000/admin/get-allproducts<br/>
  <br/>
  // Admin IP Address Api's [body {ip_address, location, floor}]<br/>
  POST localhost:3000/admin/register-ip (Required [ip_address(type integer), location(type string), floor(type integer)])<br/>
  POST localhost:3000/admin/update-ip (Required [id(type integer)], body optional)<br/>
  POST localhost:3000/admin/delete-ip (Required [id(type integer)], body optional)<br/>
  GET  localhost:3000/admin/get-allip<br/>
  <br/>
  // Admin Category Api's [body {name}]<br/>
  POST localhost:3000/admin/register-category (Required [name(type string)])<br/>
  POST localhost:3000/admin/update-category (Required [id(type integer)], body optional)<br/>
  POST localhost:3000/admin/delete-category (Required [id(type integer)], body optional)<br/>
  GET  localhost:3000/admin/get-allcategories<br/>
  <br/>
  // User Signin Api's<br/>
  POST localhost:3000/user/login (Required [email (type string), password (type string)])<br/>
  POST localhost:3000/user/logout<br/>
  <br/>
  // User Product Api's [body {name, categoryid, description, price}]<br/>
  POST localhost:3000/user/create-product (Required [name(type string), categoryid(type string), price(type integer)])<br/>
  POST localhost:3000/user/update-product (Required [id(type integer)], body optional)<br/>
  POST localhost:3000/user/delete-product (Required [id(type integer)], body optional)<br/>
  GET  localhost:3000/user/get-allproducts<br/>`);
  });

app.use('/', adminSigninRoutes);
app.use('/', adminUserRoutes);
app.use('/', adminProductRoutes);
app.use('/', adminCategoryRoutes);
app.use('/', adminIpRoutes);
app.use('/', userSigninRoutes);
app.use('/', userProductsRoutes);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
