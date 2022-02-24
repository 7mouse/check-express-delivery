
var bmap = require('../libs/bmap-wx.min.js'); 
let position = []
var wxMarkerData = []; 
const app = getApp()
var BMap = new bmap.BMapWX({ 
  ak: '' 
}); 

function setPosition(address) {

  for (let i = 0; i < address.length; i++) {
      BMap.geocoding({ 
        address: address[i], 
        fail: function(data) { 
          console.log(data) 
        },
        success: function(data) { 
          wxMarkerData = data.wxMarkerData; 
          app.position.push({
            latitude: wxMarkerData[0].latitude,
            longitude: wxMarkerData[0].longitude
          })
         }
      });
  }
  setTimeout(function(){
    console.log(app.position);
  }, 2000);
}

module.exports = {
  setPosition
}