import {uploadLogInit} from './uploadLog'
import data from '../data'

let isInit = false

/**
 * @param {appid, openid}
 * @description 初始化日志
 */
export function initLog(){
    if(isInit) {
        return
    }
    uploadLogInit()
    isInit = true
}

export function setUserInfo(userInfo) {
    data.userInfo = userInfo
}