<template>
  <div>
    <v-row align='center' style='height: 100vh'>
      <v-col align='center'>
        <v-card class='pa-5 text-center fade' raised max-width='380' shaped>
          <div class='ma-10'>
            <v-avatar color='primary'>
              <v-icon color='white'>mdi-lock</v-icon>
            </v-avatar>
            <v-card-title class='d-flex justify-center'>Sign In</v-card-title>
          </div>

          <v-alert v-show='error' dense type='error' dismissible>
            {{ error_message }}
          </v-alert>

          <v-form
            ref='form'
            v-model='valid'
            lazy-validation
            @submit.prevent='userLogin'
          >
            <v-text-field
              v-model='form_data.username'
              name='email'
              type='email'
              aria-label='email'
              label='Email or Username'
              :rules='[fieldRequired]'
              outlined
              dense
              rounded
              placeholder='Email Address or Username'
              append-icon='mdi-account'
              clearable
            />

            <v-text-field
              v-model='form_data.password'
              outlined
              dense
              rounded
              aria-label='password'
              :rules='[fieldRequired]'
              placeholder='Password'
              :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show_password ? 'text' : 'password'"
              name='password'
              label='Password'
              clearable
              @click:append='show_password = !show_password'
            />

            <v-btn
              rounded
              color='secondary'
              block
              :loading='loading'
              :disabled='!valid'
              type='submit'
            >Login
            </v-btn>

            <v-card-actions>
              <v-row class='subtitle-1 mt-5' justify='space-between'>
                <v-col align='left'>
                  <nuxt-link
                    to='#!'
                    :class='textStyle'
                    class='text-decoration-none body-2'
                  >
                    <p>Forget Password?</p>
                  </nuxt-link>
                </v-col>
                <v-col align='right'>
                  <!--                <nuxt-link to="signup" class="white&#45;&#45;text text-decoration-none body-2">-->
                  <nuxt-link
                    to='signup'
                    :class='textStyle'
                    class='text-decoration-none body-2'
                  >
                    <p>Sign Up</p>
                  </nuxt-link>
                </v-col>
              </v-row>
            </v-card-actions>
            <!--          <v-container class="ma-5">-->
            <!--            <p class="float-right">Dont have account?-->
            <!--              <nuxt-link class="blue&#45;&#45;text" to="signup">Sign Up</nuxt-link>-->
            <!--            </p>-->
            <!--          </v-container>-->
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { Notify } from 'notiflix'
import rules from '~/mixins/rules'

export default {
  name: 'Login',
  auth: 'guest',
  mixins: [rules],
  data() {
    return {
      valid: false,
      loading: false,
      error: false,
      error_message: '',
      form_data: {
        username: '',
        password: '',
      },
      show_password: false,
      textStyle: {
        'black--text': !this.$vuetify.theme.dark,
        'white--text': this.$vuetify.theme.dark,
      },
    }
  },
  head: {
    title: 'Sign In',
  },
  methods: {
    async userLogin() {
      if (!this.$refs.form.validate()) return

      this.loading = true
      this.error = false
      this.error_message = ''

      // making api call for login
      try {
        await this.$auth.loginWith('local', {
          data: this.form_data,
        })
        // console.log(response)
        this.loading = false
        Notify.success('Login Success', {
          timeout: 1000,
          position: 'right-bottom',
        })
      } catch (err) {
        // console.log(err.response.data)
        this.error = true
        this.error_message = err.response.data.message
        // this.form_data.password = ''
        this.loading = false
        // eslint-disable-next-line no-console
        console.log('err', err)
        // eslint-disable-next-line no-console
        console.log('response', err.response.data)
      }
    },
  },
}
</script>

<style scoped>

</style>
