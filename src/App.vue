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
      .then((length) => this.retrieveCountdowns({ gradPool: this.$root.gradients, angle: this.mainGrad.angle }))
      .then((_) => this.attachNowUpdater(window));
  },
  render() {
    return (
      <div id="app">
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
@import url(https://fonts.googleapis.com/css?family=Orbitron)

@font-face
  font-family Anders
  src url('./assets/fonts/Anders.ttf')

@font-face
  font-family Metropolis
  src url('./assets/fonts/Metropolis_1920.otf')

@font-face
  font-family Elianto
  src url('./assets/fonts/Elianto-Regular.ttf')

@font-face
  font-family CPMono
  src url('./assets/fonts/CPMono_Plain.otf')

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
