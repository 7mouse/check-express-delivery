//index.js
//获取应用实例
const {getLogisticsInformation} = require('../../utils/util')
const app = getApp()

Page({
  data: {
    navbarData: {
      show: false
    },
    number: "",
    type: "",
    objectArray: [
      {
        id: 0,
        name: '无'
      },
      {
        id: 1,
        name: '顺丰'
      },
      {
        id: 2,
        name: '圆通'
      },
      {
        id: 3,
        name: '中通'
      },
      {
        id: 4,
        name: '汇通快递'
      },
      {
        id: 5,
        name: '韵达'
      },
      {
        id: 6,
        name: '京东'
      },
      {
        id: 7,
        name: 'EMS'
      }
    ],
    index: 0,
    array: [
      "SFEXPRESS",
      "STO",
      "YTO",
      "ZTO",
      "HTKY",
      "YUNDA",
      "JD",
      "EMS" 
    ],
    infoTop: {},
    list: [],
    showInfo: false,
    deliverystatus: ["快递收件", "在途中", "正在派送", "已签收", "派送失败", "疑难件", "退件签收"],
    res: {}
  },
  getContent: function() {
    const that = this
    let url = `https://wuliu.market.alicloudapi.com/kdi`
    // if(that.data.type) {
    //   url += `&type=`+that.data.type
    // }
    console.log(url);
    let query = "";
    if (that.data.number) {
      query += "?no="+that.data.number
      if (that.data.type) {
        query += "&type="+that.data.type
      }
      url+= query
      console.log("开始查询");
      
      wx.request({
        url: url,
        method: 'GET',
        header: {
          // 'content-type': 'application/json',        
          'Authorization': 'APPCODE 1eb6a5d788e24b1bafca11c0dfbcb67d'
        },
        success: function(res){
          if(res.status != '205')
          {
            wx.showToast({
              title: '查询成功',
              content: res,
              icon: 'warn',    //如果要纯文本，不要icon，将值设为'none'
              duration: 2000     
            }) 
            app.list = res.data.result.list;
            that.setData({
              infoTop: {
                "number": res.data.result.number ,
                "name": res.data.result.expName,
                "status": that.data.deliverystatus[res.data.result.deliverystatus] ,
                "courier": res.data.result.courier,
                "courierPhone": res.data.result.courierPhone
              },
              res: res,
              list: res.data.result.list
            })
            if(that.data.list) {
              that.setData({
                showInfo: true
              })
              wx.navigateTo({
                url: '/pages/map/map',
              })
            }
          }
          if (res.data.status == '205') {
            wx.showToast({
              title: '未查询到',
              icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
              duration: 2000     
            }) 
          }
        },
        fail: function(e){
          wx.showToast({
            title: '查询错误',
            icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
            duration: 2000     
          })  
        }
      })
    } else {
      wx.showToast({
        title: '查询错误',
        content: '请确认订单号',
        icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
        duration: 2000     
      }) 
    }
  },
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
  },
  bindNumber(e) {
    this.setData({
      number: e.detail.value
    })
  },
  bindScan(e) {
    let that = this
    wx.scanCode({
      onlyFromCamera: false,
      scanType:['qrCode'],
      success: function(res) {
        that.setData({
          number: res.result
        })
        console.log(res);
      },
      fail: function() {
        wx.showToast({
          title: '扫码失败',
          duration: 2000,
          icon: 'none'
        })
      }
    })
  }
})
