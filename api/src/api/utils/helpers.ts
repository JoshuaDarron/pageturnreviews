export async function Callout (promise: Promise<any>) {
    return promise
        .then(data => [null, data])
        .catch(err => [err]);
}

