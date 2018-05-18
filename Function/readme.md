# 函数是根基

> 在 JavaScript 中，函数是 *第一型对象* ，也就是说，函数可以共处，可以将其视为其他任意类型的 JavaScript 对象。就像普通的 JavaScript 数据类型，函数可以被任意变量进行引用，或声明成对象字面量，甚至可以将其作为函数参数进行传递。

JavaScript 的函数式特性为何如此重要

  - 函数是代码执行的主要模块化单元


## 函数是第一型对象

  对象在 JavaScript 中有如下功能

    - 它们可以通过字面量进行创建
    - 它们可以赋值给变量，数组或其他对象的属性
    - 它们可以做为参数传递给函数
    - 它们可以做为函数的返回值进行返回
    - 它们可以拥有动态创建并赋值的属性

  在 JavaScript 中，函数拥有全部这些功能。 函数还可以调用(异步)


## 浏览器的事件轮询

> 代码不负责时间轮询和事件派发，而是浏览器帮我们处理。  我们的职责是为浏览器中发生的各种事件建立事件的处理程序(handler)，这些事件在触发时被放置在一个事件队列（先进先出列表[FIFO]），然后浏览器将调用已经为这些事件建立好的处理程序(handler)

  因为这些事件发生的时间和顺序都是不可预知的，所以事件处理函数的调用也是异步的

  以下类型的事件都有可能互相穿插的发生:

  - 浏览器事件，如当一个页面完成加载或卸载的时候
  - 网络事件, 如响应一个 Ajax 请求
  - 用户事件, 如鼠标单击、鼠标移动或按键
  - 计时器时间，如超时或计时器触发

  执行此类事件的绝大多数代码差不多都一样，实例如下:

  function onload () {
    log(1)
  }

  window.onload = onload

  window.onload = function () {}


  非侵入式 JavaScript -- 结构、样式、行为

  浏览器的事件轮询是单线程。每个事件都是按照在队列中所放置的顺序来处理的。这就是所谓FIFO(先进先出)列表。每个事件都是在自己的生命周期内进行处理，所有其他的事件必须等到这个事件处理结束以后才能继续处理。在任何情况下，单线程都不能同时执行两个处理程序。

  注意：浏览器把事件放到队列上的机制是在事件轮询模型之外。确实何时发生并把他们放到事件队列上的过程所处的线程，并不参与事件本身的处理。


## 回调概念

  >我们创建一个函数，以便其他一些代码再适当的时机回头再调用它。


## 作用域和函数

在 JavaScript 中，作用域是由 function 声明的，而不是代码块。声明的作用域创建于代码块，但不是终结于代码块。(其他语言终结于代码块)

- 变量声明的作用域开始于声明的地方，结束于所在函数的结尾，与代码嵌套无关
- 命名函数的作用域是指声明该函数的整个函数范围，与代码嵌套无关(机制提升)
- 对应作用域声明，全局上下文就想一个包含页面所有代码的超大型函数

函数可以在其作用域范围内被提前引用，但变量不行

  变量只是声明提升，但初始化不能提升。

  ```
  log(a); // undefined

  var a = 1;
  ```

## 函数调用

> 函数的调用方式对于其内部的代码是如何执行的，有着巨大的影响，尤其是在 this 参数的创建中。

- 函数调用
- 方法调用(作为对象的一个方法，支持面向对象编程)
- 构造函数(创建一个下的对象)
- apply和call(修改this指向)

详细介绍: https://blog.csdn.net/crasslandwolf/article/details/537643

> 构造器的目的是要创建一个新对象并对其进行设置，然后将其作为构造器的返回值进行返回。任  何干扰这种意图的函数，都不适合作为构造器。



## 构造器编码注意事项

  构造器的目的是通过函数初始化创建新的对象



# 挥舞函数

##  匿名函数

  > 通常匿名函数的使用情况是，创建一个供以后使用的函数。

  - 创建一个匿名函数作为事件处理程序
  - 作为一个对象的方法
  - 回调

## 递归

> 引用自身，并且有终止条件

回文: 一个短语，不管从哪个方向读都是相同的

```
  function test (txt) {
    if (txt.length <= 1) return true

    if (txt.charAt(0) != txt.charAt(txt.length - 1)) return false

    return test(txt.substr(1, txt.length - 2))
  }

```


## 引用的丢失问题

  > 一个进行递归调用的对象属性引用。与函数的实际名称不同，这种引用可能是暂时的，这种依赖方式会导致我们很混乱。

```
  var a = {
    say: function (n) {
      return n > 1 ? a.say(n - 1) + '-x' : 'x'
    }
  }

  var b = {
    say: a.say
  }

  a = {}

  console.log(b.say(3)) // 报错
```

  函数引用多个地方并没有什么不妥。但潜在的问题是: 该函数是递归，不管是调用 a 的 say 方法，还是 b 的 say 方法。它都使用的 a.say 引用来调用自身。


 修正:

 ```
 var a = {
   say: function (n) {
     return n > 1 ? this.say(n - 1) + '-x' : 'x'
   }
 }
 ```

## 内联命名函数
```
  var a = {
    say: function x (n) { // 定义一个命名内联函数
      return n > 1 ? x(n - 1) + '-x' : 'x'
    }
  }

  var b = {
    say: a.say
  }

  a = {}
  console.log(b.say(3))
```

尽管可以给内联函数进行命名，但这些名称只能在自身函数内部才是可见的。内联函数的名称和变量的作用域仅限于声明他们的函数。
```
  var a = function b() {
    console.log(a == b); // true
    console.log(typeof b); // function
  }
  a()
  console.log(typeof a); // function
  console.log(typeof b); // undefined
```


## callee 属性(弃用)


# 将函数视为对象

> 函数可以有属性，也可以有方法，可以分配给变量和属性，也可以享有所有普通对象所拥有的属性，而且还有一个超级特性，他们可以被调用。

```
  var obj = {}
  var fn = function () {}

  obj.x = 'obj.x'

  fn.x = 'fn.x'
```

## 函数存储
```
  var store = {
    fnId: 1,
    cache: {},
    add: function (fn) {
      if (!fn.id) {
        fn.id = store.fnId++;
        return !!(store.cache[fn.id] = fn)
      }
    }
  }


  function sayFuck () {
    console.log('fuck');
    return 'ojbk'
  }

  function sayShit () {
    console.log('shit');
    return 'ojbk'
  }
  store.add(sayFuck)
  store.add(sayShit)
  console.log(store.cache);
```

## 自记忆函数

  优点:
      - 存储之前计算过的结果，性能好
      - 发生在幕后，完全无缝，不需要在做其他工作

  缺点:
      - 牺牲内存
      - 纯粹主义者。缓存不应该和义务逻辑放在一起，一个函数就应该纯粹的做好自己的工作
      - 很难测试一个算法的性能

```
  function isPrime (value) {
    if (!isPrime.answer) isPrime.answer = {};

    if (isPrime.answer[value]) {
      return isPrime.answer[value]
    }

    var prime = (value != 1 && value != 0)

    for (var i = 2; i < value; i++) {
      if (value % i == 0) {
        prime = false
        break
      }
    }
    // 通过 answer 记录已经计算过的 数字，下次直接返回，不需要再次计算
    // !! 返回 结果
    return !!(isPrime.answer[value] = prime)

  }
```

> 函数的属性特性: 我们可以将状态和缓存信息存储在一个封装的独立位置上，不仅在代码组织上有好处，而且外部存储和缓存对象无需污染作用域，就可以获取性能提升。

## 伪造数组方法
```
  var obj = {
    length: 0,
    add: function (value) {
      Array.prototype.push.call(this, value)
    }
  }
```

## apply 支持可变参数

> call 和 apply 是作为所有函数的方法存在的 -- 内置的 JavaScript 函数

  查找数组中的最大值和最小值

  ```
    function arrMax (arr) {
      return Math.max.apply(Math, arr)
    }

    function arrMin (arr) {
      return Math.min.apply(Math, arr)
    }
  ```

## 函数重载

  使用 arguments 处理

### 将 arguments 列表进行 slice(切片) 和 dice(取舍)

```
  function multiMax (first) {
    return first + Math.max.apply(Math, Array.prototype.slice.call(arguments, 1))
  }
```

### 函数重载方式

  > 基于传递的参数定义一个有很多不同功能的函数

  if-else 判断参数实现

### 函数的 length 属性

  函数声明时所需要传入的形参的数量


  - length: 函数声明时的形参数量
  - arguments.length 函数调用时的实参数量

### 利用参数的个数进行函数的重载

  通过 switch 语句实现代码很不整洁。不会一个忍者的做法

  来一个疯狂的方法实现:

  依次往上推，有点像递归一样，当调用时传入的实参没有对应的方法时，就 undefined



  ```
    var ninja = {};

    // 就是这么疯狂
    function addMethod (obj, fnName, fn) {

      var oldFn = obj[fnName]

      obj[fnName] = function () {
        if (fn.length == arguments.length) {
          return fn.apply(this, arguments)
        } else if (typeof oldFn == 'function') {
          return oldFn.apply(this, arguments) // 使用上一次的 fn, 如果还不能对应则继续向上推，使用上上次的 fn ...  就是这么吊  
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
  ```

  判断一个变量是不是一个方法

  ```
    function isFunction (obj) {
      reutrn Object.prototype.toString.call(obj) === '[object Function]';
    }
  ```

  我必将成为一个忍者
