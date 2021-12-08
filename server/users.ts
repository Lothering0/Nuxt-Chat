import User from '../interfaces/user-interface'

class Users {
  public users: User[]

  constructor() {
    this.users = []
  }

  add(user: User) {
    this.users.push(user)
  }

  get(id: string) {
    return this.users.find(user => user.userId === id)
  }

  remove(id: string) {
    const user = this.get(id)

    if (user) {
      this.users = this.users.filter(user => user.userId !== id)
    }

    return user
  }

  getByRoom(room: string) {
    return this.users.filter(user => user.room === room)
  }
}

module.exports = function() {
  return new Users()
}
