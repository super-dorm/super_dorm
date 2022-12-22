
  const db = wx.cloud.database()
  Page({
    data:{
     
    },
    
    onLoad(){
      db.collection('ChargingOrder').get()
      .then(res =>{
          console.log('第二种方法请求成功',res.data)
          this.setData({
             description:res.data
          })
         
          })
      .catch(err =>{
          console.log('第二种方法请求失败',err)    
      })
      },
      click: function(event: { currentTarget: { dataset: { value: any } } }) {
        let value= event.currentTarget.dataset.value
        console.log("value："+value)
        value=String(value)
        db.collection('ChargingOrder').doc(value).update({
          // data 传入需要局部更新的数据
          data: {
            
            State:'充电成功'
          },
          success: function(res) {
            console.log(res.data)
          }
        })
    }
    
})