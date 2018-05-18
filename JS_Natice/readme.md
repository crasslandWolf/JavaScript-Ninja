# JavaScript 原生方法

 为什么我要写一下这些原生方法呢，因为我 tmd 一直记不住各自的用法，老了吗？？no...


 1. substring 提取字符串中介于两个指定下标之间的字符

    `substring(start, stop)`

    start: 必须，开始位置
    stop:  可选 结束位置，省略时直到结尾

  2. substr 提取字符串 start 下标开始的指定书目的字符

    `substr(start, length)`

    start:  必须，开始位置
    length: 可选，指定数目, 省略时直到结尾

  3. slice（切片） 提取数组中指定的下标的元素

    `slice(start, end)`

    start: 必须，开始位置，可为负数，-1 代表最后一个元素，依次类推
    end:   可选，结束位置，省略时直到结尾，若为负数，从结尾开始算起

  4. splice（拼接）数组 添加/删除 元素，返回被删除的元素

    `splice(index, howmany, item1...iten2)`

    index:   必须，整数，添加/删除 元素的位置，负数从数组结尾处规定位置
    howmany: 必须，删除的数量，0 不删除
    item:    可选，添加的元素

  5. split （切） 字符串分割成字符串数组

    `split(separator, howmany)`

    separator: 必须，字符串或正则
    howmany:   可选，返回的数组的长度

  6. join 数组转字符串

    `join(separator)`

    separator: 可选，分隔符，省略默认使用逗号
