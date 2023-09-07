// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import translatable from "../../public/locales/en/translatable.json";

const translations = {
    en: translatable
};

type Data = {
    data: {
        [key: string]: any;
    };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const lngs = (req.query.lng as string).split("+");
    const nss = (req.query.ns as string).split("+");

    const ret = new Map();
    for (const lng of lngs) {
        if (!ret.get(lng)) ret.set(lng, {});
        const lngMap = ret.get(lng);
        for (const ns of nss) {
            const lngNs = translations[lng as keyof typeof translations];
            lngMap[ns as keyof typeof lngNs] = lngNs[ns as keyof typeof lngNs];
        }
    }

    res.status(200).json({
        data: Object.fromEntries(ret)
    });
}
