// pages/chongdian/chongdian.ts
Page({

  /**
   * 页面的初始数据
   */
    /**
   * 页面的初始数据
   */
  data: {
    activeIndex: 0, //默认选中第一个
    numArray: [20, 30, 50, 80, 100,'m'],
    sumMoney:0,
    num:0
  },
  activethis: function (event:any) { //点击选中事件
    var thisindex = event.currentTarget.dataset.thisindex; //当前index
    this.setData({
      activeIndex: thisindex
    })
  },
  handInput(e:any){//自定义金额事件逻辑
    this.setData({
      num:e.detail.value
    })
    // console.log(this.data.num)
  },
  chargeMoney( ){//立即充值按钮事件逻辑
// console.log(this.data.activeIndex)
  var a = this.data.activeIndex;
if(a<5){
// console.log(Number(this.data.numArray[a]))
  var b = this.data.numArray[a]
  this.setData({
  sumMoney:this.data.sumMoney + Number(b)
})
}
else if(a=5){
  var m = this.data.num
  this.setData({
  sumMoney:this.data.sumMoney + Number(m)
  })
}
  }
,
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

  }
})