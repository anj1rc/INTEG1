import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const routes = [
  {
    path: '/',
    component: HomeView,  // Parent layout
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('@/views/DashboardView.vue'),
        meta: { title: 'Dashboard' }
      },
      {
        path: 'sales',
        name: 'Sales',
        component: () => import('@/views/SalesView.vue'),
        meta: { title: 'Sales' }
      },
      {
        path: 'reports',
        name: 'Reports',
        component: () => import('@/views/ReportsView.vue'),
        meta: { title: 'Reports' }
      },
      {
        path: 'inventory',
        name: 'Inventory',
        component: () => import('@/views/InventoryView.vue'),
        meta: { title: 'Inventory' }
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('@/views/SettingsView.vue'),
        meta: { title: 'Settings' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router