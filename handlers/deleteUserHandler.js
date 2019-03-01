class DeleteUserHandler {
  constructor({ store }) {
    this.store = store;
  }

  async deleteUser(id) {
    let response = {};
    const result = await this.store.read().then(async (data) => {
      //remove the new user
      let index = data.findIndex(o => o.id == id);
      data.splice(index,1);
      //write back to file
      await this.store.write(data).then((success) => {
        if (success) response = {'success':true};
        else response = {'success':false};
      });
    });
    return response;
  }
}

module.exports = DeleteUserHandler;
