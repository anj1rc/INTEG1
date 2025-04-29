<template>
  <v-container fluid class="pa-4">
    <!-- Page Title -->
    <v-row>
      <v-col cols="12">
        <h1 class="text-h5 mb-4">Seed Dispensing Machine Status</h1>
        <p class="text-caption">Showing current seed quantities (Max 30 seeds per machine)</p>
      </v-col>
    </v-row>

    <!-- Seed Machine Cards - Compact 3x3 Grid -->
    <v-row dense>
      <v-col 
        cols="12" 
        sm="6" 
        md="4"
        v-for="crop in crops" 
        :key="crop.name"
      >
        <v-card border flat class="pa-2" height="100%">
          <v-card-text class="text-center pa-2">
            <v-avatar size="48" :color="crop.color" class="mb-2">
              <v-icon dark>{{ crop.icon }}</v-icon>
            </v-avatar>
            <div class="text-subtitle-1 mb-1">{{ crop.name }}</div>
            <v-divider class="my-1"></v-divider>
            
            <!-- Compact Seed Quantity Progress -->
            <div class="mt-2">
              <div class="d-flex justify-space-between text-caption mb-1">
                <span>Seeds:</span>
                <span>{{ crop.remaining }}/30</span>
              </div>
              <v-progress-linear
                :model-value="(crop.remaining / 30) * 100"
                :color="getQuantityColor(crop.remaining)"
                height="10"
                rounded
              ></v-progress-linear>
            </div>

            <!-- Compact Status Indicators -->
            <v-row class="mt-2" dense>
              <v-col cols="6" class="pa-0">
                <v-chip 
                  :color="getStatusColor(crop.status)" 
                  size="small"
                  label
                >
                  {{ crop.status }}
                </v-chip>
              </v-col>
              <v-col cols="6" class="text-right pa-0">
                <v-icon 
                  small
                  :color="crop.needsRefill ? 'red' : 'green'"
                >
                  {{ crop.needsRefill ? 'mdi-alert' : 'mdi-check-circle' }}
                </v-icon>
              </v-col>
            </v-row>
          </v-card-text>
          
          <v-card-actions class="justify-center pa-1">
            <v-btn 
              color="primary" 
              variant="text" 
              size="x-small"
              :disabled="!crop.needsRefill"
              class="text-caption"
            >
              Refill
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    crops: [
      // First Row
      { name: 'Eggplant', remaining: 5, status: 'Low', needsRefill: true, color: 'purple', icon: 'mdi-food-variant' },
      { name: 'Cucumber', remaining: 28, status: 'Good', needsRefill: false, color: 'green', icon: 'mdi-cucumber' },
      { name: 'Red Pepper', remaining: 15, status: 'Medium', needsRefill: false, color: 'red', icon: 'mdi-pepper' },
      // Second Row
      { name: 'Carrot', remaining: 2, status: 'Critical', needsRefill: true, color: 'orange', icon: 'mdi-carrot' },
      { name: 'Brussel Sprouts', remaining: 30, status: 'Full', needsRefill: false, color: 'teal', icon: 'mdi-sprout' },
      { name: 'Tomato', remaining: 10, status: 'Medium', needsRefill: false, color: 'red-darken-2', icon: 'mdi-food-variant' },
      // Third Row
      { name: 'Asparagus', remaining: 0, status: 'Empty', needsRefill: true, color: 'light-green', icon: 'mdi-grass' },
      { name: 'Pumpkin', remaining: 22, status: 'Good', needsRefill: false, color: 'deep-orange', icon: 'mdi-pumpkin' },
      { name: 'Celery', remaining: 7, status: 'Low', needsRefill: true, color: 'green-lighten-1', icon: 'mdi-leaf' }
    ]
  }),
  methods: {
    getQuantityColor(remaining) {
      if (remaining === 0) return 'red'
      if (remaining <= 5) return 'orange'
      if (remaining <= 15) return 'yellow'
      return 'green'
    },
    getStatusColor(status) {
      const colors = {
        'Empty': 'red',
        'Critical': 'red',
        'Low': 'orange',
        'Medium': 'yellow',
        'Good': 'light-green',
        'Full': 'green'
      }
      return colors[status] || 'grey'
    }
  }
}
</script>

<style scoped>
.v-card {
  transition: all 0.2s ease;
  border-radius: 8px !important;
}
.v-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
</style>
