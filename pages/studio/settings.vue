<template>
  <v-container>
    <p>Settings page</p>
    <v-form ref='form'
            v-model='valid'
            lazy-validation
            @submit.prevent='saveUserInfo'>

      <v-row>

        <!--        username section ... -->
        <v-col cols='12' sm='6' md='6'>
          <v-text-field v-model='formData.username'
                        type='text'
                        name='username'
                        :rules='[fieldRequired]'
                        label='Username'
                        placeholder='Enter Username...'
                        dense
                        outlined />
        </v-col>

        <!--        channel name section ...-->
        <v-col cols='12' sm='6' md='6'>
          <v-text-field v-model='formData.channel_name'
                        :rules='[]'
                        type='text'
                        name='channel_name'
                        label='Channel Name'
                        placeholder='Enter Channel Name...'
                        hint='[Optional field]'
                        dense
                        outlined />
        </v-col>

        <!--        profile image col-->
        <v-col cols='12' md='4'>
          <p class=''>Profile Image</p>
          <v-card
            v-if='formData.profile_img'
            height='250'
            width='100%'
            @mouseenter='profileImgOverlay = true'
            @mouseleave='profileImgOverlay = false'>
            <v-overlay
              absolute
              :value='profileImgOverlay'
            >
              <v-btn
                class='mx-2'
                fab
                dark
                small
                color='primary'
                @click='closeProfileImgOverlay'
              >
                <v-icon dark color='white'>
                  mdi-close
                </v-icon>
              </v-btn>
            </v-overlay>
            <v-img
              lazy-src='/minilogo.png'
              :src='formData.profile_img'
              height='250'
              width='250'>
              <template #placeholder>
                <v-row
                  class='fill-height ma-0'
                  align='center'
                  justify='center'
                >
                  <v-progress-circular
                    indeterminate
                    color='grey'
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-card>
          <v-dialog
            v-else
            v-model='profileImgDialog'
            persistent
            max-width='500'
          >
            <template #activator='{ on, attrs }'>
              <div
                class='thumb'
                v-bind='attrs'
                v-on='on'>
                <p>Upload Profile Image</p>
              </div>
            </template>
            <v-card>
              <v-card-title class='text-h5'>
                Upload Profile Image
              </v-card-title>
              <v-card-text>
                <v-form ref='profileImgForm'>
                  <v-file-input
                    v-model='profile_img'
                    :rules='[fieldRequired, thumbMaxSiz]'
                    accept='image/png, image/jpeg, image/bmp'
                    placeholder='Select Picture'
                    prepend-icon='mdi-camera'
                    label='Upload Profile Image'
                    show-size
                  ></v-file-input>
                </v-form>

                <v-progress-linear
                  v-show='profileImgUploadProgress !== 0'
                  v-model='profileImgUploadProgress'
                  :value='profileImgUploadProgress'
                  height='25'
                >
                  <strong class='white--text'>{{ Math.ceil(profileImgUploadProgress) }}%</strong>
                </v-progress-linear>

              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color='green darken-1'
                  text
                  @click='closeProfileImgDialog'
                >
                  Close
                </v-btn>
                <v-btn
                  color='green darken-1'
                  text
                  @click='uploadProfileImgDialogHandler'
                >
                  Upload
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>

        <!--        cover image col-->
        <v-col cols='12' md='4'>
          <p class=''>Cover Image</p>
          <v-card
            v-if='formData.cover_img'
            height='250'
            width='100%'
            @mouseenter='coverImgOverlay = true'
            @mouseleave='coverImgOverlay = false'>
            <v-overlay
              absolute
              :value='coverImgOverlay'
            >
              <v-btn
                class='mx-2'
                fab
                dark
                small
                color='primary'
                @click='closeCoverImgOverlay'
              >
                <v-icon dark color='white'>
                  mdi-close
                </v-icon>
              </v-btn>
            </v-overlay>
            <v-img
              lazy-src='/minilogo.png'
              :src='formData.cover_img'
              height='250'
              width='250'>
              <template #placeholder>
                <v-row
                  class='fill-height ma-0'
                  align='center'
                  justify='center'
                >
                  <v-progress-circular
                    indeterminate
                    color='grey'
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-card>
          <v-dialog
            v-else
            v-model='coverImgDialog'
            persistent
            max-width='500'
          >
            <template #activator='{ on, attrs }'>
              <div
                class='thumb'
                v-bind='attrs'
                v-on='on'>
                <p>Upload Cover Image</p>
              </div>
            </template>
            <v-card>
              <v-card-title class='text-h5'>
                Upload Cover Imae
              </v-card-title>
              <v-card-text>
                <v-form ref='coverImgForm'>
                  <v-file-input
                    v-model='cover_img'
                    :rules='[fieldRequired, thumbMaxSiz]'
                    accept='image/png, image/jpeg, image/bmp'
                    placeholder='Select Picture'
                    prepend-icon='mdi-camera'
                    label='Upload Cover Image'
                    show-size
                  ></v-file-input>
                </v-form>

                <v-progress-linear
                  v-show='coverImgUploadProgress !== 0'
                  v-model='coverImgUploadProgress'
                  :value='coverImgUploadProgress'
                  height='25'
                >
                  <strong class='white--text'>{{ Math.ceil(coverImgUploadProgress) }}%</strong>
                </v-progress-linear>

              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color='green darken-1'
                  text
                  @click='closeCoverImgDialog'
                >
                  Close
                </v-btn>
                <v-btn
                  color='green darken-1'
                  text
                  @click='uploadCoverImgDialogHandler'
                >
                  Upload
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>

        <v-col cols='12' class='mt-7'>
          <v-btn width='49%' color='secondary' @click='$router.push("dashboard")'>
            <v-icon dark left>mdi-close</v-icon>
            Cancel
          </v-btn>
          <v-btn
            type='submit'
            width='49%'
            dark
            color='primary'
            :loading='loading'>
            <v-icon left>mdi-cloud-upload</v-icon>
            Save
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import { Report } from 'notiflix'
import rules from '../../mixins/rules'

export default {
  name: 'Settings',
  mixins: [rules],
  layout: 'studio',
  asyncData({ $auth }) {
    const user = $auth.user
    // eslint-disable-next-line no-console
    console.log('User', user)
    return { formData: user }
  },
  data() {
    return {
      loading: false,
      valid: false,
      profileImgOverlay: false,
      coverImgOverlay: false,
      profileImgUploadProgress: 0,
      coverImgUploadProgress: 0,
      profileImgDialog: false,
      coverImgDialog: false,
      profile_img: null,
      cover_img: null,
      formData: {
        username: '',
        channel_name: '',
        profile_img: '',
        cover_img: ''
      }
    }
  },
  head: {
    title: 'Settings'
  },
  methods: {
    closeProfileImgOverlay() {
      this.formData.profile_img = ''
      this.profileImgOverlay = false
    },
    closeCoverImgOverlay() {
      this.formData.cover_img = ''
      this.coverImgOverlay = false
    },
    closeProfileImgDialog() {
      this.profileImgUploadProgress = 0
      this.profile_img = null
      this.profileImgDialog = false
    },
    closeCoverImgDialog() {
      this.coverImgUploadProgress = 0
      this.cover_img = null
      this.coverImgDialog = false
    },
    async uploadProfileImgDialogHandler() {
      if (!this.$refs.profileImgForm.validate()) return

      const formData = new FormData()
      formData.append('image', this.profile_img)
      const headers = { 'Content-Type': 'multipart/form-data' }
      const response = await this.$axios.$post(
        'https://kointube-uploader.herokuapp.com/upload/image',
        formData,
        {
          headers,
          onUploadProgress: function(progressEvent) {
            this.profileImgUploadProgress = parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100))
          }.bind(this)
        }
      )

      this.formData.profile_img = response.SecureURL

      this.closeProfileImgDialog()
    },
    async uploadCoverImgDialogHandler() {
      if (!this.$refs.coverImgForm.validate()) return

      const formData = new FormData()
      formData.append('image', this.cover_img)
      const headers = { 'Content-Type': 'multipart/form-data' }
      const response = await this.$axios.$post(
        'https://kointube-uploader.herokuapp.com/upload/image',
        formData,
        {
          headers,
          onUploadProgress: function(progressEvent) {
            this.coverImgUploadProgress = parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100))
          }.bind(this)
        }
      )

      this.formData.cover_img = response.SecureURL

      this.closeCoverImgDialog()
    },
    async saveUserInfo() {
      if (!this.$refs.form.validate()) return

      // eslint-disable-next-line no-console
      console.log('formData', this.formData)

      if (!this.formData.profile_img) return Report.failure('Error', 'Profile Image required', 'Ok')
      if (!this.formData.cover_img) return Report.failure('Error', 'Cover Image required', 'Ok')

      try {
        this.loading = true

        await this.$axios.$patch('/users', this.formData)
        this.loading = false
        await this.$router.push('dashboard')
      } catch ({ response }) {
        // eslint-disable-next-line no-console
        console.log(response)
        this.loading = false
        return Report.failure('Error', response.data.message, 'Ok')
      }
    }
  }
}
</script>

<style scoped>
.thumb {
  height: 250px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px grey dotted;
  border-radius: 10px;
  background: rgba(227, 221, 221, 0.99);
}

.thumb:hover {
  cursor: pointer;
  background: grey;
}
</style>
