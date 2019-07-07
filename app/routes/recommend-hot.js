import Router from 'koa-router'
import { discover } from './urlConfig'

const request = require('superagent')
const cheerio = require('cheerio')

const router = Router()

router.get('/rcmd/music-list', async (ctx, next) => {
  const arr = []

  const data = await new Promise(resolve => {
    request.get(discover)
      .end((err, res) => {
        const r = res.text
        const $ = cheerio.load(r)
        
        $('#discover-module .g-mn1 .g-mn1c .g-wrap3 .n-rcmd ul li').each((i, v) => {
          let img = $(v).find('div').find('img').attr('src')
          let link = $(v).find('div').find('a').attr('href')
          let amount = $(v).find('div').find('div').find('span').eq(1).text()
          let text = $(v).find('p').text()
          let type = $(v).find('p').find('a').attr('data-res-type')
          let obj = {
            img: img,
            link: link,
            amount: amount,
            text: text,
            type: type
          }
          arr.push(obj)
        })
        resolve(arr)
      })
  })
    ctx.body = {
      code: 0,
      data: data
    }
})

export default router
