module.exports = async function callout (promise) {
    return promise
        .then(data => [null, data])
        .catch(err => [err]);
}
