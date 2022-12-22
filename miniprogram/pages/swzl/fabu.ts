import { formatTime } from "../../utils/util";

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
    images_fileID: <any>[],
    imgPath: "",
    previewArr: <any>[], // 保存选择的图片
    uploadBackFile: '', // 上传成功服务器接口返回的文件地址
    time: "",
    ItemDesciption: ""
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
  delReportPic(options: any) {
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
  removeArrElement: function (val: any) {
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
  jumpToDetail() {
    wx.showModal({
      title: '提示',
      content: '是否确认发布',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.showToast({
            title: '上传成功',
            duration: 1000,
            success: function () {
              setTimeout(function () {
                wx.navigateBack({//提交成功后跳转到上一界面

                })
              }, 1000);
            }
          })
        }
      }
    })
  },


  submit(res: any) {
    //提交事件函数
    console.log(res)
    let that = this;    //imgArr=imagesFiles
    const d = new Date();
    let time = d.getTime();
    let imgArr = that.data.previewArr;
    var ItemDesciption = res.detail.value.ItemDesciption;//表单数据存放于ItemDesciption中
    for (var i = 0; i < imgArr.length; i++) {
      var images_fileID = that.data.images_fileID;  //得到data中的 fileID

      wx.cloud.uploadFile({
        cloudPath: time+i + "png",
        filePath: imgArr[i],
        success: res => {
          images_fileID.push(res.fileID);
          that.setData({
            images_fileID: images_fileID   //更新data中的 fileID
          })
          if (images_fileID.length === imgArr.length) {
            db.collection("Lost_and_Found").add({     //向“Lost_and_Found”表中添加数据
              data: {
                ItemDesciption: ItemDesciption,
                state: "未认领",
                time: formatTime(d),
                uploadId: that.data.images_fileID
              },

            }).then(addRes => {
              console.log(addRes)
            })
          }
        }
      })
    }

  }
})