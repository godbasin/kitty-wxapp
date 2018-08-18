//index.js
import {createLog} from '../../utils/log/index.js'
const log = createLog('index') // 传入值可填，用于区分所在页面或组件

//获取应用实例
var app = getApp()
Page({
  data: {
    url: 'https://thecatapi.com/api/images/get?format=src&type=png&size=small'
  },
  onLoad: function() {
    log.I('打开别人的猫页面')
    // 查看是否授权
    wx.getSetting({
      success: (res) => {
        if (!res.authSetting['scope.userInfo']) {
          log.I('未授权，跳转授权')
          // 未授权，跳转授权
          wx.redirectTo({
            url: '/pages/auth/index'
          })
        }
      }
    })
  },
  refresh: function (event) {
    var timestamp = Date.parse(new Date());
    log.I('点击再来再来', {timestamp})
    this.setData({
      url: 'https://thecatapi.com/api/images/get?format=src&type=png&size=small' + '&timestamp=' + timestamp
    })
  },
  save: function() {
    console.log(this.url)
    wx.saveImageToPhotosAlbum({
      filePath: this.url,
      success(res) {
        wx.showToast({
          title: '保存成功'
        })
      },
      fail(res){
        console.log({res})
        wx.showToast({
          title: '保存失败',
          icon: 'none'
        })
      }
  })
  }
})

