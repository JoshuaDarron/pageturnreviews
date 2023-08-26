module.exports = async function Callout (promise) {
    return promise
        .then(data => [null, data])
        .catch(err => [err]);
}
