/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const ProductsController = () => import('../app/controllers/producer_controller.js')
const DashboardController = () => import('../app/controllers/dashboard_controller.js')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.group(() => {
  router.resource('producers', ProductsController).apiOnly()
  router.get('dashboard', [DashboardController, 'index'])
}).prefix('/api/v1')


