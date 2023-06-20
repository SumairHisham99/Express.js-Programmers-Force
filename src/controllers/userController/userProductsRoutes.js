const express = require('express');
const { userAuthn } = require('../../auth/authentication');
const { ProductModel } = require('../../models/index');

const router = express.Router();

// User Create Product Route
  router.post('/user/create-product', userAuthn, async (req, res) => {

    try {
      const { name, categoryId ,price, description } = req.body;

      // Create a new Product
      const newProduct = await ProductModel.create({name, categoryId ,price, description});
      if(!newProduct){
        res.status(401).json({ error: 'Error While Inserting Product!' });

      }else{
        res.status(200).json({ message: 'Product Created Successfully!' });
      }

    } catch (error) {

      console.error(`Creating Product API's Error:`, error);
      res.status(500).json({ error: 'Internal Server Error!' });

    }
  });

  // User Update Product Route
  router.post('/user/update-product', userAuthn, async (req, res) => {

    try {
      const { body } = req;
      const { id } = body;

      // Update Product
      const updatedProduct = await ProductModel.update( body, {where:{ id } });
      if(!updatedProduct){
        res.status(401).json({ error: 'Error While Updating Product!' });

      }else{
        res.status(200).json({ message: 'Product Updated Successfully!' });
      }

    } catch (error) {

      console.error(`Updating Product API's Error:`, error);
      res.status(500).json({ error: 'Internal Server Error!' });
    }

  });

  // User Delete Product Route
  router.post('/user/delete-product', userAuthn, async (req, res) => {

    try {
      const { id } = req.body;

      // Delete Product
      const deletedProduct = await ProductModel.update({
        deleted: true
        },
        {
             where: { id }
        });
      if(!deletedProduct){
        res.status(401).json({ error: 'Error While Deleting Product!' });

      }else{
        res.status(200).json({ message: 'Product Deleted Successfully!' });
      }
      
    } catch (error) {

      console.error(`Deleting Product API's Error:`, error);
      res.status(500).json({ error: 'Internal Server Error!' });
    }

  });

  // User Get all Products Route
  router.get('/user/get-allproducts', userAuthn, async (req, res) => {

    try {

      // Get all Products
      const allProducts = await ProductModel.findAll({
        deleted: false,
        },
        {
        where: { 
            order: [['id','DESC']]
         }
        });
        if(!allProducts){
            res.status(401).json({ error: 'Error While Fetching Products!' });
    
          }else{
            res.status(200).json({ message: `Products Fetched Successfully!`, allProducts });
          }

    } catch (error) {

      console.error('Fetching Products Error:', error);
      res.status(500).json({ error: 'Internal Server Error!' });

    }
    
  });
  
  
  module.exports = router;
  