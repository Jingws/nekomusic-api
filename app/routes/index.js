import Router from 'koa-router'
import banner from './banner'
import recommend from './recommend'
import playListDetail from './playList_detail'
import songLyric from './song_lyric'

const router = Router()

router.use(banner.routes(), banner.allowedMethods())
router.use(recommend.routes(), recommend.allowedMethods())
router.use(playListDetail.routes(), playListDetail.allowedMethods())
router.use(songLyric.routes(), songLyric.allowedMethods())

export default router