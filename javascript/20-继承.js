
/*1. call 利用 call 方法，将父类的方法绑定到子类的 this 上
* 问题是，这种方式无法继承父类原型上的方法
*/
function Parent () {
    this.name = "Parent";
}

function Child() {
    Parent.call(this);
    this.age = "Child";
}

// console.log(new Child())

/**
 * 2. 原型链继承
 */
function Parent2 () {
    this.name = "Parent";
    this.arr = [1, 3, 4]
}

Parent2.prototype.sayHello = function () {
    console.log('2.原型链继承： parent2 say hello')
}

function Child1() {
    this.age = "Child";
}
Child1.prototype = new Parent2();

const child1 = new Child1();
const child2 = new Child1();

// child1.sayHello()
// 问题：引用类型的属性被所有实例共享
// child1.arr.push(5)
// console.log(child2.arr)

/**
 *
 * 3. 前两种的结合
 *
 */
function Parent3 () {
    this.name = "Parent";
    this.arr = [1, 3, 4]
}

Parent3.prototype.sayHello = function () {
    console.log('3.前两种的结合： parent3 say hello')
}

function Child3() {
    Parent3.call(this);
    this.age = "Child";
}

// 存在问题：Parent3 在这里会被多执行一次，因为这里又执行了一次Parent3构造函数
Child3.prototype = new Parent3();

const child3 = new Child3();
const child4 = new Child3();

// child3.sayHello()
// child3.arr.push(5)
// console.log(child4.arr)

/**
 * 4. 优化组合继承 寄生组合继承
 */

function Parent4 () {
    this.name = "Parent";
    this.arr = [1, 3, 4]
}

Parent4.prototype.sayHello = function () {
    console.log('4.优化组合继承： parent4 say hello')
}

function Child4() {
    Parent4.call(this);
    this.age = "Child";
}

// Child4.prototype = Parent4.prototype;
// 上一行代码存在问题：Child4.prototype 和 Parent4.prototype 是同一个对象，所以 Parent4.prototype.constructor 也会被修改为 Child4
Child4.prototype = Object.create(Parent4.prototype);
// 修正构造函数指向问题
Child4.prototype.constructor = Child4;

const child5 = new Child4();
const child6 = new Child4();

child5.sayHello()
child5.arr.push(5)
console.log(child6.arr)
// 验证构造函数指向问题
const parentInstance = new Parent4();
console.log(parentInstance.constructor); // 输出: [Function: Child4]，不符合预期