const uid = (len = 6) => {
    return Math.random()
        .toString(36)
        .substring(2, len + 2);
};

module.exports = { uid };
