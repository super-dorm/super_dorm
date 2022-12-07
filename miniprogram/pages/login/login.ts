var juese = ''
const app1 = getApp()
 let username=''
 let password=''
 wx.cloud.init({
    env: 'super-dorm-1gb9g5xp7878f883', //填写云开发环境id
    traceUser: true,
  })
 const User = wx.cloud.database().collection('User');
 
  



Page({
  data: {
    items: [
      { value: 'stu', name: '学生' },
      { value: 'mas', name: '阿姨' },
      { value: 'ser', name: '维修师傅' },
    ],
    username: '',
    password: '',
    clientHeight:''
  },
  login() {
    let flag = false  //表示账户是否存在,false为初始值
    if(username=='')
    {
      wx.showToast({
        icon:'none',
        title: '账号不能为空',
      })
    }else if(password==''){
      wx.showToast({
        icon:'none',
        title: '密码不能为空',
      })
    }else{
     User.get({
        success:function(res){
          //打印获取到的数据
          console.log(res)
          let admin=res.data
          for (let i = 0; i < admin.length; i++) {  //遍历数据库对象集合
            console.log(admin[i].Contact)
            if (username === admin[i].Contact) { //账户已存在
              flag=true;
              if (password !== admin[i].password||juese !== admin[i].UserType) {  //判断密码正确与否
                wx.showToast({  //显示密码错误信息
                  title: '密码错误！！',
                  icon: 'error',
                  duration: 2500
                });
               break;
              } else {
                wx.showToast({  //显示登录成功信息
                  title: '登陆成功！！',
                  icon: 'success',
                  duration: 2500
                })
                flag=true;
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
                wx.setStorageSync('admin', password)
              // wx.navigateTo({
                 //url: '/pages/admin/admin',
             //  })
                break;
              }
            }
          };
          if(flag==false)//遍历完数据后发现没有该账户
          {
            wx.showToast({
              title: '该用户不存在',
              icon: 'error',
              duration: 2500
            })
          }
        }
      })
    }
   
  },
  radioChange(e:any){
   juese=e.detail.value;
   console.log(juese)
  },
  onLoad(){
    var that=this
    wx.getSystemInfo({ //窗口自适应
      success: function (res) { 
        console.log(res.windowHeight)
          that.setData({ 
              clientHeight:res.windowHeight
        }); 
      } 
    }) 
  },
  //协议
  goxieyi(){
   wx.navigateTo({
     url: '/pages/oppoint/oppoint',
   })
  },
  //获取输入框内容
  content(e:any){
    username=e.detail.value
    console.log(username)
  },
  password(e:any){
    password=e.detail.value
    console.log(password)
  },
  //登录事件
  goadmin(){
    
  },

})