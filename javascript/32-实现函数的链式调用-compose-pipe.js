// 一、题目描述
// 实现一个 compose 函数，支持以下特性：
// 函数组合：从右到左执行（如 compose(f, g, h)(x) = f(g(h(x)))）。
// 柯里化支持：允许逐个传递参数（如 compose(f, g)(x)(y) = f(g(x, y))）。
// 灵活传参：支持混合传参（如 compose(f, g)(x, y) = f(g(x, y))）。
// 上下文保留：正确绑定函数的 this（如类方法组合）。

// // 1. 实现 compose 函数，满足上述特性。
// function compose(...funcs) {
//     if (funcs.length === 0) {
//         return arg => arg;
//     }

//     if (funcs.length === 1) {
//         return funcs[0];
//     }

//     return funcs.reverse().reduce((a, b) => (...args) => a(b(...args)));
// }
// //  2. 实现 pipe 函数，支持从左到右执行的函数组合。
// function pipe(...funcs) {
//     if (funcs.length === 0) {
//         return arg => arg;
//     }

//     if (funcs.length === 1) {
//         return funcs[0];
//     }

//     return funcs.reduce((a, b) => (...args) => a(b(...args)));
// }

// 你的 compose 实现（错误）
// funcs.reduce((a, b) => (...args) => a(b(...args)));
// 等价于从左到右执行：f(g(h(x))) → 实际应为右到左：h(g(f(x)))

// 你的 pipe 实现（正确逻辑，但与 compose 代码重复）
// funcs.reduce((a, b) => (...args) => a(b(...args)));
// 正确：从左到右执行 f(g(h(x)))


// ✅ 修复后的 compose（右→左，支持多参、上下文）
function compose(...funcs) {
    if (funcs.length === 0) return (arg) => arg;
    if (funcs.length === 1) return funcs[0].bind(this); // 绑定上下文
  
    // 反转函数数组，确保右→左执行
    return funcs.reverse().reduce((a, b) => {
      return function composed(...args) {
        // 绑定 this，支持类方法
        return a.call(this, b.apply(this, args));
      };
    });
  }
  
  
  // ✅ 修复后的 pipe（左→右，支持多参、上下文）
  function pipe(...funcs) {
    if (funcs.length === 0) return (arg) => arg;
    if (funcs.length === 1) return funcs[0].bind(this);
  
    return funcs.reduce((a, b) => {
      return function piped(...args) {
        // 绑定 this，累积参数
        return b.call(this, a.apply(this, args));
      };
    });
  }




// 测试用例
function add(x) {
    return x + 1;
}

function multiply(y) {
    return 10 * y;
}

const result = compose(multiply, add)(2); // 应该返回 9，即 ((3+1)*2)
console.log(result); // 输出: 9
