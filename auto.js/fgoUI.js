
"ui";
let deviceWidth = device.width;
let deviceHeight = device.height;

let margin = parseInt(deviceWidth * 0.05);//parseInt 将字符串转化为数字
let buttonWidth = parseInt(deviceWidth * 0.30);

ui.layout(
    <vertical margin={margin + "px"}>
        <button margin={margin + "px"} id={"showFloating"} text={"加载悬浮窗"} width={buttonWidth + "px"}/>
        <button margin={margin + "px"} id={"about1"} text={"关于我"} width={buttonWidth + "px"}/>
        <text margin={margin + "px"}  textSize="20sp" width={buttonWidth + "px"}>点我↓</text>
        <text margin={margin + "px"}  textSize="20sp" id={"myBweb"} textColor="#1e90ff" text="我的B站主页" />
        <text margin={margin + "px"} textSize="20sp" width={buttonWidth + "px"}>点我↑</text>
        <text margin={margin + "px"} textSize="20sp" >你的三连是我更新的动力</text>

        {/* <button margin={margin + "px"} id={"about2"} text={"关于--002"} width={buttonWidth + "px"}/> */}
        
    </vertical>
);

ui.showFloating.click(() => {
    engines.execScriptFile("fgoFloaty.js");
    toastLog("进入游戏界面可看到悬浮窗");
});

ui.about1.click(() => {
    let info = "" +
        "〇脚本分为实体界面和悬浮窗界面。启动实体界面不需要额外的操作，只需要同意基本权限即可。\n" +
        "〇脚本的实际操作需要悬浮窗进行，所以需要有悬浮窗权限申请。如果有其他悬浮球可能无法开启无障碍功能。\n" +
        "〇同时由于需要点击操作，这是通过无障碍功能实现的，也需要授予。（设置→辅助功能→无障碍→本APP，不同手机可能会不一样）\n" +
        "☆如果本APP对你有帮助的话，请来B站支持我,你的支持对我很重要\n"+
        "☆Author: only_tao\n"+
        "☆B站: https://space.bilibili.com/290740114\n"+
        "☆Email：onlytao970@gmail.com\n";
        
        //"☆脚本启动后，除非停止了，请不要重复启动。我不想在判断是否重复启动上再写额外的代码了(也就是希望用户是友善的)。\n" +
        //"☆每当更新 APP 后请执行清除本地脚本的操作，当然“获取新版本”当然不用啦（如果能获取的话）。";
    dialogs.confirm(info);
});
ui.myBweb.click(()=>{
    app.openUrl("https://space.bilibili.com/290740114");
});

