import Cookies from 'js-cookie'
import Api from '@/api/api'
import Auth from '@/api/auth'

const state = {
  token: ''
}

const mutations = {
  setToken: (state, data) => {
    if (data) {
      Auth.setToken(data)
      Auth.setLoginStatus()
    } else {
      Auth.removeToken()
      Auth.removeLoginStatus()
    }
    state.token = data
  }
}

const actions = {
  // 登录
  login ({ commit }, userInfo) {
    return new Promise((resolve) => {
      Api.login({
        ...userInfo
      }).then(res => {
        if (res.data.login) {
          commit('setToken', res.token)
          Cookies.set('roles', res.name)
        }
        resolve(res)
      })
    })
  },

  // 登出
  logout ({ commit }) {
    return new Promise((resolve) => {
      commit('setToken', '')
      Cookies.remove('roles')
      resolve()
    })
  },

  // 重新获取用户信息及Token
  relogin ({ dispatch, commit, state }) {
    return new Promise((resolve) => {
      // 根据Token进行重新登录
      let token = Cookies.get('token')
      // 重新登录时校验Token是否存在，若不存在则获取
      if (!token) {
        dispatch('getNewToken').then(() => {
          commit('setToken', state.token)
        })
      } else {
        commit('setToken', token)
      }
      resolve()
    })
  },

  // 获取新Token
  getNewToken ({ commit, state }) {
    return new Promise((resolve) => {
      Api.getToken({
        token: state.token
      }).then((res) => {
        commit('setToken', res.token)
        resolve()
      })
    })
  }
}

export default {
  state,
  mutations,
  actions
}
