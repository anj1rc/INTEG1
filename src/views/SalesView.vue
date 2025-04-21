<template>
  <v-container fluid>
    <v-card title="Sales Management" border rounded="lg">
      <!-- Toolbar -->
      <v-card-actions class="px-4 pt-4">
        <v-btn color="primary" prepend-icon="mdi-plus" @click="openNewSaleDialog">
          New Sale
        </v-btn>

        <v-spacer></v-spacer>

        <v-text-field
          v-model="searchQuery"
          prepend-icon="mdi-magnify"
          label="Search sales..."
          single-line
          hide-details
          density="compact"
          style="max-width: 300px;"
        ></v-text-field>
      </v-card-actions>

      <v-divider class="my-2"></v-divider>

      <!-- Filters -->
      <v-card-text>
        <v-row dense>
          <v-col cols="12" sm="6" md="3">
            <v-select
              v-model="selectedStatus"
              :items="statusOptions"
              label="Status"
              clearable
              density="compact"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-select
              v-model="selectedProduct"
              :items="productOptions"
              label="Product"
              clearable
              density="compact"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-menu v-model="dateMenu" :close-on-content-click="false">
              <template v-slot:activator="{ props }">
                <v-text-field
                  v-bind="props"
                  label="Date Range"
                  prepend-icon="mdi-calendar-range"
                  :model-value="dateRangeText"
                  readonly
                  density="compact"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="dateRange"
                range
                @update:modelValue="dateMenu = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" sm="6" md="3" class="d-flex align-center">
            <v-btn
              color="secondary"
              variant="tonal"
              @click="resetFilters"
              prepend-icon="mdi-filter-remove"
            >
              Clear Filters
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>

      <!-- Data Table -->
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="filteredSales"
          :search="searchQuery"
          :items-per-page="10"
          density="comfortable"
        >
          <template v-slot:item.status="{ item }">
            <v-chip :color="getStatusColor(item.status)" size="small">
              {{ item.status }}
            </v-chip>
          </template>

          <template v-slot:item.amount="{ item }">
            <span class="font-weight-bold">₱{{ item.amount.toLocaleString() }}</span>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-btn icon size="small" color="primary" @click="viewSaleDetails(item)" class="mr-2">
              <v-icon>mdi-eye</v-icon>
            </v-btn>
            <v-btn icon size="small" color="error" @click="confirmDeleteSale(item)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>

          <template v-slot:bottom>
            <div class="d-flex justify-space-between align-center pa-2">
              <div class="text-caption">
                Showing {{ filteredSales.length }} of {{ sales.length }} sales
              </div>
              <v-btn color="primary" variant="tonal" prepend-icon="mdi-download" @click="exportSalesData">
                Export Data
              </v-btn>
            </div>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <!-- New Sale Dialog -->
    <v-dialog v-model="newSaleDialog" max-width="600">
      <SalesForm @save="handleNewSale" @cancel="newSaleDialog = false" />
    </v-dialog>

    <!-- Sale Details Dialog -->
    <v-dialog v-model="detailsDialog" max-width="800">
      <SaleDetails :sale="selectedSale" @close="detailsDialog = false" />
    </v-dialog>
  </v-container>
</template>

<script>
import SalesForm from '@/components/SalesForm.vue'
import SaleDetails from '@/components/SaleDetails.vue'

export default {
  name: 'SalesView',
  components: {
    SalesForm,
    SaleDetails
  },
  data: () => ({
    searchQuery: '',
    selectedStatus: null,
    selectedProduct: null,
    dateRange: [
      new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().substr(0, 10),
      new Date().toISOString().substr(0, 10)
    ],
    dateMenu: false,
    newSaleDialog: false,
    detailsDialog: false,
    selectedSale: null,
    statusOptions: ['Completed', 'Pending', 'Cancelled', 'Refunded'],
    productOptions: ['Tomato Seeds', 'Corn Seeds', 'Eggplant Seeds', 'Pepper Seeds', 'Bean Seeds'],
    headers: [
      { text: 'Sale ID', value: 'id', width: '120px' },
      { text: 'Date', value: 'date', width: '120px' },
      { text: 'Customer', value: 'customer' },
      { text: 'Product', value: 'product' },
      { text: 'Quantity', value: 'quantity', align: 'end', width: '100px' },
      { text: 'Amount', value: 'amount', align: 'end', width: '120px' },
      { text: 'Status', value: 'status', width: '120px' },
      { text: 'Actions', value: 'actions', width: '120px', sortable: false }
    ],
    sales: [
      {
        id: 'S-2023-001',
        date: '2023-06-15',
        customer: 'Farm A',
        product: 'Tomato Seeds',
        quantity: 25,
        amount: 5000,
        status: 'Completed'
      },
      {
        id: 'S-2023-002',
        date: '2023-06-14',
        customer: 'Farm B',
        product: 'Corn Seeds',
        quantity: 30,
        amount: 4500,
        status: 'Completed'
      },
      {
        id: 'S-2023-003',
        date: '2023-06-10',
        customer: 'Farm C',
        product: 'Eggplant Seeds',
        quantity: 15,
        amount: 3000,
        status: 'Pending'
      },
      {
        id: 'S-2023-004',
        date: '2023-06-05',
        customer: 'Farm D',
        product: 'Pepper Seeds',
        quantity: 20,
        amount: 4000,
        status: 'Completed'
      },
      {
        id: 'S-2023-005',
        date: '2023-06-01',
        customer: 'Farm E',
        product: 'Bean Seeds',
        quantity: 10,
        amount: 2000,
        status: 'Cancelled'
      }
    ]
  }),
  computed: {
    dateRangeText() {
      return this.dateRange.join(' to ')
    },
    filteredSales() {
      return this.sales.filter(sale => {
        const statusMatch = !this.selectedStatus || sale.status === this.selectedStatus
        const productMatch = !this.selectedProduct || sale.product === this.selectedProduct
        const dateMatch = this.isDateInRange(sale.date)
        return statusMatch && productMatch && dateMatch
      })
    }
  },
  methods: {
    isDateInRange(date) {
      if (!this.dateRange || this.dateRange.length !== 2) return true
      const startDate = new Date(this.dateRange[0])
      const endDate = new Date(this.dateRange[1])
      const saleDate = new Date(date)
      return saleDate >= startDate && saleDate <= endDate
    },
    getStatusColor(status) {
      const colors = {
        'Completed': 'success',
        'Pending': 'warning',
        'Cancelled': 'error',
        'Refunded': 'info'
      }
      return colors[status] || 'primary'
    },
    openNewSaleDialog() {
      this.newSaleDialog = true
    },
    viewSaleDetails(sale) {
      this.selectedSale = sale
      this.detailsDialog = true
    },
    confirmDeleteSale(sale) {
      if (confirm(`Are you sure you want to delete sale ${sale.id}?`)) {
        this.sales = this.sales.filter(s => s.id !== sale.id)
      }
    },
    handleNewSale(newSale) {
      this.sales.unshift({
        ...newSale,
        id: `S-${new Date().getFullYear()}-${String(this.sales.length + 1).padStart(3, '0')}`,
        date: new Date().toISOString().substr(0, 10),
        status: 'Completed'
      })
      this.newSaleDialog = false
    },
    resetFilters() {
      this.selectedStatus = null
      this.selectedProduct = null
      this.dateRange = [
        new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().substr(0, 10),
        new Date().toISOString().substr(0, 10)
      ]
      this.searchQuery = ''
    },
    exportSalesData() {
      const dataStr = JSON.stringify(this.filteredSales, null, 2)
      const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)
      const exportFileDefaultName = `sales_export_${new Date().toISOString().substr(0, 10)}.json`
      const linkElement = document.createElement('a')
      linkElement.setAttribute('href', dataUri)
      linkElement.setAttribute('download', exportFileDefaultName)
      linkElement.click()
    }
  }
}
</script>

<style scoped>
.v-card {
  transition: box-shadow 0.3s;
}
.v-card:hover {
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
</style>

