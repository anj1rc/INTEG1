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

      <v-list nav density="compact">
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
        {{ $route.meta?.title || 'Sales Inflation' }}
      </v-app-bar-title>
    </v-app-bar>

    <!-- Main Content -->
    <v-main>
      <v-container fluid class="pa-4">
        <!-- Seed Selection -->
        <v-row class="mb-4">
          <v-col cols="12" sm="6" md="4">
            <v-select
              v-model="selectedSeed"
              :items="seedTypes"
              label="Select Seed"
              outlined
              dense
              hide-details
            ></v-select>
          </v-col>
        </v-row>

        <!-- Sales & Inflation Tables -->
        <v-row>
          <v-col cols="12" md="6" class="mb-4 mb-md-0">
            <v-card class="h-100">
              <v-card-title class="text-h6">Daily Sales</v-card-title>
              <v-card-text class="pa-0">
                <v-data-table
                  :headers="dailySalesHeaders"
                  :items="filteredDailySales"
                  :items-per-page="10"
                  class="elevation-0"
                  mobile-breakpoint="0"
                >
                  <template v-slot:item.price="{ item }">
                    ₱{{ item.raw.price?.toFixed(2) || '0.00' }}
                  </template>
                  <template v-slot:item.inflationRate="{ item }">
                    <v-chip :color="getInflationColor(item.raw.inflationRate)" small dark>
                      {{ item.raw.inflationRate >= 0 ? '+' : '' }}{{ (item.raw.inflationRate || 0).toFixed(2) }}%
                    </v-chip>
                  </template>
                </v-data-table>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="6">
            <v-card class="h-100">
              <v-card-title class="text-h6">Price Inflation</v-card-title>
              <v-card-text class="pa-0">
                <v-data-table
                  :headers="inflationHeaders"
                  :items="filteredInflationData"
                  :items-per-page="10"
                  class="elevation-0"
                  mobile-breakpoint="0"
                >
                  <template v-slot:item.currentPrice="{ item }">
                    ₱{{ item.raw.currentPrice?.toFixed(2) || '0.00' }}
                  </template>
                  <template v-slot:item.previousPrice="{ item }">
                    ₱{{ item.raw.previousPrice?.toFixed(2) || '0.00' }}
                  </template>
                  <template v-slot:item.inflationRate="{ item }">
                    <v-chip :color="getInflationColor(item.raw.inflationRate)" small dark>
                      {{ item.raw.inflationRate >= 0 ? '+' : '' }}{{ (item.raw.inflationRate || 0).toFixed(2) }}%
                    </v-chip>
                  </template>
                </v-data-table>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Summary Cards -->
        <v-row class="mt-4">
          <v-col cols="12" sm="6" md="3">
            <v-card>
              <v-card-text class="text-center">
                <div class="text-h5 mb-1">{{ selectedSeed }}</div>
                <v-divider class="my-2"></v-divider>
                <div class="text-caption">Current Price</div>
                <div class="text-h4">
                  ₱{{ currentPrice.toFixed(2) }}
                </div>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <v-card>
              <v-card-text class="text-center">
                <div class="text-h5 mb-1">{{ selectedSeed }}</div>
                <v-divider class="my-2"></v-divider>
                <div class="text-caption">30-Day Avg Price</div>
                <div class="text-h4">
                  ₱{{ avgPrice.toFixed(2) }}
                </div>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <v-card>
              <v-card-text class="text-center">
                <div class="text-h5 mb-1">{{ selectedSeed }}</div>
                <v-divider class="my-2"></v-divider>
                <div class="text-caption">Monthly Trend</div>
                <div class="text-h4" :class="monthlyTrend >= 0 ? 'text-success' : 'text-error'">
                  {{ monthlyTrend >= 0 ? '+' : '' }}{{ monthlyTrend.toFixed(2) }}%
                </div>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <v-card>
              <v-card-text class="text-center">
                <div class="text-h5 mb-1">{{ selectedSeed }}</div>
                <v-divider class="my-2"></v-divider>
                <div class="text-caption">Total Monthly Sales</div>
                <div class="text-h4">
                  {{ totalSales.toLocaleString() }}
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
  name: 'SalesInflation',
  data: () => ({
    drawer: true,
    selectedSeed: 'Eggplant',
    seedTypes: ['Eggplant', 'Tomato', 'Cucumber', 'Red Pepper', 'Carrot', 'Brussel Sprouts', 'Asparagus', 'Pumpkin', 'Celery'],
    dailySalesHeaders: [
      { title: 'Date', key: 'date' },
      { title: 'Quantity', key: 'quantity' },
      { title: 'Price (₱)', key: 'price' },
      { title: 'Inflation', key: 'inflationRate' }
    ],
    inflationHeaders: [
      { title: 'Date', key: 'date' },
      { title: 'Current (₱)', key: 'currentPrice' },
      { title: 'Previous (₱)', key: 'previousPrice' },
      { title: 'Inflation', key: 'inflationRate' }
    ],
    dailySalesData: [],
    inflationData: [],
    navItems: [
        { title: 'Dashboard', route: '/dashboard', icon: 'mdi-view-dashboard' },
        { title: 'Sales Inflation', route: '/salesinflation', icon: 'mdi-cash-register' },
        { title: 'Reports', route: '/reports', icon: 'mdi-chart-line' },
        { title: 'Inventory', route: '/inventory', icon: 'mdi-sack' },
        { title: 'Device Management', route: '/devices', icon: 'mdi-devices' },
        { title: 'History Logs', route: '/history', icon: 'mdi-history' },

        { title: 'Settings', route: '/settings', icon: 'mdi-cog' }
      ]
  }),
  computed: {
    filteredDailySales() {
      return this.dailySalesData
        .filter(item => item.seed === this.selectedSeed)
        .map(item => ({
          ...item,
          value: item,
          raw: item
        }));
    },
    filteredInflationData() {
      return this.inflationData
        .filter(item => item.seed === this.selectedSeed)
        .map(item => ({
          ...item,
          value: item,
          raw: item
        }));
    },
    currentPrice() {
      if (this.filteredDailySales.length === 0) return 0;
      const latest = this.filteredDailySales[this.filteredDailySales.length - 1];
      return latest?.price || 0;
    },
    avgPrice() {
      if (this.filteredDailySales.length === 0) return 0;
      const prices = this.filteredDailySales.map(item => item.price || 0);
      return prices.reduce((sum, price) => sum + price, 0) / prices.length;
    },
    monthlyTrend() {
      if (this.filteredDailySales.length < 2) return 0;
      const first = this.filteredDailySales[0]?.price || 0;
      const last = this.filteredDailySales[this.filteredDailySales.length - 1]?.price || 0;
      if (first === 0) return 0;
      return ((last - first) / first) * 100;
    },
    totalSales() {
      if (this.filteredDailySales.length === 0) return 0;
      return this.filteredDailySales.reduce((sum, item) => sum + (item.quantity || 0), 0);
    }
  },
  methods: {
    getInflationColor(rate) {
      if (rate === undefined || rate === null) return 'green';
      if (rate > 5) return 'red';
      if (rate > 2) return 'orange';
      if (rate < -2) return 'blue';
      return 'green';
    },
    generateDailySalesData() {
      const seeds = ['Eggplant', 'Tomato', 'Cucumber', 'Red Pepper', 'Carrot', 'Brussel Sprouts', 'Asparagus', 'Pumpkin', 'Celery'];
      const basePrices = {
        'Eggplant': 25.50,
        'Tomato': 28.75,
        'Cucumber': 22.40,
        'Red Pepper': 32.50,
        'Carrot': 18.75,
        'Brussel Sprouts': 35.20,
        'Asparagus': 42.30,
        'Pumpkin': 28.40,
        'Celery': 20.50
      };

      const data = [];
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 30);

      seeds.forEach(seed => {
        let previousPrice = basePrices[seed] * 0.98;
        let currentPrice = basePrices[seed];

        for (let i = 0; i < 30; i++) {
          const date = new Date(startDate);
          date.setDate(startDate.getDate() + i);

          const inflationRate = ((currentPrice - previousPrice) / previousPrice) * 100;
          const quantity = Math.floor(Math.random() * 50) + 20;

          data.push({
            seed,
            date: date.toISOString().split('T')[0],
            quantity,
            price: parseFloat(currentPrice.toFixed(2)),
            inflationRate: parseFloat(inflationRate.toFixed(2))
          });

          previousPrice = currentPrice;
          currentPrice = currentPrice * (1 + (Math.random() * 0.04 - 0.02));
          currentPrice = parseFloat(currentPrice.toFixed(2));
        }
      });

      return data;
    },
    generateInflationData(dailySales) {
      return dailySales.map(item => ({
        seed: item.seed,
        date: item.date,
        currentPrice: item.price,
        previousPrice: parseFloat((item.price / (1 + (item.inflationRate / 100))).toFixed(2)),
        inflationRate: item.inflationRate
      }));
    }
  },
  created() {
    this.dailySalesData = this.generateDailySalesData();
    this.inflationData = this.generateInflationData(this.dailySalesData);
  }
};
</script>

<style scoped>
.bg-surface {
  background-color: #f8f9fa;
}

.h-100 {
  height: 100%;
}

.text-success {
  color: #4CAF50;
}

.text-error {
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

@media (max-width: 960px) {
  .v-data-table {
    overflow-x: auto;
    display: block;
  }
}
</style>


