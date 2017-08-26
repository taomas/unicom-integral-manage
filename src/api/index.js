import AV from 'leancloud-storage'

const initLeancloud = () => {
  let config = {
    appId: 'BOVWOFjF1IOefkuWVHHp6vJ9-gzGzoHsz',
    appKey: 'OYXvjMkIRTVu1dI2bp5fELSq'
  }
  AV.init({
    ...config
  })
}

initLeancloud()

export const register = (username, password) => {
  let MyUser = AV
    .Object
    .extend('MyUser')
  let query = new AV.Query('MyUser')
  let user = new MyUser()
  return query
    .find()
    .then(users => {
      let hasUser = false
      let registedUser = {}
      users.forEach(user => {
        let name = user.get('username')
        if (name === username) {
          hasUser = true
          registedUser = user.toJSON()
        }
      })
      return {hasUser: hasUser, user: registedUser}
    })
    .then(res => {
      if (!res.hasUser) {
        user.set('username', username)
        user.set('password', password)
        user.set('role', 'admin')
        return Promise.resolve(user.save())
      } else {
        return Promise.reject({
          success: false,
          result: {
            user: res.user
          }
        })
      }
    })
}

export const login = (username, password) => {
  let query = new AV.Query('MyUser')
  return query
    .find()
    .then(users => {
      let hasUser = false
      let registedUser = {}
      users.forEach(user => {
        let name = user.get('username')
        let pwd = user.get('password')
        if (username === name && password === pwd) {
          hasUser = true
          registedUser = user.toJSON()

        } else {
          return {
            success: false,
            message: '请求失败',
            result: {
              user: user.toJSON()
            }
          }
        }
      })
      if (hasUser) {
        return Promise.resolve({
          success: true,
          message: '请求成功',
          result: {
            user: registedUser
          }
        })
      } else {
        return Promise.reject({success: false, message: '请求失败', result: {}})
      }
    })
}

export const loginout = () => {
  return AV
    .User
    .logOut()
}

export const getAllUser = () => {
  let query = new AV.Query('_User')
  let now = new Date()
  query.lessThanOrEqualTo('createdAt', now)
  return query
    .count()
    .then(count => {
      console.log(count)
    })
}

const hasUserScore = async() => {
  let id = localStorage.getItem('objectId') || ''
  let query = new AV
    .Query('Product')
    .equalTo('user', AV.Object.createWithoutData('User', id))
  let result = query.include('test')
}

export const initUserScore = () => {
  hasUserScore()
}

export const queryUserScore = () => {
  let id = localStorage.getItem('objectId') || ''
  let query = new AV
    .Query('Product')
    .equalTo('user', AV.Object.createWithoutData('User', id))
  return query
    .find()
    .then(res => {
      return res
    })
}

export const isCurrentUser = () => {
  let currentUser = AV
    .User
    .current()
  if (currentUser) {
    return true
  }
  return false
}
