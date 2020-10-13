
import wx from "weixin-js-sdk"
function Share(){
    wx.config({
        debug:true,//开启调试,调用所有的api返回值
        appId:'wx3b940ece5b3d3a13d',//
        timestamp:1599975730361,//
        nonceStr:"jiajoahdadgada",//
        signatrue:"jiajoahdadgada",//
        jsApiList:["onMenuShareTimeline"]//
    });
    wx.ready(()=>{
        wx.onMenuShareTimeline({
            title:"123",
            link:"连接",
            imgUrl:"图标",
            dataUrl:"",
            success:function(){
                //用户确认分享后指向的回调函数
                alert("分享成功")
            },
            cancel:function(){
                alert("分享取消")
            }
        })
    })
}




export{
    Share
}