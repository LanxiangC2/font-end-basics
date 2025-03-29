function templateString(strings, ...values) {
    return strings.reduce((result, string, index) => {
      const value = values[index] !== undefined ? values[index] : '';
      return result + string + value;
    }, '');
  }

const name = 'John';
const age = 25;
const greeting = templateString`Hello, my name is ${name} and I'm ${age} years old.`;

console.log(greeting); // Output: Hello, my name is John and I'm 25 years old.