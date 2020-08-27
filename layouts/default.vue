<template>
  <v-app>
    <v-navigation-drawer dark color="primary" app>
      <v-list-item>
        <v-list-item-avatar>
          <v-avatar rounded></v-avatar>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ $auth.user.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ $auth.user.email }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list nav shaped>
        <v-list-item to="/">
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/config">
          <v-list-item-content>
            <v-list-item-title>Config</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/deployments">
          <v-list-item-content>
            <v-list-item-title>Deployments</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="text-right">
          <v-btn color="error" text @click="$auth.logout()">Sign Out</v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar color="primary" app>
      <v-toolbar-title>Deployer</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>
