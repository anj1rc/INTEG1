<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card title="Sales Overview" border rounded="lg">
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <v-select
                  label="Time Period"
                  :items="['Today', 'This Week', 'This Month', 'Custom']"
                  v-model="timePeriod"
                ></v-select>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Search Transactions"
                  prepend-icon="mdi-magnify"
                  v-model="searchQuery"
                ></v-text-field>
              </v-col>
            </v-row>
            
            <v-data-table
              :headers="salesHeaders"
              :items="salesData"
              :search="searchQuery"
            >
              <template v-slot:item.actions="{ item }">
                <v-btn
                  icon
                  size="small"
                  @click="viewDetails(item)"
                >
                  <v-icon>mdi-eye</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    timePeriod: 'This Week',
    searchQuery: '',
    salesHeaders: [
      { title: 'Transaction ID', key: 'id' },
      { title: 'Date', key: 'date' },
      { title: 'Seed Type', key: 'seedType' },
      { title: 'Amount (kg)', key: 'amount' },
      { title: 'Total (₱)', key: 'total' },
      { title: 'Payment Method', key: 'payment' },
      { title: 'Actions', key: 'actions' }
    ],
    salesData: [
      { id: 'AV-2025-001', date: '2025-04-18', seedType: 'Tomato F1', amount: 0.5, total: 500, payment: 'Coins' },
      { id: 'AV-2025-002', date: '2025-04-17', seedType: 'Eggplant', amount: 0.3, total: 300, payment: 'Coins' },
      { id: 'AV-2025-003', date: '2025-04-16', seedType: 'Bell Pepper', amount: 0.2, total: 200, payment: 'Coins' }
    ]
  }),
  methods: {
    viewDetails(item) {
      console.log('Viewing details for:', item.id)
      // Implement detail view logic
    }
  }
}
</script>