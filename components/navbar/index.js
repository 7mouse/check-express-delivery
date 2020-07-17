// components/navbar/index.js
const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    navbarData: {
      type: Object,
      value: {show: true}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    height: app.globalData.height
  },
  attached: function () {
    // 获取是否是通过分享进入的小程序
    this.setData({
      share: app.globalData.share
    })
    // 定义导航栏的高度   方便对齐
    this.setData({
      height: app.globalData.height
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    _navback() {
      wx.navigateBack()
    },
    _backhome() {
      wx.navigateTo({
        url: '/pages/index/index'
      })
    }
  }
})
