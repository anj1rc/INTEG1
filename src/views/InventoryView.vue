<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card title="Inventory Management" border rounded="lg">
          <v-card-text>
            <v-row>
              <!-- Category Filter -->
              <v-col cols="12" md="6">
                <v-select
                  label="Category"
                  :items="categories"
                  v-model="selectedCategory"
                  prepend-icon="mdi-filter"
                  dense
                ></v-select>
              </v-col>

              <!-- Search Field -->
              <v-col cols="12" md="6">
                <v-text-field
                  label="Search Inventory"
                  prepend-icon="mdi-magnify"
                  v-model="searchQuery"
                  dense
                ></v-text-field>
              </v-col>
            </v-row>

            <!-- Inventory Table -->
            <v-data-table
              :headers="inventoryHeaders"
              :items="filteredInventory"
              :search="searchQuery"
              class="mt-4"
              dense
            >
              <template v-slot:item.actions="{ item }">
                <v-btn
                  icon
                  size="small"
                  @click="editItem(item)"
                  class="mr-2"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn
                  icon
                  size="small"
                  @click="deleteItem(item)"
                  color="error"
                >
                  <v-icon>mdi-delete</v-icon>
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
  name: 'InventoryView',
  data: () => ({
    categories: ['All', 'Seeds', 'Fertilizers', 'Tools'],
    selectedCategory: 'All',
    searchQuery: '',
    inventoryHeaders: [
      { text: 'Item ID', value: 'id', sortable: true },
      { text: 'Name', value: 'name', sortable: true },
      { text: 'Category', value: 'category', sortable: true },
      { text: 'Stock', value: 'stock', sortable: true },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    inventory: [
      { id: 'INV-001', name: 'Tomato Seeds', category: 'Seeds', stock: 50 },
      { id: 'INV-002', name: 'Corn Seeds', category: 'Seeds', stock: 30 },
      { id: 'INV-003', name: 'Fertilizer A', category: 'Fertilizers', stock: 20 },
      { id: 'INV-004', name: 'Shovel', category: 'Tools', stock: 10 },
    ],
  }),
  computed: {
    filteredInventory() {
      if (this.selectedCategory === 'All') {
        return this.inventory;
      }
      return this.inventory.filter(
        (item) => item.category === this.selectedCategory
      );
    },
  },
  methods: {
    editItem(item) {
      console.log(`Editing item: ${item.id}`);
      // Implement edit logic here
      alert(`Edit functionality for ${item.name} is not implemented yet.`);
    },
    deleteItem(item) {
      if (confirm(`Are you sure you want to delete ${item.name}?`)) {
        this.inventory = this.inventory.filter((i) => i.id !== item.id);
        alert(`${item.name} has been deleted.`);
      }
    },
  },
};
</script>

<style scoped>
/* Optional styling */
.v-data-table {
  margin-top: 20px;
}
</style>