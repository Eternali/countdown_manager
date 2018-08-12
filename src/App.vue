<script>
import { mapState, mapActions } from 'vuex';

import Countdowns from '@/components/Countdowns.vue'
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'

export default {
  name: 'app',
  components: {
    Countdowns,
    Footer,
    Header,
  },
  data() {
    return {
      copyYear: 2018,
      author: 'Conrad Heidebrecht',
    };
  },
  computed: {
    ...mapState([
      'mainGrad',
    ]),
    bgColors: function() {
      return this.mainGrad.slice(0, -1);
    },
    bgAngle: function() {
      return this.mainGrad.slice(-1)[0];
    },
  },
  methods: {
    ...mapActions([
      'generateBackground',
      'retrieveCountdownsLength',
      'retrieveCountdowns',
      'attachNowUpdater'
    ]),
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
      .then((length) => this.retrieveCountdowns({ gradPool: this.$root.gradients }))
      .then((_) => this.attachNowUpdater(window));
  },
  render() {
    return (
      <div id="app">
        <v-app
        dark
        style={ `background: linear-gradient(${this.bgAngle}deg, ${ this.bgColors.map((c) => '#' + c.hex).join(', ') })` }
        >
          <Header appName='Countdown Manager' align='right' />
          <v-content>
            <Countdowns />
          </v-content>
          <Footer copyYear={ this.copyYear } author={ this.author } />
        </v-app>
      </div>
    );
  }
}
</script>

<style lang="stylus">
@import './styles/themes.styl'

@font-face
  font-family Anders
  src url('./assets/fonts/Anders.ttf')

@font-face
  font-family Metropolis
  src url('./assets/fonts/Metropolis_1920.otf')

@font-face
  font-family Elianto
  src url('./assets/fonts/Elianto-Regular.ttf')

*, *:after, *:before
  box-sizing border-box
*
  margin 0
  padding 0
  border 0 none
  position relative
  outline none

#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center

.rounded-card
  border-radius $cardrad

</style>
