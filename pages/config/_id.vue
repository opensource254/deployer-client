<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-btn to="/config" icon large>
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
      <!-- Alert -->
      <v-alert v-if="alert.message" prominent :type="alert.type">
        {{ alert.message }}
      </v-alert>
      <!-- Alert -->

      <!-- Modal for showing excecution results -->
      <v-dialog v-model="command.results" width="700">
        <v-card>
          <v-card-title>Command results</v-card-title>
          <v-card-text>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <p v-html="command.body"></p>
          </v-card-text>
        </v-card>
      </v-dialog>
      <!-- Modal for showing excecution results -->

      <v-card>
        <v-card-actions>
          <v-btn color="accent" @click="runCommand">Run this command</v-btn>
        </v-card-actions>
        <v-card-title>Update config</v-card-title>
        <v-card-text>
          <ValidationObserver v-slot="{ invalid }" ref="form">
            <v-form @submit.prevent="updateConfig">
              <ValidationProvider
                v-slot="{ errors }"
                name="name"
                rules="required"
              >
                <v-text-field
                  v-model.trim="app.name"
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
                  v-model="app.description"
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
                  v-model="app.command"
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
              <v-btn large color="error" icon @click="deleteDialog = true">
                <v-icon>mdi-delete-outline</v-icon>
              </v-btn>

              <!-- Delete confirmation dialog -->
              <v-dialog v-model="deleteDialog" persistent width="300">
                <v-card color="danger">
                  <v-card-title>Are you sure?</v-card-title>
                  <v-card-actions>
                    <v-btn color="accent" @click="deleteConfig">Yes</v-btn>
                    <v-btn
                      outlined
                      color="success"
                      @click="deleteDialog = false"
                      >Cancel</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <!--/ Delete confirmation dialog -->
            </v-form>
          </ValidationObserver>
        </v-card-text>
      </v-card>
    </v-col>
    <v-overlay v-model="command.running">
      <v-progress-linear indeterminate />
      <v-progress-circular indeterminate />
      <v-progress-circular indeterminate color="warning" />
      <v-progress-circular indeterminate color="success" />
      <v-progress-circular indeterminate color="info" />
    </v-overlay>
  </v-row>
</template>
<script>
export default {
  async fetch() {
    try {
      const res = await this.$axios.get(`/api/config/${this.$route.params.id}`)
      this.app = res.data
    } catch (e) {
      throw new Error(e)
    }
  },
  data() {
    return {
      command: {
        results: false,
        body: null,
        running: false,
      },
      deleteDialog: false,
      app: {},
      alert: {
        message: null,
        type: 'error',
      },
    }
  },
  methods: {
    /** Run the current command */
    async runCommand() {
      try {
        this.command.running = true
        await this.$axios.get('/api/csrf-cookie')
        const { data } = await this.$axios.post('/api/command/run', {
          command: this.app.id,
        })
        this.command.results = true
        this.command.body = data
        this.command.running = false
      } catch (e) {
        this.command.results = true
        this.command.body = e
        this.command.running = false
      }
    },
    /** Update the current config */
    async updateConfig() {
      try {
        await this.$axios.get('/api/csrf-cookie')
        await this.$axios.put(`/api/config/${this.$route.params.id}`, this.app)
        this.alert.message = 'Configuration updated'
        this.alert.type = 'success'

        setTimeout(() => {
          this.alert.message = false
        }, 5000)
      } catch (e) {
        // If the status is 422 update the validation
        if (e.response.status === 422) {
          this.$refs.form.setErrors(e.response.data.errors)
        }
        this.alert.message = e
        this.alert.type = 'error'

        setTimeout(() => {
          this.alert.message = null
        }, 5000)
      }
    },
    /** Delete the current config */
    async deleteConfig() {
      try {
        await this.$axios.delete(`/api/config/${this.$route.params.id}`)
        this.$router.push('/config')
      } catch (error) {
        throw new Error(error)
      }
    },
  },
}
</script>
