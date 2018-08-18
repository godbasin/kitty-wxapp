
import data, {LOG_STORAGE_KEY_PREFIX} from '../data'

/**
 * 获取日志信息
 * @returns {logRecords, logKeys} {日志数组, key数组}
 */
export const getLogs = () => {
    const logKeys = getLogKeys()
    const logRecords = logKeys.map(k => wx.getStorageSync(k))
    logRecords.sort((a, b) => a.ts > b.ts ? 1 : (a.ts < b.ts ? -1 : 0))
    return {
        logRecords,
        logKeys
    }
}

/**
 * 转字符串
 * @returns {string}
 */
export const toString = (a) => {
    let s = Object.prototype.toString.call(a)
    if (s === '[object Object]' || s === '[object Array]') {
        return JSON.stringify(a)
    }
    else {
        return a
    }
}

/**
 * 获取日志key数组
 * @returns {array} 日志key数组
 */
export const getLogKeys = () => {
    return wx.getStorageSync(LOG_STORAGE_KEY_PREFIX).split(' ').filter(x => x.length > 0)
}

/**
 * 获取日志key数组
 * @returns {array} 日志key数组
 */
export const removeKeys = (keys) => {
    setTimeout(() => {
        keys.forEach(key => wx.removeStorage({key}))
    }, 0)
    const logKeys = getLogKeys()
    const leftKeys = logKeys.filter(x => keys.indexOf(x) == -1)
    wx.setStorageSync(LOG_STORAGE_KEY_PREFIX, leftKeys.join(' '))
}

/**
 * 清除日志key
 */
export const clearKeys = (keys = getLogKeys()) => {
    removeKeys(keys)
    data.errorNum = 0
}

/**
 * 创建日志key
 * @returns {string}
 */
export const newLogKey = (type) => LOG_STORAGE_KEY_PREFIX + (type ? `-${type}` : '') + new Date().getTime().toString(36).toUpperCase() + '-' + Math.round(Math.random() * 1000).toString(36).toUpperCase()

/**
 * 时间个位数补零
 * @returns {string}
 */
export const formatTimeNumber = n => (n < 10 ? `0${n}` : n)

/**
 * 格式化时间，yy-MM-dd hh:mm:ss.ms
 * @returns {string}
 */
export const getDateTimeString = (d = new Date()) => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${formatTimeNumber(d.getHours())}:${formatTimeNumber(d.getMinutes())}:${formatTimeNumber(d.getSeconds())}.${d.getMilliseconds()}`

/**
 * 格式化时间，hh:mm:ss
 * @returns {string}
 */
export const getTimeString = () => {
    const d = new Date()
    return `${formatTimeNumber(d.getHours())}:${formatTimeNumber(d.getMinutes())}:${formatTimeNumber(d.getSeconds())}`
}

let isDevTools = false
try {
    wx.getSystemInfo({
        success(res) {
            isDevTools = res.platform.toLowerCase() === 'devtools'
        }
    })
} catch (e) {}

export {isDevTools}