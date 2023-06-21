const resetClientAddress = require('./func/clientAddress/reset');
const setClientAddress = require('./func/clientAddress/set');
const removeTemporaryData = require('./func/temporary');

module.exports = {
  resetClientAddress: resetClientAddress,
  setClientAddress: setClientAddress,
  removeTemporaryData: removeTemporaryData,
};