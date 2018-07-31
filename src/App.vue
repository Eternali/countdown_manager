<script>
import Color from './util/Color.js'

import Background from './components/Background.vue'
import Footer from './components/Footer.vue';
import Header from './components/Header.vue'

export default {
  name: 'app',
  components: {
    Background,
    Footer,
    Header,
  },
  data() {
    return {
      copyYear: 2018,
      author: 'Conrad Heidebrecht',
    };
  },
  render() {
    return (
      <div id="app">
        <v-app dark>
          <Background colors={ this.$root.gradients.takeRandom().colors.map((c) => new Color({ hex: c })) } />
          <Header appName='Countdown Manager' align='right' />
          <v-content>
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

</style>
