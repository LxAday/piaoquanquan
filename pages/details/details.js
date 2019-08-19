// pages/details/index.js
import {Api} from '../../utils/util';

const app = new getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [],
        commodity: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(app.globalData.key)
        //获取单品详情
        let res = Api(app.globalData.urlApi + 'get-goods-details?userId=' + app.globalData.userId + '&key=' + app.globalData.key + '&id='
            + options.id, 'get'
            )
        ;
        res.then((resolve, reject) => {
            if (resolve.code !== -1) {
                this.setData({
                    list: resolve.data.imgs.split(','),
                    commodity: resolve.data
                })
            } else {
                console.log(reject)
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})