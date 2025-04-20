<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card title="Seed Sampling Inventory" border rounded="lg">
          <v-card-actions>
            <v-btn color="primary" prepend-icon="mdi-plus" @click="addNewSeed">
              Add New Seed Sample
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn variant="tonal" prepend-icon="mdi-printer" @click="printInventory">
              Print Report
            </v-btn>
          </v-card-actions>

          <v-card-text>
            <v-row>
              <!-- Seed Type Filter -->
              <v-col cols="12" md="4">
                <v-select
                  label="Seed Type"
                  :items="seedTypes"
                  v-model="selectedSeedType"
                  prepend-icon="mdi-seed"
                  dense
                  clearable
                ></v-select>
              </v-col>

              <!-- Variety Filter -->
              <v-col cols="12" md="4">
                <v-select
                  label="Variety"
                  :items="filteredVarieties"
                  v-model="selectedVariety"
                  prepend-icon="mdi-tag"
                  dense
                  clearable
                ></v-select>
              </v-col>

              <!-- Search Field -->
              <v-col cols="12" md="4">
                <v-text-field
                  label="Search Samples"
                  prepend-icon="mdi-magnify"
                  v-model="searchQuery"
                  dense
                ></v-text-field>
              </v-col>
            </v-row>

            <!-- Seed Samples Table -->
            <v-data-table
              :headers="headers"
              :items="filteredSamples"
              :search="searchQuery"
              class="mt-4"
              density="compact"
            >
              <template v-slot:item.quality="{ item }">
                <v-chip :color="getQualityColor(item.quality)" size="small">
                  {{ item.quality }}
                </v-chip>
              </template>

              <template v-slot:item.actions="{ item }">
                <v-tooltip text="Edit Sample">
                  <template v-slot:activator="{ props }">
                    <v-btn
                      v-bind="props"
                      icon
                      size="small"
                      @click="editSample(item)"
                      class="mr-2"
                    >
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </template>
                </v-tooltip>

                <v-tooltip text="Delete Sample">
                  <template v-slot:activator="{ props }">
                    <v-btn
                      v-bind="props"
                      icon
                      size="small"
                      @click="deleteSample(item)"
                      color="error"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </template>
                </v-tooltip>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Add/Edit Dialog -->
    <v-dialog v-model="editDialog" max-width="600">
      <SeedSampleForm 
        v-if="editDialog"
        :sample="currentSample"
        @save="handleSave"
        @cancel="editDialog = false"
      />
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: 'SeedInventoryView',
  data: () => ({
    seedTypes: ['Tomato', 'Corn', 'Eggplant', 'Pepper', 'Bean'],
    varieties: {
      'Tomato': ['Cherry', 'Beefsteak', 'Roma', 'Heirloom'],
      'Corn': ['Sweet', 'Dent', 'Flint', 'Popcorn'],
      'Eggplant': ['Black Beauty', 'Japanese', 'Italian', 'White'],
      'Pepper': ['Bell', 'Jalapeño', 'Habanero', 'Cayenne'],
      'Bean': ['Green', 'Lima', 'Pinto', 'Black']
    },
    selectedSeedType: null,
    selectedVariety: null,
    searchQuery: '',
    editDialog: false,
    currentSample: null,
    headers: [
      { text: 'Sample ID', value: 'id', width: '120px' },
      { text: 'Seed Type', value: 'type' },
      { text: 'Variety', value: 'variety' },
      { text: 'Batch No.', value: 'batch', width: '120px' },
      { text: 'Quantity (g)', value: 'quantity', align: 'end', width: '120px' },
      { text: 'Germination %', value: 'germination', align: 'end', width: '150px' },
      { text: 'Quality', value: 'quality' },
      { text: 'Date Sampled', value: 'date', width: '150px' },
      { text: 'Actions', value: 'actions', width: '120px', sortable: false }
    ],
    samples: [
      { 
        id: 'SS-2023-001', 
        type: 'Tomato', 
        variety: 'Cherry', 
        batch: 'B-2301', 
        quantity: 250, 
        germination: 95,
        quality: 'Excellent',
        date: '2023-05-15'
      },
      { 
        id: 'SS-2023-002', 
        type: 'Corn', 
        variety: 'Sweet', 
        batch: 'B-2302', 
        quantity: 500, 
        germination: 88,
        quality: 'Good',
        date: '2023-05-10'
      },
      { 
        id: 'SS-2023-003', 
        type: 'Eggplant', 
        variety: 'Black Beauty', 
        batch: 'B-2303', 
        quantity: 150, 
        germination: 92,
        quality: 'Excellent',
        date: '2023-05-05'
      },
    ]
  }),
  computed: {
    filteredVarieties() {
      return this.selectedSeedType ? this.varieties[this.selectedSeedType] : [];
    },
    filteredSamples() {
      let filtered = this.samples;
      if (this.selectedSeedType) {
        filtered = filtered.filter(s => s.type === this.selectedSeedType);
      }
      if (this.selectedVariety) {
        filtered = filtered.filter(s => s.variety === this.selectedVariety);
      }
      return filtered;
    }
  },
  methods: {
    getQualityColor(quality) {
      const colors = {
        'Excellent': 'success',
        'Good': 'primary',
        'Fair': 'warning',
        'Poor': 'error'
      };
      return colors[quality] || 'info';
    },
    addNewSeed() {
      this.currentSample = {
        id: '',
        type: '',
        variety: '',
        batch: '',
        quantity: 0,
        germination: 0,
        quality: 'Good',
        date: new Date().toISOString().substr(0, 10)
      };
      this.editDialog = true;
    },
    editSample(sample) {
      this.currentSample = { ...sample };
      this.editDialog = true;
    },
    deleteSample(sample) {
      if (confirm(`Delete sample ${sample.id}?`)) {
        this.samples = this.samples.filter(s => s.id !== sample.id);
      }
    },
    handleSave(updatedSample) {
      if (updatedSample.id) {
        // Update existing
        const index = this.samples.findIndex(s => s.id === updatedSample.id);
        this.samples.splice(index, 1, updatedSample);
      } else {
        // Add new
        updatedSample.id = `SS-${new Date().getFullYear()}-${this.samples.length + 1}`;
        this.samples.push(updatedSample);
      }
      this.editDialog = false;
    },
    printInventory() {
      // Implement print functionality
      window.print();
    }
  }
};
</script>

<style scoped>
/* Print-specific styles */
@media print {
  .v-btn, .v-toolbar {
    display: none !important;
  }
  .v-card {
    box-shadow: none !important;
  }
}
</style>
