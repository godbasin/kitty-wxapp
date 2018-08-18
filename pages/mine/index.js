//index.js
import {createLog} from '../../utils/log/index.js'
const log = createLog('mine') // 传入值可填，用于区分所在页面或组件

import {formatTime} from '../../utils/index.js'
//获取应用实例
var app = getApp()
Page({
  data: {
    kittyList: []
  },
  onReady: function () {
    log.I('打开我的猫页面')
    this.refresh()
  },
  refresh: function (event) {
    var kitty = this.getKitty().then(res => {
      log.I('获取我的猫', {res})
      this.setData({
        kittyList: res || []
      })
    }).catch(error => {
      log.E('获取我的猫失败', {error})
    })
  },
  getKitty: function () {
    return new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        // 要调用的云函数名称
        name: 'kitty',
        data: {}
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // getKitty: function () {
  //   const db = wx.cloud.database();
  //   return new Promise((resolve, reject) => {
  //     db.collection('my_kitty').get().then(res => {
  //       log.I('数据库返回我的猫数据：db.collection("my_kitty").get()', {res})
  //       const kittyList = res.data;
  //       wx.cloud.getTempFileURL({
  //         fileList: kittyList.map(x => {return {
  //           fileID: x.fileID,
  //           maxAge: 60 * 60
  //         }})
  //       }).then(r => {
  //         log.I('查询文件存储获取路径：wx.cloud.getTempFileURL', {r})
  //         resolve(r.fileList.map(x => {
  //           return {
  //             url: x.tempFileURL,
  //             date: formatTime(new Date(kittyList.find(y => y.fileID == x.fileID).time))
  //           }
  //         }))
  //       }).catch(error => {
  //         log.E('查询文件存储获取路径失败：wx.cloud.getTempFileURL', {error})
  //         // handle error
  //         reject(error)
  //       })
  //     })
  //   })
  // }
})