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
          <div class='thumb'>
            <!--            <v-btn>Upload Thumnail</v-btn>-->
            <p>Upload Thumbnail</p>
            <!--            <img src='/v.png' width='100%' height='100%' />-->
          </div>
        </v-col>

        <v-col cols='12' md='4'>
          <p class=''>Video</p>
          <div class='thumb'>
            <p>Upload Video</p>
            <!--            <v-btn>Upload Video</v-btn>-->
            <!--            <img src='/v.png' width='100%' height='100%' />-->
          </div>
        </v-col>


        <v-col cols='12' class='mt-5'>
          <v-btn width='49%' color='secondary'>
            <v-icon dark left>mdi-close</v-icon>
            Cancel
          </v-btn>
          <v-btn type='submit' width='49%' dark color='primary'>
            <v-icon left>mdi-cloud-upload</v-icon>
            Upload
          </v-btn>
        </v-col>

      </v-row>

    </v-form>
  </v-container>
</template>

<script>
import rules from '../../mixins/rules'

export default {
  name: 'Upload',
  mixins: [rules],
  layout: 'channel',
  data: () => ({
    valid: false,
    videoDialog: false,
    thumbnailDialog: false,
    formData: {
      title: '',
      videoUrl: '',

    }
  }),
  head: {
    title: 'Upload Video'
  },
  methods: {
    uploadVideo() {
      // if (!this.$refs.form.validate()) return
      //
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

.thumb:hover{
  cursor: pointer;
  background: grey;
}
</style>
