// 错误日志阈值上报
export const LOG_CACHE_ERROR_UPLOAD_LIMIT = 5
// 本地缓存的日志条数上限
export const LOG_CACHE_COUNT_LIMIT = 100
// 本地缓存的日志单条长度上限
export const LOG_CACHE_ITEM_SIZE_LIMIT = 1000

// 缓存前缀
export const LOG_STORAGE_KEY_PREFIX = 'X-LOG-CACHE-'

export default {
    userInfo: '',
    uploadErrorNum: LOG_CACHE_ERROR_UPLOAD_LIMIT, // 上报
    errorNum: 0 // 错误日志数
}

export const UploadOriginMap = {
    'SCREENSHOT': '截屏上报', // 1.截屏上报
    'ERROR_THRESHOLD': '错误日志阈值上报', // 2.错误日志阈值上报
    'SPECIFIC': '特定场景上报（待定）' // 3.特定场景上报（待定）
}