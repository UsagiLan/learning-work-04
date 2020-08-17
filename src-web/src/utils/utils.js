import isPhoneX from './isPhoneX';
/**
 * 获取随机数
 * @param  {Number}  len 获取的随机数多少位
 * @param  {Beabool} firstChar 随机数第一个字符是否可以为0
 * @return {String}   返回n位的随机数
 */
export function getRandom(len = 18, firstChar = false) {
  let random = Math.random().toFixed(len);
  random = random.substring(2);
  if (!firstChar) {
    let reg = /^0/;
    if (reg.test(random)) {
      let fChar = (Math.random() * 8 + 1).toFixed();
      random = random.replace(reg, fChar);
    }
  }
  return random;
}

// refers: https://www.sitepoint.com/get-url-parameters-with-javascript/
export function getUrlParams(url) {
  const d = decodeURIComponent;
  let queryString = url ? url.split('?')[1] : window.location.search.slice(1);
  const obj = {};
  if (queryString) {
    queryString = queryString.split('#')[0]; // eslint-disable-line
    const arr = queryString.split('&');
    for (let i = 0; i < arr.length; i += 1) {
      const a = arr[i].split('=');
      let paramNum;
      const paramName = a[0].replace(/\[\d*\]/, (v) => {
        paramNum = v.slice(1, -1);
        return '';
      });
      const paramValue = typeof(a[1]) === 'undefined' ? true : a[1];
      if (obj[paramName]) {
        if (typeof obj[paramName] === 'string') {
          obj[paramName] = d([obj[paramName]]);
        }
        if (typeof paramNum === 'undefined') {
          obj[paramName].push(d(paramValue));
        } else {
          obj[paramName][paramNum] = d(paramValue);
        }
      } else {
        obj[paramName] = d(paramValue);
      }
    }
  }
  return obj;
}


/**
 *
 * @param {图片地址} url
 * @param {回调} callback
 */
export function imgPreLoad  (url,callback) {
  var img = new Image();

  img.src = url;
  if (img.complete) {
    callback(img.src);
  } else {
    img.onload = function () {
      callback(img.src);
      img.onload = null;
    };
  };
};


// 日期格式转换 XXXX-XX-XX转换为 XX月XX日
export function dateFormTransform(dateString) {
  let dateSplit = dateString.split('-');
  return `${dateSplit[1] || ""}月${dateSplit[2] || ""}日`
}

export function arrayCopy(value) {
  if (!Array.isArray(value)) {
    return value;
  }
  let newArray = [];
  value.forEach(item => {
    let newItem = arrayCopy(item);
    newArray.push(newItem);
  });
  return newArray;
}


export function getTagStyle(text) {
  switch(text) {
    case '连住优惠': {
      return 'ui-tag-type1';
    }
    case '超赞房东':
    case '闪订':
    case '免押':
    case '验真': {
      return 'ui-tag-type2';
    }
    case '优选': {
      return 'ui-tag-type3';
    }
    case '新房': {
      return 'ui-tag-type4';
    }
    case '自营': {
      return 'ui-tag-type5';
    }
    case '品牌民宿': {
      return 'ui-tag-type6';
    }
    case '月租优惠': {
      return 'ui-tag-type8';
    }
    case '五一大促': {
      return 'ui-tag-type9'
    }
    case '毕业季': {
      return 'ui-tag-type10'
    }
    case '金牌房东': {
      return 'ui-tag-type11'
    }
    default: {
      return 'ui-tag-type7';
    }
  }
}

// 时间格式转换 时间戳转换成xx分xx秒 时间戳单位 秒
export function timeFormTransform(timeStamp) {
  // 小时
  let hour = Math.floor(timeStamp / 3600 % 24);
  // 分钟
  let min = Math.floor(timeStamp / 60 % 60);
  // 秒
  let sec = Math.floor(timeStamp % 60);

  return `${hour > 0? `${hour}:`:""}${min > 0? `${min}:`:""}${sec}秒`;
}

  // 判断输入的字符串是否是数字，返回字数 数字的Unicode范围【48，57】
  // @return number (不是数字 返回-1  是数字返回字符串长度)
export function countNum(str) {
    if (!str) return 0;
    let arr = str.split("");
    let count = 0;
    for(let i = 0; i < arr.length; i++) {
      if (arr[i].charCodeAt(0) <= 57 && arr[i].charCodeAt(0) >= 48) { // 如果不是数字
        count += 1;
      } else{
        count = -1;
        break;
      }
    }
    return count;
  }

  // 新版标签规则
  export function getShowTagStyleNew(tagInfo, position = 'line') {
    switch(tagInfo.styleType) {
      case 1: return `<div class="show-tag-with-icon ${position == 'line'?'tag-common-style':'tag-top-style'}">
      <span style="background-image: url(${tagInfo.icon});"></span>
      <span style="color:${tagInfo.textColor};background-color: ${tagInfo.background};">${tagInfo.text}</span>
    </div>`;
      case 2: return `<div class="show-tag-with-gradient ${position == 'line'?'tag-common-style':'tag-top-style'}" 
        style="background:linear-gradient(0deg, ${tagInfo.startBgColor}, ${tagInfo.endBgColor}); 
        color:${tagInfo.textColor};
        ${tagInfo.borderColor? `border:1px solid ${tagInfo.borderColor}`:''}">
        ${tagInfo.text}
      </div>`;
      case 3: return `<div class="show-tag-with-pure ${position == 'line'?'tag-common-style':'tag-top-style'}" style="background-color: ${tagInfo.background}; 
        ${ tagInfo.borderColor? `border:1px solid ${tagInfo.borderColor}`:''}; 
        color:${tagInfo.textColor}">${tagInfo.text}</div>`
      default: return ''
    } 
  }

 