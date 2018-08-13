<script>
import { mapState } from 'vuex';

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
      return this.mainGrad.colors
        ? this.mainGrad.textAt(0, 0.9, '#333333', '#eeeeee')
        : '#eeeeee';
    },
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
          <v-toolbar-items class='hidden-sm-and-down'>
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
          <v-menu transition='slide-y-transition' bottom left class='hidden-md-and-up'>
            <v-btn
              slot='activator'
              dark
              icon
              style={ `color: ${this.correctedColor}` }
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
            <v-list>{
              this.items.map((item, i) => (
                <v-list-tile key={ item.name } onClick={ item.click }>
                  <v-list-tile-avatar><v-icon>{ item.icon || '' }</v-icon></v-list-tile-avatar>
                  <v-list-tile-title>{ item.name.toUpperCase() }</v-list-tile-title>
                </v-list-tile>
              ))
            }</v-list>
          </v-menu>
        </v-toolbar>
      </div>
    );
  }
}
</script>

<style lang="stylus" scoped>
@import '../styles/themes.styl'



</style>
