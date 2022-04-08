保持对象

在工作中怎样简洁易懂高效的书写JS代码？我下面谈谈用对象来简化一些操作，我用一个专有名称--保持对象来定义下列操作。

1，不恰当的解构，比如在vue-router中，获取hash值，没必要再单独解构出相关的值。

```javascript
// bad
const query = this.$route.query
this.id = query.id
this.type = query.type // ... 这里再单独解析没必要，尤其是很长一串的this.XXX很难阅读
```

这里再单独解析没必要，尤其是很长一串的this.XXX很难阅读,其实简单处理就是让query保持为一个对象，这样也方便上下文阅读理解。比如this.query.id 就是通过URL的hash值id读取过来的。

```javascript
// godd
this.query = this.$route.query
```

2,函数入参、返回值均为对象。对象属性作为键值对，很好的描述了上下文环境。

```javascript
// bad
this.getDetail(1) 
// good
this.getDetail({id: 1}) 
```
此时如果不看getDetail函数，不知道这个入参1代表的是什么,而传入一个对象，就能很好的解决这个问题。



