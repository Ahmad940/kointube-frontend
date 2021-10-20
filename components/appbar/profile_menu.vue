<template>
  <v-menu offset-y>
    <template #activator='{ on, attrs }'>
      <v-list color="primary">
        <v-list-item dense v-bind="attrs" v-on="on">

          <v-avatar size="30" class="mr-2 white--text" :color='randomColor'>
            {{ $auth.user.username.charAt(0).toUpperCase() }}
          </v-avatar>

          <!--          <v-list-item-title  class="white&#45;&#45;text">Ahmad Muhammad</v-list-item-title>-->
          <v-list-item-title class="white--text" v-text="$auth.user.username"></v-list-item-title>
          <v-list-item-icon>
            <v-icon color="white">mdi-menu-down</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </template>
    <v-list flat>
      <v-list-item-group
        v-model='selectedItem'
        color='primary'
      >
        <v-list-item
          v-for='(item, i) in items'
          :key='i'
          link
          exact
          :to='item.to'
        >
          <v-list-item-icon>
            <v-icon v-text='item.icon'></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text='item.title'></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'ProfileMenu',
  data: () => ({
    selectedItem: 1,
    items: [
      {
        icon: 'mdi-account',
        title: 'Profile',
        to: '/app/profile'
      },
      {
        icon: 'mdi-cog',
        title: 'Settings',
        to: '/app/settings'
      },
      {
        icon: 'mdi-logout',
        title: 'Sign Out',
        to: '/auth/logout'
      }
    ]
  }),
  computed: {
    randomColor: () => {
      const colors = ['red', 'brown', 'orange', 'green', 'tomato', 'indigo']
      const randIndex = Math.floor(Math.random() * colors.length - 1)
      return colors[randIndex]
}
  }
}
</script>

<style scoped>

</style>
