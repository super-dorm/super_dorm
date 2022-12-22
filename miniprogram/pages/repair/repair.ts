// pages/repair/repair.ts


import { formatTime } from "../../utils/util"

const db = wx.cloud.database()
Page({


  /**
   * 页面的初始数据
   */
  data: {
    AssignID: 'xxx',
    stuID:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    db.collection('Serviceman')
      .aggregate()
      .sample({
        size: 1
      })
      .end().then((res: { list: { Contact: any }[] }) => {
        console.log(res);
        var a = String(res.list[0].Contact)
        this.setData({
          AssignID: a,
          stuID: username
        });

      })
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

  },
  /** 跳转到首页页面 */
  jumpToDetail() {
    wx.showModal({
      title: '提示',
      content: '是否确认提交',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.showToast({
            title: '成功',
            duration: 1000,
            success: function () {
              setTimeout(function () {
                wx.navigateBack({//提交成功后跳转到上一界面

                })
              }, 1000);
            }
          })

        } else {
          console.log('用户点击取消')
        }

      }
    })
  },

  chaxun() {
    wx.navigateTo({ url: '/pages/repair/chaxun' })
  },

  submit(res: any) {  //提交事件函数
    const d = new Date();
    let time = d.getTime();
    console.log(res)
    var formData = res.detail.value; //表单数据存放于res.detail.value中
    //var AssignID = '';

   

    db.collection("Repair_Task").add({     //向“Repair_Task”表中添加数据
      data: {
        formData,
        time: formatTime(d),
        TaskState: "未完成",
        AssignID: this.data.AssignID,
        stuID: this.data.stuID
      }
    }).then(addRes => {
      console.log(addRes)
    })
    console.log(this.data.AssignID);
  }
})