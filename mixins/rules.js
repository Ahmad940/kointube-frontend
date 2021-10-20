export default {
  name: 'rules',
  data() {
    return {
      fieldRequired: (value) => !!value || 'Required.',
      combobox: (value ) => !!value?.name || 'Required.',
      switchValidator: (v) => !!v || 'Must accept terms and condition',
      min: (v)  => v.length >= 8 || 'Min 8 characters',
      emailRule: (v) => /.+@.+\..+/.test(v) || 'Invalid e-mail',
      phoneValidation: (v) =>
        v?.length === 11 || 'Number must be 11 digits',
      passwordMatch: (value, password) =>
        value === password || 'Password does not match',
      genderRule: (value) =>
        value === 'male' || value === 'female' || 'Gender must be selected',
      uploadFileVal: (value) =>
        !value ||
        value.size < 2000000 ||
        'Avatar size should be less than 2 MB!',
    }
  },
}
