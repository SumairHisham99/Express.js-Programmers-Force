const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const localStorage = require('localStorage');
const { literal, Op } = require('sequelize');
const { userAuthn } = require('../../auth/authentication');
const { UserModel, TimeRecordModel, AttendanceModel } = require('../../models/index');
const { IpConvert_IpCheck, CurrentTime } = require('../../utils/index');

const router = express.Router();

router.post('/user/login', async (req, res) => {
    try {

        if (localStorage.getItem('userToken')) {
            return res.status(401).json({ error: 'User already logged in' });
        };
        
        const { email, password } = req.body;

        // Find the user by email
        const user = await UserModel.findOne({ where: { email } });
        if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid email or password' });
        }

        //   Get Client IP Adress
        const clientIP = req.headers['x-forwarded-for']?.split(',').shift() || req.socket?.remoteAddress;

        console.log(clientIP)

        // Convert ip to v4 and get currenttime
        const ipMatchedObj = await IpConvert_IpCheck(clientIP);
        console.log("ip ", ipMatchedObj)

        // Get Login time
        const timeIn = await CurrentTime();
        
        // Update time records table against User ID
        let newSession = '';
        if (ipMatchedObj){
             newSession = await TimeRecordModel.create({
                userId: user.id,
                loginTime: literal("DATE_FORMAT(NOW(), '%H:%i')"),
                hostName: ipMatchedObj.hostName,
                ipId: ipMatchedObj.ip_id
            });
        }else{
            // for localhost ip check => temporary
            newSession = await TimeRecordModel.create({
                userId: user.id,
                loginTime: literal("DATE_FORMAT(NOW(), '%H:%i:%s')"),
                hostName: "localhost",
                ipId: null
            });
        }

        if(!newSession){
            res.status(401).json({error: `Couldn't Update Login Time!`})
        }

        // Generate a JWT token
        const token = jwt.sign({ user_id: user.id }, 'User-Authn', { expiresIn: '1h' });

        // Set the token in the headers
        res.setHeader('Authorization', `Bearer ${token}`);

        // Set the token in the localstorage
        localStorage.setItem('userToken', `Bearer ${token}`);

        // Send the token in the response
        res.json({ token });

    } catch (error) {
        
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }

  });
  
  router.post('/user/logout', userAuthn, async (req, res) => {
    try {
        const userId = req.user.user_id;

        const time = await TimeRecordModel.findOne({
            where: {
                userId,
                logoutTime: {
                    [Op.is]: null
                }
            },
            attributes: ['loginTime']
        });

        if(!time){
            res.status(401).json({error: `Couldn't Fetch Time!`})
        }

        const loginTime = time.loginTime;

        // Update time records table against User ID
        const updateSession = await TimeRecordModel.update({
                logoutTime: literal("DATE_FORMAT(NOW(), '%H:%i:%s')"),
                totalTime:literal('TIMEDIFF(logout_time, login_time)')
            },{
                where: {
                    userId,
                    logoutTime: {
                        [Op.is]: null
                    }
                }
            });
        
        if(!updateSession){
            res.status(401).json({error: `Couldn't Update Logout Time!`})
        };

        const token = '';

        // Remove the token in the headers
        res.setHeader('Authorization', `Bearer ${token}`);
        // Remove the token in the localstorage
        localStorage.removeItem(`userToken`);
        console.log("LoggedOut!")

        // Send the token in the response
        res.json({ token });

    } catch (error) {
        
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }

  });

//   router.post('/user/checking', async (req, res) => {
//     try {
//         const results = await TimeRecordModel.findAll({
//             attributes: [
//               'userId',
//               'date',
//               [
//                   literal("SEC_TO_TIME(SUM(CASE WHEN host_name = 'remote' THEN TIME_TO_SEC(total_time) ELSE 0 END))"),
//                   'remoteTotalTime'
//               ],
//               [
//                   literal("SEC_TO_TIME(SUM(CASE WHEN host_name = 'onsite' THEN TIME_TO_SEC(total_time) ELSE 0 END))"),
//                   'onsiteTotalTime'
//               ],
//               [
//                   literal("TIME_FORMAT(SEC_TO_TIME(SUM(TIME_TO_SEC(total_time))), '%H:%i:%s')"),
//                   'totalTimeSum'
//               ]
//             ],
//             group: ['userId', 'date']
//           });

//           let promises = [];
//           let markAttendance = '';
//           results.forEach(result => {
//             result.dataValues.markAttendance = '';

//             console.log(result.dataValues.date)

//             const [totalHours, totalMinutes] = result.dataValues.totalTimeSum.split(':');
//             const [onsiteHours] = result.dataValues.onsiteTotalTime.split(':');
            
//             if (totalHours > 7 && totalMinutes > 30 ){
//               if ( onsiteHours < 3 ){
//                 result.dataValues.markAttendance = 'absent';
//               } else if ( onsiteHours < 5 ){
//                 result.dataValues.markAttendance = 'half day';
//               } else if ( onsiteHours >= 5 ){
//                 result.dataValues.markAttendance = 'present';
//               }
//             }else{
//                 result.dataValues.markAttendance = 'absent'
//             };
//             console.log(result.dataValues)
//             promises.push(
//               AttendanceModel.create({
//                 userId: result.userId,
//                 attendance: result.dataValues.markAttendance,
//                 date: result.dataValues.date,
//                 remoteHours: result.dataValues.remoteTotalTime,
//                 onsiteHours: result.dataValues.onsiteTotalTime,
//                 totalHours: result.dataValues.totalTimeSum
//               })
//             );
//           });
          
//           await Promise.all(promises);
          
//           res.json('success')
//           console.log('Attendance records created successfully');

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Error occured while fetching time record data!' });
//     }
    
// });
  
  module.exports = router;