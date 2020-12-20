function getRandomId() {
    let letters = '1234567890poiiytreqwasdfghjklmnbvcxxssersgyushquiz';
    let id = '';
    for (let i = 0; i < 10; i++) {
        let ind = Math.floor(Math.random() * letters.length)
        id += letters[ind];
    }
    return id;
}

function addPagination(items, { currentPage, itemsPerPage }) {
    currentPage = parseInt(currentPage);
    itemsPerPage = parseInt(itemsPerPage);

    let maxPage = Math.ceil(items.length / itemsPerPage);

    currentPage = currentPage < 1 || currentPage > maxPage || !currentPage ? 1 : currentPage;

    let startIndex = (currentPage - 1) * itemsPerPage,
        endIndex = startIndex + itemsPerPage;

    items = items.slice(startIndex, endIndex);

    let paginationInfo = { currentPage, maxPage, itemsPerPage: itemsPerPage };
    if (!items.length)
        paginationInfo = { currentPage: 0, maxPage: 0, itemsPerPage: itemsPerPage };

    return { paginationInfo, items };
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

module.exports = { getRandomId, addPagination, validateEmail };