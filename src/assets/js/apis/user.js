//导入路径模块
import { baseURL } from './url.js';
//导入axios模块
import axios from 'axios';
//封装登录请求的函数
function login(uname,upwd){
    return new Promise(
        function(resolve,reject){
          axios.get(baseURL+`/user/login/${uname}&${upwd}`).then(res=>{
              resolve(res.data)
          })
        }
    )
}
//封装一个注册请求的函数
function reg({phone,upwd,nickname}){
    return new Promise(
        function(resolve,reject){
            let Data=`phone=${phone}&upwd=${upwd}&nickname=${nickname}`
            axios.post(baseURL+`/user/reg`,Data).then(res=>{
                resolve(res.data)
            })
        }
    )
}
//请求验证码的函数
function code(){
    return new Promise(
        function(resolve,reject){
            axios.get(baseURL+"/user/code").then(res=>{
                resolve(res.data)
            })
        }
    )
}
//验证手机号是否存在
function Phone(phone){
    return new Promise(
        function(resolve,reject){
            axios.get(baseURL+`/user/phone/${phone}`).then(res=>{
                resolve(res.data)
            })
        }
    )
}
//反馈信息提交函数
function FeedBack(id,val){
    return new Promise(
        function(resolve){
            let data=`id=${id}&val=${val}`
            axios.post(baseURL+"/user/feedback",data).then(res=>{
                resolve(res.data)
            })
        }
    )
}
//点击关注就将这个id存入用户关注
function Attention(attentionid,uid){
    return new Promise(
        function(resolve){
            let data = `attentionid=${attentionid}&uid=${uid}`
            axios.post(baseURL+"/user/attention",data).then(res=>{
                resolve(res.data)
            })
        }
    )
}
//查询是否关注
 function isAttention(attentionid,uid){
    return new Promise(
        function(resolve){
            axios.get(baseURL+"/user/isattention/"+attentionid+"&"+uid).then(res=>{
                resolve(res.data)
            })
        }
    )
 }
 //评论观点
 //当亲的详情页的vid  发送内容 当前用户id
 function Send(vid,val,uid){
    return new Promise(
        function(resolve){
            let date=+new Date()
            let data = `vid=${vid}&details=${val}&uid=${uid}&date=${date}`
            axios.post(baseURL+"/user/talkdetails",data).then(res=>{
                resolve(res.data)
            })
        }
    )
 }
 //点击关注模块时去当前用户关注的人发表的评论查表
 function Attentionlist(uid){
    return new Promise(
        function(resolve){
            axios.get(baseURL+"/user/attentionlist/"+uid).then(res=>{
                resolve(res.data)
            })
        }
    )
 }
 //用户加入书架
 function joinShelf(uid,bid){
     return new Promise(
         function(resolve){
             let data = `uid=${uid}&bid=${bid}`
             axios.post(baseURL+"/user/join",data).then(res=>{
                 resolve(res.data)
             })
         }
     )
 }
 //用户书架的信息查询
  function bookshelf(uid){
      return new Promise(
          function(resolve){
              axios.get(baseURL+"/user/bookshelf/"+uid).then(res=>{
                  resolve(res.data)
              })
          }
      )
  }
  //删除书架上指定的书籍
  function delShelf(uid,str){
    return new Promise(
        function(resolve){
            axios.delete(baseURL+"/user/delbook/"+uid+"&"+str).then(res=>{
                resolve(res.data)
            })
        }
    )
  }
  //书的内容
  function readcontent(bid){
      return new Promise(
          function(resolve){
              axios.get(baseURL+"/user/read/"+bid).then(res=>{
                  resolve(res.data)
              })
          }
      )
  }
  //去数据库拿个人信息
  function person(uid){
      return new Promise(
          function(resolve){
              axios.get(baseURL+"/user/person/"+uid).then(res=>{
                  resolve(res.data)
              })
          }
      )
  }
  //上传头像
  function upload(formdata){
      return new Promise(
          function(resolve){
              //let data = `uid=${uid}&file=${file}`
              axios.post(baseURL+"/user/upload",formdata).then(res=>{
                  resolve(res.data)
              })
          }
      )
  } 
  //上传多个照片
  function uploader(formdata){
      return new Promise(
          function(resolve){
              axios.post(baseURL+"/user/uploader",formdata).then(res=>{
                  resolve(res.data)
              })
          }
      )
  }
  //修改密码
  function setUpwd(uid,oldupwd,newupwd){
      return new Promise(
          function(resolve){
              axios.get(baseURL+"/user/setupwd/"+uid+"&"+oldupwd+"&"+newupwd).then(res=>{
                  resolve(res.data)
              })
          }
      )
  }
//导出这两个函数
export {
    login,
    reg,
    code,
    Phone,
    FeedBack,
    Attention,
    isAttention,
    Send,
    Attentionlist,
    bookshelf,
    joinShelf,
    delShelf,
    readcontent,
    person,
    upload,
    uploader,
    setUpwd
}