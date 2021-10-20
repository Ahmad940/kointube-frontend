import { startCase, upperFirst } from 'lodash-es'
export default {
  filters: {
    formatDate() {

    },
    upperFirst(value) {
      return upperFirst(value)
    },
    startCase(value) {
      return startCase(value)
    },
    naira(value) {
      return `₦${value}`
    }
  },
}
