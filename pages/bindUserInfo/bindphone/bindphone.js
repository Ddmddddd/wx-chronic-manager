// pages/bindUserInfo/bindphone/bindphone.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    former_phone: "",
    new_phone: "",
  },
  bindInputPhone: function (e) {
    this.setData({
      new_phone: e.detail.value,
    })
  },
  validate: function () {
    var phoneNumber = this.data.new_phone;
    var reg = /^1[3|4|5|7|8][0-9]{9}$/; 
    return (reg.test(phoneNumber))
  },
  change: function () {
    var patientId = wx.getStorageSync('patientid_token');
    var phoneNumber = this.data.new_phone;
    if (patientId.length <= 0 || !this.validate()) {
      wx.showToast({
        title: '新手机号码错误',
        image: '../../../image/fail.png',
        duration: 2000
      })
    } else {
      wx.request({
        url: 'https://zjubiomedit.com/HypertensionService.svc/BoundPhoneNumber',
        data: {
          patientId: patientId,
          phoneNumber: phoneNumber,
          verificationCode:""
        },
        method: 'POST',
        success: function (res) {
          if (res.data.flag == 0) {
            wx.showToast({
              title: '修改成功',
              icon: 'success',
              duration: 2000
            })
            var pages = getCurrentPages();
            var prevPage = pages[pages.length - 2];
            prevPage.setData({
              phoneNumber: phoneNumber
            })
            wx.navigateBack()
          }
          else {
            wx.showToast({
              title: '修改失败',
              image: '../../../image/fail.png',
              duration: 2000
            })
          }
        },
        fail: function (res) {
          console.log(res.data);
          console.log('is failed')
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var former_phone = options.phone;
    if (former_phone != undefined) {
      this.setData({
        former_phone: former_phone
      })
    }
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