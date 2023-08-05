export async function callout (promise: Promise<any>) {
    return promise
        .then(data => [null, data])
        .catch(err => [err]);
}

