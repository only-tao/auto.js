//v2.6 +放技能
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
/*****************/
/*****悬浮窗******/
/****************/
ui.showFloating.click(() => {
    threads.start(function(){
    // engines.execScriptFile("fgoFloaty.js");
    toastLog("进入游戏界面可看到悬浮窗");
    
    /*********
     **主线程**
     *********/
    log("当前线程为主线程:" + threads.currentThread());
    var window=floaty.window(
        <vertical id="all" >
            <text w="80" h="35" bg="#77ffffff" textSize="10sp">点我可移动</text>
            <horizontal>
                <button id="begin"  text="开始" w="40" h="35" bg="#77ffffff" textSize="10sp"/>
                <button id="end" text="停止" w="40" h="35" bg="#77ffffff" textSize="10sp"/>
            </horizontal>
            <button id="exit" text="关闭我" w="80" h="35" bg="#77ffffff" textSize="10sp"/>
        </vertical>
    )
    // let width=device.width;//获取设备宽度
    // let height=device.height;//获取设备的高度
    window.setPosition(1500,100);//(x,y),左上角的位置
    
    window.all.click(()=>{
        window.setAdjustEnabled(!window.isAdjustEnabled());
    });//点击悬浮窗可以移动
    //begin and end!!!good job;
    window.begin.click(()=>{
        toastLog("你点击了开始");
        var thread1=threads.start(function(){
            //在新线程执行的代码
            //开始测试，在主进程里建立子线程，点击“结束”时终止程序
            let i=1;
            
            while(1){
                toastLog("doing");
                if(i){
                    skill();
                    i=0;
                }
                click(1900,930);
                sleep(300);//可以使用sleep（）；
    
                click(1900,930);
                sleep(500);
             
                click(365,750);
                sleep(500);
    
                click(805,750);//一个瞬间只能点击一个点
                sleep(500);
              
                click(1165,750);
                sleep(500);
            }
                //↑点击三个指令卡
                // toastLog("我在子线程中执行");
        });
    })
    window.end.click(()=>{
        toastLog("已经停止-暂停");
        threads.shutDownAll();
    })
    window.exit.click(()=>{
        toastLog("我已经被关闭");
        window.close();
    })
    //一个开启悬浮窗
    //放在UI界面：需要加上一个“关于我”：包含 作者、哔哩哔哩、鸣谢
    //https://space.bilibili.com/290740114
    //一个按钮触发事件
    window.exitOnClose();
    setInterval(()=>{}, 1000);
    
    // setInterval,每隔一段时间执行一次
    // setTimeout(callback, delay[, ...args])
    // callback {Function} 当定时器到点时要调用的函数。
    // delay {number} 调用 callback 之前要等待的毫秒数。
    // ...args {any} 当调用 callback 时要传入的可选参数。
    });
});
function skill(){
    let confirm1=1530,confirm2=640,x=350,y=865;
    let sky1=1650,sky2=55;
    for(let i=0;i<3;i++)
        for(let j=0;j<3;j++)
        {
            click(x+470*i+140*j,y);//1 1
            sleep(500);
            // click(x+470*i+140*j,y);//1 1 twice 两下会出事故
            click(confirm1,confirm2);//确认
            click(confirm1,confirm2);
            // sleep(300);
            
            sleep(3000);
            click(sky1,sky2);//避免意外
            sleep(500);
        }
    //确认y640 x870
}

    //  350 ! Y865 
    //1 490 ! (dx=140)
    //  630 ! (dx=140)

    //  820! (dx11=470)
    //2 970!
    //  1110

    //3  1290->1300
    //   1440
    //   1580
    //V2.6 
    //增加自动放技能


