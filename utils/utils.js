function ArrayOf(str, length) {
  return Array.from({ length })
    .map(() => str);
}

module.exports = {
  ArrayOf,
};
