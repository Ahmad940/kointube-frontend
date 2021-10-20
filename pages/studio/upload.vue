<template>
  <v-container>
    <p class='title'>Upload Video</p>
    <v-form ref='form'
            v-model='valid'
            lazy-validation
            @submit.prevent='uploadVideo'>

      <v-row>
        <v-col cols='12'>
          <v-text-field v-model='formData.title'
                        :rules='[fieldRequired]'
                        label='Title'
                        placeholder='Enter Title...'
                        dense
                        outlined />
        </v-col>

        <v-col cols='12' md='4'>
          <p class=''>Thumbnail</p>
          <v-img
            v-if='formData.thumbnailUrl'
            lazy-src='/minilogo.png'
            :src='formData.thumbnailUrl'
            height='250'
            width='250'>
            <template #placeholder>
              <v-row
                class="fill-height ma-0"
                align="center"
                justify="center"
              >
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
          <v-dialog
            v-else
            v-model='thumbnailDialog'
            persistent
            max-width='500'
          >
            <template #activator='{ on, attrs }'>
              <div
                class='thumb'
                v-bind='attrs'
                v-on='on'>
                <p>Upload Thumbnail</p>
              </div>
            </template>
            <v-card>
              <v-card-title class='text-h5'>
                Upload Thumbnail
              </v-card-title>
              <v-card-text>
                <v-file-input
                  v-model='thumbnail'
                  :rules='uploadThumbnailRule'
                  accept='image/png, image/jpeg, image/bmp'
                  placeholder='Select Picture'
                  prepend-icon='mdi-camera'
                  label='Upload Thumbnail'
                ></v-file-input>

                <v-progress-linear
                  v-show='thumbnailUploadProgress !== 0'
                  v-model='thumbnailUploadProgress'
                  :value='thumbnailUploadProgress'
                  height='25'
                >
                  <strong class='white--text'>{{ Math.ceil(thumbnailUploadProgress) }}%</strong>
                </v-progress-linear>

              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color='green darken-1'
                  text
                  @click='closeThumbnailDialog'
                >
                  Close
                </v-btn>
                <v-btn
                  color='green darken-1'
                  text
                  @click='uploadThumbnailDialogHandler'
                >
                  Upload
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>

        <v-col cols='12' md='4'>
          <p class=''>Video</p>
          <v-dialog
            v-model='videoDialog'
            persistent
            max-width='500'
          >
            <template #activator='{ on, attrs }'>
              <div
                class='thumb'
                v-bind='attrs'
                v-on='on'>
                <p>Upload Video</p>
              </div>
            </template>
            <v-card>
              <v-card-title class='text-h5'>
                Upload Video
              </v-card-title>
              <v-card-text>
                <v-file-input
                  v-model='video'
                  accept='video/mp4,video/x-m4v,video/*'
                  placeholder='Select video'
                  prepend-icon='mdi-camera-image'
                  label='Upload Video'
                ></v-file-input>

                <v-progress-linear
                  v-show='videoUploadProgress !== 0'
                  v-model='videoUploadProgress'
                  :value='videoUploadProgress'
                  height='25'
                >
                  <strong class='white--text'>{{ Math.ceil(videoUploadProgress) }}%</strong>
                </v-progress-linear>

              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color='green darken-1'
                  text
                  @click='closeVideoDialog'
                >
                  Close
                </v-btn>
                <v-btn
                  color='green darken-1'
                  text
                  @click='uploadVideoDialogHandler'
                >
                  Upload
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

        </v-col>


        <v-col cols='12' class='mt-5'>
          <v-btn width='49%' color='secondary'>
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
            Upload
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
  name: 'Upload',
  mixins: [rules],
  layout: 'studio',
  data() {
    return {
      thumbnailUploadProgress: 0,
      videoUploadProgress: 0,
      loading: false,
      valid: false,
      videoDialog: false,
      thumbnailDialog: false,
      thumbnail: null,
      video: null,
      formData: {
        title: '',
        thumbnailUrl: '',
        videoUrl: ''
      }
    }
  },
  head: {
    title: 'Upload Video'
  },
  methods: {
    closeThumbnailDialog() {
      this.thumbnailUploadProgress = 0
      this.thumbnail = null
      this.thumbnailDialog = false
    },
    closeVideoDialog() {
      this.videoUploadProgress = 0
      this.video = null
      this.videoDialog = false
    },
    async uploadThumbnailDialogHandler() {
      const formData = new FormData()
      formData.append('image', this.thumbnail)
      const headers = { 'Content-Type': 'multipart/form-data' }
      const response = await this.$axios.$post(
        'https://kointube-uploader.herokuapp.com/upload/image',
        formData,
        {
          headers,
          onUploadProgress: function(progressEvent) {
            this.thumbnailUploadProgress = parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100))
          }.bind(this)
        }
      )

      this.formData.thumbnailUrl = response.SecureURL

      this.closeThumbnailDialog()
    },
    async uploadVideoDialogHandler() {
      const formData = new FormData()
      formData.append('video', this.video)
      const headers = { 'Content-Type': 'multipart/form-data' }
      const response = await this.$axios.$post(
        'https://kointube-uploader.herokuapp.com/upload/video',
        formData,
        {
          headers,
          onUploadProgress: function(progressEvent) {
            this.videoUploadProgress = parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100))
          }.bind(this)
        }
      )

      this.formData.videoUrl = response.SecureURL

      this.closeVideoDialog()
    },
    async uploadVideo() {
      if (!this.$refs.form.validate()) return

      if (!this.formData.thumbnailUrl) return Report.failure('Error', 'Thumbnail required', 'Ok')
      if (!this.formData.videoUrl) return Report.failure('Error', 'Video required', 'Ok')

      try {
        this.loading = true

        await this.$axios.$post('/video', this.formData)
        await this.$router.push('content')

        this.loading = false
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
  width: 250px;
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
