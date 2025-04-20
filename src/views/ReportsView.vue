<template>
  <v-container fluid>
    <v-card title="System Reports" border rounded="lg">
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-select
              label="Report Type"
              :items="reportTypes"
              v-model="selectedReport"
            ></v-select>
          </v-col>
          <v-col cols="12" md="6">
            <v-btn color="primary" @click="generateReport">
              Generate Report
            </v-btn>
          </v-col>
        </v-row>
        
        <v-divider class="my-4"></v-divider>
        
        <v-card v-if="reportData" title="Report Results">
          <v-card-text>
            <!-- Report content would go here -->
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th>Metric</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(value, key) in reportData" :key="key">
                    <td>{{ key }}</td>
                    <td>{{ value }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    reportTypes: [
      'Daily Sales',
      'Inventory Levels',
      'Machine Performance'
    ],
    selectedReport: null,
    reportData: null
  }),
  methods: {
    generateReport() {
      // Simulate API call
      this.reportData = {
        'Total Sales': '₱15,000',
        'Top Product': 'Tomato Seeds',
        'Transactions': '42'
      }
    }
  }
}
</script>