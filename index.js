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
    const dbConfigure = path.join( __dirname, './src/views/createDB/dbConfigure.html')
    res.sendFile(dbConfigure);
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
