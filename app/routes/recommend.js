import Router from 'koa-router'
import { recommend } from './urlConfig'

const request = require('superagent')

const router = Router()

router.get('/recommend-playlist', async (ctx, next) => {

  const data = await new Promise(resolve => {
    request.get(recommend)
      .end((err, res) => {
        const r = res.text
        resolve(r)
      })
  })
  ctx.body = data
})

export default router
