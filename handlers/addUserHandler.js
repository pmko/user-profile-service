class AddUserHandlers {
  constructor({ store }) {
    this.store = store;
  }

  async addUser(postData) {
    let response = {};
    await this.store.read().then(async (data) => {
      //add the new user
      data.push(postData);
      //write back to file
      await this.store.write(data).then((success) => {
        response = {'success':success};
      });
    });
    return response;
  }
}

module.exports = AddUserHandlers;
