<template>
  <v-content app>
    <v-container align-content={{ true }}>
      <v-radio-group v-model='color'>
        <v-radio
          v-for='(label, mode) of ColorMode'
          :key='mode'
          :label='label'
          :value='label'
          color='purple'
          background-color='pink'
        />
      </v-radio-group>
    </v-container>
  </v-content>
</template>


<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import { ColorMode } from '@/util/Color'

export default {
  name: 'Settings',
  data() {
    return {
      ColorMode
    }
  },
  computed: {
    ...mapState([
      'colorMode'
    ]),
    color: {
      get() { console.log(this.colorMode); return this.colorMode },
      set(v) {
        this.setColorMode(v)
        return this.colorMode
      }
    }
  },
  methods: {
    ...mapMutations([
      'setColorMode'
    ])
  }
}
</script>

<style  lang='stylus' scoped>
@import '../styles/themes.styl'



</style>