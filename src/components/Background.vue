<script>
export default {
  name: 'Background',
  props: {
    gradient: Array,
  },
  data() {
    return {
    };
  },
  computed: {
    colors: function() {
      return this.gradient.slice(0, -1);
    },
    angle: function() {
      return this.gradient.slice(-1)[0];
    },
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
