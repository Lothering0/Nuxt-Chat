import { Middleware } from '@nuxt/types'

const chatMiddleware: Middleware = ({ store, redirect }) => {
  const { name } = store.state.modules.user

  if (!name) redirect('/')
  // console.log(store.state.modules.user)
}

export default chatMiddleware
