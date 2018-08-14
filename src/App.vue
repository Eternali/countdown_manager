<script>
import { mapState } from 'vuex';

import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'

export default {
  name: 'app',
  components: {
    Footer,
    Header,
  },
  computed: {
    ...mapState([
      'activeBg',
    ]),
  },
  render() {
    return (
      <div id="app">
        <v-app
          dark
          style={
            this.activeBg && this.activeBg.colors
              ? ('background: linear-gradient(' +
                `${this.activeBg.angle}deg, ${ this.activeBg.colors.map((c) => '#' + c.hex).join(', ') })`)
              : ''
          }
        >
          <Header header='Countdown Manager' align='right' />
          <router-view></router-view>
          <Footer copyYear={ this.$root.copyYear } author={ this.$root.author } />
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
