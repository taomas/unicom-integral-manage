// let str = 'get-element-by-id'
// let getCammelStr = (str) => {
//   return str.split('-').map((item, index) => {
//     if (index > 0) {
//       let word = item.charAt(0).toUpperCase() + item.slice(1)
//       return word
//     }
//     return item
//   }).join('')
// }
let fn1 = () => {
  return Promise.resolve(1)
}

let fn2 = () => {
  return Promise.resolve(2)
}

let fn3 = () => {
  return Promise.resolve(3)
}

Promise.all([fn1(), fn2(), fn3()]).then(([x, y, z]) => {
  console.log(y)
}).catch(res => {
  console.log('error' + res)
})