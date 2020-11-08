export default function ({ $axios, env, store }, inject) {
  $axios.setBaseURL(env.API_URL)
  $axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
  $axios.defaults.headers.common.Accept = 'application/json'
  $axios.defaults.withCredentials = true

  $axios.onRequest(() => {
    store.commit('loading', true)
  })

  $axios.onResponse(() => {
    store.commit('loading', false)
  })

  $axios.onError(() => {
    store.commit('loading', false)
  })
}
