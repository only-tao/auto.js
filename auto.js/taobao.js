toastLog("开始");

let deviceWidth = device.width;
let deviceHeight = device.height;

let isCheckIn = false;

function clickItemInCenter(item, time) {//点击项目的函数，主要的点击一个对象的中心
    if (time == null) time = 50;
    if (item == null) return;
    let x = item.bounds().centerX();
    let y = item.bounds().centerY();
    press(x, y, time);
}

/**
 * 点击领喵币的按钮
 * @param delay 点击之后延迟多久进行下一个函数
 * @returns {number}
 */
function openBeginningBtnItem(delay) {
    click(parseInt(deviceWidth * 0.88), parseInt(deviceWidth * 1.5));
    sleep(1000);
    return 1;//parseInt() 函数可解析一个字符串，并返回一个整数。
}

/**
 * 判断是否打开领取中心
 * @returns {number}
 */
function isOpenBeginning() {
    let signIn = textContains("分享给好友").findOnce();
    if (signIn != null) {
        console.log("成功--打开充能中心");
        return 1;
    }
    return -1;
}

/**
 * 确保打开领取中心
 * @param waitDelay
 * @returns {number}
 *///下面的函数是调用上面的几个函数的main函数
function ensureOpenBeginning(waitDelay) {
    if (isOpenBeginning() === -1) {
        openBeginningBtnItem(waitDelay);
    }
    if (isOpenBeginning() === 1) return 1;
    sleep(2000);
    if (isOpenBeginning() === 1) return 1;

    console.error("失败--打开充能中心");
    toast("失败--打开充能中心");
    return -1;
}

function checkIn(flag) {
    console.log("判断店铺签到");
    if (flag === true) {
        let getMoney = desc("签到领喵币").findOne(500);
        if (getMoney != null) {
            clickItemInCenter(getMoney);//点击项目的函数，主要的点击一个对象的中心
            console.log("点击签到");
            sleep(2000);

            let happyToGet = desc("开心收下").findOnce();
            clickItemInCenter(happyToGet);//↑点击上面的查找到的对象
            console.log("店铺签到获得喵币");
            sleep(500);
        }
    }
}

/**
 * 向上滑动
 */
function swipeUp(n) {
    sleep(200);
    console.log("滑动屏幕");
    let x = parseInt(deviceWidth / 2);
    let duration = 500;
    let y = [parseInt(deviceHeight * 0.75), parseInt(deviceHeight * 0.25)];

    for (let i = 0; i < n; i++) {
        swipe(x, y[0], x, y[1], duration);
    }
}

/**
 * 逛店有没有满
 * @returns {number}
 */
function isFull() {
    for (let i = 0; i < 10; i++) {
        if (descContains("已达上限").findOnce() || textContains("已达上限").findOnce()) {
            console.log("今日已达上限");
            return 1;
        }
        sleep(200);
    }
    return 0
}

/**
 * 执行浏览结束的判断操作
 * @returns {number}
 */
function browseFinish() {
    for (let i = 0; i < 10; i++) {
        let normalFinishDesc = descContains("已获得").findOnce();
        let normalFinishText = textContains("已获得").findOnce();
        let swipeFinishDesc = descContains("任务完成").findOnce();
        let swipeFinishText = textContains("任务完成").findOnce();

        if (normalFinishDesc != null || swipeFinishDesc != null || normalFinishText != null || swipeFinishText != null) {
            console.log("浏览结束");
            return 0;
        }
        sleep(250);
    }

    console.log("浏览未知");
    return -1;
}

/**
 * 判断进入浏览的时候是否需要滑动
 * @returns {number}
 */
function judgeWay() {
    let timeOut = 1000 * 7;
    let delay = 250;
    let loops = parseInt(timeOut / delay);
    for (let i = 0; i < loops; i++) {
        let swipeAppearDesc = descContains("滑动浏览得").findOnce();
        let swipeAppearText = textContains("滑动浏览得").findOnce();
        if (swipeAppearDesc != null || swipeAppearText != null) {
            console.log("已获取到滑动浏览模式");
            return 0;
        }

        let directBrowseDesc = desc("浏览").findOnce();
        let directBrowseText = text("浏览").findOnce();
        if (directBrowseDesc != null || directBrowseText != null) {
            if (descContains("00 能量").findOnce() != null || textContains("00 能量").findOnce() != null) {
                console.log("已获取到正常浏览模式");
                return 1;
            }
        }

        if (descContains("已达上限").findOnce() || textContains("已达上限").findOnce()) {
            console.log("今日已达上限");
            return -1;
        }

        sleep(delay);
    }

    console.log("超时");
    return -1;
}

/**
 * 关闭领取中心再打开
 * @returns {number}
 */
function reopenAgain() {
    toastLog("重新打开（进行刷新界面）");
    let tbs = className("Button").findOnce();
    if (tbs == null) return -1;
    console.log("关闭");
    clickItemInCenter(tbs);
    sleep(1000);
    return ensureOpenBeginning(2000);
}

/**
 * 点击-去浏览 按钮
 * @returns {number}
 */
function clickGoBrowse(n) {
    // 寻找-去浏览-的按钮
    let browse = textMatches(/.*?去*[览索]/).findOne(1000);
    if (browse != null) {
        let guessYouLike = textContains("猜你喜欢").findOnce(); //寻找-猜你喜欢-的按钮

        //如果出现了-猜你喜欢，那就点击下一个-去浏览-的按钮
        if (guessYouLike != null) {
            console.log("出现猜你喜欢");

            // 这里判断控件的 top 坐标是否一样（其实我也不知道直接判断控件是否一样行不行）
            let pp = browse.bounds().top;
            let ppp = guessYouLike.bounds().top;
            if (ppp === pp) {
                console.log("跳过--猜你喜欢");
                let allBrowse = textMatches(/.*?去*[览索]/).find();

                // 如果仅剩下一个-去浏览/去搜索-的按钮，并且外圈循环重复不到 2 次，那就进行返回 0 进行 reopen()
                if (allBrowse.length <= 1 && n <= 1) {
                    return 0;
                }

                // 循环找到一个 top 坐标不是和-猜你喜欢-一样的
                for (let i = 0; i < allBrowse.length; i++) {
                    let item = allBrowse[i];
                    if (item.bounds().top !== browse.bounds().top) {
                        browse = item;
                    }
                }
            }
        }

        console.log("点击--去浏览");
        clickItemInCenter(browse);
        return 1;
    }
    return -1;
}

/**
 * 跳过倒计时广告
 */
function clickSkip() {
    let skip = descMatches("^[0-6]\\d{0}s$").findOnce();
    if (skip != null) {
        console.log("滑动跳过");
        swipeUp(1);
    } else console.log("无广告");
}

/**
 * 循环执行浏览操作
 */
function runGoBrowse() {
    let isSuccess = 1;

    // 进行循环浏览
    for (let i = 0; i < 50; i++) {
        isSuccess = ensureOpenBeginning(2000); // 打开领取中心
        if (isSuccess !== 1) break; //打开失败就 -1

        // 每 5 次重新开关领取中心进行刷新
        if (i % 5 === 0) {
            reopenAgain();
        }

        // 点击去浏览，如果没找到 去浏览 的按钮，那就关闭领取中心再打开，三次
        for (let j = 0; j < 3; j++) {
            isSuccess = clickGoBrowse(j);
            if (isSuccess !== 1) {
                reopenAgain();
            } else break;
        }

        if (isSuccess === -1) break; //如果 3 次之后还是不行，那就 -1

        toastLog(i); // 第几次循环

        sleep(2000);
        clickSkip(); // 判断广告跳过，向上滑动

        let jw = judgeWay(); //去浏览之后，判断是不是滑动浏览。这里最多延时 7s

        // 进行滑动。如果是滑动的话，就是店铺，判断是否有店铺签到的操作。
        if (jw === 0) {
            checkIn(isCheckIn);
            swipeUp(2);
        } else if (jw === -1) { //如果没有滑动浏览，那就可能不需要，或者浏览到上限了
            if (isFull() === 1) { // 这里的最多延时 2s
                console.log("已达上限");
                backToBefore();
                reopenAgain();
                continue;
            }
        }


        // 这里通过不同的情况区分不同的延时
        if (jw === -1) {
            console.log("10s");
            sleep(1000 * 10);
        } else {
            console.log("14s");
            sleep(1000 * 14);
        }


        let isF = browseFinish(); //右下角是否出现浏览完成类似的字样。最多延时 2.5s
        if (isF === 0) {
            console.log("浏览结束，返回");
        } else if (isF === -1) {
            console.log("浏览未正常结束，返回");
        }

        backToBefore();
    }
}

/**
 * 可能存在需要两次返回的情况
 */
function backToBefore() {
    back();
    sleep(2000);

    let isGoingTo = text("正在前往会场").findOnce();
    if (isGoingTo != null) {
        back();
        sleep(2000);
    } else {
        isGoingTo = desc("正在前往会场").findOnce();
        if (isGoingTo != null) {
            back();
            sleep(2000);
        }
    }
}

function removeFile(fileName) {
    if (files.exists(fileName)) {
        files.remove(fileName);
    }
}

function clearNewScript() {
    threads.start(function () {
        removeFile("/sdcard/脚本/淘宝喵币/script.js");
        removeFile("/sdcard/脚本/淘宝喵币/version.txt");
        toastLog("清除完成");
    });
}

function runRun() {
    sleep(500);

    let statue = runGoBrowse();
    toastLog("去浏览--浏览结束");
    alert("结束\n(如果点击猜你喜欢去首页，那么离开了主界面会被判定结束了，需要再次运行)");
}

function moveFloating(n) {
    let i = -1;
    dialogs.confirm("由于需要，请将悬浮窗移动至靠左。", "点击确认表示已完成，直接运行脚本。\n点击取消则手动前去调整。\n", function (clear) {
        if (clear) {
            console.log("直接运行");
            i = 1;
        } else {
            toastLog("请将悬浮窗移动至靠左");
            i = 0;
        }
    });


    while (i === -1) {
        slepp(100);
    }
    if (i === 1) {
        runRun(n);
    }
}

function oldVersionWarning(v) {
    let items = ["依旧尝试继续", "清除本地下载的新脚本，使用默认脚本", "新APP"];

    let choice = -10;

    dialogs.select("当前新版本可能不适用于此旧APP，请更新到新APP。", items, function (index) {
        choice = index;
    });

    while (choice === -10) {
        sleep(100);
    }

    if (choice === -1) {
        toastLog("未选择！");
    } else if (choice === 0) {
        if (v <= 6) {
            console.log(v);
            moveFloating();
        }
        runRun();

    } else if (choice === 1) {
        clearNewScript();
    } else if (choice === 3) {
        alert("暂没有开放下载新 APP 的功能，请自行下载");
    }
}

function versionChoice(v) {
    let vv = parseInt(v);
    let minSuitVersion = 10;
    console.log("适合运行的最低版本" + minSuitVersion);
    if (vv < minSuitVersion) {
        oldVersionWarning(vv);
    } else {
        runRun();
    }
}

function runChoose(n) {
    if (n === 1) isCheckIn = true;
    let currentVersion = app.versionCode;
    console.log("当前版本：" + currentVersion);
    versionChoice(currentVersion);
}

module.exports = runChoose;
// runChoose();