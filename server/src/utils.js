const uid = (len = 6) => {
    return Math.random()
        .toString(36)
        .substring(2, len + 2);
};

const dirConversion = (dir) => {
    if (dir === "asc") return 1;
    else if (dir === "desc") return -1;
};

module.exports = { uid, dirConversion };
