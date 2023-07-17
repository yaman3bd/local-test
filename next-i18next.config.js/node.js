const ChainedBackend = require('i18next-chained-backend/dist/cjs/i18nextChainedBackend.js')
const FSBackend = require('i18next-fs-backend/cjs')
const HttpBackend = require('i18next-http-backend/cjs')

const {instance: axios} = require("../lib/axios");

const isDev = false;

module.exports = {
    debug: isDev,
    i18n: {
        locales: ["ar"],
        defaultLocale: "ar"
    },
    use: [ChainedBackend],
    ns: ["titles", "gdpr"],
    backend: {
        backends: [FSBackend, HttpBackend],
        backendOptions: [
            {
                expirationTime: 60 * 60 * 1000,
            },
            {
                loadPath: "{{lng}}|{{ns}}",
                request: async (options, url, payload, callback) => {
                    try {
                        const [lng, ns] = url.split("|");

                        await axios.get("/translations", {
                            params: {group: ns},
                        }).then((response) => {
                            console.log("loaded group server: ", ns)
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
            }
        ]
    },
    serializeConfig: false
};
