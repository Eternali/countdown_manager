<script>
import { mapState, mapActions } from 'vuex';

import Color from '@/util/Color.js'
import Countdowns from '@/components/Countdowns.vue'
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'

export default {
  name: 'Home',
  components: {
    Countdowns,
    Footer,
    Header,
  },
  data() {
    return {
      showNew: false,
    };
  },
  computed: {
    ...mapState([
      'mainGrad',
    ]),
  },
  methods: {
    ...mapActions([
      'generateBackground',
      'retrieveCountdownsLength',
      'retrieveCountdowns',
      'attachNowUpdater'
    ]),
    backgroundAt(x, y, hex = true, reversed = false) {
      if (!('colorAt' in this.mainGrad)) return new Color({ hex: '333333' });
      let color = this.mainGrad.colorAt(x, y, reversed);
      return hex ? `#${color.hex}` : color;
    },
  },
  mounted() {
    this.retrieveCountdownsLength()
      .then((length) => {
        this.generateBackground({
          gradPool: this.$root.gradients,
          angle: Math.floor(Math.random() * 180),
        });
        return length;
      })
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
      <v-app
        dark
        style={
            this.mainGrad.colors
              ? ('background: linear-gradient(' +
                `${this.mainGrad.angle}deg, ${ this.mainGrad.colors.map((c) => '#' + c.hex).join(', ') })`)
              : ''
          }
      >
        <Header appName='Countdown Manager' align='right' />
        <v-content>
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
        <Footer copyYear={ this.copyYear } author={ this.author } />
      </v-app>
    );
  }
}
</script>

<style lang="stylus" scoped>
@import '../styles/themes.styl'



</style>
