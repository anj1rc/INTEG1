<template>
  <v-card title="Sales Management" border>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="sales"
        :items-per-page="5"
      >
        <template v-slot:item.amount="{ item }">
          ₱{{ item.amount.toLocaleString() }}
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    headers: [
      { text: 'ID', value: 'id' },
      { text: 'Date', value: 'date' },
      { text: 'Customer', value: 'customer' },
      { text: 'Amount', value: 'amount' }
    ],
    sales: [
      { id: 1, date: '2023-05-01', customer: 'Farm A', amount: 1500 },
      { id: 2, date: '2023-05-02', customer: 'Farm B', amount: 2300 }
    ]
  })
}
</script>