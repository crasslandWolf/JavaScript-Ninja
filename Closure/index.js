// 闭包

// var outerX = '我在外面'
//
// var later;
//
// function outerFn () {
//   var interX = '我在里面'
//
//   function interFn (value) {
//     console.log('outerX: ' + outerX);
//     console.log('interX: ' + interX);
//     console.log('value: ' + value);
//     console.log('y: ' + y);
//   }
//
//   later = interFn
// }
// var y = 1
// outerFn()
// later('fuck')

// 内部变量
// function Ninja () {
//   var timer = 0;
//
//   this.set = function () {
//     timer++;
//   }
//
//   this.get = function () {
//     return timer
//   }
// }
//
// var ninja = new Ninja()
//
// console.log(ninja.get())
// ninja.set()
// console.log(ninja.get())
// console.log(ninja.timer); // undefined

// bind

// Function.prototype.binds = function () {
//   var fn = this;
//   var args = Array.prototype.slice.call(arguments);
//   var object = args.shift();
//
//   return function () {
//     return fn.apply(object, args.concat(Array.prototype.slice.call(arguments)))
//   }
// }
//
// var obj = {}
//
// function xx () {
//   console.log(obj == this);
// }
//
// xx.bind(obj)()

// 函数的记忆方法(缓存)

// Function.prototype.memoized = function (value) {
//   this.primes = this.primes || {}
//   return this.primes[value] !== undefined ? this.primes[value] : !!(this.primes[value] = this.apply(this, arguments))
// }
//
// function isPrime (value) {
//   var flag = true
//   if (value === 1 || value === 0 ) return false
//   for (var i = 2; i < value; i++) {
//     if (value % i == 0) {
//       flag = false
//       break;
//     }
//   }
//   return flag
// }
//
// var value = isPrime.primes && isPrime.primes[5] ? isPrime.primes[5] : isPrime.memoized(5)


// 利用闭包实现，方便调用

// Function.prototype.memoized = function (value) {
//   this.primes = this.primes || {}
//   console.log(this.primes);
//   return this.primes[value] !== undefined ? this.primes[value] : this.primes[value] = this.apply(this, arguments)
// }
//
// Function.prototype.memoize =function () {
//   var fn = this
//   return function () {
//     return fn.memoized.apply(fn, arguments)
//   }
// }
//
// var isPrime = (function  (num) {
//
//   if (num === 1 || num === 0) return;
//
//   var flag = true;
//
//   for (var i = 2; i < num; i++) {
//     if (num % i == 0) {
//       flag = false;
//       break;
//     }
//   }
//   return flag
// }).memoize()


// 函数包装

// var  Persion = {
//   name: '好人',
//   sayName: function () {
//     return '呵呵'
//   }
// }
//
//
// function warp (object, method, warpper) {
//
//   var fn = object[method];
//
//   return object[method] = function () {
//     return warpper.apply(this, [fn.apply(this)].concat(Array.prototype.slice.apply(Array, arguments)))
//   }
// }
//
// warp(Persion, 'sayName', function (fn) {
//   return Persion.name == '好人' ? '我是个好人' : fn()
// })
