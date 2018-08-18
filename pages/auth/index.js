import {createLog, setUserInfo} from '../../utils/log/index.js'
const log = createLog('auth') // 传入值可填，用于区分所在页面或组件

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function() {
    log.I('打开授权页面')
    if(!this.canIUse){
      log.E('微信版本过低，无法授权')
    }
    // 查看是否授权
    wx.getSetting({
      success: (res) => {
        log.I('授权完成', {res})
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: (res) => {
              log.I('授权完成', {res})
              setUserInfo(res.userInfo)
              this.goToOtherKitty()
            }
          })
        }
      }
    })
  },
  bindGetUserInfo: function(e) {
    log.I('点击获取授权完成，准备跳转', {detail: e.detail})
    setUserInfo(e.detail.userInfo)
    this.goToOtherKitty()
  },
  goToOtherKitty: function(){
    wx.redirectTo({
      url: '/pages/index/index'
    })
  }
})