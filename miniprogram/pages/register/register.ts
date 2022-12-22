// pages/register/register.ts
var juese = 'ser'
let username=''
let password=''
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { value: 'stu', name: '学生' },
      { value: 'mas', name: '阿姨' },
      { value: 'ser', name: '维修师傅' },
    ],
    username: '',
    password: '',
    clientHeight: ''
  },
  register() {
    if (username == '') {
      wx.showToast({
        icon: 'none',
        title: '账号不能为空',
      })
    } else if (password == '') {
      wx.showToast({
        icon: 'none',
        title: '密码不能为空',
      })
    } else {
      db.collection("User").add({
        data: {
          Contact: username,
          password: password,
          UserType: juese
        }

      }).then(res => {
        console.log(res)
        wx.showToast({
          title: '注册成功',
          icon: 'none',
          duration: 1500
        })
        wx.navigateTo({
          url: '/pages/login/login'
        }),
          wx.hideLoading()
      })
      if (juese=='stu'){
        db.collection("Student").add({
          data: {
            Contact: username,
            password: password,
            UserType: juese
          }
  
        }).then(res => {
          console.log(res)
          // wx.showToast({
          //   title: '注册成功',
          //   icon: 'none',
          //   duration: 1500
          // })

            wx.hideLoading()
        })
      }
      if (juese=='mas'){
        db.collection("Housemaster").add({
          data: {
            Contact: username,
            password: password,
            UserType: juese
          }
  
        }).then(res => {
          console.log(res)
          // wx.showToast({
          //   title: '注册成功',
          //   icon: 'none',
          //   duration: 1500
          // })

            wx.hideLoading()
        })
      }
      if (juese=='ser'){
        db.collection("Serviceman").add({
          data: {
            Contact: username,
            password: password,
            UserType: juese
          }
  
        }).then(res => {
          console.log(res)
          // wx.showToast({
          //   title: '注册成功',
          //   icon: 'none',
          //   duration: 1500
          // })

            wx.hideLoading()
        })
      }
    }
  },
  click(){
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  radioChange(e: any) {
    juese = e.detail.value;
    console.log(juese)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },
  content(e: any) {
    username = e.detail.value
    console.log(username)
  },
  password(e: any) {
    password = e.detail.value
    console.log(password)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})