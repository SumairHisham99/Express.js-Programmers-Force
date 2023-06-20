const ipaddr = require('ipaddr.js');
const {IpModel} = require(`../models`)

// Convert ip6 ip address to ipv4 ip address
const IpConvert_IpCheck = async(clientIP)=>{

    try {

      let clientIpipv4 = null;
      const ip = ipaddr.parse(clientIP);

      if (clientIP ===  ('::1' || '127.0.0.1')){
        console.log("Ruuning on Local Machine!")

      } else if (ip.kind() === 'ipv6') {

        if (ip.isIPv4MappedAddress()) {
          clientIpipv4 = ip.toIPv4Address().toString();
        } else if (ip.kind() === 'ipv4') {
          clientIpipv4 = clientIP;
        }

      // Send converted address to IpCheck
      const ipMatchedObj = await IpCheck (clientIpipv4);
      return ipMatchedObj;
      }

    } catch (error) {

      console.error('Invalid IP address:', error);
    }
  
};

// Check if ip matches available ip addresses
  const IpCheck = async(ipv4ClientIp)=>{
    const onsiteIp = await IpModel.findAll({
      attributes: ['id', 'ip_address']
    });

    const trimmedIPs = {};
    // Trim onsite ip's address
    onsiteIp.forEach((ip) => {
      const ipAddress = ip.dataValues.ip_address;
      const lastDotIndex = ipAddress.lastIndexOf('.');
      const trimmedIP = ipAddress.substring(0, lastDotIndex);
      trimmedIPs[ip.dataValues.id] = trimmedIP;
    });

    // Trim client ip address
    const lastDotIndexOfClientIp = ipv4ClientIp.lastIndexOf('.');
    const trimmedClientIP = ipv4ClientIp.substring(0, lastDotIndexOfClientIp);

    let matchFound = '';
    // Iterate through each ip address
    for (let id in trimmedIPs) {
      const trimmedIP = trimmedIPs[id];

      if (trimmedClientIP === trimmedIP) {
        // IP address matched
        matchFound = true;
        matchedId = id;
        break; // Exit the loop since a match is found
      }
    };

    if (matchFound) {
      const ipMatchedObj = {
        ip_id: matchedId,
        hostName: "onsite"
      };
      return ipMatchedObj;

    } else {
      console.log("No IP address matched");
      const ipMatchedObj = {
        ip_id: null,
        hostName: "remote"
      };
      return ipMatchedObj;

    }
    };

module.exports = {
  IpConvert_IpCheck
}
