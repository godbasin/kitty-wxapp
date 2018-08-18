//index.js
import {createLog} from '../../utils/log/index.js'
const log = createLog('read') // 传入值可填，用于区分所在页面或组件
//获取应用实例
var app = getApp()
Page({
  data: {
    url: ''
  },
  onReady: function() {
    log.I('打开我们的猫页面')
    this.refresh()
  },
  refresh: function (event) {
    var kitty = this.getKitty().then(kitty => {
      this.setData({
        url: kitty.fileList[0].tempFileURL        
      })
    }).catch(error => {
      // handle error
      log.E('获取图片失败：this.getKitty()', {error})
    })
  },
  getKitty: function () {
    const db = wx.cloud.database();
    return new Promise((resolve, reject) => {
      db.collection('kitty').get().then(res => {
        log.I('数据库返回我们的猫数据：db.collection("kitty").get()', {res})
        const kittyList = res.data;
        const len = (kittyList || []).length;
        const randomKitty = kittyList[Math.floor(Math.random() * len)] || {};
        wx.cloud.getTempFileURL({
          fileList: [{
            fileID: randomKitty.fileID,
            maxAge: 60 * 60
          }]
        }).then(item => {
          log.I('查询文件存储获取路径：wx.cloud.getTempFileURL', {item})
          resolve(item)
        }).catch(error => {
          // handle error
          log.E('获取图片失败：db.collection("kitty").get()', {error})
          reject()
        })
      })
    })
  }
})