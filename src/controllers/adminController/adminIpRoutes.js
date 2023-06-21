const express = require('express');
const { adminAuthn } = require('../../auth/authentication')
const { IpModel } = require('../../models/index');

const router = express.Router();

// Admin Register IP Route
  router.post('/admin/register-ip', adminAuthn, async (req, res) => {

    try {
      const { body } = req;

      // Create a new IP
      const newIp = await IpModel.create(body);
      if(!newIp){
        res.status(401).json({ error: 'Error While Creating IP Adress!' });

      }else{
        res.status(200).json({ message: 'IP Adress Created Successfully!' });
      }

    } catch (error) {

      console.error('IP Adress Creation Error:', error);
      res.status(500).json({ error: 'Internal Server Error!' });

    }
  });

  // Admin Update IP Route
  router.post('/admin/update-ip', adminAuthn, async (req, res) => {

    try {
      const { body } = req;
      const { id } = body;

      // Update IP
      const updatedIp = await IpModel.update( body, { 
        where:{
           id
          }
      });
      console.log(updatedIp)
      if(!updatedIp){
        res.status(401).json({ error: 'Error While Updating IP!' });
      }else{
        res.status(200).json({ message: 'IP Updated Successfully!' });
      }

    } catch (error) {

      console.error('Updating IP Error:', error);
      res.status(500).json({ error: 'Internal Server Error!' });
    }

  });

  // Admin Delete IP Route
  router.post('/admin/delete-ip', adminAuthn, async (req, res) => {

    try {
      const { id } = req.body;
      
      // Delete IP
      const deletedIp = await IpModel.update({
          deleted: true
        },
        {
          where: { id } 
      });
      if(!deletedIp){
        res.status(401).json({ error: 'Error While Deleting IP!' });
      }else{
        res.status(200).json({ message: 'IP Deleted Successfully!' });
      }
      
    } catch (error) {

      console.error('Deleting IP Error:', error);
      res.status(500).json({ error: 'Internal Server Error!' });
    }

  });

  // Admin Get all IP Route
  router.get('/admin/get-allip', adminAuthn, async (req, res) => {

    try {

      // Get all IP's
      const allip = await IpModel.findAll({
        deleted: false,
        },
        {
        where: { 
            order: [['id','DESC']]
        }
        });
        if(!allip){
          res.status(401).json({ error: `Error While Fetching IP's!` });
        }else{
          res.status(200).json({ message: `IP's Fetched Successfully!`, allip });
        }

    } catch (error) {

      console.error(`Fetching IP's Error:`, error);
      res.status(500).json({ error: 'Internal Server Error!' });

    }
    
  });
  
  
  module.exports = router;
  