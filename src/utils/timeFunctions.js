const CurrentTime = async()=>{
    const currentTime = new Date();
    const options = { hour: 'numeric', minute: 'numeric', hour12: false };
    const formattedTime = currentTime.toLocaleString('en-US', options);

    return formattedTime;
}

module.exports = {
    CurrentTime
}