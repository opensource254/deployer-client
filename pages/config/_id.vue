<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-btn to="/config" icon large>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </v-col>
    <v-col cols="12" sm="6" md="8">
      <v-card>
        <v-card-title>Update config</v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field outlined label="name"></v-text-field>
            <v-textarea
              rows="1"
              auto-grow
              outlined
              label="Description"
            ></v-textarea>
            <v-textarea
              rows="1"
              auto-grow
              outlined
              label="Command"
            ></v-textarea>
            <v-btn color="accent">Update</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
