//导入服务器基础路径
import { baseURL } from "../apis/url"
//导入store
import store from "../../../store"
//导入axios模块
import axios from "axios";
//发送axios请求验证token值
function token(){
    return new Promise(
        function(resolve){
            axios.get(baseURL+"/token",{
                //请求头信息
                headers:{
                    token:localStorage.getItem("token")
                }
            }).then(res=>{
                //将响应的结果给uid
                store.state.uid=res.data.uid
                if(!res.data.uid){
                    //如果返回值false就将没用的token移除
                    localStorage.clear()
                }
                //console.log("我是token"+store.state.uid)
                resolve()
                
            })
        }
    )
  
}

export {
    token
}