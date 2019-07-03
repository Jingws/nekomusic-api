import Router from 'koa-router'
import banner from './banner'
import recommendHot from './recommend-hot'
import playListInfo from './playListInfo'
import playListDetail from './playListDetail'

const router = Router()

router.use(banner.routes(), banner.allowedMethods())
router.use(recommendHot.routes(), recommendHot.allowedMethods())
router.use(playListInfo.routes(), playListInfo.allowedMethods())
router.use(playListDetail.routes(), playListDetail.allowedMethods())

export default router