wx.cloud.init({
    env: 'super-dorm-1gb9g5xp7878f883', //填写云开发环境id
    traceUser: true,
  })
  const db = wx.cloud.database()
  Page({
    data:{
    },
    
    
    onLoad(){
      wx.cloud.database().collection('swzl').get()
      .then(res =>{
          console.log('第二种方法请求成功',res.data)
          this.setData({
              projects:res.data
          })
          })
      .catch(err =>{
          console.log('第二种方法请求失败',err)    
      })
      }
      
})