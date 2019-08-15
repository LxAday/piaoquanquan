//app.js

//导入公共函数模块
import {Api} from '/utils/util';

App({
    data: {
        urlTop: 'https://wx.lx-blog.cn/',
        //授权秘钥
        secretKey: 'fe8684fa9acc2bbb00f5be238962b390d9b30a18',
    },
    globalData: {
        userInfo: null,
        key: '',
        urlApi: 'https://wx.lx-blog.cn/api/',
        userId: 'a'
    },
    onLaunch: function () {
        // 展示本地存储能力
        let logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
            }
        })
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo
                            this.globalData.userId = res.signature
                            //接口授权
                            let ress = Api(this.data.urlTop + 'accredit?secretKey=' + this.data.secretKey + '&userId=' + this.globalData.userId, 'get');
                            ress.then((resolve, reject) => {
                                if (resolve.code !== -1) {
                                    this.globalData.key = resolve.data.key
                                    // 由于 Api 是网络请求，可能会在 Page.onLoad 之后才返回
                                    // 所以此处加入 callback 以防止这种情况
                                    if (this.keyCallback) {
                                        this.keyCallback(resolve.data.key)
                                    }
                                } else {
                                    console.log(reject)
                                    wx.showToast({
                                        title: '加载失败',
                                        icon: 'none',
                                        duration: 1000,
                                        mask: true
                                    })

                                }
                            })

                        },
                        fail(res) {
                            console.log(res)
                            wx.showToast({
                                title: '加载失败',
                                icon: 'none',
                                duration: 1000,
                                mask: true
                            })
                        }
                    })
                }
            }
        });


    }
})