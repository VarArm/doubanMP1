function wxrequest(options) {
    return new Promise((reslove, reject) => {
        wx.request({
            url: options.url,
            method: options.method || 'get',
            data: options.data || {},
            header: options.header || {},
            success: function (res) {
                reslove(res)
            },
            fail: function (error) {
                reject(error)
            }
        })
    })
}

export default wxrequest
// {
//     url:
//       "https://autumnfish.cn/v2/movie/in_theaters?q=undefined&apikey=0df993c66c0c636e29ecbb5344252a4a",
//     data: {},
//     header: {
//       "content-type": "json"
//     },
//     success: res => {
//       console.log(res);
//     }
//   }