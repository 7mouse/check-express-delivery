const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getLogisticsInformation = function(number, type, successFun, failFun) {
  let query = "";
  if (number) {
    query = "?no="+number
    if (type) {
      query = "&type="+type
    }
    wx.request({
      url: `http(s)://wuliu.market.alicloudapi.com/kdi?no=`+number+`&type=`+type,
      method: 'GET',
      header: {
        'Authorization': 'APPCODE 1eb6a5d788e24b1bafca11c0dfbcb67d'
      },
      success: successFun,
      fail: failFun
    })
  } else {
    wx.showToast({
      title: '请输入号码',
      icon: 'warn',
      duration: 1500
    })
  }
}

module.exports = {
  formatTime: formatTime,
  getLogisticsInformation
}
