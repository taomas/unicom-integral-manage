import AV from 'leancloud-storage'

// user.set('username', detail.username)
// user.set('password', detail.password)
// user.set('buyTimes', detail.buyTimes)
// user.set('recommendCount', detail.recommendCount)
// user.set('yesterdayScore', detail.yesterdayScore)
// user.set('todayScore', detail.todayScore)
// user.set('actualScore', detail.actualScore)
// user.set('totalScore', detail.totalScore)
// user.set('role', detail.role)
// user.set('name', detail.name)
// user.set('gender', detail.gender)
// user.set('birth', detail.birth)
// user.set('address', detail.address)
// user.set('idcard', detail.idcard)

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
    password: '',
    buyTimes: 0,
    recommendCount: 0,
    score: 0,
    yesterdayScore: 0,
    todayScore: 0,
    actualScore: 0,
    totalScore: 0,
    addRecord: [],
    role: 'admin',
    name: '',
    gender: '',
    birth: '',
    address: '',
    idcard: 0,
    updateTime: '0'
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
        user.set('buyTimes', params.buyTimes)
        user.set('recommendCount', params.recommendCount)
        user.set('yesterdayScore', params.yesterdayScore)
        user.set('todayScore', params.todayScore)
        user.set('actualScore', params.actualScore)
        user.set('totalScore', params.totalScore)
        user.set('role', params.role)
        user.set('name', params.name)
        user.set('gender', params.gender)
        user.set('birth', params.birth)
        user.set('address', params.address)
        user.set('idcard', params.idcard)
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
  let id = detail.id
  return query.get(id).then(user => {
    user.set('username', detail.username)
    user.set('password', detail.password)
    user.set('buyTimes', detail.buyTimes)
    user.set('recommendCount', detail.recommendCount)
    user.set('yesterdayScore', detail.yesterdayScore)
    user.set('todayScore', detail.todayScore)
    user.set('actualScore', detail.actualScore)
    user.set('totalScore', detail.totalScore)
    user.set('role', detail.role)
    user.set('name', detail.name)
    user.set('gender', detail.gender)
    user.set('birth', detail.birth)
    user.set('address', detail.address)
    user.set('idcard', detail.idcard)
    return user.save()
  })
}

export const saveUserIdcard = (detail) => {
  let query = new AV.Query('MyUser')
  let id = detail.id
  return query.get(id).then(user => {
    user.set('name', detail.name)
    user.set('gender', detail.gender)
    user.set('birth', detail.birth)
    user.set('address', detail.address)
    user.set('idcard', detail.idcard)
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

export const searchUser = (username) => {
  let query = new AV.Query('MyUser')
  query.equalTo('username', username)
  return query.find().then(res => {
    let users = res.map(user => {
      return user.toJSON()
    })
    return users
  })
}

export const addScore = (score, baseScore) => {
  let query = new AV.Query('MyUser')
  return query.find().then(users => {
    let lastTime = ''
    let date = new Date()
    let year = date.getFullYear()
    let mouth = date.getMonth() + 1
    let day = date.getDate()
    mouth = mouth <= 9 ? `0${mouth}` : mouth
    day = day <= 9 ? `0${day}` : day
    let newUpdateTime = `${year}${mouth}${day}`
    users.forEach(user => {
      if (!lastTime) {
        lastTime = user.get('updateTime')
      }
      let totalScore = user.get('totalScore')
      let actualScore = user.get('actualScore')
      let recommendCount = user.get('recommendCount')
      let buyTimes = user.get('buyTimes')
      let todayScore = user.get('todayScore')
      let updateScore = buyTimes * score + recommendCount * baseScore
      if (totalScore < updateScore) {
        updateScore = totalScore
      }
      if (todayScore) {
        user.set('yesterdayScore', todayScore)
      }
      let updateActualScore = actualScore + updateScore
      let updateTotalScore = totalScore - updateScore
      user.set('updateTime', newUpdateTime)
      user.set('todayScore', updateScore)
      user.set('actualScore', updateActualScore)
      user.set('totalScore', updateTotalScore)
    })
    if (newUpdateTime - lastTime < 1) {
      return Promise.reject({
        success: false,
        message: '新增积分间隔时间需要超过一天',
        result: {}
      })
    } else {
      return AV.Object.saveAll(users)
    }
  })
}

export const addParams = () => {
  let query = new AV.Query('MyUser')
  return query.find().then(users => {
    users.forEach(user => {
      user.set('updateTime', '0')
    })
    return AV.Object.saveAll(users)
  })
}
