// pages/tsjy/tsjy.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  tsSubmit(res:any){
    wx.cloud.init({
        env: 'super-dorm-1gb9g5xp7878f883', //填写云开发环境id
        traceUser: true,
      })
      const db = wx.cloud.database()
      
        var formData=res.detail.value; //表单数据存放于res.detail.value中
        db.collection("tsjy").add({     //向“Repair_Task”表中添加数据
          data:formData 
        }).then(addRes=>{
          console.log(addRes)
        })
    
        },
     jumpToDetail() {
          wx.showModal({
              title: '提示',
              content: '是否确认提交',
              success: function (res) {
                  if (res.confirm) {
                      console.log('用户点击确定')
                      wx.showToast({
                          title: '成功',
                          duration: 1000,
                          success: function () {
                          setTimeout(function () {
                          wx.navigateBack({//提交成功后跳转到上一界面
                          
                            })
                          }, 1000);
                       }
                     })
                                                              
                  }else{
                     console.log('用户点击取消')
                  }
      
              }
          })
      }
  })