// pages/tsjy/tsjy.ts

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
  btnSub(res:any){
    // 表单提交
    wx.showLoading({
      title: '数据加载中',
      mask:true
    })
    //老方法获取所有值
    // var title=res.detail.value.title;
    // var author=res.detail.value.author;
    // var content=res.detail.value.content;
 
    //es6结构方法获取所有值（简易，推荐使用）
    var {title,content}=res.detail.value;
    var resVlu=res.detail.value;
    db.collection("tsjy").add({
      data:
       resVlu
      
      // data:{ // 老方法赋值
      //   title:title,
      //   author:author,
      //   content:content
      // }
    }).then(res=>{
      console.log(res)
      wx.showToast({
         title: '提交成功',
         icon: 'none',
         duration: 1500
       })
      wx.hideLoading()
    })
  },
})