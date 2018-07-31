<script>
export default {
  name: 'Footer',
  props: {
    copyYear: Number,
    author: String,
  },
  render() {
    return (
      <v-layout row wrap justify-center class='grey darken-4' style='padding: 0.5rem'>
        <v-flex xs12 py-3 text-xs-center color='grey lighten-1' class='footer-text'>
          &copy; {this.copyYear} - <strong>{ this.author }</strong>
        </v-flex>
      </v-layout>
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
