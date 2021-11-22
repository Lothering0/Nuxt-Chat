import { Module, VuexModule, Action, Mutation } from 'vuex-module-decorators'
import $socket from '@/plugins/socket-instance'

interface User {
  name: string
  room: string | number
  color: string
}

@Module({
  name: 'modules',
  stateFactory: true,
  namespaced: true,
})
export default class MainModule extends VuexModule {
  public emptyUser: User = {
    name: '',
    room: '',
    color: ''
  }

  public messages = []

  public user: User = this.emptyUser

  @Mutation
  setUser(user: User) {
    this.user = user
  }

  @Mutation
  clearData() {
    this.user = this.emptyUser
    this.messages = []
  }

  @Action
  newMessage() {
    $socket.emit('newMessage', {
      text: 'Message from action'
    })

    console.log('action')
  }

  @Action
  joinUser(user: User) {
    $socket.emit('userJoined', user)
  }

  get getUser() {
    return this.user
  }

  get getMessages() {
    return this.messages
  }
}
