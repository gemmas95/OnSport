function filterArray(array, id) {
    let newArray = [];

    // eslint-disable-next-line prefer-template
    const check = array.some((arrVal) => id + '' === arrVal + '');

    // So in the same action we add and remove an activity
    // If there is the id in the array it is removed
    if (check) {
        // eslint-disable-next-line prefer-template
        newArray = array.filter((arrVal) => arrVal + '' !== id + '');
    } else {
        // If there ISN'T the id in the array, it is added, it would be the same with a push but with rest operator avoid mutation
        newArray = [...array, id];
    }

    return newArray;
}
module.exports = { filterArray };
