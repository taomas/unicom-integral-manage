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

export const register = (params) => {
  let MyUser = AV
    .Object
    .extend('MyUser')
  let query = new AV.Query('MyUser')
  let user = new MyUser()
  params = Object.assign({
    username: 'admin',
    password: '123456',
    score: 0,
    totalScore: 0,
    recommendCount: 0,
    addRecord: [],
    role: 'admin'
  }, params)
  return query
    .find()
    .then(users => {
      let hasUser = false
      let registedUser = {}
      users.forEach(user => {
        let name = user.get('username')
        if (name === params.username) {
          hasUser = true
          registedUser = user.toJSON()
        }
      })
      return {hasUser: hasUser, user: registedUser}
    })
    .then(res => {
      if (!res.hasUser) {
        user.set('username', params.username)
        user.set('password', params.password)
        user.set('score', params.score)
        user.set('totalScore', params.totalScore)
        user.set('recommendCount', params.recommendCount)
        user.set('role', params.role)
        return user.save().then(res => {
          return {
            success: true,
            result: {
              user: res.toJSON()
            }
          }
        })
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

export const deleteUser = (id) => {
  let user = AV.Object.createWithoutData('MyUser', id)
  return user.destroy()
}

export const getUserDetail = (id) => {
  let query = new AV.Query('MyUser')
  return query.get(id).then(res => {
    return res.toJSON()
  })
}

export const resetPassword = ({id = '', oldPassword = '', newPassword = ''}) => {
  let query = new AV.Query('MyUser')
  return query.get(id).then(user => {
    let password = user.get('password')
    if (password !== oldPassword) {
      return Promise.reject({
        success: false,
        message: '原登录密码不正确'
      })
    } else {
      user.set('password', newPassword)
      return user.save()
    }
  })
}

export const saveUserDetail = (detail) => {
  let query = new AV.Query('MyUser')
  console.log(detail)
  let id = detail.id
  return query.get(id).then(user => {
    user.set('username', detail.username)
    user.set('password', detail.password)
    user.set('recommendCount', detail.recommendCount),
    user.set('score', detail.score)
    user.set('totalScore', detail.totalScore)
    user.set('role', detail.role)
    return user.save()
  })
}

export const getAllUser = () => {
  let query = new AV.Query('MyUser')
  return query.find().then(res => {
    let users = res.map(user => {
      return user.toJSON()
    })
    return users
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
