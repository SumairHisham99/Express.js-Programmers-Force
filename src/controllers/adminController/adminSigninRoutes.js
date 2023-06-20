const express = require('express');
const localStorage = require('localStorage');
const { adminAuthn } = require('../../auth/authentication');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../../models/index');

const router = express.Router();

// Super Admin Login Route
router.post('/super-admin/login', async (req, res) => {
    try {

      // Check if admin already loggedin
      if (localStorage.getItem('adminToken')) {
        return res.status(401).json({ error: 'Admin already logged in' });
      };

      const { email, password } = req.body;
  
      const superAdmin = await UserModel.findOne({
        where: {
          email,
          password
        }
      });
  
      if (!superAdmin) {
        console.log('Incorrect email or password!');
        res.status(401).json('Incorrect Email or Password!');
      }

      // Generate a JWT token
      const token = jwt.sign({ user_id: superAdmin.id }, 'Admin-Authn', { expiresIn: '1h' });
      // Set the token in the headers
      res.setHeader('Authorization', `Bearer ${token}`);
      // Set the token in the localstorage
      localStorage.setItem('adminToken', `Bearer ${token}`);

      // Send the token in the response
      res.status(200).json({ token });

    } catch (error) {
      console.log('Couldn\'t Login as Super Admin', error);
      return res.status(500).send(error);
    }
  });

  // Super Admin Logout Route
  router.post('/super-admin/logout', adminAuthn, async (req, res) => {
    try {
        // Assign Token Null Value 
        const token = '';

        // Remove the token in the headers
        res.setHeader('Authorization', `Bearer ${token}`);
        // Remove the token in the localstorage
        localStorage.removeItem(`adminToken`);
        console.log("LoggedOut!")

        // Send the token in the response
        res.json({ token });

    } catch (error) {
        
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }

  });
  
  module.exports = router;
  