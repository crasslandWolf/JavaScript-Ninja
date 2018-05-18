#  闭包

  从学习 js 到现在无时无刻都在听到闭包的字眼。每次面试必问的点，虽然能说一下。但其实理解程度还是很差。现在我要成为忍者。。 mmp...

 - 什么是闭包，他们是如何工作的
 - 利用闭包简化开发
 - 利用闭包提高性能
 - 利用闭包解决常见的作用域问题



## 闭包是如何工作的

  > 简单的说，闭包就是一个函数在创建时允许该自身函数访问并操作该自身函数之外的变量时所创建的作用域。换句话说，闭包可以让函数访问所有的变量和函数，只要这些变量和函数存在于该函数声明时的作用域就行。

  ```
    var outerX = '我在外面'

    var later;

    function outerFn () {
      var interX = '我在里面'

      function interFn (value) {
        console.log('outerX: ' + outerX); // 我在外面
        console.log('interX: ' + interX); // 我在里面
        console.log('value: ' + value); // fuck
        console.log('y: ' + y); // 1
      }

      later = interFn
    }
    var y = 1
    outerFn()
    later('fuck')
  ```

   - 内部函数的参数是包含在闭包中的。
   - 作用域之外的所有变量，即便是函数声明之后的声明，也是包含在闭包中的。
   - 相同作用域内，尚未声明的变量不能提前引用。

   > 使用闭包时，闭包内的信息会一直保存在内存里，直到这些信息确保不再被使用(可以安全进行垃圾回收)，或页面卸载事。JS 引擎才能清理这些信息。

## 使用闭包

### 私有变量

  > 闭包的一种常见用法是封装一些信息作为"私有变量"，也就是说限制这些变量的作用域。在编写面向对象的 JavaScript 代码时，是无法使用传统的私有变量的。对象的属性对外保持隐藏。但通过使用闭包，我们可以实现一个可接受的类似功能。

  ```
    function Ninja () {
      var timer = 0;

      this.set = function () {
        timer++;
      }

      this.get = function () {
        return timer
      }
    }

    var ninja = new Ninja()

    console.log(ninja.get())
    ninja.set()
    console.log(ninja.get())
    console.log(ninja.timer) // undefined
  ```

### 回调(callback) 和 计时器(timer)

### 绑定函数上下文

  ```
    Function.prototype.binds = function () {
      var fn = this;
      var args = Array.prototype.slice.call(arguments);
      var object = args.shift();

      return function () {
        return fn.apply(object, args.concat(Array.prototype.slice.call(arguments)))
      }
    }
  ```
  bind 方法


  bind 和 call与apply 的区别： call 和 apply 会立即执行。 bind 不会一个函数，可以后期执行

### 偏应用函数



### 函数的记忆方法

```
  Function.prototype.memoized = function (value) {
    this.primes = this.primes || {}
    return this.primes[value] !== undefined ? this.primes[value] : !!(this.primes[value] = this.apply(this, arguments))
  }

  function isPrime (value) {
    var flag = true
    if (value === 1 || value === 0 ) return false
    for (var i = 2; i < value; i++) {
      if (value % i == 0) {
        flag = false
        break;
      }
    }
    return flag
  }

  var value = isPrime.primes && isPrime.primes[5] ? isPrime.primes[5] : isPrime.memoized(5)
```
