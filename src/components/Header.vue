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
      <v-toolbar app flat dense absolute class='transparent'>
        <v-spacer></v-spacer>
        <h2>{ this.appName }</h2>
        <v-spacer></v-spacer>
        <v-toolbar-items class='mt-4 pa-0'>
          {
            this.items.map((item) =>
              (<v-btn flat key={ item.name } onClick={ item.click } >
                { item.icon ? (<v-icon>{ item.icon }</v-icon>) : item.name }
              </v-btn>)
            )
          }
        </v-toolbar-items>
      </v-toolbar>
    );
  }
}
</script>

<style lang="stylus" scoped>
@import '../styles/themes.styl'



</style>
