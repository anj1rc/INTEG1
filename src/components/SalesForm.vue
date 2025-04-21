<template>
  <v-card>
    <v-card-title>New Sale</v-card-title>
    <v-card-text>
      <v-text-field v-model="form.customer" label="Customer Name" required></v-text-field>
      <v-select v-model="form.product" :items="products" label="Product" required></v-select>
      <v-text-field v-model.number="form.quantity" label="Quantity" type="number" required></v-text-field>
      <v-text-field v-model.number="form.amount" label="Amount" type="number" required></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="save">Save</v-btn>
      <v-btn @click="$emit('cancel')">Cancel</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'SalesForm',
  data() {
    return {
      form: {
        customer: '',
        product: '',
        quantity: null,
        amount: null
      },
      products: ['Tomato Seeds', 'Corn Seeds', 'Eggplant Seeds', 'Pepper Seeds', 'Bean Seeds']
    }
  },
  methods: {
    save() {
      if (this.form.customer && this.form.product && this.form.quantity && this.form.amount) {
        this.$emit('save', this.form)
      } else {
        alert('Please fill in all fields.')
      }
    }
  }
}
</script>
