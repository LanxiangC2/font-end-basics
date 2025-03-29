/**
 * 第一个例子, 求和的柯里化函数
 */

// const curry = (fn) => {
//     return function _curry (...args) {
// 		if (args.length >= fn.length) {
// 			return fn.apply(this, args)
// 		}

// 		return function (...args2) {
// 			return _curry.apply(this, [...args, ...args2])
// 		}
// 	}
// }

// const sum = (a, b, c) => a + b + c
// const currriedSum = curry(sum)

// console.log(curriedSum(1)(2)(3)) // 输出6
// console.log(curriedSum(1, 2)(3)) // 输出6

/**
 * 第二个例子, 用于说明的就是没有 this 绑定, 会发生什么
 * const curriedCalculateTotal = curry(cart.calculateTotal);
 * cart.calculateTotal 这个方法内部使用了 this.items 来访问购物车中的商品，如果不绑定this
 * 那么在执行 curriedCalculateTotal(discount) 时，discount 函数内部的 this 将不会被正确地绑定到 cart,
 * this 指向 window 或者 undefined，从而导致错误。
 */

class Cart {
    constructor() {
        this.items = [];
    }

    addItem(item) {
        this.items.push(item);
    }

    // 计算商品总价的方法，接受一个折扣函数作为参数
    calculateTotal(discountFunction) {
        const total = this.items.reduce((acc, item) => acc + item.price, 0);
        return discountFunction(total);
    }
}

// 折扣函数，简单示例为打八折
function discount(price) {
    return price * 0.8;
}

// 柯里化函数的错误实现（未处理 this 绑定问题）
function curry(func) {
    return function curried(...args) {
        if (args.length >= func.length) {
            // return func(args); // 不绑定 this，导致错误
            return func.apply(this, args); // 这里的this指向Cart实例，正确绑定this
        } else {
            return function(...moreArgs) {
                // return curried(args.concat(moreArgs)); // 不绑定this，导致错误
                return curried.apply(this, args.concat(moreArgs)); // 正确绑定 this
            };
        }
    };
}

const cart = new Cart();
cart.addItem({ price: 100 });
cart.addItem({ price: 200 });

// 对 calculateTotal 方法中的 discountFunction 参数进行柯里化（错误版本）
// 错误版本，因为没有正确绑定 this
// const curriedCalculateTotal = curry(cart.calculateTotal)
// 正确版本
const curriedCalculateTotal = curry(cart.calculateTotal).bind(cart);

// 尝试分步骤传入折扣函数参数
const result = curriedCalculateTotal(discount);

console.log('购物车里折扣价是：', result);
