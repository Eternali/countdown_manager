<script>
export default {
  name: 'TextField',
  props: {
    backgroundAt: Function,
    darkColor: String,
    lightColor: String,
    label: String,
    value: String,
  },
  render() {
    return (
      <v-text-field
        clearable
        color={
          `${this.backgroundAt({ hex: false, reversed: true })
            .textPrimary(this.darkColor, this.lightColor)}`
        }
        light={ !this.backgroundAt({ hex: false, reversed: true }).isDark() }
        dark={ this.backgroundAt({ hex: false, reversed: true }).isDark() }
        label={ this.label }
        value={ this.value }
        >
      </v-text-field>
    );
  }
}
</script>

<style lang='stylus' scoped>
@import '../styles/themes.styl'



</style>
