import { Module, VuexModule, Action, Mutation } from 'vuex-module-decorators'
import $socket from '@/plugins/socket-instance'

@Module({
  name: 'modules',
  stateFactory: true,
  namespaced: true,
})
export default class MainModule extends VuexModule {
  @Action
  newMessage() {
    $socket.emit('newMessage', {
      text: 'Message from action'
    })

    console.log('action')
  }
}
