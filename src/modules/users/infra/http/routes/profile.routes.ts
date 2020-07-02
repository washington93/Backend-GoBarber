import Router from 'express'

import ProfileControler from '@modules/users/infra/http/controllers/ProfileControler'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

const profileRouter = Router()
const profileControler = new ProfileControler()

profileRouter.use(ensureAuthenticated)

profileRouter.put('/', profileControler.update)
profileRouter.get('/', profileControler.show)

export default profileRouter
