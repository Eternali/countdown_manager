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
    columns() {
      return Math.ceil(this.length / this.crossAxisCount);
    }
  },
  methods: {
    getChild(index) {
      if (this.children) {
        return this.children[index];
      } else {
        return this.builder(index);
      }
    },
    getMargins(index) {
      let margins = [0, 0, 0, 0]; // top, right, bottom, left
      
      if (index < this.crossAxisCount) {
        margins[2] += this.spaceY;
      } else if (index >= this.length - this.crossAxisCount) {
        margins[0] += this.spaceY;
      } else {
        margins[0] += this.spaceY;
        margins[2] += this.spaceY;
      }

      if (index % this.crossAxisCount === 0) {
        margins[1] += this.spaceX;
      } else if (index % this.crossAxisCount === this.crossAxisCount - 1) {
        margins[3] += this.spaceX;
      } else {
        margins[3] += this.spaceX;
        margins[1] += this.spaceX;
      }

      return margins.join('% ') + '%';
    }
  },
  render() {
    return (
      <v-layout align-start justify-start column class='ma-0 pa-0' style='width: 100%'>
        {
          [...Array(this.columns)].map((_, c) => (
            <v-layout align-start justify-start row class='ma-0 pa-0' style='width: 100%'>
              {
                [...Array(this.crossAxisCount)].map((_, r) => {
                  let index = c * this.crossAxisCount + r;
                  return (<v-flex style={ `width: 100%; margin: ${this.getMargins(index)};` }>
                    { index < this.length
                      ? this.getChild(index)
                      : null
                    }
                  </v-flex>);
                })
              }
            </v-layout>
          ))
        }
      </v-layout>
    );
  }
}
</script>

<style lang="stylus" scoped>
@import '../styles/themes.styl'



</style>
