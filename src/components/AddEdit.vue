<script>
import { mapState, mapActions, mapGetters } from 'vuex';

import TimeButton from '@/components/TimeButton.vue'

export default {
  name: 'AddEdit',
  components: {
    TimeButton,
  },
  data() {
    return {
      showSave: false,
    };
  },
  computed: {
    ...mapState([
      'focused',
      'mainGrad',
    ]),
    ...mapGetters([
      'backgroundAt',
    ]),
  },
  methods: {
    ...mapActions([
      'addeditCountdown',
    ]),
    save() {
      this.addeditCountdown();
      this.$router.go(-1);
    },
    setTime(newTime) {
      this.focused.when.setHours(newTime.getHours());
      this.focused.when.setMinutes(newTime.getMinutes());
    }
  },
  mounted() {
    setTimeout(() => {
      this.showSave = true;
    }, 100);
  },
  render() {
    return (
      <v-content app>
        <v-layout fill-height justify-center align-center class='mx-2'>
          <v-flex xs12 sm8 md6 lg4 xl2>
            <v-layout column justify-center>
              <v-flex>
                <v-text-field
                clearable
                color={
                  `${this.backgroundAt(0, 0.8, { hex: false, reversed: true })
                    .textPrimary('grey darken-4', 'grey lighten-4')}`
                }
                light={ !this.backgroundAt(0, 0.8, { hex: false, reversed: true }).isDark() }
                dark={ this.backgroundAt(0, 0.8, { hex: false, reversed: true }).isDark() }
                label='Countdown Name'
                value={ this.focused.name }
                >
                </v-text-field>
              </v-flex>
            </v-layout>
            <div class='py-3' />
            <v-layout row justify-space-around>
              <TimeButton
                palette={ this.mainGrad.colors }
                startTime={ this.focused.when }
                onSave={ this.setTime }
              />
              <v-btn
                ripple
                class='rounded px-4'
                style={
                  `background: #${this.mainGrad ? this.mainGrad.colors[1].hex : this.$vuetify.theme.darkBg};` +
                  `color: #${this.mainGrad
                    ? this.mainGrad.colors[1].textPrimary(
                      this.$vuetify.theme.bodyOnLight,
                      this.$vuetify.theme.bodyOnDark
                    )
                    : this.$vuetify.theme.inputOnLight
                  };`
                }
              >
                { this.focused.when ? this.focused.when.toLocaleDateString() : 'Set Date' }
              </v-btn>
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
            onClick={ this.save }
          >
            <v-icon style={
              `color: ${this.backgroundAt(0.95, -0.95, { hex: false, reversed: true })
                .textPrimary(
                  this.$vuetify.theme.bodyOnLight,
                  this.$vuetify.theme.bodyOnDark
                ) };`
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
