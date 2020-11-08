<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-btn to="/" icon large>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </v-col>
    <!-- Show the loading status -->
    <v-col v-if="$fetchState.pending" cols="12" md="8">
      <v-skeleton-loader type="card"></v-skeleton-loader>
    </v-col>
    <!--/ Show the loading status -->

    <!-- Show the error message -->
    <v-col v-else-if="$fetchState.error" cols="12" md="8">
      <v-skeleton-loader type="card"></v-skeleton-loader>
    </v-col>
    <!--/ Show the error message -->
    <v-col v-else cols="12" sm="6" md="8">
      <!-- Alert if no config is available -->
      <v-alert v-if="configs.length === 0" prominent type="info">
        You have not added any Applications yet. Please add some and they will
        appear here
      </v-alert>
      <!--/ Alert if no config is available -->
      <v-card v-for="(c, i) in configs" v-else :key="i" outlined class="mb-1">
        <v-list-item :to="`/config/${c.id}`">
          <v-list-item-content>
            <v-list-item-title><b>App Name: </b>{{ c.name }}</v-list-item-title>
            <v-list-item-subtitle
              ><b>Description:</b> {{ c.description }}</v-list-item-subtitle
            >
            <code>{{ c.command }}</code>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-btn color="accent" bottom fab fixed right @click="createDialog = true">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-col>

    <!-- Dialog for creation of a config -->

    <v-dialog v-model="createDialog" persistent width="400">
      <v-card>
        <!-- Alert -->
        <v-alert v-if="alert.message" prominent :type="alert.type">
          {{ alert.message }}
        </v-alert>
        <!-- Alert -->
        <v-card-title> Create a new application </v-card-title>
        <v-card-text>
          <ValidationObserver v-slot="{ invalid }" ref="form">
            <v-form @submit.prevent="createConfig">
              <ValidationProvider
                v-slot="{ errors }"
                name="name"
                rules="required"
              >
                <v-text-field
                  v-model.trim="application.name"
                  :error-messages="errors"
                  outlined
                  label="name"
                ></v-text-field>
              </ValidationProvider>

              <ValidationProvider
                v-slot="{ errors }"
                name="description"
                rules="required"
              >
                <v-textarea
                  v-model="application.description"
                  :error-messages="errors"
                  rows="1"
                  auto-grow
                  outlined
                  label="Description"
                ></v-textarea>
              </ValidationProvider>

              <ValidationProvider
                v-slot="{ errors }"
                name="command"
                rules="required"
              >
                <v-textarea
                  v-model="application.command"
                  :error-messages="errors"
                  rows="1"
                  auto-grow
                  outlined
                  label="Command"
                ></v-textarea>
              </ValidationProvider>

              <v-btn :disabled="invalid" type="submit" color="accent"
                >Update</v-btn
              >
              <v-btn outlined color="secondary" @click="cancelCreate"
                >Cancel</v-btn
              >
            </v-form>
          </ValidationObserver>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!--/ Dialog for creation of a config -->
  </v-row>
</template>
<script>
export default {
  async fetch() {
    try {
      const res = await this.$axios.get('http://localhost:3232/api/config')
      this.configs = res.data
    } catch (error) {
      throw new Error(error)
    }
  },
  data() {
    return {
      configs: [],
      createDialog: false,
      application: {},
      alert: {
        message: null,
        type: 'error',
      },
    }
  },
  methods: {
    refresh() {
      return this.$fetch()
    },
    async createConfig() {
      try {
        await this.$axios.post('/api/config', this.application)
        // Set the alert
        this.alert.message = 'Configuration created'
        this.alert.type = 'success'

        // Remove the alert
        setTimeout(() => {
          this.alert.message = false
        }, 5000)

        // Load new apps
        this.refresh()
        this.application = {}
        this.$refs.form.reset()
      } catch (e) {
        // If the status is 422 update the validation
        if (e.response.status === 422) {
          return this.$refs.form.setErrors(e.response.data.errors)
        }
        this.alert.message = e
        this.alert.type = 'error'

        setTimeout(() => {
          this.alert.message = null
        }, 5000)
      }
    },
    cancelCreate() {
      this.application = {}
      this.createDialog = false
      this.$refs.form.reset()
    },
  },
}
</script>
