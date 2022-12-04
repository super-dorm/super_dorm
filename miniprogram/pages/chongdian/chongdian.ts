import { formatTime } from "../../utils/util";

// pages/chongdian/chongdian.ts
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  /**
 * 页面的初始数据
 */
  data: {
    activeIndex: 0, //默认选中第一个
    numArray: [20, 30, 50, 80, 100, 'm'],
    sumMoney: 0,
    num: 0,
    amount:0
  },
  activethis: function (event: any) { //点击选中事件
    var thisindex = event.currentTarget.dataset.thisindex; //当前index
    this.setData({
      activeIndex: thisindex
    })
  },
  handInput(e: any) {//自定义金额事件逻辑
    this.setData({
      num: e.detail.value
    })
    // console.log(this.data.num)
  },
  chargeMoney() {//立即充值按钮事件逻辑,这是冲到钱包，还缺提交充电的金额
    // console.log(this.data.activeIndex)
    var a = this.data.activeIndex;
    if (a < 5) {
      // console.log(Number(this.data.numArray[a]))
      var b = this.data.numArray[a]
      this.setData({
        sumMoney: this.data.sumMoney + Number(b)
      })
    }
    else if (a = 5) {
      var m = this.data.num
      this.setData({
        sumMoney: this.data.sumMoney + Number(m)
      })
    }
  }
  ,
//这个函数用作实现判断钱包金额与提交充电的金额，还有将正确的提交充值金额提交到chargeorder数据库！
btnSub(res:any){
  // 表单提交
  wx.showLoading({
    title: '数据加载中',
    mask:true
  })
  //老方法获取所有值
  // var title=res.detail.value.title;
  var DormNum=res.detail.value.DormNum;
  var Amount=res.detail.value.Amount;
  const d = new Date();
  let time = d.getTime();
  //es6结构方法获取所有值（简易，推荐使用）
  // var {Amount}=res.detail.value;
  // var resVlu=res.detail.value;
  var TotalAmount=this.data.sumMoney;
  var Amount=Amount;
  if (TotalAmount>=Amount) {
    db.collection("ChargingOrder").add({
      // data:resVlu
      data:{ // 老方法赋值
        DormNum:DormNum,
        Amount:Amount,
        OrderTime:formatTime(d),
        TotalAmount:TotalAmount,
        Add:this.data.numArray[this.data.activeIndex],
        State:"未充电"
      }
    }).then(res=>{
      console.log(res)
      wx.showToast({
         title: '提交成功',
         icon: 'none',
         duration: 1500
       })
      wx.hideLoading()
    })
  }
  else{
    console.log(res)
    wx.showToast({
       title: '余额不足，请充值',
       icon: 'none',
       duration: 1500
     })
    wx.hideLoading()
  
}}
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