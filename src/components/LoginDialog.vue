<template>
<div>
  <v-dialog
    v-if="isToolbar"
    ref="dialog"
    v-model="opened"
    lazy
    full-width
    width="290px"
  >
    <v-btn
      slot="activator"
      left
      flat
      :key="keyName"
      :style="style"
    >
      <v-icon large style="padding-top: 25%; padding-bottom: 25%;">{{ icon }}</v-icon>
    </v-btn>
    <v-layout v-if="opened" column justify-center align-center>
      <v-flex>
        <v-text-field
        clearable
        label='Email'
        >
        </v-text-field>
      </v-flex>
    </v-layout>
  </v-dialog>
  <div v-if="!isToolbar">
    <v-dialog
      ref="dialog"
      v-model="opened"
      lazy
      full-width
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-list-tile slot="activator" :key="keyName" @click="test">
        <v-list-tile-avatar>
          <v-icon>{{ icon }}</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-title>
          {{ displayName.toUpperCase() }}
        </v-list-tile-title>
      </v-list-tile>
      <v-layout column v-if="opened">
        test
      </v-layout>
    </v-dialog>
  </div>
</div>
</template>

<script>
export default {
  name: 'LoginDialog',
  props: {
    keyName: String,
    color: String,
    isToolbar: Boolean,
    showGreeting: Boolean,
  },
  data() {
    return {
      displayName: 'LOGIN',
      icon: 'mdi-account',
      opened: false,
    };
  },
  computed: {
    style() {
      return `color: ${this.color};`;
    },
  },
  methods: {
    test() {},
    body() {
      return (
        <v-layout column justify-center align-center>
          {
            this.showGreeting
              ? <h2></h2>
              : null
          }
          <v-flex>
            <v-text-field
            clearable
            label='Email'
            >
            </v-text-field>
          </v-flex>
        </v-layout>
      );
    },
  },
}
</script>

<style lang="stylus" scoped>
@import '../styles/themes.styl'



</style>
