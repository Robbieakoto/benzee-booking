import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import { requireAuth } from "../utils/auth"

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/auth/Login.vue')
  },
  {
    path: '/logout',
    name: 'logout',
    beforeEnter: requireAuth,
    component: () => import(/* webpackChunkName: "logout" */ '../views/auth/Logout.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    beforeEnter: requireAuth,
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue')
  },
  {
    path: '/rooms',
    name: 'room-list',
    beforeEnter: requireAuth,
    component: () => import(/* webpackChunkName: "rooms-list" */ '../views/Rooms/RoomsList.vue')
  },
    {
      path: '/room-details',
      name: 'room-details',
      beforeEnter: requireAuth,
      component: () => import(/* webpackChunkName: "rooms-details" */ '../views/Rooms/RoomDetails.vue')
    },
  {
    path: '/add-room',
    name: 'add-room',
    beforeEnter: requireAuth,
    component: () => import(/* webpackChunkName: "residents" */ '../views/Rooms/AddRoom.vue')
  },
  {
    path: '/edit-room',
    name: 'edit-room',
    beforeEnter: requireAuth,
    component: () => import( /* webpackChunkName: "residents" */ '../views/Rooms/EditRoom.vue')
  },
  {
  path: '/bookings',
  name: 'bookings-list',
  beforeEnter: requireAuth,
  component: () => import(/* webpackChunkName: "bookings-list" */ '../views/Bookings/BookingsList.vue')
  },
  {
    path: '/booking-details/:bookingId',
    name: 'booking-details',
    beforeEnter: requireAuth,
    component: () => import(/* webpackChunkName: "booking-details" */ '../views/Bookings/BookingDetails.vue')
  },
  {
    path: '/residents',
    name: 'residents',
    beforeEnter: requireAuth,
    component: () => import(/* webpackChunkName: "residents" */ '../views/Residents/ResidentsList.vue')
  },
  {
    path: '/resident-details/:residentId',
    name: 'resident-details',
    beforeEnter: requireAuth,
    component: () => import(/* webpackChunkName: "residents" */ '../views/Residents/ResidentDetails.vue')
  },
  {
    path: '/settings',
    name: 'settings',
    beforeEnter: requireAuth,
    component: () => import(/* webpackChunkName: "residents" */ '../views/Settings.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    beforeEnter: requireAuth,
    component: () => import(/* webpackChunkName: "residents" */ '../views/Profile.vue')
  },
  {
    path: '/payment-details',
    name: 'payment-details',
    beforeEnter: requireAuth,
    component: () => import(/* webpackChunkName: "residents" */ '../views/Payments/PaymentDetails.vue')
  }
]

const router = new VueRouter({
  mode:'history',
  routes
})

export default router
