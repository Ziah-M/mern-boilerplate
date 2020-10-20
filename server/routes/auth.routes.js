import express from 'express'
import authCtrl from '../controllers/auth.controller'

const router = express.Router()

router.route('auth/signin')
.post(authCtrl.signin) // authenticate user with email & pass

router.route('auth/signout')
.get(authCtrl.signout) // clear the JWT cookie

export default router