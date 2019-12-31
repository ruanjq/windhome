---
title: ES5和ES6的继承和区别
lang: zh-CN
---

# ES5和ES6的继承和区别

## ES5 的几种继承方式

### 1:原型链继承
原理：通过原型链将子类的原型指向父类的实例

```javascript
function Animal(name,color){
    this.name = name;
    this.color = color;
    this.likes = ["eat","sleep","play"]
}

Animal.prototype.sound = function(sound){
    console.log(this.name + "叫了一声,," + sound);
}

function Cat(age){
    this.age = age;
}

Cat.prototype = new Animal("猫","白色");

Cat.prototype.running = function(){
    console.log(this.name,this.age + "岁",this.color + "  奔跑中.....");
}

var cat = new Cat(2);

console.log(cat.age);
console.log(cat.name);
console.log(cat.color);
cat.running();
cat.sound("喵喵喵");

var cat1 = new Cat(2.5);
console.log(cat1.likes);
cat1.likes.push("fish");  // 更改cart实例中的fish 对象，同时也将cat 实例属性的likes 也改了，
console.log(cat1.likes, cat.likes);
// "eat","sleep","play","fish"  "eat","sleep","play","fish"
```
::: waring 
虽然父类的实例成为了子类的原型对象,子类可以共用父类的实例和方法,但是每个子类的实例都是共用父类的实例,所以当父类的实例属性是引用对的类型的时候 如果改变改变父类实例的数据，会导致所有的子类实例的属性都改变。
:::


### 2:借助构造函数实现继承
原理：在子类的构造函数的内部调用父类的构造函数,利用`apply()`和`call()`方法改变this的指向

```javascript

function Animal(name,color){
    this.name = name;
    this.color = color;
    this.likes = ["eat","sleep","play"];
    this.sayName = function(){
        console.log("hello,I am " + this.name);
    }
}

Animal.prototype.sound = function(sound){
    console.log(this.name + "叫了一声,," + sound);
}


function Cat(age,name,color){
    this.age = age;
    Animal.call(this,name,color);
}


var cat = new Cat(2.5,"小猫咪","灰色");
cat.sayName(); // right 
// cat.sound("喵喵喵");   // error cat.sound is not a function,无法调用父类原型链的方法

var cat1 = new Cat(3,"小猫咪","黑色");
cat1.likes.push("fish");
console.log(cat.likes,cat1.likes)
// ["eat", "sleep", "play"] , ["eat", "sleep", "play", "fish"]

```

::: waring 
通过构造函数实现继承的方式,本质上是通过apply,call 方法将父类的this指向子类的构造函数的实例，改变子类原型对象的属性,父类实例并不会受到影响.缺点：子类无法访问父类原型上的方法
:::


### 3：组合继承
原理: 将原型链继承和构造函数继承两种方法结合到一起,用构造函数继承父类的属性，用原型链继承父类的方法

```javascript
function father(){
    this.color=['red','yellow','blue']
};

father.prototype.showColor=function(){
    console.log(this.color)
}

function chiled(){
    father.call(this);
    this.type='chiled'
}

chiled.prototype=new father();

var val1=new chiled();

val1.showColor();  // ['red','yellow','blue']

val1.color.push('black');

console.log("val1.color",val1.color);  // ['red','yellow','blue','black']

var val2=new chiled();

console.log(val2.color);  // ['red','yellow','blue']

console.log(val2.showColor());    // ['red','yellow','blue']


var val3 = new chiled();

val3.color.push('white');

console.log(val1.color,val2.color,val3.color);
// ['red','yellow','blue','black']
// ['red','yellow','blue']
// ['red','yellow','blue','white']
```

::: warning
缺点：在实例化一个子类时,父类的构造函数执行了2次
- 第一次执行:  father.call(this)
- 第二次执行:  chiled.prototype=new father();
:::


### 组合继承优化
原理：在子类继承父类的prototype的方法时,直接继承父类的prototype,不再执行构造函数

```javascript
function Animal(name,color){
    this.name = name;
    this.color = color;
    this.likes = ["eat","sleep","play"];
    this.sayName = function(){
        console.log("hello,I am " + this.name);
    }

    console.log("父类构造函数执行")
}

Animal.prototype.sound = function(sound){
    console.log(this.name + "叫了一声,," + sound);
}


function Cat(age,name,color){
    this.age = age;
    Animal.call(this,name,color);
}

Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.constructor = Cat;



var cat = new Cat(2.5,"小猫咪","灰色");
cat.sayName(); // right 
// cat.sound("喵喵喵");   // error cat.sound is not a function,无法调用父类原型链的方法

var cat1 = new Cat(3,"小猫咪","黑色");
cat1.likes.push("fish");
console.log(cat.likes,cat1.likes)
// ["eat", "sleep", "play"] , ["eat", "sleep", "play", "fish"]

console.log(cat instanceof Cat,cat instanceof Animal);  // true  true
```

:::warning
通过 Object.create() 创建一个中间对象{},这个中间对象原型指向Animal.prototype，在将这个中间对象赋值给子类的prototype,最后将子类的构造函数指向Cat本身, cat instanceof Cat,cat instanceof Animal 都为true
:::


## ES6 的继承

1：`class` 可以理解为`function`, `class Animal{} typeof Animal ` 出书结果为`function` ,因此它也会拥有一个`prototype`属性,当 `new` 一个`class`的时候,会把`class`的`prototype`属性赋值给新对象的__proto__属性

2：constructor 方法是class 默认添加的方法,在`new`一个对象时,会自动调用该方法,constructor里面可以定义自己的相关属性

3：继承 `extends` 和 `super` class 子类名 extends 父类名 实现继承，接着还要在子类的`constructor`构造函数调用`super`方法,并将子类的this对象以参数形式传递给super方法，改变子类的this对象，相当于`构造函数继承`中的 Cat 构造函数中 `Animall.call(this)`;

```javascript

class Animal {
    constructor(name, color) {
        this.name = name;
        this.color = color;
        this.likes = ["eat", "sleep", "play"];
    }
    sound(sound) {
        console.log(this.name + "叫了一声,," + sound);
    }
}

class Cat extends Animal {
    constructor(age, name, color) {
        super(name, color); // 子类中，构造函数必须第一行调用super 方法，才能获取this对象,否则会报错
        this.age = age;
    }
}


var cat1 = new Cat(3,"小猫咪","黑色");
cat1.likes.push("fish");
console.log(cat1)

```


### 两者区别
- 1：ES5的继承可以通过构造函数继承、原型继承,组合继承等方式实现
- 2：ES6的继承通过`extends`关键字实现
- 3：`ES5`的继承，实质是先创建子类的实例`this`对象,然后再将父类的实例添加到子类上面,即`(Parent.apply(this))`
- 4：`ES6`的继承，是先将父类的实例对象的属性和方法，添加到this 上面,即`必须先调用super()`,然后再通过子类的构造函数修改this
