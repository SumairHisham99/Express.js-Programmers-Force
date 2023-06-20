// import admin routes
const adminSigninRoutes = require('./adminController/adminSigninRoutes');
const adminUserRoutes = require('./adminController/adminUserRoutes');
const adminProductRoutes = require('./adminController/adminProductRoutes');
const adminCategoryRoutes = require('./adminController/adminCategoryRoutes');
const adminIpRoutes = require('./adminController/adminIpRoutes');

// import user routes
const userSigninRoutes = require('./userController/userSignin');
const userProductsRoutes = require('./userController/userProductsRoutes');

module.exports = {
    // Admin Routes
    adminSigninRoutes,
    adminUserRoutes,
    adminProductRoutes,
    adminCategoryRoutes,
    adminIpRoutes,
    // User Routes
    userSigninRoutes,
    userProductsRoutes
}