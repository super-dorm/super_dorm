var juese = ' '
Page({
  data: {
    items: [
      { value: 'stu', name: '学生' },
      { value: 'mas', name: '阿姨' },
      { value: 'ser', name: '维修师傅' },
    ],
    
  },
  login() {
    if (juese=='stu'){
    wx.switchTab({
      url: '/pages/index/index',
    })}
    if(juese=='mas'){
    wx.navigateTo({
      url: '/pages/ayi/chuli',
    })}
    if(juese=='ser'){
    wx.navigateTo({
      url: '/pages/repair/for_service',
    })

  }
  },
  radioChange(e:any){
   juese=e.detail.value;
   console.log(juese)
  }

})