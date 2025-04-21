<template>
  <v-card>
    <v-card-title>Sale Details</v-card-title>
    <v-card-text>
      <div v-if="sale">
        <p><strong>ID:</strong> {{ sale.id }}</p>
        <p><strong>Customer:</strong> {{ sale.customer }}</p>
        <p><strong>Product:</strong> {{ sale.product }}</p>
        <p><strong>Quantity:</strong> {{ sale.quantity }}</p>
        <p><strong>Amount:</strong> ₱{{ sale.amount.toLocaleString() }}</p>
        <p><strong>Status:</strong> {{ sale.status }}</p>
        <p><strong>Date:</strong> {{ sale.date }}</p>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn color="primary" @click="$emit('close')">Close</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'SaleDetails',
  props: {
    sale: Object
  }
}
</script>
