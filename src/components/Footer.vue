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
    angle() {
      return this.mainGrad.length ? this.mainGrad.slice(-1)[0] : 0;
    },
    correctedColor() {
      return this.mainGrad.length
        ? (this.angle > 90 && this.angle < 270
          ? this.mainGrad[1]
          : this.mainGrad[0]
        ).textPrimary('#333333', '#eeeeee')
        : '#eeeeee';
    },
  },
  mounted() {
    console.log(this.mainGrad);
  },
  render() {
    return (
      <v-footer height='auto' color='transparent'>
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
