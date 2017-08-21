import AV from 'leancloud-storage'

let config = {
  appId: 'BOVWOFjF1IOefkuWVHHp6vJ9-gzGzoHsz',
  appKey: 'OYXvjMkIRTVu1dI2bp5fELSq'
}

AV.init({
  ...config
})

export const register = (username, password) => {
  let user = new AV.User()
  user.setUsername(username)
  user.setPassword(password)
  return user.signUp(username, password)
}

export const login = (username, password) => {
  return AV.User.logIn(username, password)
}

export const loginout = () => {
  return AV.User.logOut()
}

const hasUserScore = async () => {
  let id = localStorage.getItem('objectId') || ''
  let query = new AV.Query('Product').equalTo('user', AV.Object.createWithoutData('User', id))
  let result = query.include('test')
  console.log(result.toJSON())
}

export const initUserScore = () => {
  hasUserScore()
  // let Product = AV.Object.extend('Product')
  // let product = new Product({
  //   score: 0,
  //   user: AV.User.current()
  // })
  // return product.save().then(res => {
  //   return res.toJSON()
  // })
}

export const queryUserScore = () => {
  let id = localStorage.getItem('objectId') || ''
  let query = new AV.Query('Product').equalTo('user', AV.Object.createWithoutData('User', id))
  return query.find().then(res => {
    return res
  })
}

export const isCurrentUser = () => {
  let currentUser = AV.User.current()
  if (currentUser) {
    return true
  }
  return false
}
