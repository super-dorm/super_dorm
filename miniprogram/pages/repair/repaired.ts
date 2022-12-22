// pages/repair/repaired.ts
const db = wx.cloud.database()
import { username } from "../login/login"
Page({
  data: {

  },
  onLoad() {
    db.collection('Repair_Task').where({
      AssignID: username,
      TaskState: "已完成"
    }).get().then(res => {
      console.log('第二种方法请求成功', res.data)
      this.setData({
        repaired: res.data
      })

    })
      .catch(err => {
        console.log('第二种方法请求失败', err)
      })

  },


  /**
   * 组件的方法列表
   */
  methods: {

  },


  /**
   * 页面的初始数据
   */

  /**
   * 生命周期函数--监听页面加载
   */


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