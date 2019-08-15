const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

const Api = (url, method='get', data = []) => {
    return new Promise((resolve, reject) => {
        wx.request({
            url: url,
            method: method,
            data: data,
            success({data}) {
                if (data.code === 0) {
                    return resolve(data);
                }
                return resolve(-1);
            },
            fail(err) {
                return reject(err);
            }
        });
    });
}

module.exports = {
    formatTime: formatTime,
    Api
}