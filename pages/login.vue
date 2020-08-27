<template>
  <v-row justify="center" align="center" class="full-height">
    <v-col cols="12" sm="6" md="4">
      <v-alert v-if="errorMessage" type="error">{{ errorMessage }}</v-alert>
      <v-card rounded outlined>
        <v-card-title>Sign in</v-card-title>
        <v-card-text>
          <ValidationObserver v-slot="{ valid }" ref="form">
            <v-form @submit.prevent="signIn">
              <validationProvider
                v-slot="{ errors }"
                name="Email"
                rules="required|email"
              >
                <v-text-field
                  v-model="credentials.email"
                  :error-messages="errors"
                  rounded
                  outlined
                  placeholder="Email"
                  type="email"
                ></v-text-field>
              </validationProvider>

              <validationProvider
                v-slot="{ errors }"
                name="Password"
                rules="required"
              >
                <v-text-field
                  v-model="credentials.password"
                  :error-messages="errors"
                  rounded
                  outlined
                  type="password"
                  placeholder="Password"
                ></v-text-field>
              </validationProvider>
              <v-btn
                :disabled="!valid"
                rounded
                type="submit"
                large
                color="secondary"
                >Sign in</v-btn
              >
            </v-form>
          </ValidationObserver>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  auth: 'guest',
  layout: 'auth',
  data() {
    return {
      errorMessage: null,
      credentials: {
        email: null,
        password: null,
      },
    }
  },
  methods: {
    async signIn() {
      try {
        await this.$auth.loginWith('local', {
          data: this.credentials,
        })
      } catch (error) {
        this.errorMessage = error.response.data
      }
    },
  },
}
</script>
<style scoped>
.full-height {
  height: 80vh;
}
</style>
