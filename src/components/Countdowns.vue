<script>
import { mapState, mapActions } from 'vuex'

import Countdown from './Countdown'
import GridView from './GridView'

export default {
  name: 'Countdowns',
  components: {
    Countdown,
    GridView,
  },
  computed: {
    ...mapState([
      'countdowns',
      'now',
    ]),
    gridSize() {
      if (this.wXS) return 1
      else if (this.wSM) return 2
      else if (this.wMD) return 3
      else if (this.wLG) return 4
      else if (this.wXL) return 5
      else return 1
    },
  },
  methods: {
    ...mapActions([
      'deleteCountdown',
      'goAddEdit',
    ]),
    buildCountdown(index) {
      return (
        <Countdown
          countdown={ this.countdowns[index] }
          now={ this.now }
          fullscreen={ false }
          deleteAction={ this.deleteCountdown }
          editAction={ () => { this.goAddEdit({ router: this.$router, index }) } }
        />
      )
    }
  },
  render() {
    return (
      <v-layout class='mx-2'>
        <GridView
          spaceX={ 0.5 }
          spaceY={ 0.5 }
          crossAxisCount={ this.gridSize }
          count={ this.countdowns.length }
          builder={ this.buildCountdown }
        />
      </v-layout>
    )
  }
}
</script>

<style lang='stylus' scoped>
@import '../styles/themes.styl'



</style>
