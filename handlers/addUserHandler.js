class AddUserHandlers {
  constructor({ store }) {
    this.store = store;
  }

  async addUser(postData) {
    let response = {};
    const result = await this.store.read().then(async (data) => {
      //add the new user
      data.push(postData);
      //write back to file
      await this.store.write(data).then((success) => {
        if (success) response = {'success':true};
        else response = {'success':false};
      });
    });
    return response;
  }
}

module.exports = AddUserHandlers;
