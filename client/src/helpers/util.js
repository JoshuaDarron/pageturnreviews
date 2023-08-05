class Util {
    static async callout(promise) {
        return promise
            .then(data => [null, data])
            .catch(err => [err])
    }

    static arrayBufferToBase64(buffer) {
        let binary = ''
        const bytes = [].slice.call(new Uint8Array(buffer))
        bytes.forEach((b) => binary += String.fromCharCode(b))
        return window.btoa(binary)
    }

    static _strPadLeft(string, pad, length) {
        return (new Array(length + 1).join(pad) + string).slice(-length)
    }

    static formatTime(minutes, seconds) {
        return Util._strPadLeft(minutes, '0', 2) + ':' + Util._strPadLeft(seconds, '0', 2)
    }
}

module.exports = Util
