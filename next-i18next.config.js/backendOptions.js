const axios = require("axios");

module.exports = [
    {
        loadPath: "./public/locales_cache/{{lng}}/{{ns}}.json",
        addPath: "./public/locales_cache/{{lng}}/{{ns}}.json",
        expirationTime: 60 * 60 * 1000
    },
    {
        loadPath: "{{lng}}|{{ns}}",
        request: async (options, url, payload, callback) => {
            try {
                const [lng, ns] = url.split("|");

                await axios
                    .get("http://localhost:3001/api/translations", {
                        params: { lng, ns }
                    })
                    .then((response) => {
                        const lngs = lng.split("+");
                        const nss = ns.split("+");
                        for (const $lng of lngs) {
                            for (const $ns of nss) {
                                if (response.data.data[$lng][$ns]) {
                                    // eslint-disable-next-line no-console
                                    console.log("response data: ", response.data.data[$lng][$ns]);
                                    callback(null, {
                                        data: response.data.data[$lng][$ns],
                                        status: 200
                                    });
                                }
                            }
                        }
                    })
                    .catch((error) => {
                        // eslint-disable-next-line no-console
                        console.log("response error: ", error.response.data);
                        callback(null, {
                            status: 500
                        });
                    });
            } catch (e) {
                // eslint-disable-next-line no-console
                console.log("catch error: ", e);
                callback(null, {
                    status: 500
                });
            }
        }
    }
];
