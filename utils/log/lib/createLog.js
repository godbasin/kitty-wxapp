/**!
 * 记录日志
 * @description 打印可读性更高的日志，配合log-cache还可以上报日志到远程服务器
 * @example
 *   log.I(this, is, a, INFO)
 *   log.L(this, is, a, LOG)
 *   log.W(this, is, a, WARN)
 *   log.E(this, is, a, ERROR)
 */

import {uploadLog} from './uploadLog'
import {addCache} from './logCache'
import {isDevTools} from './logUtils'

const CSS_L = 'background-color: #21AC37; border-radius: 10px; padding: 2px 5px; color: #fff;'
const CSS_I = 'background-color: #59d77d; border-radius: 10px; padding: 2px 5px; color: #fff;'
const CSS_W = 'background-color: orange; border-radius: 10px; padding: 2px 5px; color: #fff;'
const CSS_E = 'background-color: red; border-radius: 10px; padding: 2px 5px; color: #fff;'

class Log {
    constructor(prefix = '') {
        this.pref = prefix
    }

    I(...args) {
        print('INFO', this.pref, CSS_I, args)
    }

    L(...args) {
        print('LOG', this.pref, CSS_L, args)
    }

    W(...args) {
        print('WARN', this.pref, CSS_W, args)
    }

    E(...args) {
        print('ERROR', this.pref, CSS_E, args)
    }

    // 手动上报，用于特殊场景定位上报（暂不提供）
    uploadLog() {
        uploadLog('SPECIFIC')
    }
}

const print = (type, pref, css, args) => {
    try {
        if (isDevTools) {
            let stack = new Error().stack
            stack = stack.split(/\n/)[3].trim().replace(/.*\((http:\/\/[^)]+)\).*/, '[$1]')
            console.log(`%c${pref}`, css, ...args, stack)
        } else {
            console.log(`[${type}] ${t()} [${pref}]`, ...args)
        }
    } catch (e) {
        // console.error('print log error', e)
    }

    try {
        addCache(type, pref, ...args)
    } catch (e) {
        console.error('cache log error', e)
    }
}

/**
 * @param prefix
 * @description prefix 不允许空格存在，正则移除
 * @returns {Log} log
 */
const createLog = prefix => new Log(prefix.replace(/\s+/g, ""))

export {createLog}
