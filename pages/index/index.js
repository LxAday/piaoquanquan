//index.js
import {Api} from '../../utils/util';
//获取应用实例
const app = getApp()

Page({
    data: {
        scrollTopOn: 'none',
        scrollTopNum: 410,
        list: [],
        num: 10,
        open: true,
        pageId: 1,
        seniority: []
    },
    //监听滚动条
    onPageScroll: function ({scrollTop}) {
        if (scrollTop <= this.data.scrollTopNum / 2) {
            this.setData({
                scrollTopOn: 'none'
            });
        } else if (scrollTop >= this.data.scrollTopNum - 10) {
            this.data.scrollTopNum = scrollTop;
            console.log(this.data.scrollTopNum)
            this.setData({
                scrollTopOn: 'block'
            });
            //懒加载商品列表
            if (this.data.open === true) {
                this.data.open = false;
                //获取商品列表
                //判断key与userId
                if (app.globalData.key && app.globalData.key !== '' && app.globalData.userId && app.globalData.userId !== '') {
                    let res = Api(app.globalData.urlApi + 'get-goods-list?userId=' + app.globalData.userId + '&pageId=' + this.data.pageId + '&pageSize=' + this.data.num + '&key=' + app.globalData.key + '&tmall=1', 'get');
                    res.then((resolve, reject) => {
                        if (resolve.code !== -1) {
                            this.setData({
                                list: this.data.list.concat(resolve.data.list)
                            })
                            console.log(this.data.list)
                            this.data.open = true;
                            this.data.pageId += 1;
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
                }
            }

        }
    },
    goTop() {
        wx.pageScrollTo({
            scrollTop: 0
        });
    },
    onLoad(query) {
        //判断key
        if (app.globalData.key && app.globalData.key !== '') {
            funcs.get_ranking_list(this);
        } else {
            //调用app的keyCallback属性
            app.keyCallback = key => {
                //判断key
                if (key !== '') {
                    funcs.get_ranking_list(this);
                }
            }
        }

        //定义页面方法集合
        let funcs = {
            get_ranking_list(event) {
                let res = Api(app.globalData.urlApi + 'get-ranking-list?userId=' + app.globalData.userId + '&key=' + app.globalData.key, 'get');
                res.then((resolve, reject) => {
                    if (resolve.code !== -1) {
                        event.setData({
                            seniority: resolve.data
                        })
                        console.log(event.data.seniority)
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
            }

        }

    },
    favorable({currentTarget}) {
        wx.navigateTo({
            url: '/pages/details/index?id=' + currentTarget.dataset.id
        });
    }
})
