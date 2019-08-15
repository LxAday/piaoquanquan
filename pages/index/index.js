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
        seniority: [],
        imgs: [],
        hot: [],
        classify: []
    },
    //监听滚动条
    onPageScroll: function ({scrollTop}) {
        if (scrollTop < 300) {
            this.setData({
                scrollTopOn: 'none'
            });
        } else {
            this.setData({
                scrollTopOn: 'block'
            });
        }
        if (scrollTop > this.data.scrollTopNum) {
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
                            this.data.open = true;
                            this.data.pageId += 1;
                            this.data.scrollTopNum = scrollTop + 900;
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
        if (wx.getStorageSync('get_ranking_list') && wx.getStorageSync('get_ranking_list') !== '') {
            this.setData({
                seniority: wx.getStorageSync('get_ranking_list')
            })
        } else {
            //判断key
            if (app.globalData.key && app.globalData.key !== '') {
                funcs.get_ranking_list(this);
            } else {
                //调用app的keyCallback属性
                app.keyCallback = key => {
                    //判断key
                    if (key !== '') {
                        funcs.top_search(this, 'hot', 'recommended-column')
                        funcs.top_search(this, 'classify', 'classification-of-icon')
                        funcs.get_ranking_list(this, 'imgs', 1, '', 5)
                        funcs.get_ranking_list(this, 'seniority', 3, '')
                    }
                }
            }
        }


        //定义页面方法集合
        let funcs = {
            get_ranking_list(event, objs, num = 1, cid = '', nu = 0) {
                let res = Api(app.globalData.urlApi + 'get-ranking-list?userId=' + app.globalData.userId + '&key=' + app.globalData.key + '&rankType=' + num + '&cid=' + cid + '&nu=' + nu);
                res.then((resolve, reject) => {
                    if (resolve.code !== -1) {
                        let obj = {};
                        obj[objs] = resolve.data
                        event.setData(obj)
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
            //推荐栏目   分类图标
            top_search(event, objs, url) {
                let res = Api(app.globalData.urlApi + url + '?userId=' + app.globalData.userId + '&key=' + app.globalData.key);
                res.then((resolve, reject) => {
                    if (resolve.code !== -1) {
                        let obj = {};
                        obj[objs] = resolve.data
                        event.setData(obj)
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
