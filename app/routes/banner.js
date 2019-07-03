import Router from 'koa-router'
import { banner } from './urlConfig'

const request = require('superagent')
const cheerio = require('cheerio')

const router = Router()

router.get('/banner', async (ctx, next) => {
  const obj = []

  const data = await new Promise(resolve => {
    request.get(banner)
      .end((err, res) => {
        const r = res.text
        obj.push(r)
        resolve(obj)
      })
  })
  ctx.body = data[0]
})

export default router
