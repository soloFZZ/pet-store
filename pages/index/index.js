//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    img_url_list: [],
    vedio_url_list: [],
    vedio_all: false,
    images_all: false,
  },
  onLoad: function () {
    var temp_img_url_arr = [];
    var temp_vedio_url_arr = [];
    var that = this;
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    wx.request({
      url:'https://pet-store-1256628689.cos.ap-chengdu.myqcloud.com',
      success: function (res) {
        var arr = res.data.match(/<Key>[^]*?<\/Key>+/g);
        for (let i = 0; i < arr.length; i++) {
          let file_name = arr[i].slice(5, -6);
          if (file_name.lastIndexOf('.jpeg') > -1 || file_name.lastIndexOf('.jpg') > -1 || file_name.lastIndexOf('.png') > -1 || file_name.lastIndexOf('.gif') > -1) {
            temp_img_url_arr.push("https://pet-store-1256628689.cos.ap-chengdu.myqcloud.com/" + file_name);
          } else if (file_name.lastIndexOf('.mp4') > -1 || file_name.lastIndexOf('.avi') > -1 || file_name.lastIndexOf('.rmvb') > -1 || file_name.lastIndexOf('.flash') > -1 || file_name.lastIndexOf('.mkv') > -1) {
            temp_vedio_url_arr.push("https://pet-store-1256628689.cos.ap-chengdu.myqcloud.com/" + file_name)
          }
        }
        that.setData({
          img_url_list: temp_img_url_arr,
          vedio_url_list: temp_vedio_url_arr
        })
      },
      fail: function (error) {
      }
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getMap: function (e) {
    wx.openLocation({
      latitude: 34.525887,
      longitude: 108.816793,
      scale: 18,
      name: '咸亨畜禽康复中心',
      address: '泾阳县蒙家桥十字东南角'
    })
  },
  clickPhone: function () {
    wx.makePhoneCall({
      phoneNumber: '13335433542'
    })
  },
  clickImage: function (event) {
    var src = event.currentTarget.dataset.src;
    console.log(src);
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: this.data.img_url_list // 需要预览的图片http链接列表
    })
  },
  showAllVedio: function () {
    this.setData({
      vedio_all: !this.data.vedio_all
    })
  },
  showAllImages: function () {
    this.setData({
      images_all: !this.data.images_all
    })
  }
})
