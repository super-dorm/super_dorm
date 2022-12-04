// pages/repair/repair.ts
<<<<<<< HEAD

import { formatTime } from "../../utils/util"

=======
wx.cloud.init({
  env: 'super-dorm-1gb9g5xp7878f883', //填写云开发环境id
  traceUser: true,
})
>>>>>>> 51238cadc0500f3e2a31f87ea79cc67dd28a4103
const db = wx.cloud.database()
Page({
   

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

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

  } ,
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
                                                        
            }else{
               console.log('用户点击取消')
            }

        }
    })
},
  
  submit(res:any){  //提交事件函数
<<<<<<< HEAD
    const d = new Date();
    let time = d.getTime();
    console.log(res)
    var formData=res.detail.value; //表单数据存放于res.detail.value中
    db.collection("Repair_Task").add({     //向“Repair_Task”表中添加数据
      data:{
        formData,
        time:formatTime(d),
        TaskState:"未接单"
      } 
=======

    console.log(res)
    var formData=res.detail.value; //表单数据存放于res.detail.value中
    db.collection("Repair_Task").add({     //向“Repair_Task”表中添加数据
      data:formData 
>>>>>>> 51238cadc0500f3e2a31f87ea79cc67dd28a4103
    }).then(addRes=>{
      console.log(addRes)
    })

    }
})