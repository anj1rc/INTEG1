<template>
  <v-container fluid>
    <v-row>
      <!-- Dashboard Overview -->
      <v-col cols="12">
        <v-card title="Dashboard Overview" class="mb-4">
          <v-card-text>
            <v-row>
              <v-col cols="12" md="4">
                <v-card outlined>
                  <v-card-title>Total Sales</v-card-title>
                  <v-card-text class="text-h4">₱15,000</v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card outlined>
                  <v-card-title>Total Transactions</v-card-title>
                  <v-card-text class="text-h4">42</v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card outlined>
                  <v-card-title>Top Product</v-card-title>
                  <v-card-text class="text-h4">Tomato Seeds</v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Recent Transactions -->
      <v-col cols="12">
        <v-card title="Recent Transactions">
          <v-data-table
            :headers="transactionHeaders"
            :items="transactions"
            items-per-page="5"
          ></v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'DashboardView',
  data: () => ({
    transactionHeaders: [
      { text: 'Transaction ID', value: 'id' },
      { text: 'Date', value: 'date' },
      { text: 'Amount', value: 'amount' },
      { text: 'Status', value: 'status' },
    ],
    transactions: [
      { id: 'TXN-001', date: '2025-04-18', amount: '₱500', status: 'Completed' },
      { id: 'TXN-002', date: '2025-04-17', amount: '₱300', status: 'Pending' },
      { id: 'TXN-003', date: '2025-04-16', amount: '₱200', status: 'Completed' },
    ],
  }),
};
</script>

<style scoped>
/* Optional styling */
.v-card {
  margin-bottom: 20px;
}
</style>