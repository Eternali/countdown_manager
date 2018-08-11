<script>
export default {
  name: 'Countdown',
  props: {
    countdown: Object,
    fullscreen: {
      default: false,
      type: Boolean,
    }
  },
  computed: {

  },
  render() {
    return (
      <v-card class='mx-2 rounded-card'>
        { this.countdown ? this.wSM.toString() : 'Loading' }
      </v-card>
    );
  }
}
</script>

<style lang="stylus" scoped>
@import '../styles/themes.styl'



</style>