<script>
import { mapState, mapActions } from 'vuex';

import Color from '@/util/Color.js'
import Countdowns from '@/components/Countdowns.vue'

export default {
  name: 'Home',
  components: {
    Countdowns,
  },
  data() {
    return {
      showNew: false,
    };
  },
  computed: {
    ...mapState([
      'activeBg',
      'mainGrad',
    ]),
  },
  methods: {
    ...mapActions([
      'attachNowUpdater',
      'generateBackground',
      'goHome',
      'retrieveCountdowns',
      'retrieveCountdownsLength',
    ]),
    backgroundAt(x, y, hex = true, reversed = false) {
      if (!('colorAt' in this.activeBg)) return new Color({ hex: '333333' });
      let color = this.activeBg.colorAt(x, y, reversed);
      return hex ? `#${color.hex}` : color;
    },
  },
  mounted() {
    this.generateBackground({
      gradPool: this.$root.gradients,
      angle: Math.floor(Math.random() * 180),
    })
      .then((_) => this.goHome())
      .then((_) => this.retrieveCountdownsLength())
      .then((length) => this.retrieveCountdowns({ gradPool: this.$root.gradients, angle: this.mainGrad.angle }))
      .then((_) => this.attachNowUpdater(window))
      .then((_) => new Promise(
        (res, rej) => {
          setTimeout(() => {
            this.showNew = true;
            res();
          }, 500);
        }
      ));
  },
  render() {
    return (
      <v-content app>
        <Countdowns />
        <v-fab-transition>
          { this.showNew ? (<v-btn
            dark
            fab
            fixed
            bottom
            right
            style={ `background: ${this.backgroundAt(0.95, -0.95, true, true)};` }
            onClick={ () => { this.$router.push('new'); } }
          >
            <v-icon style={
              `color: ${this.backgroundAt(0.95, -0.95, false, true).textPrimary('#111111', '#eeeeee') };`
            }>mdi-plus</v-icon>
          </v-btn>) : <div/> }
        </v-fab-transition>
      </v-content>
    );
  }
}
</script>

<style lang="stylus" scoped>
@import '../styles/themes.styl'



</style>
