<script>
export default {
  name: 'GridView',
  props: {
    spaceX: {
      default: 0,
      type: Number,
    },
    spaceY: {
      defaulit: 0,
      type: Number
    },
    crossAxisCount: Number,
    children: Array,
    count: Number,
    builder: Function,
  },
  computed: {
    length() {
      return this.childIterable.length;
    },
    childIterable() {
      return [...Array(this.children ? this.children.length : this.count)];
    },
    elwidth() {
      return (100 / this.crossAxisCount) - (this.spaceX * (this.crossAxisCount - 1));
    }
  },
  methods: {
    getChild(indice) {
      if (this.children) {
        return this.children[indice];
      } else {
        return this.builder(indice);
      }
    },
    getMargins(indice) {
      let margins = [0, 0, 0, 0]; // top, right, bottom, left
      
      if (indice < this.crossAxisCount) {
        margins[2] += this.spaceY;
      } else if (indice >= this.length - this.crossAxisCount) {
        margins[0] += this.spaceY;
      } else {
        margins[0] += this.spaceY;
        margins[2] += this.spaceY;
      }

      if (indice % this.crossAxisCount === 0) {
        margins[1] += this.spaceX;
      } else if (indice % this.crossAxisCount === this.crossAxisCount - 1) {
        margins[3] += this.spaceX;
      } else {
        margins[3] += this.spaceX;
        margins[1] += this.spaceX;
      }

      console.log(`${indice}: ${margins.join('% ')}`);
      return margins.join('% ') + '%;';
    }
  },
  render() {
    return (
      <v-layout align-start justify-start row wrap class='ma-0 pa-0'>
        { this.childIterable.map((_, i) => (
          <div
            style={ `width: ${this.elwidth}%; margin: ${this.getMargins(i)}` }
          >
            { this.getChild(i) }
          </div>
          )) }
      </v-layout>
    );
  }
}
</script>

<style lang="stylus" scoped>
@import '../styles/themes.styl'



</style>
