<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import Color from '@/util/Color.js'
import Countdowns from '@/components/Countdowns'

export default {
  name: 'Home',
  components: {
    Countdowns,
  },
  data() {
    return {
      showNew: false,
    }
  },
  computed: {
    ...mapState([
      'activeBg',
      'mainGrad',
    ]),
    ...mapGetters([
      'backgroundAt',
    ]),
  },
  methods: {
    ...mapActions([
      'attachNowUpdater',
      'generateBackground',
      'goAddEdit',
      'goHome',
      'retrieveCountdowns',
      'retrieveCountdownsLength',
    ]),
  },
  mounted() {
    (new Promise((res, rej) => {
        if (this.mainGrad) {
          res()
        } else {
          this.generateBackground({
            gradPool: this.$root.gradients,
            angle: Math.floor(Math.random() * 180),
          }).then((_) => res())
        }
    }))
      .then((_) => this.goHome())
      .then((_) => this.retrieveCountdownsLength())
      .then((length) => this.retrieveCountdowns({ gradPool: this.$root.gradients, angle: this.mainGrad.angle }))
      .then((_) => this.attachNowUpdater(window))
      .then((_) => new Promise(
        (res, rej) => {
          setTimeout(() => {
            this.showNew = true
            res()
          }, 100)
        }
      ))
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
            style={ `background: ${this.backgroundAt(0.95, -0.95, { hex: true, reversed: true })};` }
            onClick={ () => { this.goAddEdit({ router: this.$router, index: -1 }) } }
          >
            <v-icon style={
              `color: ${this.backgroundAt(0.95, -0.95, { hex: false, reversed: true })
                .textPrimary('#111111', '#eeeeee') };`
            }>mdi-plus</v-icon>
          </v-btn>) : <div/> }
        </v-fab-transition>
      </v-content>
    )
  }
}
</script>

<style lang='stylus' scoped>
@import '../styles/themes.styl'



</style>
