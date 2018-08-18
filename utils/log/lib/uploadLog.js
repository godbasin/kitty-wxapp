import {
    getLogs,
    getDateTimeString,
    clearKeys
} from "./logUtils"
import data, {
    UploadOriginMap
} from '../data'

let isLogUploading = false

/**
 * 初始化日志上传，添加截屏事件监听
 */
export function uploadLogInit() {
    if (wx.onUserCaptureScreen) {
        // 截屏时上报
        wx.onUserCaptureScreen(function (res) {
            uploadLog('SCREENSHOT')
        })
    } else {
        console.error('基础库 1.4.0 开始支持截屏事件')
    }
}

/**
 * 上传日志
 */
export function uploadLog(uploadOrigin) {
    // 若上传中，则锁定，此处不维护队列
    if (isLogUploading) {
        return
    }
    // 获取网络信息
    wx.getNetworkType({
        success: function (res) {
            // 返回网络类型, 有效值：
            // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
            const networkType = res.networkType
            // 获取设备信息
            wx.getSystemInfo({
                success: systemInfo => {
                    let {
                        logRecords,
                        logKeys
                    } = getLogs()
                    isLogUploading = true
                    const db = wx.cloud.database()
                    db.collection('logs').add({
                        data: {
                            userInfo: data.userInfo,
                            uploadClientTime: getDateTimeString(new Date()),
                            systemInfo: {
                                ...systemInfo,
                                networkType
                            },
                            uploadOrigin: UploadOriginMap[uploadOrigin],
                            logs: logRecords
                        }
                    }).then(res => {
                        clearKeys(logKeys)
                        isLogUploading = false
                    }).catch(err => {
                        isLogUploading = false
                    })
                }
            })
        }
    })
}