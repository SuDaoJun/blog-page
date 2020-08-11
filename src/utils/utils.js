import moment from 'moment'
import { Message } from "element-ui";

// 常量数据
export let constant = {
	reqSuccess: '10000',
	dataAlready: '10001',
	dataFail: '10002',
	pwdFail: '10003',
	codeFail: '10004',
	timeOver: '10005',
	randomFail: '10006',
  dataNot: '10007',
  statusFail: '10008',
}

// 与当前时间相差天数
export function diffDay(time) {
  let currentTime = moment();
  let endTime = moment(time);
  let day = endTime.diff(currentTime, 'day')
  return day
}
// 当前时间格式化
export function currentDay(type = 'time') {
  if(type === 'day'){ 
    return moment().format('YYYY-MM-DD')
  }else{
    return moment().format('YYYY-MM-DD HH:mm:ss')
  }
}
function zeroHandle(num){
  if(num < 10){
    return '0' + num
  }else{
    return num.toString()
  }
}
export const randNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min))
}
// localStorage设置有效期
export const timeLocalStorage = {
  setItem: function (key, value, dayNum) {
    let data = { value: value, expirse: new Date().getTime() + dayNum * 1000 * 60 * 60 * 24 };
    localStorage.setItem(key, JSON.stringify(data));
  },
  getItem: function (key) {
    if (localStorage.getItem(key)) {
      let data = JSON.parse(localStorage.getItem(key));
      if (data !== null) {
        if (data.expirse != null && data.expirse < new Date().getTime()) {
          localStorage.removeItem(key);
        } else {
          return data.value;
        }
      }
    }
    return null;
  }
}
// 滚动动画
export function scrollAnimation(currentY, targetY) {

 // 计算需要移动的距离
 let needScrollTop = targetY - currentY
 let _currentY = currentY
 setTimeout(() => {
   // 一次调用滑动帧数，每次调用会不一样
   const dist = Math.ceil(needScrollTop / 10)
   _currentY += dist
   window.scrollTo(_currentY, currentY)
   // 如果移动幅度小于十个像素，直接移动，否则递归调用，实现动画效果
   if (needScrollTop > 10 || needScrollTop < -10) {
     scrollAnimation(_currentY, targetY)
   } else {
     window.scrollTo(_currentY, targetY)
   }
 }, 10)
}

// message弹窗只显示一个
let messageInstance = null;
export function mainMessage(options) {
  //如果弹窗已存在先关闭
  if (messageInstance) {
    messageInstance.close();
  }
  messageInstance = Message(options);
}
let arr = ['success', 'warning', 'info', 'error'];
arr.forEach(function (type) {
  mainMessage[type] = function (options) {
    if (typeof options === 'string') {
      options = {
        message: options
      };
    }
    options.type = type;
    options.duration = type === 'success'?1500:3000;
    return mainMessage(options);
  };
});

// 文章内容h标签生成标题目录
function toToc(data) {
  let levelStack = []
  let result = '<div class="catalog-title">目录</div>\n'
  const addStartList = () => { result += `<div class="catalog-list">\n`; }
  const addEndList = () => { result += '</div>\n'; }
  const addLInk = (index, itemText) => { result += `<div class='catalog-link' title='${itemText}' id='title${index}'>${itemText}</div>\n`; }
  data.forEach(function (item, index) {
    let itemText = item.replace(/<[^>]+>/g, '')  // 匹配h标签中的文字
    let itemLabel = item.match(/<\w+?>/)[0]  // 匹配h?标签<h?>
    let levelIndex = levelStack.indexOf(itemLabel) // 判断数组里有无<h?>
    // 没有找到相应<h?>标签，则将新增ul、li
    if (levelIndex === -1) {
      levelStack.unshift(itemLabel)
      addStartList()
      addLInk(index, itemText)
    }
    // 找到了相应<h?>标签，并且在栈顶的位置则直接将li放在此ul下
    else if (levelIndex === 0) {
      addLInk(index, itemText)
    }
    // 找到了相应<h?>标签，但是不在栈顶位置，需要将之前的所有<h?>出栈并且打上闭合标签，最后新增li
    else {
      while (levelIndex--) {
        levelStack.shift()
        addEndList()
      }
      addLInk(index, itemText)
    }
  })
  // 如果栈中还有<h?>，全部出栈打上闭合标签
  while (levelStack.length) {
    levelStack.shift()
    addEndList()
  }
  return result
}

export function catalogList(content) {
  // 去除marked解析生成h标题标签中的id
  // content = content.replace(/(\sid\s*=[\s\'\"].*?[\s\'\"])/g,"")
  const toc = content.match(/<[hH][1-6]>.*?<\/[hH][1-6]>/g)
  let tocList = null
  if (toc && toc.length > 0) {
    toc.forEach((item, index) => {
      let _toc = `<div class='rich-title' id='title${index}'>${item} </div>`
      content = content.replace(item, _toc)
    })
    tocList = toToc(toc)
  }else{
    tocList = '<div class="catalog-title">目录（无）</div>\n'
  }
  let obj = {
    tocList,
    content
  }
  return obj
}