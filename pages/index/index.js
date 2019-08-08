//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        scrollTopOn: 'none',
        scrollTopNum: 587,
    },
    //监听滚动条
    onPageScroll: function ({scrollTop}) {
        if (scrollTop <= this.data.scrollTopNum / 2) {
            this.setData({
                scrollTopOn: 'none'
            });
        } else if (scrollTop >= this.data.scrollTopNum) {
            this.data.scrollTopNum = scrollTop;
            this.setData({
                scrollTopOn: 'block'
            });
        }
    },
    goTop() {
        wx.pageScrollTo({
            scrollTop: 0
        });
    }
})
