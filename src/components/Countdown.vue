<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Countdown',
  props: {
    index: Number,
    fullscreen: Boolean,
  },
  render() {
    return (
      <v-layout>
        <v-flex
          xs1={ this.fullscreen }
          md2={ this.fullscreen }
          lg4={ this.fullscreen }
          xl6={ this.fullscreen }
        >
          <v-card class='rounded-card'>

          </v-card>
        </v-flex>
      </v-layout>
    );
  }
}
</script>

<style lang="stylus" scoped>
@import '../styles/themes.styl'

.rounded-card
  border-radius $cardrad

</style>