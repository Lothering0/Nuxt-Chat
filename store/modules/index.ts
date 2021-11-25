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
  public messages: Message[] = []
  public user: User = {
    name: '',
    userId: '',
    room: '',
    color: ''
  }
  public users: User[] = []

  @Mutation
  setUser(user: User) {
    this.user = user
  }

  @Mutation
  clearData() {
    this.user = {
      name: '',
      userId: '',
      room: '',
      color: ''
    }
    this.messages = []
    this.users = []
  }

  @Mutation
  setNewMessage(message: Message) {
    this.messages.push(message)
  }

  @Mutation
  setUsers(users: User[]) {
    this.users = users
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

  @Action
  leaveUser(user: User) {
    $socket.emit('userLeft', user)
  }

  get getUser() {
    return this.user
  }

  get getMessages() {
    return this.messages
  }

  get getUsers() {
    return this.users
  }
}
