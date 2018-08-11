<script>
import { mapState, mapActions } from 'vuex';

import Countdown from './Countdown.vue';
import GridView from './GridView.vue';

export default {
  name: 'Countdowns',
  props: {

  },
  components: {
    Countdown,
    GridView,
  },
  computed: {
    ...mapState([
      'countdowns',
    ]),
    gridSize() {
      if (this.wXS) return 1;
      else if (this.wSM) return 2;
      else if (this.wMD) return 3;
      else if (this.wLG) return 5;
      else if (this.wXL) return 6;
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
        spaceX={ 0.5 }
        spaceY={ 1.0 }
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
