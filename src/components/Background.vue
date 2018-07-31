<script>
export default {
  name: 'Background',
  props: {
    colors: Array,
  },
  data() {
    return {
      angle: Math.floor(Math.random() * 180)
    };
  },
  render() {
    return (
      <div
        class='root'
        style={ `background: linear-gradient(${this.angle}deg, ${ this.colors.map((c) => '#' + c.hex).join(', ') })` }
      >
      </div>
    );
  }
}
</script>

<style lang="stylus" scoped>
div.root
  position absolute
  width 100vw
  height 100vh
</style>
