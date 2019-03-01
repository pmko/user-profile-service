class ListUsersHandler {
  constructor({ store }) {
    this.store = store;
  }

  async getUsers() {
    const result = await this.store.read();
    return result;
  }
}

module.exports = ListUsersHandler;
