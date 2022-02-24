
var {setPosition} = require('../../utils/map');
const app = getApp()
Page({ 
    data: { 
        list: {
            // 0: {time: "2020-06-08 19:52:32", status: "【内江市】您的快件已签收,签收人：已签收，如有疑问请电联快递员：刘文武【18808323162】。"},
            // 1: {time: "2020-06-08 14:40:59", status: "【内江市】四川资中县公司重龙镇便利店分部 快递员 刘文武18808323162 正在为您派件【95114/95121/9501395546为韵达快递员外呼专属号码，请放心接听】"},
            // 2: {time: "2020-06-08 13:51:44", status: "【内江市】已到达 四川资中县公司"},
            // 3: {time: "2020-06-08 07:39:21", status: "【成都市】已离开 四川成都分拨中心；发往 四川资中县公司"},
            // 4: {time: "2020-06-08 07:31:28", status: "【成都市】已到达 四川成都分拨中心"},
            // 5: {time: "2020-06-06 21:18:10", status: "【南京市】已离开 江苏南京分拨中心；发往 四川成都分拨中心"},
            // 6: {time: "2020-06-06 21:17:19", status: "【南京市】已到达 江苏南京分拨中心"},
            // 7: {time: "2020-06-06 15:47:12", status: "【南京市】江苏南京雨花台公司雨花体育中心服务部 已揽收"},
        },
        address: [],
        polyline: [{
            points: [
                {
                    longitude: 105.05799961481156,
                    latitude: 29.580200102199186
                },
                {
                    longitude:118.7959997119601,
                    latitude:32.05830027444024
                }
            ],
            color: "#ff6600",
            width: 2,
            dottedLine: false,
            arrowLine: true,
            borderColor:"#000",
            borderWidth:5
          }],
    }, 
    onLoad: function() { 
        this.setData({
            list: app.list
        })
        let patten = /【...】/;
        let A = [];
        let that = this
        for (let index in this.data.list) {
            A.push(patten.exec(this.data.list[index].status)[0])
        }
        
        this.setData({
            address: A
        })
        // console.log(this.data.address);
        
        setPosition(this.data.address);
        setTimeout(function(){
            let points = []
            for (let index in app.position) {
                points.push(app.position[index])    
            }
            // that.setData({
                
            // })
            // console.log(points);
            that.setData({
                polyline: [{
                    points: points,
                    color: "#ff6600",
                    width: 2,
                    dottedLine: false,
                    arrowLine: true,
                    borderColor:"#000",
                    borderWidth:5
                }]
            })
            console.log(that.data.polyline[0].points);
            
            // console.log(app.position);
        },3000);
        
        
    },
    regionchange(e) {
      console.log(e.type)
    },
    markertap(e) {
      console.log(e.detail.markerId)
    },
    controltap(e) {
      console.log(e.detail.controlId)
    }
})