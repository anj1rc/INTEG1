<template>
  <div>
    <!-- Overview Cards -->
    <v-row class="mb-6">
      <v-col cols="12" sm="6" md="3" v-for="stat in stats" :key="stat.title">
        <v-card :color="stat.color" dark>
          <v-card-text class="d-flex align-center">
            <v-avatar size="56" :color="stat.avatarColor" class="mr-4">
              <v-icon large>{{ stat.icon }}</v-icon>
            </v-avatar>
            <div>
              <div class="text-caption">{{ stat.title }}</div>
              <div class="text-h4">{{ stat.value }}</div>
              <div class="text-caption">{{ stat.subtext }}</div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Main Content Row -->
    <v-row>
      <!-- Seed Sampling Activity -->
      <v-col cols="12" md="8">
        <v-card title="Recent Seed Samples" border rounded="lg">
          <v-card-text>
            <v-data-table
              :headers="sampleHeaders"
              :items="recentSamples"
              :items-per-page="5"
              class="elevation-1"
            >
              <template v-slot:item.quality="{ item }">
                <v-chip :color="getQualityColor(item.quality)" small>
                  {{ item.quality }}
                </v-chip>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-btn icon small @click="viewSample(item)">
                  <v-icon small>mdi-eye</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- System Status -->
      <v-col cols="12" md="4">
        <v-card title="System Status" border rounded="lg">
          <v-card-text>
            <div v-for="status in systemStatus" :key="status.name" class="mb-4">
              <div class="d-flex justify-space-between mb-1">
                <span>{{ status.name }}</span>
                <span class="font-weight-bold">{{ status.value }}{{ status.unit }}</span>
              </div>
              <v-progress-linear
                :value="status.value"
                :color="status.color"
                height="10"
                rounded
              ></v-progress-linear>
            </div>

            <v-divider class="my-4"></v-divider>

            <div class="text-center">
              <v-btn color="primary" @click="refreshStatus">
                <v-icon left>mdi-refresh</v-icon>
                Refresh Status
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Second Row - Charts -->
    <v-row class="mt-4">
      <!-- Seed Quality Distribution -->
      <v-col cols="12" md="6">
        <v-card title="Seed Quality Distribution" border rounded="lg">
          <v-card-text>
            <div class="d-flex align-center mb-4" v-for="(quality, index) in qualityDistribution" :key="index">
              <span class="mr-4" style="width: 100px">{{ quality.name }}</span>
              <v-progress-linear
                :value="quality.percentage"
                :color="getQualityColor(quality.name)"
                height="20"
                rounded
              >
                <strong>{{ quality.percentage }}%</strong>
              </v-progress-linear>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Recent Activity -->
      <v-col cols="12" md="6">
        <v-card title="Recent Activity" border rounded="lg">
          <v-card-text>
            <v-timeline dense>
              <v-timeline-item
                v-for="(activity, index) in recentActivities"
                :key="index"
                small
                :color="activity.color"
              >
                <div class="d-flex justify-space-between">
                  <span>{{ activity.description }}</span>
                  <span class="text-caption">{{ activity.time }}</span>
                </div>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'DashboardView',
  data: () => ({
    stats: [
      {
        title: 'Total Samples',
        value: '142',
        subtext: '+12% this month',
        icon: 'mdi-seed',
        color: 'indigo-darken-2',
        avatarColor: 'indigo'
      },
      {
        title: 'Avg. Germination',
        value: '92%',
        subtext: 'Excellent quality',
        icon: 'mdi-sprout',
        color: 'green-darken-2',
        avatarColor: 'green'
      },
      {
        title: 'Pending Tests',
        value: '8',
        subtext: '2 urgent',
        icon: 'mdi-clock',
        color: 'orange-darken-2',
        avatarColor: 'orange'
      },
      {
        title: 'Machines Online',
        value: '3/4',
        subtext: '1 in maintenance',
        icon: 'mdi-robot',
        color: 'blue-darken-2',
        avatarColor: 'blue'
      }
    ],
    sampleHeaders: [
      { text: 'Sample ID', value: 'id' },
      { text: 'Seed Type', value: 'type' },
      { text: 'Variety', value: 'variety' },
      { text: 'Date', value: 'date' },
      { text: 'Quality', value: 'quality' },
      { text: 'Actions', value: 'actions', sortable: false }
    ],
    recentSamples: [
      { id: 'SS-2023-045', type: 'Tomato', variety: 'Cherry', date: '2023-06-15', quality: 'Excellent' },
      { id: 'SS-2023-044', type: 'Corn', variety: 'Sweet', date: '2023-06-14', quality: 'Good' },
      { id: 'SS-2023-043', type: 'Eggplant', variety: 'Black Beauty', date: '2023-06-14', quality: 'Excellent' },
      { id: 'SS-2023-042', type: 'Pepper', variety: 'Bell', date: '2023-06-13', quality: 'Fair' },
      { id: 'SS-2023-041', type: 'Bean', variety: 'Green', date: '2023-06-12', quality: 'Good' }
    ],
    systemStatus: [
      { name: 'Storage Capacity', value: 75, unit: '%', color: 'blue' },
      { name: 'Dispenser Accuracy', value: 92, unit: '%', color: 'green' },
      { name: 'Network Uptime', value: 99, unit: '%', color: 'indigo' },
      { name: 'Coin Mechanism', value: 85, unit: '%', color: 'orange' }
    ],
    qualityDistribution: [
      { name: 'Excellent', percentage: 65 },
      { name: 'Good', percentage: 25 },
      { name: 'Fair', percentage: 8 },
      { name: 'Poor', percentage: 2 }
    ],
    recentActivities: [
      { description: 'New tomato seed sample added', time: '2 hours ago', color: 'green' },
      { description: 'Corn seed analysis completed', time: '4 hours ago', color: 'blue' },
      { description: 'System maintenance performed', time: '1 day ago', color: 'orange' },
      { description: 'New batch of eggplant seeds received', time: '1 day ago', color: 'indigo' }
    ]
  }),
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
    viewSample(item) {
      console.log('Viewing sample:', item.id);
      // Implement view functionality
    },
    refreshStatus() {
      // Implement refresh functionality
      console.log('Refreshing system status');
    }
  }
};
</script>

<style scoped>
/* Custom styles */
.v-card {
  transition: transform 0.3s;
}
.v-card:hover {
  transform: translateY(-5px);
}
</style>

