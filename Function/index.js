
/**
 * 递归
 */
// function test (str) {
//   if (str.length <= 1) {
//     return true
//   }
//
//   if (str.charAt(0) != str.charAt(str.length - 1)) {
//     return false
//   }
//
//   return test(str.substr(1, str.length - 2))
// }
//
//
// var str = '1233210'
// console.log(test(str))

/**
 * 引用丢失的问题
 */
//
// var a = {
//   say: function (n) {
//     return n > 1 ? this.say(n - 1) + '-x' : 'x'
//   }
// }
//
// var b = {
//   say: a.say
// }
//
// a = {}
// console.log(b.say(3))

/**
 * 内联命名函数
 */
// var a = {
//   say: function x (n) {
//     return n > 1 ? x(n - 1) + '-x' : 'x'
//   }
// }
//
// var b = {
//   say: a.say
// }
//
// a = {}
// console.log(b.say(3))

/**
 * 内联函数作用域
 */
// var a = function b() {
//   console.log(a == b);
//   console.log(typeof b);
// }
// a()
// console.log(typeof a);
// console.log(typeof b);


/**
 *  函数缓存
 */

// var store = {
//   fnId: 1,
//   cache: {},
//   add: function (fn) {
//     if (!fn.id) {
//       fn.id = store.fnId++;
//       return !!(store.cache[fn.id] = fn)
//     }
//   }
// }
//
//
// function sayFuck () {
//   console.log('fuck');
//   return 'ojbk'
// }
//
// function sayShit () {
//   console.log('shit');
//   return 'ojbk'
// }
// store.add(sayFuck)
// store.add(sayShit)
// console.log(store.cache);

/**
 * 自记忆函数
 * 计算素数
 */

// function isPrime (value) {
//   if (!isPrime.answer) isPrime.answer = {};
//
//   if (isPrime.answer[value]) {
//     return isPrime.answer[value]
//   }
//
//   var prime = (value != 1 && value != 0)
//
//   for (var i = 2; i < value; i++) {
//     if (value % i == 0) {
//       prime = false
//       break
//     }
//   }
//   // 通过 answer 记录已经计算过的 数字，下次直接返回，不需要再次计算
//   // !! 返回 结果
//   return !!(isPrime.answer[value] = prime)
//
// }

/**
 * 创建一个类数组的对象
 */
// var obj = {
//   length: 0,
//   add: function (value) {
//     Array.prototype.push.call(this, value)
//   }
// }
//
// obj.add(1)
// console.log(obj[0]);
//
// obj.add(2)
// console.log(obj);

/**
 * apply 支持可变参数
 * 查找数组的最小值和最大值
 */

// function arrMax (arr) {
//   return Math.max.apply(Math, arr)
// }
//
// function arrMin (arr) {
//   return Math.min.apply(Math, arr)
// }
//
// var arr = [1, 2, 3, 9, 4]
// console.log(arrMax(arr));
// console.log(arrMin(arr));

/**
 * 将 arguments 列表进行 slice(切片) 和 dice(取舍)
 */

  //第一个参数和剩余参数的最大值想加
  //
  // function multiMax (first) {
  //   return first + Math.max.apply(Math, Array.prototype.slice.call(arguments, 1))
  // }
  //
  //
  // console.log(multiMax(3, 1, 2, 3, 4));

/**
 * 函数重载
 */

var ninja = {};

// 就是这么疯狂
function addMethod (obj, fnName, fn) {

  var oldFn = obj[fnName]

  obj[fnName] = function () {
    if (fn.length == arguments.length) {
      return fn.apply(this, arguments)
    } else if (typeof oldFn == 'function') {
      return oldFn.apply(this, arguments)
    } else {
      console.log('请检查参数个数的正确性');
    }
  }
}

addMethod(ninja, 'sayNum', function () {
  console.log('length: ' + 0);
})
addMethod(ninja, 'sayNum', function (a) {
  console.log('length: ' + 1);
})
addMethod(ninja, 'sayNum', function (a, b) {
  console.log('length: ' + 2);
})
addMethod(ninja, 'sayNum', function (a, b, c) {
  console.log('length: ' + 3);
})



ninja.sayNum(1)
ninja.sayNum(1, 2)
ninja.sayNum(1)
ninja.sayNum(1, 2, 3, 4, 5)
ninja.sayNum(1, 2, 3)
ninja.sayNum(1)
