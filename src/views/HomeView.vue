<template>
  <v-app :theme="theme">
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
          :value="item.route"
          :prepend-icon="item.icon"
          :title="item.title"
          :to="item.route"
          active-color="primary"
          rounded="xl"
        ></v-list-item>
      </v-list>

      <template v-slot:append>
        <v-divider></v-divider>
        <v-switch
          v-model="theme"
          true-value="dark"
          false-value="light"
          prepend-icon="mdi-weather-night"
          append-icon="mdi-weather-sunny"
          hide-details
          class="pa-3"
        ></v-switch>
      </template>
    </v-navigation-drawer>

    <v-app-bar flat density="comfortable">
      <v-app-bar-title class="text-h6 font-weight-bold">
        {{ currentTitle }}
      </v-app-bar-title>
      
      <v-spacer></v-spacer>

      <v-badge color="error" dot offset-x="-5" offset-y="-5">
        <v-avatar color="primary" size="40">
          <v-icon>mdi-account</v-icon>
        </v-avatar>
      </v-badge>
    </v-app-bar>

    <v-main>
      <v-container fluid class="pa-6">
        <v-row dense>
          <v-col v-for="stat in stats" :key="stat.title" cols="12" sm="6" md="3">
            <v-card 
              border
              variant="tonal"
              :color="stat.color"
              rounded="lg"
            >
              <v-card-text>
                <div class="d-flex align-center">
                  <v-avatar :color="stat.color" variant="tonal" size="48" class="mr-3">
                    <v-icon>{{ stat.icon }}</v-icon>
                  </v-avatar>
                  <div>
                    <div class="text-caption">{{ stat.title }}</div>
                    <div class="text-h5 font-weight-bold">{{ stat.value }}</div>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row class="mt-4">
          <v-col cols="12" lg="8">
            <v-card border rounded="lg">
              <v-card-title class="d-flex align-center">
                <v-icon icon="mdi-history" class="mr-2"></v-icon>
                Recent Transactions
                <v-spacer></v-spacer>
                <v-btn variant="text" size="small">View All</v-btn>
              </v-card-title>
              <v-data-table
                :headers="transactionHeaders"
                :items="transactions"
                hide-default-footer
              >
                <template v-slot:item.status="{ item }">
                  <v-chip :color="getStatusColor(item.status)" size="small">
                    {{ item.status }}
                  </v-chip>
                </template>
              </v-data-table>
            </v-card>
          </v-col>

          <v-col cols="12" lg="4">
            <v-card border rounded="lg">
              <v-card-title>
                <v-icon icon="mdi-heart-pulse" class="mr-2"></v-icon>
                System Health
              </v-card-title>
              <v-card-text>
                <div v-for="(health, i) in healthMetrics" :key="i" class="mb-4">
                  <div class="d-flex justify-space-between mb-1">
                    <span>{{ health.name }}</span>
                    <span class="font-weight-bold">{{ health.value }}%</span>
                  </div>
                  <v-progress-linear
                    :model-value="health.value"
                    :color="health.color"
                    height="8"
                    rounded
                  ></v-progress-linear>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    theme: 'light',
    stats: [
      { title: 'Today\'s Sales', value: '₱3,845', icon: 'mdi-cash', color: 'success' },
      { title: 'Seed Inventory', value: '158 kg', icon: 'mdi-sack', color: 'primary' },
      { title: 'Transactions', value: '42', icon: 'mdi-receipt', color: 'info' },
      { title: 'Coin Balance', value: '₱2,845', icon: 'mdi-coin', color: 'warning' }
    ],
    healthMetrics: [
      { name: 'Dispenser', value: 85, color: 'success' },
      { name: 'Coin Mechanism', value: 72, color: 'warning' },
      { name: 'Network', value: 98, color: 'success' }
    ],
  }),
  methods: {
    getStatusColor(status) {
      const colors = {
        'Completed': 'success',
        'Pending': 'warning',
        'Failed': 'error'
      }
      return colors[status] || 'info'
    }
  }
}
</script>

<style>
.v-card.glass {
  background: rgba(255, 255, 255, 0.8) !important;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.v-avatar, .v-btn, .v-card {
  transition: all 0.3s ease;
}

.v-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1) !important;
}

.v-theme--dark .v-card.glass {
  background: rgba(30, 30, 30, 0.8) !important;
  border-color: rgba(255, 255, 255, 0.05);
}
</style>
