const fs = require('fs');

function DataFile() {
  this.filePath = './data/profile.json';
  this.encoding = 'utf8';
}

DataFile.prototype.readData = function() {
  return new Promise((resolve, reject) => {
    fs.readFile(this.filePath, this.encoding, (err, data) => {
      if (err) reject(err);
      else resolve(JSON.parse(data));
    });
  });
};

DataFile.prototype.writeData = function(file) {
  return new Promise((resolve, reject) => {
    fs.writeFile(this.filePath, JSON.stringify(file), (err) => {
      if (err) throw err;
      else resolve(true);
    });
  });
};

function initDataFile() {
  let d = new DataFile();
  return d;
}

const dataFile = initDataFile();

module.exports = {
  write: async function(fileData) {
    return await dataFile.writeData(fileData);
  },
  read: async function() {
    return await dataFile.readData();
  }
};
