import Router from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

import ProfileControler from '@modules/users/infra/http/controllers/ProfileControler'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

const profileRouter = Router()
const profileControler = new ProfileControler()

profileRouter.use(ensureAuthenticated)

profileRouter.put('/', profileControler.update)
profileRouter.get(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  profileControler.show,
)

export default profileRouter
