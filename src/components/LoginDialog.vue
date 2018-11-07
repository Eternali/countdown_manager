<template>
<v-dialog
  ref='dialog'
  v-model='opened'
  lazy
  full-width
  max-width='420px'
>
  <div v-if='noBody' />
  <v-btn
    v-if='isToolbar'
    slot='activator'
    left
    flat
    :key='keyName'
    :style='btnStyle'
  >
    <v-icon large style='padding-top: 25%; padding-bottom: 25%;'>{{ icon }}</v-icon>
  </v-btn>
  <v-list-tile v-if='isDropdown' slot='activator' :key='keyName' @click='empty'>
    <v-list-tile-avatar>
      <v-icon>{{ icon }}</v-icon>
    </v-list-tile-avatar>
    <v-list-tile-title>
      {{ displayName.toUpperCase() }}
    </v-list-tile-title>
  </v-list-tile>
  <v-layout
    v-if='opened'
    column
    justify-center
    class='px-3 py-3 login'
    :style='mainStyle'
  >
    <h2 v-if='showGreeting'>
      <span class='bigger'>Hi there!</span><br />
      Register with your email so your countdowns can be synced across devices.<br />
      <span class='smaller'>(You can always complete this later from the menu in the top right.)</span>
    </h2>
    <v-flex xs12 class='pt-2 pb-1'>
      <TextField
        :backgroundAt='backgroundCurry(0, -0.2, gradient)'
        darkColor='grey darken-4'
        lightColor='grey lighten-4'
        label='Email'
        type='email'
        :rules='emailRules'
        :value='email'
      />
    </v-flex>
    <v-flex xs12 class='pt-1 pb-2'>
      <TextField
        :backgroundAt='backgroundCurry(0, -0.4, gradient)'
        darkColor='grey darken-4'
        lightColor='grey lighten-4'
        label='Password'
        type='password'
        :rules='passwordRules'
        :value='password'
      />
    </v-flex>
    <v-layout row align-center justify-end>
      <v-spacer />
      <v-btn flat @click='opened = false' :style='cancelColor'>Cancel</v-btn>
      <v-btn flat @click='login' :style='cancelColor'>
        <strong>Confirm</strong>
      </v-btn>
    </v-layout>
  </v-layout>
</v-dialog>
</template>

<script>
import { mapGetters } from 'vuex';
import { sha3_256 } from 'js-sha3';
import PasswordValidator from 'password-validator';

import TextField from '@/components/TextField.vue';

export default {
  name: 'LoginDialog',
  props: {
    keyName: String,
    btnColor: String,
    gradient: Object,
    isToolbar: Boolean,
    showGreeting: Boolean,
    initiallyOpen: Boolean,
    bindOpen: {
      type: Boolean,
      default: null,
    },
  },
  components: {
    TextField,
  },
  data() {
    return {
      displayName: 'LOGIN',
      icon: 'mdi-account',
      selfOpened: this.initiallyOpen || false,
      email: '',
      password: '',
      isDropdown: this.isToolbar === false,
      noBody: this.isToolbar === null,
      emailRules: [
        (v) => !!v || 'An email is required.',
        (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Invalid email.'
      ],
      passwordRules: [
        (v) => v.length > 6 || 'Must be greater than 6 characters',
        (v) => /[0-9]+/.test(v) || 'Must contain at least one digit.'
      ],
    };
  },
  computed: {
    ...mapGetters([
      'backgroundAt',
    ]),
    opened: {
      get() {
        if (this.bindOpen !== null) return this.bindOpen;
        return this.selfOpened;
      },
      set(isOpened) {
        this.selfOpened = isOpened;
        if (this.bindOpen !== null)
          this.$emit('requestChange', this.selfOpened);
      }
    },
    btnStyle() {
      return `color: ${this.btnColor};`;
    },
    mainStyle() {
      return this.gradient && this.gradient.colors
        ? 'background: linear-gradient(' +
          `${this.gradient.angle}deg, ` +
          `${this.gradient.colors.map((c) => '#' + c.hex).join(', ')})`
        : `background: ${this.$vuetify.theme.darkBg}`;
    },
    cancelColor() {
      return `color: ${this.correctedColor(-0.25, -0.4)};`;
    },
    hashedPassword() {
      return sha3_256(this.password);
    }
  },
  methods: {
    empty() {  },
    correctedColor(x, y, darkOverride, lightOverride) {
      return this.gradient && this.gradient.colors
        ? this.gradient.textAt(
          x,
          y,
          darkOverride || this.$vuetify.theme.bodyOnLight,
          lightOverride || this.$vuetify.theme.bodyOnDark,
        ) : this.$vuetify.theme.bodyOnDark;
    },
    backgroundCurry(x, y, gradientOverride) {
      return ({ hex, reversed }) => this.backgroundAt(x, y, { hex, reversed, gradientOverride });
    },
    login() {
      
      this.opened = false;
    },
  },
}
</script>

<style lang='stylus' scoped>
@import '../styles/themes.styl'

.bigger
  font-size 1.2em

.smaller
  font-size 0.8em

</style>
