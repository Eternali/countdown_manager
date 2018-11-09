<template>
<v-text-field
  v-model='value'
  :clearable='clearable'
  :color='background.textPrimary(this.darkColor, this.lightColor)'
  :light='!background.isDark()'
  :dark='background.isDark()'
  :label='label'
  :rules='rules'
  :append-icon='type === "password" ? show ? "visibility_off" : "visibility" : ""'
  :type='show && type === "password" ? "text" : type'
  @click:append='show = !show'
>
</v-text-field>
</template>


<script>
export default {
  name: 'TextField',
  props: {
    backgroundAt: Function,
    clearable: {
      type: Boolean,
      default: () => false
    },
    darkColor: String,
    lightColor: String,
    label: String,
    type: String,
    rules: {
      type: Array,
      default: () => [  ]
    },
    value: String,
  },
  data() {
    return {
      model: this.value,
      show: false
    }
  },
  computed: {
    model: {
      get(v) { return v },
      set(v) {
        
      }
    }
  },
  computed: {
    background() {
      return this.backgroundAt({ hex: false, reversed: true })
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '../styles/themes.styl'



</style>
