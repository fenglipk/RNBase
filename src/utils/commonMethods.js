/**
 * 获取变量的类型
 * @param {Any} data 待判断的变量
 * @returns {String} 变量类型
 * []        => Array
 * {}        => Obejct
 * 1         => Number
 * ''        => String
 * null      => Null
 * undifined => Undefined
 * true      => Boolean
 * date      => Date
*/
const getType = (data) => {
  const type = Object.prototype.toString.call(data);
  return type.substring(8, type.length - 1);
};

/**
 * 通过对象的路劲字符串获取其路径值
 * a.b.c.d[110].c.e[3000].f => ["a", "b", "c", "d", "110", "c", "e", "3000", "f"]
*/
const getPath = (pathStr) => {
  if (!pathStr) {
    return [];
  }
  return pathStr.split(/\.|\[|\]/).filter(item => item)
};

/**
 * 通过路径数组得到目标对象中指定的值
 * @param {Array} arr 路劲数组
 * @param {Object} target 目标源
 * arr = [a.b.c]
 * target = {a:{b:{c:1}}}
 * ==> 1
*/
const getValueByPathArr = (arr, target) => {
  let obj = JSON.parse(JSON.stringify(target));
  try {
    while (arr.length) {
      const filed = arr.shift();
      obj = obj[filed];
    }
    return obj;
  } catch (error) {
    console.log('解析数据出错：', error);
    return null;
  }
};

/**
 * 直接通过路劲字符串获取指定对象的对应路径值
 * @param [pathStr] {String} 路径字符串
 * @param [label] {Object} 目标对象
*/
const getLabelByPathStr = (pathStr, label) => {
  const pathArr = getPath(pathStr);
  return getValueByPathArr(pathArr, label);
};

/**
 * 获取一万以内的数字对应的汉字
 * 9999 => 九千九百九十九
*/
const getZhIndex = (number) => {
  if (number === 0) {
    return '零';
  }
  const chnNumChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  const chnUnitChar = ['', '十', '百', '千'];
  let unitPos = 0;
  let chnStr = '';
  let strIns = '';
  let zero = true;
  while (number > 0) {
    const v = number % 10; // 获取余数 字符串也能取余
    if (v === 0) {
      if (!zero) {
        zero = true;
        chnStr = chnNumChar[v] + chnStr;
      }
    } else {
      zero = false;
      strIns = chnNumChar[v];
      strIns += chnUnitChar[unitPos];
      chnStr = strIns + chnStr;
    }
    unitPos += 1;
    number = Math.floor(number / 10);
  }
  return chnStr;
};

/**
 * 判断值是否为空，空值返回true, 非空返回false
 * @param {Any} 待判断的值
 * @return {Boolean}
*/
const isEmpty = (data) => {
  const type = getType(data);

  switch (type) {
    case 'Object':
      return !Object.keys(data).length;
    case 'Array':
      return !data.length;
    case 'Number':
      return false;
    case 'String':
      return !data;
    case 'Null':
      return true;
    case 'Undefined':
      return true;
    case 'Boolean':
      return false;
    case 'Date':
      return false;
    default:
      return true;
  }
};

export default {
  getType,
  getPath,
  getValueByPathArr,
  getZhIndex,
  getLabelByPathStr,
  isEmpty,
};
