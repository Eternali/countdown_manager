<script>
import { mapState } from 'vuex'

export default {
  name: 'Header',
  props: {
    appName: String,
    align: String,
  },
  data() {
    return {
      items: [
        {
          name: 'settings',
          icon: 'mdi-settings',
          click: () => {  },
        },
        {
          name: 'about',
          icon: 'mdi-information',
          click: () => {  },
        },
      ],
    };
  },
  computed: {
    ...mapState([
      'mainGrad',
    ]),
    correctedColor() {
      return this.mainGrad.length ? this.mainGrad[0].textPrimary('#333333', '#eeeeee') : '#eeeeee';
    },
  },
  methods: {

  },
  render() {
    return (
      <div>
        <v-toolbar app flat absolute class='transparent'>
          <v-spacer></v-spacer>
          <h2
            style={ `color: ${this.correctedColor}` }
          >
            { this.appName }
          </h2>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-toolbar app flat absolute class='transparent'>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            {
              this.items.map((item) => item.icon
                ? (<v-btn left flat
                  key={ item.name }
                  onClick={ item.click }
                  style={ `color: ${this.correctedColor}` }
                >
                  <v-icon>{ item.icon }</v-icon>
                </v-btn>)
                : (<v-btn flat ripple
                  key={ item.name }
                  onClick={ item.click }
                  style={ `color: ${this.correctedColor}` }
                >
                  item.name
                </v-btn>)
              )
            }
          </v-toolbar-items>
        </v-toolbar>
      </div>
    );
  }
}
</script>

<style lang="stylus" scoped>
@import '../styles/themes.styl'



</style>
