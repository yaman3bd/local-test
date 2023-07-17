// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import JSON from '../../public/locales/ar/translatable.json'
import rateLimit from '../../utils/rate-limit'

const limiter = rateLimit({
    interval: 60 * 1000, // 60 seconds
    uniqueTokenPerInterval: 500, // Max 500 users per second
})
type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    try {
        await limiter.check(res, 10, 'CACHE_TOKEN') // 10 requests per minute

        const group = req.query.group
        res.status(200).json({
            data: {
                ar: {
                    [group]: JSON[group]
                }
            }
        })
    } catch {
        res.status(429).json({
            data: {error: 'Rate limit exceeded'}
        })
    }

}
