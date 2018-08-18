//index.js
import {
  createLog
} from '../../utils/log/index.js'
const log = createLog('upload') // 传入值可填，用于区分所在页面或组件
//获取应用实例
var app = getApp()
Page({
  data: {
    url: ''
  },
  onReady: function () {
    log.I('打开上传猫页面')
  },
  upload: function (event) {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: res => {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        tempFilePaths.forEach(x => {

          const arr = x.split('/')
          const fileName = arr[arr.length - 1];
          wx.cloud.uploadFile({
            cloudPath: fileName,
            filePath: x
          }).then(res => {
            wx.showToast({
              title: '上传成功'
            })
            this.setData({
              url: x
            })
            this.addKitty(res.fileID)
          }).catch(err => {
            log.E('上传图片失败', {
              err
            })
            wx.showToast({
              title: '上传失败',
              icon: 'none'
            })
          })
        })
      },
      fail: (err) => {
        log.E('上传图片失败：wx.chooseImage', {
          err
        })
      }
    })
  },
  addKitty: function (fileID) {
    const db = wx.cloud.database()
    db.collection('kitty').add({
      data: {
        fileID,
        time: new Date().getTime()
      }
    }).then(res => {
      log.I('添加 kitty 数据库成功', {
        res
      })
    }).catch(err => {
      log.E('添加 kitty 数据库失败', {
        err
      })
    })

    db.collection('my_kitty').add({
      data: {
        fileID,
        time: new Date().getTime()
      }
    }).then(res => {
      log.I('添加 my_kitty 数据库成功', {
        res
      })
    }).catch(err => {
      log.E('添加 my_kitty 数据库失败', {
        err
      })
    })
  }
})