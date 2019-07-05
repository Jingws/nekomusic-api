import Router from 'koa-router'
import { urlroot } from './urlConfig'

const request = require('superagent')

const router = Router()

router.post('/song-lyric', async (ctx, next) => {
  const id = ctx.request.body.id
  const obj = []

  const data = await new Promise(resolve => {
    request.get(urlroot + '/api/song/media?id=' + id)
      .end((err, res) => {
        const r = res.text
        obj.push(r)
        resolve(obj)
      })
  })
  ctx.body = data[0]
})

export default router