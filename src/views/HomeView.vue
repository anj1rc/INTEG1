<template>
  <v-app>
    <!-- Single Navigation Drawer -->
    <v-navigation-drawer permanent color="surface" width="260">
      <v-list-item
        prepend-icon="mdi-sprout"
        title="AgriVend"
        subtitle="Seed Automation System"
        class="mb-4"
      ></v-list-item>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item
          v-for="item in navItems"
          :key="item.title"
          :to="item.route"
          :prepend-icon="item.icon"
          :title="item.title"
          active-color="primary"
          rounded="xl"
          exact
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar flat density="comfortable">
      <v-app-bar-title class="text-h6 font-weight-bold">
        {{ currentTitle }}
      </v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    navItems: [
      { title: 'Dashboard', route: '/', icon: 'mdi-view-dashboard' },
      { title: 'Sales', route: '/sales', icon: 'mdi-cash-register' },
      { title: 'Reports', route: '/reports', icon: 'mdi-chart-line' },
      { title: 'Inventory', route: '/inventory', icon: 'mdi-sack' },
      { title: 'Settings', route: '/settings', icon: 'mdi-cog' }
    ]
  }),
  computed: {
    currentTitle() {
      return this.$route.meta?.title || 'Dashboard'
    }
  }
}
</script>