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
    deliverystatus: ["快递收件", "在途中", "正在派送", "已签收", "派送失败", "疑难件", "退件签收"]
  },
  getContent: function() {
    getLogisticsInformation(this.data.number,this.data.type, 
    function(res){
      this.setData({
        showInfo: true,
        infoTop: {
          "number": res.data.result.number,
          "name": res.data.result.expName,
          "status": this.data.deliverystatus[res.data.result.deliverystatus],
          "courier": res.data.result.courier,
          "courierPhone": res.data.result.courierPhone
        },
        list: res.data.result.list
      })
    },
    function(){
      wx.showToast({
        title: '查询失败',
        icon: 'warn',    //如果要纯文本，不要icon，将值设为'none'
        duration: 2000     
      })  
    })
    // console.log(this.data.number, this.data.array[this.data.index]);



    // let res = {}
    // res.data = {
    //   "status": "0",/* status 0:正常查询 201:快递单号错误 203:快递公司不存在 204:快递公司识别失败 205:没有信息 207:该单号被限制，错误单号 */
    //   "msg": "ok",
    //   "result": {
    //     "number": "780098068058",
    //     "type": "zto",
    //     "list": [{
    //       "time": "2018-03-09 11:59:26",
    //       "status": "【石家庄市】快件已在【长安三部】 签收,签收人: 本人,感谢使用中通快递,期待再次为您服务!"
    //     }, {
    //       "time": "2018-03-09 09:03:10",
    //       "status": "【石家庄市】 快件已到达 【长安三部】（0311-85344265）,业务员 容晓光（13081105270） 正在第1次派件, 请保持电话畅通,并耐心等待"
    //     }, {
    //       "time": "2018-03-08 23:43:44",
    //       "status": "【石家庄市】 快件离开 【石家庄】 发往 【长安三部】"
    //     }, {
    //       "time": "2018-03-08 21:00:44",
    //       "status": "【石家庄市】 快件到达 【石家庄】"
    //     }, {
    //       "time": "2018-03-07 01:38:45",
    //       "status": "【广州市】 快件离开 【广州中心】 发往 【石家庄】"
    //     }, {
    //       "time": "2018-03-07 01:36:53",
    //       "status": "【广州市】 快件到达 【广州中心】"
    //     }, {
    //       "time": "2018-03-07 00:40:57",
    //       "status": "【广州市】 快件离开 【广州花都】 发往 【石家庄中转】"
    //     }, {
    //       "time": "2018-03-07 00:01:55",
    //       "status": "【广州市】 【广州花都】（020-37738523） 的 马溪 （18998345739） 已揽收"
    //     }],
    //     "deliverystatus": "3", /* 0：快递收件(揽件)1.在途中 2.正在派件 3.已签收 4.派送失败 5.疑难件 6.退件签收  */
    //     "issign": "1",                      /*  1.是否签收                  */
    //     "expName": "中通快递",              /*  快递公司名称                */       
    //     "expSite": "www.zto.com",           /*  快递公司官网                */
    //     "expPhone": "95311",                /*  快递公司电话                */
    //     "courier": "容晓光",                /*  快递员 或 快递站(没有则为空)*/
    //     "courierPhone":"13081105270",       /*  快递员电话 (没有则为空)     */
    //     "updateTime":"2019-08-27 13:56:19", /*  快递轨迹信息最新时间        */
    //     "takeTime":"2天20小时14分",         /*  发货到收货消耗时长 (截止最新轨迹)  */
    //     "logo":"https://img3.fegine.com/express/zto.jpg" /* 快递公司LOGO */
    //   }
    // }
    
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
  }
})
