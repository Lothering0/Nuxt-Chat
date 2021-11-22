import { Module, VuexModule, Action, Mutation } from 'vuex-module-decorators'
import $socket from '@/plugins/socket-instance'

interface User {
  name: string
  room: string | number
}

@Module({
  name: 'modules',
  stateFactory: true,
  namespaced: true,
})
export default class MainModule extends VuexModule {
  public user: User = {
    name: '',
    room: ''
  }

  @Mutation
  setUser(user: User) {
    this.user = user
  }

  @Action
  newMessage() {
    $socket.emit('newMessage', {
      text: 'Message from action'
    })

    console.log('action')
  }

  get getUser() {
    return this.user
  }
}
