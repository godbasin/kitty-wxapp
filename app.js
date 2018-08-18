import {createLog, setUserInfo, initLog} from './utils/log/index.js'
initLog()
//app.js

App({
  onLaunch: function () {
    wx.cloud.init({
      env: 'kitty-deleted-b67cdb', // 这里填写环境的id，可以去云控制台的概览页去获取
      traceUser: true
    })
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              setUserInfo(res.userInfo)
            }
          })
        }
      }
    })
  }
})