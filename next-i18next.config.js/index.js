const ChainedBackend = require('i18next-chained-backend/dist/cjs/i18nextChainedBackend.js')
const HttpBackend = require('i18next-http-backend/cjs')

const LocalStorageBackend = require('i18next-localstorage-backend').default

const {instance: axios} = require("../lib/axios");

const isDev = false;

module.exports = {
    debug: isDev,
    i18n: {
        locales: ["ar"],
        defaultLocale: "ar"
    },
    use: [ChainedBackend],
    backend: {
        backends: [LocalStorageBackend, HttpBackend],
        backendOptions: [
            {
                expirationTime: 60 * 60 * 1000,
            },
            {
                loadPath: "{{lng}}|{{ns}}",
                request: async (options, url, payload, callback) => {
                    try {
                        const [lng, ns] = url.split("|");

                        console.log(axios);
                        await axios.get("/translations", {
                            params: {group: ns},
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
            }]
    },
    serializeConfig: false
};
