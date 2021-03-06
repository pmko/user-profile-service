class GetUserHandler {
  constructor({ store }) {
    this.store = store;
  }

  async getUser(id) {
    let user = {};
    await this.store.read().then((data) => {
      user = data.find(o => o.id == id);
    });
    return user;
  }
}

module.exports = GetUserHandler;
