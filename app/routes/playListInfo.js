import Router from 'koa-router'
import { urlroot } from './urlConfig'

const request = require('superagent')
const cheerio = require('cheerio')

const router = Router()

router.post('/play-list-info', async (ctx, next) => {
  const id = ctx.request.body.link
  const obj = {}

  const data = await new Promise(resolve => {
    request.get(urlroot + id)
      .end((err, res) => {
        const r = res.text
        const $ = cheerio.load(r)
        // 歌单信息
        let cover = $('.m-info .u-cover-dj').find('img').attr('src')
        $('.m-info .cnt .cntc').each((i, v) => {
          let listTit = $(v).find('.hd').find('.tit').find('h2').text()
          // 作者信息
          let au = $(v).find('.user')
          let author = {
            url: au.find('a').attr('href'),
            img: au.find('a').find('img').attr('src'),
            name: au.find('.name').find('a').text(),
            time: au.find('.time').text()
          }
          // 收藏转发评论
          let coll = $(v).find('#content-operation')
          let collect = coll.find('.u-btni-fav').find('i').text().replace(/[(|)]/g, '')
          let share = coll.find('.u-btni-share').find('i').text().replace(/[(|)]/g, '')
          let comment = coll.find('.u-btni-cmmt').find('i').find('span').text()
          // 标签
          let label = []
          $(v).find('.tags .u-tag').each((k, a) => {
            let i = $(a).find('i').text()
            label.push(i)
          })
          let introduce = $(v).find('#album-desc-more').text()

          obj.listTit = listTit
          obj.cover = cover
          obj.author = author
          obj.collect = collect
          obj.share = share
          obj.comment = comment
          obj.label = label
          obj.introduce = introduce
        })
        // list 详情及列表
        $('.n-songtb').each((i, v) => {
          // title
          let playList = {
            listCount: $(v).find('#playlist-track-count').text(),
            playCount: $(v).find('#play-count').text(),
            id: $(v).find('#song-list-pre-cache').attr('data-key').replace(/[^\d]/g, '')
          }

          obj.playList = playList
        })
        resolve(obj)
      })
  })
    ctx.body = {
      code: 0,
      data: data
    }
})

export default router
