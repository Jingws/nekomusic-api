import Router from 'koa-router'
import banner from './banner'
import recommendHot from './recommend-hot'
import playListInfo from './playListInfo'
import playListDetail from './playListDetail'
import songLyric from './songLyric'

const router = Router()

router.use(banner.routes(), banner.allowedMethods())
router.use(recommendHot.routes(), recommendHot.allowedMethods())
router.use(playListInfo.routes(), playListInfo.allowedMethods())
router.use(playListDetail.routes(), playListDetail.allowedMethods())
router.use(songLyric.routes(), songLyric.allowedMethods())

export default router