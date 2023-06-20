const express = require('express');
const bcrypt = require('bcrypt');
const { adminAuthn } = require('../../auth/authentication')
const { UserModel } = require('../../models/index');

const router = express.Router();

  router.post('/admin/create-user', adminAuthn,  async (req, res) => {

    try {
      const { name, email, password, role } = req.body;
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new User
      const newUser = await UserModel.create({ name, email, password: hashedPassword, role });
      if(!newUser){
        res.status(401).json({ error: 'Error While Creating User!' });

      }else{
        res.status(200).json({ message: 'User Registered Successfully!' });
      }

    } catch (error) {

      console.error('Registration Error:', error);
      res.status(500).json({ error: 'Internal Server Error!' });

    }
  });

  router.post('/admin/update-user', adminAuthn, async (req, res) => {

    try {
      const { body } = req;
      const { id } = body;
      // Update User
      const updateUser = await UserModel.update( body, { 
        where:{
           id
          }
      });

      if(!updateUser){
        res.status(401).json({ error: 'Error While Updating User!' });
      }else{
        res.status(200).json({ message: 'User Updated Successfully!' });
      }

    } catch (error) {

      console.error('Updating User Error:', error);
      res.status(500).json({ error: 'Internal Server Error!' });
    }

  });

  router.post('/admin/delete-user', adminAuthn, async (req, res) => {

    try {
      const { id } = req.body;
      // Delete User
      const deletedUser = await UserModel.update({
          deleted: true
        },
        {
          where: { id } 
      });
      if(!deletedUser){
        res.status(401).json({ error: 'Error While Deleting User!' });
      }else{
        res.status(200).json({ message: 'User Deleted Successfully!' });
      }
      
    } catch (error) {

      console.error('Deleting User Error:', error);
      res.status(500).json({ error: 'Internal Server Error!' });
    }

  });

  router.get('/admin/get-allusers', adminAuthn, async (req, res) => {

    try {
      // Get all User
      const allUsers = await UserModel.findAll({
        order: [['id','ASC']]
      });
        if(!allUsers){
          res.status(401).json({ error: 'Error While Fetching Users!' });
        }else{
          res.status(200).json({ message: 'Users Fetched Successfully!', allUsers });
        }

    } catch (error) {

      console.error('Fetching Users Error:', error);
      res.status(500).json({ error: 'Internal Server Error!' });

    }
    
  });
  
  
  module.exports = router;
  