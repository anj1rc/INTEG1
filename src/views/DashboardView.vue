<template>
  <v-app>
    <!-- Navigation Drawer -->
    <v-navigation-drawer v-model="drawer" permanent width="260" class="bg-surface">
      <v-list-item 
        prepend-icon="mdi-sprout" 
        title="AgriVend" 
        subtitle="Seed Automation System"
        class="mb-4"
      ></v-list-item>

      <v-divider></v-divider>

      <v-list nav dense>
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

    <!-- App Bar -->
    <v-app-bar flat density="comfortable" color="surface">
      <v-app-bar-title class="text-h6 font-weight-bold">
        {{ $route.meta?.title || 'Dashboard' }}
      </v-app-bar-title>
    </v-app-bar>

    <!-- Main Content -->
    <v-main>
      <v-container fluid class="pa-4">
        <!-- Seed Machine Status Cards -->
        <v-row class="mb-4">
          <v-col cols="12">
            <h1 class="text-h5 mb-2">Seed Dispensing Machine Status</h1>
            <p class="text-caption mb-0">Showing current seed quantities (Max 30 seeds per machine)</p>
          </v-col>
        </v-row>

        <v-row dense class="mb-6">
          <v-col
            cols="12"
            sm="6"
            md="4"
            v-for="crop in crops"
            :key="crop.name"
          >
            <v-card border flat class="h-100 d-flex flex-column">
              <v-card-text class="text-center pa-3">
                <v-avatar size="48" :color="crop.color" class="mb-2">
                  <v-icon dark>{{ crop.icon }}</v-icon>
                </v-avatar>
                <div class="text-subtitle-1 mb-1">{{ crop.name }}</div>
                <v-divider class="my-1"></v-divider>
                <div class="mt-2">
                  <div class="d-flex justify-space-between text-caption mb-1">
                    <span>Seeds:</span>
                    <span>{{ crop.remaining }}/30</span>
                  </div>
                  <v-progress-linear
                    :model-value="(crop.remaining / 30) * 100"
                    :color="getQuantityColor(crop.remaining)"
                    height="10"
                    rounded
                  ></v-progress-linear>
                </div>
                <v-row dense class="mt-2">
                  <v-col cols="6" class="pa-0">
                    <v-chip :color="getStatusColor(crop.status)" small label>
                      {{ crop.status }}
                    </v-chip>
                         </v-col>
                  <v-col cols="6" class="text-right pa-0">
                    <v-icon small :color="crop.needsRefill ? 'red' : 'green'">
                      {{ crop.needsRefill ? 'mdi-alert' : 'mdi-check-circle' }}
                    </v-icon>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions class="justify-center pa-1 mt-auto">
                <v-btn
                  color="primary"
                  variant="text"
                  size="x-small"
                  :disabled="!crop.needsRefill"
                  class="text-caption"
                  @click="refillItem(crop)"
                >
                  Refill
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <!-- Sales Statistics Table -->
        <v-row class="mb-6">
          <v-col cols="12">
            <v-card>
              <v-card-title class="text-h6">Sales Overview</v-card-title>
              <v-card-text class="pa-0">
                <v-data-table
                  :headers="salesHeaders"
                  :items="seedSalesSummary"
                  :items-per-page="10"
                  class="elevation-0"
                >
                  <template v-slot:item.avgPrice="{ item }">
                    ₱{{ item.avgPrice.toFixed(2) }}
                  </template>
                  <template v-slot:item.monthlyTrend="{ item }">
                    <v-chip :color="getTrendColor(item.monthlyTrend)" small>
                      {{ item.monthlyTrend >= 0 ? '+' : '' }}{{ item.monthlyTrend }}%
                    </v-chip>
                  </template>
                </v-data-table>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- System Status Card -->
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title class="text-h6">Vending Machine System Status</v-card-title>
              <v-card-text>
                <v-row dense>
                  <v-col cols="12" sm="6" md="3">
                    <div class="pa-4 text-center d-flex flex-column align-center">
                      <v-icon size="64" :color="machineStatus.power ? 'green' : 'red'">
                        {{ machineStatus.power ? 'mdi-power' : 'mdi-power-off' }}
                      </v-icon>
                      <div class="mt-2 font-weight-bold">
                        {{ machineStatus.power ? 'Power: On' : 'Power: Off' }}
                      </div>
                    </div>
                  </v-col>

                  <v-col cols="12" sm="6" md="3">
                    <div class="pa-4 text-center d-flex flex-column align-center">
                      <v-icon size="64" :color="machineStatus.connected ? 'green' : 'orange'">
                        {{ machineStatus.connected ? 'mdi-wifi' : 'mdi-wifi-off' }}
                      </v-icon>
                      <div class="mt-2 font-weight-bold">
                        {{ machineStatus.connected ? 'Connected' : 'Disconnected' }}
                      </div>
                    </div>
                  </v-col>

                  <v-col cols="12" sm="6" md="3">
                    <div class="pa-4">
                      <div class="text-caption">Last Heartbeat</div>
                      <div class="font-weight-bold mt-1">{{ lastHeartbeat }}</div>
                    </div>
                  </v-col>

                  <v-col cols="12" sm="6" md="3">
                    <div class="pa-4">
                      <div class="text-caption">Active Errors</div>
                      <div class="d-flex align-center justify-center mt-1">
                        <v-chip :color="machineStatus.errors > 0 ? 'red' : 'green'" label small dark>
                          {{ machineStatus.errors }}
                        </v-chip>
                        &nbsp;
                        <span v-if="machineStatus.errors === 0" class="text-success">No errors</span>
                        <span v-else class="text-red">Error{{ machineStatus.errors > 1 ? 's' : '' }}</span>
                      </div>
                    </div>
                  </v-col>
                </v-row>
     <!-- Error List if any -->
                <div v-if="machineStatus.errors > 0" class="mt-4">
                  <h4 class="text-subtitle-1 mb-2">Recent Errors</h4>
                  <v-list density="compact" lines="one" border rounded>
                    <v-list-item
                      v-for="(error, idx) in recentErrors"
                      :key="idx"
                      :title="error.message"
                      :subtitle="error.timestamp"
                    ></v-list-item>
                  </v-list>
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
  name: 'Dashboard',
  data: () => ({
    drawer: true,
    navItems: [
        { title: 'Dashboard', route: '/dashboard', icon: 'mdi-view-dashboard' },
        { title: 'Sales Inflation', route: '/salesinflation', icon: 'mdi-cash-register' },
        { title: 'Reports', route: '/reports', icon: 'mdi-chart-line' },
        { title: 'Inventory', route: '/inventory', icon: 'mdi-sack' },
        { title: 'Device Management', route: '/devices', icon: 'mdi-devices' },
        { title: 'History Logs', route: '/history', icon: 'mdi-history' },
        { title: 'Settings', route: '/settings', icon: 'mdi-cog' }
      ],
    crops: [
      { name: 'Eggplant', remaining: 5, status: 'Low', needsRefill: true, color: 'purple', icon: 'mdi-food-variant' },
      { name: 'Cucumber', remaining: 28, status: 'Good', needsRefill: false, color: 'green', icon: 'mdi-cucumber' },
      { name: 'Red Pepper', remaining: 15, status: 'Medium', needsRefill: false, color: 'red', icon: 'mdi-pepper' },
      { name: 'Carrot', remaining: 2, status: 'Critical', needsRefill: true, color: 'orange', icon: 'mdi-carrot' },
      { name: 'Brussel Sprouts', remaining: 30, status: 'Full', needsRefill: false, color: 'teal', icon: 'mdi-sprout' },
      { name: 'Tomato', remaining: 10, status: 'Medium', needsRefill: false, color: 'red-darken-2', icon: 'mdi-food-variant' },
      { name: 'Asparagus', remaining: 0, status: 'Empty', needsRefill: true, color: 'light-green', icon: 'mdi-grass' },
      { name: 'Pumpkin', remaining: 22, status: 'Good', needsRefill: false, color: 'deep-orange', icon: 'mdi-pumpkin' },
      { name: 'Celery', remaining: 7, status: 'Low', needsRefill: true, color: 'green-lighten-1', icon: 'mdi-leaf' }
    ],
    salesHeaders: [
      { title: 'Seed Type', key: 'seed' },
      { title: 'Total Sales', key: 'totalSales' },
      { title: 'Avg Price', key: 'avgPrice' },
      { title: 'Monthly Trend', key: 'monthlyTrend' }
    ],
    seedSalesSummary: [
      { seed: 'Eggplant', totalSales: 1245, avgPrice: 25.50, monthlyTrend: 5.2 },
      { seed: 'Tomato', totalSales: 1872, avgPrice: 28.75, monthlyTrend: 12.7 },
      { seed: 'Cucumber', totalSales: 986, avgPrice: 22.40, monthlyTrend: 3.5 },
      { seed: 'Red Pepper', totalSales: 754, avgPrice: 32.50, monthlyTrend: 8.9 },
      { seed: 'Carrot', totalSales: 682, avgPrice: 18.75, monthlyTrend: -2.3 },
      { seed: 'Brussel Sprouts', totalSales: 345, avgPrice: 35.20, monthlyTrend: 1.8 },
      { seed: 'Asparagus', totalSales: 287, avgPrice: 42.30, monthlyTrend: -1.2 },
      { seed: 'Pumpkin', totalSales: 512, avgPrice: 28.40, monthlyTrend: 4.6 },
      { seed: 'Celery', totalSales: 398, avgPrice: 20.50, monthlyTrend: -3.1 }
    ],
    machineStatus: {
      power: true,
      connected: true,
      errors: 0
    },
    lastHeartbeat: new Date().toLocaleString(),
    recentErrors: []
  }),
  methods: {
    getQuantityColor(remaining) {
      if (remaining <= 0) return 'red'
      if (remaining <= 5) return 'orange'
      if (remaining <= 15) return 'yellow'
      return 'green'
    },
    getStatusColor(status) {
      const colors = {
        Empty: 'red',
        Critical: 'red',
        Low: 'orange',
        Medium: 'yellow',
        Good: 'light-green',
        Full: 'green'
      }
      return colors[status] || 'grey'
    },
    getTrendColor(trend) {
      if (trend > 10) return 'green-darken-2'
      if (trend > 5) return 'green'
      if (trend < -5) return 'red'
      if (trend < 0) return 'orange'
      return 'blue-grey'
    },
    refillItem(crop) {
      alert(`Refilling ${crop.name}...`)
    },
    simulateMachineStatus() {
      const now = new Date()
      const random = Math.random()

      this.machineStatus.power = random > 0.1
      this.machineStatus.connected = this.machineStatus.power && random > 0.2
      this.machineStatus.errors = this.machineStatus.power ? (random > 0.8 ? 1 : 0) : 0

      this.lastHeartbeat = now.toLocaleString()

      if (this.machineStatus.errors > 0) {
        this.recentErrors = [{
          message: 'Seed dispenser jammed',
          timestamp: this.lastHeartbeat
        }]
      } else {
        this.recentErrors = []
      }
    }
  },
  mounted() {
    this.simulateMachineStatus()
    setInterval(this.simulateMachineStatus, 30000)
  }
}
</script>

<style scoped>
.h-100 {
  height: 100%;
}

.text-success {
  color: #4CAF50;
}

.text-red {
  color: #F44336;
}

.v-card {
  transition: all 0.2s ease;
  border-radius: 8px !important;
}

.v-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.bg-surface {
  background-color: #f8f9fa;
}
</style>

