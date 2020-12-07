export let baseURL = process.env.NODE_ENV == 'production'?'https://sdjBlog.cn:8090':'https://sdjBlog.cn:8090';

// 判断深层次对象属性是否存在
export let objProp = (data, path) => {
  if (!data || !path) {
    return null
  }
  let tempArr = path.split('.');
  for (let i = 1; i < tempArr.length; i++) {
    let key = tempArr[i]
    if (data[key]) {
      data = data[key]
    } else {
      return null
    }
  }
  return data
}