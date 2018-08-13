<script>
import { mapState } from 'vuex';

export default {
  name: 'Footer',
  props: {
    copyYear: Number,
    author: String,
  },
  computed: {
    ...mapState([
      'mainGrad',
    ]),
    correctedColor() {
      return this.mainGrad.colors
        ? this.mainGrad.textAt(0, -0.9, '#333333', '#eeeeee')
        : '#eeeeee';
    },
  },
  render() {
    return (
      <v-footer height='auto' color='transparent' class='mt-1'>
        <v-flex xs12 py-3 text-xs-center style={ `color: ${this.correctedColor}` } class='footer-text'>
          &copy; {this.copyYear} - <strong>{ this.author }</strong>
        </v-flex>
      </v-footer>
    );
  }
}
</script>

<style lang="stylus" scoped>
@import '../styles/themes.styl'

.footer-text
  letter-spacing 0.2em
  font-weight normal

</style>
