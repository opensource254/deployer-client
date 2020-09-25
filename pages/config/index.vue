<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-btn to="/" icon large>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </v-col>
    <v-col cols="12" sm="6" md="8">
      <v-card v-for="(c, i) in configs" :key="i" outlined class="mb-1">
        <v-list-item :to="`/config/${c.id}`">
          <v-list-item-content>
            <v-list-item-title>{{ c.name }}</v-list-item-title>
            <v-list-item-subtitle
              >Description {{ c.description }}</v-list-item-subtitle
            >
            <code>{{ c.command }}</code>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-btn color="accent" bottom fab fixed right>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-col>
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
    }
  },
}
</script>
