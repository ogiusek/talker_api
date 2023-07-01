const resetClientAddress = require('./func/clientAddress/reset');
const setClientAddress = require('./func/clientAddress/set');
const { getFile, getFileId } = require('./func/files');
const removeTemporaryData = require('./func/temporary');

module.exports = {
  resetClientAddress: resetClientAddress,
  setClientAddress: setClientAddress,
  getFile: getFile,
  getFileId: getFileId,
  removeTemporaryData: removeTemporaryData,
};