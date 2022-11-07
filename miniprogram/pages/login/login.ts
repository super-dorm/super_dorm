Page({
  data: {
    items: [
      { value: 'stu', name: '学生' },
      { value: 'mas', name: '阿姨' },
      { value: 'ser', name: '维修师傅' },

    ]
  },
  login() {

    wx.navigateTo({
      url: '/pages/index/index',
    })

  }

})