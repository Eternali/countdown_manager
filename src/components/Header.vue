<script>
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
  methods: {

  },
  render() {
    return (
      <div>
        <v-toolbar app flat absolute class='transparent'>
          <v-spacer></v-spacer>
          <h2>{ this.appName }</h2>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-toolbar app flat absolute class='transparent'>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            {
              this.items.map((item) =>
                (<v-btn fab flat left ripple
                  icon={ item.icon !== undefined }
                  key={ item.name }
                  onClick={ item.click }
                >
                  { item.icon ? (<v-icon>{ item.icon }</v-icon>) : item.name }
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
