<template>
  <v-row justify="center" align="center" class="full-height">
    <v-col cols="12" sm="8" md="4">
      <v-form>
        <v-text-field outlined placeholder="Email"></v-text-field>
        <v-text-field
          outlined
          type="password"
          placeholder="Password"
        ></v-text-field>
        <v-btn large color="secondary">Sign in</v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>
<script>
export default {
  layout: 'auth',
}
</script>
<style scoped>
.full-height {
  height: 80vh;
}
</style>
