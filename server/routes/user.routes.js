import express from 'express'
import userCtrl from '../controllers/user.controller'
import template from "../template";

const router = express.Router()

router.route('/api/users')
.get(userCtrl.list)
.post(userCtrl.create)

router.route('/api/users/userId')
.get(userCtrl.read)
.put(userCtrl.update)
.delete(userCtrl.remove)

// Executes if this param is present in a requested route
router.param('userId', userCtrl.userByID)

export default router