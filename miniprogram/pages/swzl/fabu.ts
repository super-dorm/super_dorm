// pages/swzl/fabu.ts
wx.cloud.init({
  env: 'super-dorm-1gb9g5xp7878f883', //填写云开发环境id
  traceUser: true,
})
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgPath:"",
    previewArr: [], // 保存选择的图片
    uploadBackFile: '' // 上传成功服务器接口返回的文件地址

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

  },
  /**
   * 删除上传图片
   */
  delReportPic: function (options) {
    let that = this;
    let pic = options.currentTarget.dataset.pic;
    let previewArrs = that.data.previewArr;
    that.removeArrElement(pic);
    that.setData({
      previewArr: previewArrs
    })
  },

  /**
   * 删除指定元素
   */
  removeArrElement: function (val) {
    let that = this;
    let previewArrs = that.data.previewArr;
    var index = previewArrs.indexOf(val);
    if (index > -1) {
      previewArrs.splice(index, 1);
    }
  },

  /**
   * 选择图片
   */
  chooseClientPic: function () {
    let that = this;
    wx.chooseImage({
      count: 9 - that.data.previewArr.length,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        let tempFilePaths = res.tempFilePaths;
        if (tempFilePaths.length > 0) {
          that.setData({
            previewArr: that.data.previewArr.concat(tempFilePaths)
          })
        } else {
          that.setData({
            previewArr: tempFilePaths
          })
        }
      }
    });
  },

  /**
   * 上传
   */
  uploadReportPic: function () {
    let that = this;
    let imgArr = that.data.previewArr;
    if (imgArr.length > 0) {
      // 成功个数
      var successUp = 0;
      // 失败个数
      var failUp = 0;
      // 文件总数
      var length = imgArr.length + 1;
      // 第几张
      var count = 1; 
      // 上传函数
      that.uploadOneByOne(imgArr, successUp, failUp, count, length);
  
    } else {
      common.showToast('请选择要上传的内容');
      return false;
    }
  },

  /**
  * 采用递归的方式上传多张
  */
  uploadOneByOne: function (imgPaths, successUp, failUp, count, length) {
    let that = this;
    wx.showLoading({
      title: '正在上传第' + count + '张',
      duration:3000
    })
    wx.cloud.uploadFile({
      cloudPath:"Lost_and_Found",
      filePath: imgPaths[count - 1],
      success: function (res) {
        successUp++;
      },
      fail: function (res) {
        failUp++;
      },
      complete: function (res) {
        // 下一张
        count++;
        if (count == length) {
          wx.showToast({
            title: '上传成功',
            icon: 'success',
            
            duration: 2000,
           
          });
          wx.navigateBack({  
          }) //提交成功后跳转到上一界面
        } else {
          // 递归调用，上传下一张
          that.uploadOneByOne(imgPaths, successUp, failUp, count, length);
        }
      }
    });
  },
  submit(res:any){  //提交事件函数

    console.log(res)
    var formData=res.detail.value; //表单数据存放于res.detail.value中
    db.collection("Lost_and_Found").add({     //向“Lost_and_Found”表中添加数据,这里用了
      data:formData 
    }).then(addRes=>{
      console.log(addRes)
    })

    }
})