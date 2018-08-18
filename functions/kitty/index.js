const app = require('@tencent/tcb-admin-node')

app.init({
    envName: 'kitty-deleted-b67cdb',
    mpAppId: 'wx5b279a8d3e23aa58'
});
const db = app.database();
const kittyCollection = db.collection('kitty');
const myKittyCollection = db.collection('my-kitty');

async function getKittyNum() {
    const kittyList = await kittyCollection.get();
    return (kittyList || []).length;
}

const getRandomKitty = async () => {
    const kittyList = await kittyCollection.get();
    const len = (kittyList || []).length;
    return kittyList[Math.floor(Math.random() * len)]
}

exports.main = (event, context) => {
  console.log({ event, context})
    const openId = userInfo.openId
  return { event, context}
    // return new Promise((resolve, reject) => {
    //     kittyCollection.where({
    //         _openid: openId
    //       }).orderBy("name", "desc").get().then(res => {
    //         console.log('数据库返回我的猫数据：db.collection("my_kitty").get()', {res})
    //         const kittyList = res.data;
    //         app.getTempFileURL({
    //           fileList: kittyList.map(x => {return {
    //             fileID: x.fileID,
    //             maxAge: 60 * 60
    //           }})
    //         }).then(r => {
    //           console.log('查询文件存储获取路径：app.getTempFileURL', {r})
    //           resolve(r.fileList.map(x => {
    //             return {
    //               url: x.tempFileURL,
    //               date: formatTime(new Date(kittyList.find(y => y.fileID == x.fileID).time))
    //             }
    //           }))
    //         }).catch(error => {
    //           console.log('查询文件存储获取路径失败：wx.cloud.getTempFileURL', {error})
    //           // handle error
    //           reject(error)
    //         })
    //       })
    // })
}

// 查看文件
async function read(appid) {
    let result = await app.getTempFileURL({
        fileList: [{
            fileID: getRandomKitty().fileID,
            maxAge: 60
        }]
    });
    return result;
}