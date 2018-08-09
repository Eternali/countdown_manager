<script>
import { mapState, mapActions } from 'vuex';
import { breakpoint } from 'vuetify/src/components/Vuetify/mixins/breakpoint.ts';
import { breakpoints } from '@/vuetify-helpers.js'

import Countdown from './Countdown.vue';
import GridView from './GridView.vue';

export default {
  name: 'Countdowns',
  props: {

  },
  mixins: [
    breakpoint,
  ],
  components: {
    Countdown,
    GridView,
  },
  computed: {
    ...mapState([
      'countdowns',
    ]),
    gridSize() {
      if (breakpoints.xs) return 1;
      else if (breakpoints.sm) return 2;
      else if (breakpoints.md) return 3;
      else if (breakpoints.lg) return 5;
      else if (breakpoints.xl) return 6;
      else return 1;
    },
  },
  methods: {
    buildCountdown(indice) {
      return (
        <Countdown countdown={ this.countdowns[indice] } fullscreen={ false } />
      );
    }
  },
  render() {
    return (
      <GridView
        spaceX={ 1 }
        spaceY={ 1 }
        crossAxisCount={ this.gridSize }
        count={ this.countdowns.length }
        builder={ this.buildCountdown }
      />
    );
  }
}
</script>

<style lang="stylus" scoped>
@import '../styles/themes.styl'



</style>
