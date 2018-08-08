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
      return this.childIterable.length
    },
    childIterable() {
      return [...Array(this.children ? this.children.length : this.count)];
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
      let classes = '';
      
      if (indice < this.crossAxisCount) classes += `mt-0 mb-${this.spaceY}`;
      else if (indice >= this.length - this.crossAxisCount) classes += `${this.spaceY} mb-0`;
      else classes += `my-${this.spaceY}`;

      if (indice % this.crossAxisCount === 0) classes += `ml-0 mr-${this.spaceX}`;
      else if (indice % this.crossAxisCount === this.crossAxisCount - 1) classes += `ml-${this.spaceX} mr-0`;
      else classes += `mx-${this.spaceX}`;

      return classes;
    }
  },
  render() {
    return (
      <v-layout align-start justify-start row wrap class='ma-0 pa-0'>
        { this.childIterable.map((_, i) => (
          <div class={ this.getMargins(i) }>{ this.getChild(i) }</div>
          )) }
      </v-layout>
    );
  }
}
</script>

<style lang="stylus" scoped>
@import '../styles/themes.styl'



</style>
