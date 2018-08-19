<script>
import { mapState } from 'vuex';

import LoginDialog from '@/components/LoginDialog.vue';

export default {
  name: 'Header',
  props: {
    header: String,
    align: String,
  },
  components: {
    LoginDialog,
  },
  data() {
    return {
      items: [
        {
          name: 'login',
          builder: (isToolbar, colHex) => <LoginDialog
            keyName='login'
            isToolbar={ isToolbar }
            btnColor={ colHex }
            showGreeting={ false }
            gradient={ this.activeBg }
          />
        },
        {
          name: 'settings',
          icon: 'mdi-settings',
          click() {

          },
        },
        {
          name: 'about',
          icon: 'mdi-information',
          click() {
            
          },
        },
      ],
    };
  },
  computed: {
    ...mapState([
      'activeBg',
    ]),
  },
  methods: {
    correctedColor(x, y) {
      return this.activeBg && this.activeBg.colors
        ? this.activeBg.textAt(
          x,
          y,
          this.$vuetify.theme.bodyOnLight,
          this.$vuetify.theme.bodyOnDark,
        ) : this.$vuetify.theme.bodyOnDark;
    },
    renderToolbarItem(item, i) {
      let colHex = this.correctedColor(0.9 - 0.05 * i, 0.9);
      return item.builder
        ? item.builder(true, colHex)
        : item.icon
          ? (<v-btn left flat
            key={ item.name }
            onClick={ item.click }
            style={ `color: ${colHex}` }
          >
            <v-icon>{ item.icon }</v-icon>
          </v-btn>)
          : (<v-btn flat ripple
            key={ item.name }
            onClick={ item.click }
            style={ `color: ${colHex}` }
          >
            item.name
          </v-btn>);
    },
    renderMenuItem(item, i) {
      return item.builder
        ? item.builder(false, '#ffffff')
        : (
          <v-list-tile key={ item.name } onClick={ item.click }>
            <v-list-tile-avatar><v-icon>{ item.icon || '' }</v-icon></v-list-tile-avatar>
            <v-list-tile-title>{ item.name.toUpperCase() }</v-list-tile-title>
          </v-list-tile>
        );
    },
  },
  render() {
    return (
      <div>
        <v-toolbar app flat absolute class='transparent'>
          <v-spacer></v-spacer>
          <h2
            style={ `color: ${this.correctedColor(0, 0.9)}` }
          >
            { this.header }
          </h2>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-toolbar app flat absolute class='transparent'>
          { this.$routerHistory.hasPrevious()
            ? <v-btn flat icon
                onClick={ () => this.$router.go(-1) }
                style={ `color: ${this.correctedColor(-0.9, 0.9)}` }
              >
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn>
            : <div />
          }
          <v-spacer></v-spacer>
          <v-toolbar-items class='hidden-sm-and-down'>
            {
              this.items.map((item, i) => this.renderToolbarItem(item, i))
            }
          </v-toolbar-items>
          <v-menu
            transition='slide-y-transition'
            bottom
            left
            class='hidden-md-and-up'
          >
            <v-btn
              slot='activator'
              icon
              style={ `color: ${this.correctedColor(0.95, 0.95)};` }
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
            <v-list>{
              this.items.map((item, i) => this.renderMenuItem(item, i))
            }</v-list>
          </v-menu>
        </v-toolbar>
      </div>
    );
  }
}
</script>

<style lang='stylus' scoped>
@import '../styles/themes.styl'



</style>
