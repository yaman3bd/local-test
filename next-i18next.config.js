const ChainedBackend = require('i18next-chained-backend').default;
const HttpBackend = require('i18next-http-backend/cjs');
const {instance: axios} = require("./lib/axios");
const isBrowser = typeof window !== 'undefined';

let backends = [HttpBackend];
let backendOptions = [{
    loadPath: "{{lng}}|{{ns}}",
    request: async (options, url, payload, callback) => {
        try {
            const [lng, ns] = url.split("|");
            await axios.get("/translations", {
                params: {ns},
            }).then((response) => {
                callback(null, {
                    data: response.data.data[lng][ns],
                    status: 200
                });
            }).catch((error) => {
                console.log(error.response);
            });
        } catch (e) {
            callback(null, {
                status: 500
            });
        }
    }
}];

if (isBrowser) {
    const LocalStorageBackend = require('i18next-localstorage-backend').default;
    backends.unshift(LocalStorageBackend);
    backendOptions.unshift({
        expirationTime: 7 * 24 * 60 * 60 * 1000,
    });
} else {
    const FSBackend = require('i18next-fs-backend/cjs');
    backends.unshift(FSBackend);
}

module.exports = {
    debug: false,
    i18n: {
        locales: ["ar"],
        defaultLocale: "ar"
    },
    use: [ChainedBackend],
    ns: ["common"],
    backend: {
        backends,
        backendOptions,
    },
    serializeConfig: false
};
