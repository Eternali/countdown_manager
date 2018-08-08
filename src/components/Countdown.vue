<script>
import { mapGetters } from 'vuex';

import GridView from './GridView.vue';

export default {
  name: 'Countdown',
  components: {
    GridView,
  },
  props: {
    id: String,
    fullscreen: {
      default: false,
      type: Boolean,
    }
  },
  computed: {
    ...mapGetters([
      'countdown',
    ]),
    cd() {
      return this.id ? this.countdown({ id: this.id }) : null;
    },
  },
  render() {
    return (
      <v-layout align-start justify-start row wrap class='my-0 px-2 pa-0'>
        <v-flex
          xs1={ this.fullscreen }
          md2={ this.fullscreen }
          lg4={ this.fullscreen }
          xl6={ this.fullscreen }
        >
          <v-card class='mx-2 rounded-card'>
            { this.id ? this.cd.name : 'Loading' }
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