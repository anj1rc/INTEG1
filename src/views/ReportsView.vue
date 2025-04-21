<template>
  <v-container fluid>
    <!-- Date Range and Report Type Selector -->
    <v-row>
      <v-col cols="12" sm="6" md="4">
        <v-text-field
          v-model="startDate"
          label="Start Date"
          type="date"
          prepend-inner-icon="mdi-calendar"
        />
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-text-field
          v-model="endDate"
          label="End Date"
          type="date"
          prepend-inner-icon="mdi-calendar"
        />
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-select
          v-model="reportType"
          :items="reportTypes"
          label="Select Report Type"
          prepend-inner-icon="mdi-chart-bar"
        />
      </v-col>
    </v-row>

    <!-- Report Summary Cards -->
    <v-row>
      <v-col cols="12" md="4">
        <v-card class="pa-4 text-center">
          <div class="text-h6">Total Sales</div>
          <div class="text-h5 font-weight-bold">{{ totalSales }}</div>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="pa-4 text-center">
          <div class="text-h6">Total Orders</div>
          <div class="text-h5 font-weight-bold">{{ totalOrders }}</div>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="pa-4 text-center">
          <div class="text-h6">Top Product</div>
          <div class="text-h5 font-weight-bold">{{ topProduct }}</div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Data Table -->
    <v-row class="mt-6">
      <v-col cols="12">
        <v-card>
          <v-card-title>Data Table</v-card-title>
          <v-data-table :headers="headers" :items="items" class="elevation-1" />
        </v-card>
      </v-col>
    </v-row>

    <!-- Bar Chart -->
    <v-row class="mt-6">
      <v-col cols="12">
        <v-card>
          <v-card-title>Sales Chart</v-card-title>
          <v-card-text>
            <div class="bar-chart-container">
              <div
                class="bar"
                v-for="(item, index) in items"
                :key="index"
                :style="getBarStyle(item.sales)"
              >
                <div class="bar-label">{{ item.date }}</div>
                <div class="bar-value">{{ item.sales }}</div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      startDate: '',
      endDate: '',
      reportType: '',
      reportTypes: ['Sales', 'Orders', 'Inventory'],
      totalSales: '₱15,000',
      totalOrders: 45,
      topProduct: 'Potatoes',
      headers: [
        { text: 'Date', value: 'date' },
        { text: 'Sales', value: 'sales' },
        { text: 'Orders', value: 'orders' },
      ],
      items: [
        { date: '2025-04-01', sales: 5000, orders: 15 },
        { date: '2025-04-02', sales: 6000, orders: 18 },
        { date: '2025-04-03', sales: 4000, orders: 12 },
      ],
    };
  },
  methods: {
    getBarStyle(sales) {
      const maxSales = Math.max(...this.items.map(item => item.sales));
      const height = (sales / maxSales) * 200; // Max height of 200px
      return {
        height: `${height}px`,
        backgroundColor: '#4caf50',
      };
    },
  },
};
</script>

<style scoped>
.bar-chart-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 200px;
}

.bar {
  width: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.bar-label {
  margin-top: 10px;
  font-size: 12px;
}

.bar-value {
  position: absolute;
  bottom: -20px;
  font-size: 14px;
  font-weight: bold;
}

.text-h6 {
  color: #4caf50;
}
</style>
