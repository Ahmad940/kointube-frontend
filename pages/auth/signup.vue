<template>
  <div>
    <v-row align='center' style='height: 100vh'>
      <v-col align='center'>
        <v-card class='pa-5 text-center fade' raised max-width='380' shaped>
          <div class='ma-10'>
            <v-avatar color='primary'>
              <v-icon color='white'>mdi-lock</v-icon>
            </v-avatar>
            <v-card-title class='d-flex justify-center'>Sign Up</v-card-title>
          </div>

          <v-alert v-show='error' dense type='error' dismissible>
            {{ error_message }}
          </v-alert>

          <v-form
            ref='form'
            v-model='valid'
            lazy-validation
            @submit.prevent='signUpHandler'
          >
            <v-text-field
              v-model='formData.username'
              name='username'
              type='text'
              aria-label='username'
              label='User Name'
              :rules='[fieldRequired]'
              outlined
              dense
              rounded
              placeholder='User Name'
              append-icon='mdi-account'
              clearable
            />

            <v-text-field
              v-model='formData.email'
              name='email'
              type='email'
              aria-label='email'
              label='Email'
              :rules='[emailRule]'
              outlined
              dense
              rounded
              placeholder='Email'
              append-icon='mdi-email'
              clearable
            />

            <v-text-field
              v-model='formData.country'
              name='country'
              type='text'
              aria-label='country'
              label='Country'
              :rules='[fieldRequired]'
              outlined
              dense
              rounded
              placeholder='Country'
              append-icon='mdi-flag'
              clearable
            />

            <v-text-field
              v-model='formData.password'
              outlined
              dense
              rounded
              aria-label='password'
              :rules='[min]'
              placeholder='Password'
              :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show_password ? 'text' : 'password'"
              name='password'
              label='Password'
              clearable
              @click:append='show_password = !show_password'
            />

            <v-text-field
              v-model='passwordConfirm'
              outlined
              dense
              rounded
              aria-label='confirm password'
              :rules='[min, passwordMatch(passwordConfirm, formData.password)]'
              placeholder='Confirm Password'
              :append-icon="passwordConfirm ? 'mdi-eye' : 'mdi-eye-off'"
              :type="passwordConfirm ? 'text' : 'password'"
              name='confirm password'
              label='Confirm Password'
              clearable
              @click:append='show_password1 = !show_password1'
            />

            <v-switch
              v-model='tos'
              dense
              :rules='[tosValidator]'
              label='Accept terms and condition'
            ></v-switch>

            <v-btn
              rounded
              color='secondary'
              block
              :loading='loading'
              :disabled='!valid'
              type='submit'
            >Sign Up
            </v-btn>

            <v-card-actions>
              <v-row class='subtitle-1 mt-5' justify='space-between'>
                <v-col align='left'>
                </v-col>
                <v-col align='right'>
                  <!--                <nuxt-link to="signup" class="white&#45;&#45;text text-decoration-none body-2">-->
                  <nuxt-link
                    to='login'
                    :class='textStyle'
                    class='text-decoration-none body-2'
                  >
                    <p>Login</p>
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
import { Report } from 'notiflix'
import rules from '~/mixins/rules'

export default {
  name: 'SignUp',
  auth: 'guest',
  mixins: [rules],
  layout: 'auth',
  data() {
    return {
      valid: false,
      loading: false,
      error: false,
      error_message: '',
      show_password: false,
      show_password1: false,
      passwordConfirm: '',
      formData: {
        email: '',
        username: '',
        country: '',
        password: '',
      },
      tos: false,
      textStyle: {
        'black--text': !this.$vuetify.theme.dark,
        'white--text': this.$vuetify.theme.dark
      }
    }
  },
  head: {
    title: 'Sign Up'
  },
  methods: {
    async signUpHandler() {
      if (!this.$refs.form.validate()) return

      try {
        const response = await this.$axios.$post('/auth/signup', this.formData)
        await this.$auth.setUserToken(response.token)
        await this.$auth.fetchUser()
        this.loading = false
        await this.$router.push('/')
        Report.success(
          'Success',
          '"Your account was successfully created', 'Ok')
      } catch ({ response }) {
        this.error = true
        this.error_message = response.data.message
        this.loading = false
      }
    }
  }
}
</script>
