<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card title="Settings" border rounded="lg">
          <v-card-text>
            <v-row>
              <!-- Dark Mode Toggle -->
              <v-col cols="12" md="6">
                <v-switch
                  v-model="darkMode"
                  label="Dark Mode"
                  prepend-icon="mdi-weather-night"
                  append-icon="mdi-weather-sunny"
                ></v-switch>
              </v-col>

              <!-- Language Selection -->
              <v-col cols="12" md="6">
                <v-select
                  label="Language"
                  :items="languages"
                  v-model="selectedLanguage"
                  prepend-icon="mdi-translate"
                ></v-select>
              </v-col>
            </v-row>

            <v-divider class="my-4"></v-divider>

            <!-- User Preferences -->
            <v-row>
              <v-col cols="12">
                <h3>User Preferences</h3>
                <v-text-field
                  label="Username"
                  v-model="username"
                  prepend-icon="mdi-account"
                ></v-text-field>
                <v-text-field
                  label="Email"
                  v-model="email"
                  prepend-icon="mdi-email"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-btn color="primary" class="mt-4" @click="saveSettings">
              Save Settings
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    darkMode: false,
    languages: ['English', 'Spanish', 'French', 'German'],
    selectedLanguage: 'English',
    username: 'Admin',
    email: 'admin@example.com',
  }),
  watch: {
    darkMode(newValue) {
      this.$vuetify.theme.global.name = newValue ? 'dark' : 'light';
    },
  },
  methods: {
    saveSettings() {
      console.log('Settings saved:', {
        darkMode: this.darkMode,
        language: this.selectedLanguage,
        username: this.username,
        email: this.email,
      });
      // Implement logic to save settings (e.g., API call)
    },
  },
};
</script>

<style scoped>
/* Add any custom styles here */
</style>