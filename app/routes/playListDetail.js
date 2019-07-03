import Router from 'koa-router'
import { urlroot } from './urlConfig'

const request = require('superagent')
const cheerio = require('cheerio')

const router = Router()

router.post('/play-list-detail', async (ctx, next) => {
  const id = ctx.request.body.id
  const obj = []

  const data = await new Promise(resolve => {
    request.get(urlroot + '/api/playlist/detail?id=' + id)
      .end((err, res) => {
        const r = res.text
        const $ = cheerio.load(r)
        obj.push(r)
        resolve(obj)
      })
  })
  ctx.body = data[0]
})

export default router