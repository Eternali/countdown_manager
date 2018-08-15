<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: 'AddEdit',
  data() {
    return {
      showSave: false,
    };
  },
  computed: {
    ...mapState([
      'focused',
    ]),
    ...mapGetters([
      'backgroundAt',
    ]),
  },
  methods: {
    ...mapActions([
      'addeditCountdown',
    ]),
  },
  mounted() {
    setTimeout(() => {
      this.showSave = true;
    }, 120);
  },
  render() {
    return (
      <v-content app>
        <v-layout justify-center align-center class='mx-2'>
          <v-flex xs12 sm8 md6 lg4 xl2>
            <v-layout column justify-center>
              <v-flex>
                <v-text-field
                clearable
                color={
                  `grey ${this.backgroundAt(0, 0.8, { hex: false, reversed: true })
                    .textPrimary('grey darken-2', 'grey lighten-2')}`
                }
                light={ !this.backgroundAt(0, 0.8, { hex: false, reversed: true }).isDark() }
                dark={ this.backgroundAt(0, 0.8, { hex: false, reversed: true }).isDark() }
                label='Countdown Name'
                value={ this.focused.name }
                >
                </v-text-field>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
        <v-fab-transition>
          { this.showSave ? (<v-btn
            dark
            fab
            fixed
            bottom
            right
            style={ `background: ${this.backgroundAt(0.95, -0.95, { hex: true, reversed: true })};` }
            onClick={ () => {  } }
          >
            <v-icon style={
              `color: ${this.backgroundAt(0.95, -0.95, { hex: false, reversed: true })
                .textPrimary('#111111', '#eeeeee') };`
            }>mdi-content-save</v-icon>
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
