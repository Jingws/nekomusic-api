import Router from 'koa-router'
import { commentsMusic } from './urlConfig'

const request = require('superagent')

const router = Router()

router.post('/comment-music', async (ctx, next) => {
  const id = ctx.request.body.id
  const offset = ctx.request.body.offset ? ctx.request.body.offset : 0
  const limit = ctx.request.body.limit ? ctx.request.body.limit : 20

  const data = await new Promise(resolve => {
    request.get(commentsMusic + id + '?offset=' + offset + '&limit=' + limit)
      .end((err, res) => {
        const r = res.text
        resolve(r)
      })
  })
  ctx.body = data
})

export default router
