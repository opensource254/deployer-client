export const state = () => ({
  loading: false,
})

export const mutations = {
  loading(state, isLoading) {
    state.loading = isLoading
  },
}
