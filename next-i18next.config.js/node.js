const ChainedBackend = require('i18next-chained-backend/dist/cjs/i18nextChainedBackend.js')
const FSBackend = require('i18next-fs-backend/cjs')
const HttpBackend = require('i18next-http-backend/cjs')
const MultiloadAdapter = require("i18next-multiload-backend-adapter/cjs");


const axios = require("axios");

const isDev = false;

module.exports = {
    debug: isDev,
    i18n: {
        locales: ["ar"],
        defaultLocale: "ar"
    },
    use: [MultiloadAdapter, ChainedBackend],
    ns: ["auth", "common", "validations", "course_player", "wallet", "empty_sections", "account", "profile", "course_page", "digital_product", "sessions", "products_package", "blog", "store", "trainers", "privacy_policy", "not_found_page", "contact_us_page", "maintenance_mode", "side_bar", "checkout_page", "cart"],
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
                        await axios.get("http://localhost:3000/api/translations", {
                            params: {group: ns},
                        }).then((response) => {
                            console.log("loaded group server: ", ns)

                            callback(null, {
                                data: response.data.data[lng][ns],
                                status: 200
                            });
                        }).catch((error) => {
                            console.log(error.response.data);
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
    maxParallelReads: 50,
    serializeConfig: false
};
