import Router from 'koa-router'
import { banner } from './urlConfig'

const request = require('superagent')

const router = Router()

router.get('/banner', async (ctx, next) => {

  const data = await new Promise(resolve => {
    request.get(banner)
      .end((err, res) => {
        const r = res.text
        resolve(r)
      })
  })
  ctx.body = data
})

export default router
