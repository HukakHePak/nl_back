function ArrayOf(str, length) {
  return Array.from({ length })
    .map(() => str);
}

function successConnectLog(log) {
  console.log('Successfully connected to ' + log + '.');
}

function ErrorConnect(log) {
  return new Error(log + ' init connection error.' + '.');
}

module.exports = {
  ArrayOf,
  successConnectLog,
  ErrorConnect,
};
