/**!
 * 记录日志缓存
 * @author jameszuo
 * @description 如果你使用 lib/log.js 来记录日志，并且开启了 CACHE_LOG 配置，那么日志将会自动滚动记录到本地 storage 中，随后可通过 getCompressLog() 得到压缩过的日志字符串，可自行提交到某个服务器上
 * @example
 *   import {getCompressedLog} from "../lib/log-cache"
 *   let logStr = getCompressedLog()
 */

import data, {LOG_CACHE_COUNT_LIMIT, LOG_CACHE_ITEM_SIZE_LIMIT, LOG_STORAGE_KEY_PREFIX} from '../data'
import {getDateTimeString, getLogKeys, removeKeys, clearKeys, newLogKey, toString} from './logUtils'
import { uploadLog } from './uploadLog';

let logKeys = null

/**
 * 记录日志缓存
 * @param {...*} args
 * @description 单条日志长度限制在1000个字符，达到特定数量后会自动滚动，删除旧的日志
 */
export const addCache = (type, ...args) => {
    let d = new Date()
    let logRecord = {
        ts: getDateTimeString(d),
        type: type
    }

    let key = newLogKey(type)

    try {
        // 写入本地
        logRecord.content = `${args.map(a => toString(a)).join(' ')}`.substr(0, LOG_CACHE_ITEM_SIZE_LIMIT)
        wx.setStorage({
            key: key,
            data: logRecord
        })
    }
    catch (e) {
        // 写入失败
        logRecord.content = `set storage error`
        console.error(logRecord.content)
        wx.setStorage({
            key: key,
            data: logRecord
        })
    }

    // 读取缓存数据
    if (logKeys === null) {
        logKeys = getLogKeys()
        data.errorNum = logKeys.filter(x => x.indexOf('ERROR') > -1).length
    }else {
        logKeys = getLogKeys()
    }

    logKeys.push(key)

    // 若日志数量已超出，则删除旧的日志
    let countOverflow = logKeys.length - LOG_CACHE_COUNT_LIMIT
    if (countOverflow > 0) {
        removeKeys(logKeys.splice(0, countOverflow))
        // console.log('logKeys after remove', logKeys)
    }
    // console.log('addCacha', {logKeys})
    wx.setStorage({
        key: LOG_STORAGE_KEY_PREFIX,
        data: logKeys.join(' ')
    })

    // 若日志等级为错误，记录出错数
    if(type == 'ERROR'){
        data.errorNum = data.errorNum + 1
    }

    // 若错误数大于设定值，则上传日志
    if(data.errorNum > data.uploadErrorNum){
        uploadLog('ERROR_THRESHOLD')
    }
}
