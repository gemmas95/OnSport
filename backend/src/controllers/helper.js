function filterArray(array, id) {
    let newArray = [];

    // eslint-disable-next-line prefer-template
    const check = array.some((arrVal) => id + '' === arrVal + '');

    // Si existe el id en el array lo quita
    if (check) {
        // eslint-disable-next-line prefer-template
        newArray = array.filter((arrVal) => arrVal + '' !== id + '');
    } else {
        // si NO existe el id lo añade, seria lo mismo que hacer un push pero con un rest operator
        newArray = [...array, id];
    }

    return newArray;
}
module.exports = { filterArray };
