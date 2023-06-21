const express = require('express');
const { adminAuthn } = require('../../auth/authentication')
const { CategoryModel } = require('../../models/index');

const router = express.Router();

// Admin Register Category Route
  router.post('/admin/register-category', adminAuthn, async (req, res) => {

    try {
      const { body } = req;

        // Create a new Category
      const newCategory = await CategoryModel.create(body);
      if(!newCategory){
        res.status(401).json({ error: 'Error While Creating Category!' });

      }else{
        res.status(200).json({ message: 'Category Created Successfully!' });
      }

    } catch (error) {

      console.error('Category Creation Error:', error);
      res.status(500).json({ error: 'Internal Server Error!' });

    }
  });

  // Admin Update Category Route
  router.post('/admin/update-category', adminAuthn, async (req, res) => {

    try {
      const { body } = req;
      const { id } = body;

      // Update Category
      const updatedCategory = await CategoryModel.update( body, { 
        where:{
           id
          }
      });
      if(!updatedCategory){
        res.status(401).json({ error: 'Error While Updating Category!' });
      }else{
        res.status(200).json({ message: 'Category Updated Successfully!' });
      }

    } catch (error) {

      console.error('Updating Category Error:', error);
      res.status(500).json({ error: 'Internal Server Error!' });
    }

  });

  // Admin Delete Category Route
  router.post('/admin/delete-category', adminAuthn, async (req, res) => {

    try {
      const { id } = req.body;

      // Delete Category
      const deletedCategory = await CategoryModel.update({
          deleted: true
        },
        {
          where: { id } 
      });
      if(!deletedCategory){
        res.status(401).json({ error: 'Error While Deleting Category!' });
      }else{
        res.status(200).json({ message: 'Category Deleted Successfully!' });
      }
      
    } catch (error) {

      console.error('Deleting Category Error:', error);
      res.status(500).json({ error: 'Internal Server Error!' });
    }

  });

  // Admin Get all Category Route
  router.get('/admin/get-allcategories', adminAuthn, async (req, res) => {

    try {

      // Get all Categories
      const allCategories = await CategoryModel.findAll({
        deleted: false,
        },
        {
        where: { 
            order: [['id','DESC']]
        }
        });
        if(!allCategories){
          res.status(401).json({ error: 'Error While Fetching Categories!' });
        }else{
          res.status(200).json({ message: 'Categories Fetched Successfully!', allCategories });
        }

    } catch (error) {

      console.error('Fetching Categories Error:', error);
      res.status(500).json({ error: 'Internal Server Error!' });

    }
    
  });
  
  
  module.exports = router;
  