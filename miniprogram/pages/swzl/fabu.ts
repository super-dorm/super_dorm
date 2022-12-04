import { formatTime } from "../../utils/util";

// pages/swzl/fabu.ts
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgPath: "",
    previewArr: [], // 保存选择的图片
    uploadBackFile: '', // 上传成功服务器接口返回的文件地址
    uploadId: " "
  },

  /**
   * 删除上传图片
   */
  delReportPic: function (options: any) {
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

  /**
   * 上传
   */
 
  /**
  * 采用递归的方式上传多张
  */
  uploadOneByOne: function (imgPaths: any, successUp: any, failUp: number, count: any, length: any) {
    let that = this;
    const d = new Date();
    let time = d.getTime();
    wx.showLoading({
      title: '正在上传第' + count + '张',
      duration: 3000
    })
    wx.cloud.uploadFile({
      cloudPath: time + ".png",
      filePath: imgPaths[count - 1],
      success: function (res) {
        successUp++;
        
        that.setData({
          uploadId: res.fileID
          
        })
        console.log(res.fileID);
      },
      fail: function () {
        failUp++;
      },
      complete: function () {
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
  submit(res: any) {  //提交事件函数
    const d = new Date();
    console.log(res)
    var formData = res.detail.value; //表单数据存放于res.detail.value中
    db.collection("Lost_and_Found").add({     //向“Lost_and_Found”表中添加数据,这里用了
      data: {
        ItemDesciption: formData.ItemDesciption,
        state: "未认领",
        time: formatTime(d),
        uploadId: this.data.uploadId
        //默认就是没有认领，在查看中可以查看也可以认领
      }
    }).then(addRes => {
      console.log(addRes)
    })

  }
})