import { Module, VuexModule, Action, Mutation } from 'vuex-module-decorators'

@Module({
  name: 'modules',
  stateFactory: true,
  namespaced: true
})
export default class MainModule extends VuexModule {
  @Mutation
  consoleLog() {
    console.log(true)
  }

  @Action
  SOCKET_newMessage(ctx?: any, data?: any) {
    console.log('Hello world!', data)
  }
}