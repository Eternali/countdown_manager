<script>
export default {
  name: 'TextField',
  props: {
    backgroundAt: Function,
    clearable: {
      type: Boolean,
      default: () => false
    },
    darkColor: String,
    lightColor: String,
    label: String,
    type: String,
    rules: {
      type: Array,
      default: () => [  ]
    },
    value: String,
  },
  render() {
    return (
      <v-text-field
        clearable={ this.clearable }
        color={
          `${this.backgroundAt({ hex: false, reversed: true })
            .textPrimary(this.darkColor, this.lightColor)}`
        }
        light={ !this.backgroundAt({ hex: false, reversed: true }).isDark() }
        dark={ this.backgroundAt({ hex: false, reversed: true }).isDark() }
        label={ this.label }
        type={ this.type }
        rules={ this.rules }
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
