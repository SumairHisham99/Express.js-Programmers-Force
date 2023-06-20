const cron = require('node-cron');
const {AttendanceModel, TimeRecordModel} = require('../models')

async function attendanceFunction(){
    try {
        const results = await TimeRecordModel.findAll({
            attributes: [
              'userId',
              'date',
              [
                  literal("SEC_TO_TIME(SUM(CASE WHEN host_name = 'remote' THEN TIME_TO_SEC(total_time) ELSE 0 END))"),
                  'remoteTotalTime'
              ],
              [
                  literal("SEC_TO_TIME(SUM(CASE WHEN host_name = 'onsite' THEN TIME_TO_SEC(total_time) ELSE 0 END))"),
                  'onsiteTotalTime'
              ],
              [
                  literal("TIME_FORMAT(SEC_TO_TIME(SUM(TIME_TO_SEC(total_time))), '%H:%i:%s')"),
                  'totalTimeSum'
              ]
            ],
            group: ['userId', 'date']
          });

          let promises = [];
          let markAttendance = '';
          results.forEach(result => {
            result.dataValues.markAttendance = '';

            console.log(result.dataValues.date)

            const [totalHours, totalMinutes] = result.dataValues.totalTimeSum.split(':');
            const [onsiteHours] = result.dataValues.onsiteTotalTime.split(':');
            
            if (totalHours > 7 && totalMinutes > 30 ){
              if ( onsiteHours < 3 ){
                result.dataValues.markAttendance = 'absent';
              } else if ( onsiteHours < 5 ){
                result.dataValues.markAttendance = 'half day';
              } else if ( onsiteHours >= 5 ){
                result.dataValues.markAttendance = 'present';
              }
            }else{
                result.dataValues.markAttendance = 'absent'
            };
            console.log(result.dataValues)
            promises.push(
              AttendanceModel.create({
                userId: result.userId,
                attendance: result.dataValues.markAttendance,
                date: result.dataValues.date,
                remoteHours: result.dataValues.remoteTotalTime,
                onsiteHours: result.dataValues.onsiteTotalTime,
                totalHours: result.dataValues.totalTimeSum
              })
            );
          });
          
          await Promise.all(promises);
          
          res.json('success')
          console.log('Attendance records created successfully');

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error occured while fetching time record data!' });
    }
    
};

cron.schedule('0 0 * * *', async () => {
    await attendanceFunction();
  });