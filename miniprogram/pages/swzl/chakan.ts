
  const db = wx.cloud.database()
  Page({
    data:{
     
    },
    
    onLoad(){
      db.collection('Lost_and_Found').get()
      .then(res =>{
          console.log('第二种方法请求成功',res.data)
          this.setData({
             description:res.data
          })
         
          })
      .catch(err =>{
          console.log('第二种方法请求失败',err)    
      })
      }
      
})