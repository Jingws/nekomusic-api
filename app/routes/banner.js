import Router from 'koa-router'
import { discover } from './urlConfig'

const request = require('superagent')
const cheerio = require('cheerio')

const router = Router()

router.get('/banner', async (ctx, next) => {
  const arr = []

  const data = await new Promise(resolve => {
    request.get(discover)
      .end((err, res) => {
        const r = res.text
        const $ = cheerio.load(r)
        $('.ban').each((i, v) => {
          let obj = {
            link: $(v).find('a').attr('href'),
            image: $(v).find('img').attr('src')
          }
          arr.push(obj)
        })
        resolve(arr)
      })
  })
    ctx.body = {
      code: 0,
      data: data[0]
    }
})

export default router
