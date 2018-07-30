<script>
import Background from './components/Background.vue'
import Header from './components/Header.vue'

export default {
  name: 'app',
  components: {
    Background,
    Header
  },
  data() {
    return {
      copyrite: '2018',
    };
  },
  render() {
    return (
      <div id="app">
        <v-app dark>
          <Background />
          <Header appName='Countdown Manager' align='right' />
          <v-content>
          </v-content>
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
