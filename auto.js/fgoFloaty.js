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
    log("你点击了开始");
    var thread1=threads.start(function(){
        //在新线程执行的代码
        //开始测试，在主进程里建立子线程，点击“结束”时终止程序
        while(1){
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




