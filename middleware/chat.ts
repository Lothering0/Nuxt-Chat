import { Middleware } from '@nuxt/types'

const chatMiddleware: Middleware = ({ store, redirect }) => {
  const { name } = store.state.modules.user

  if (!name) redirect('/')
}

export default chatMiddleware
