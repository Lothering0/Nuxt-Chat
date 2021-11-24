import { Module, VuexModule, Action, Mutation } from 'vuex-module-decorators'
import $socket from '@/plugins/socket-instance'

interface User {
  name: string
  userId?: string
  room: string | number
  color: string
}

interface Message {
  name: string
  text: string
}

@Module({
  name: 'modules',
  stateFactory: true,
  namespaced: true,
})
export default class MainModule extends VuexModule {
  public emptyUser: User = {
    name: '',
    userId: '',
    room: '',
    color: ''
  }

  public messages: Message[] = []

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

  @Mutation
  setNewMessage(message: Message) {
    this.messages.push(message)
  }

  @Action
  createMessage(text: string) {
    $socket.emit('createMessage', {
      text,
      name: this.user.name,
      room: this.user.room,
      id: this.user.userId
    })
  }

  @Action
  joinUser(user: User) {
    $socket.emit('userJoined', user, (data: any) => {
      console.log(data)
      if (typeof data !== 'string')
        this.user.userId = data.userId
    })
  }

  get getUser() {
    return this.user
  }

  get getMessages() {
    return this.messages
  }
}
