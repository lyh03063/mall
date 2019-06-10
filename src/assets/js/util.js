let fun1 = function (obj) {//深拷贝一个Json对象的函数
    let str = JSON.stringify(obj);//json对象转字符串
    let objNew = JSON.parse(str); //字符串转json对象
    return objNew
}



export default {
    deepCopy: fun1
}