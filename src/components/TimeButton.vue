<template>
<v-dialog
  ref="dialog"
  v-model="opened"
  :return-value.sync="time"
  persistent
  lazy
  full-width
  width="290px"
>
  <v-btn
    slot="activator"
    ripple
    class="rounded px-4"
    :style="btnStyle"
  >
    {{ this.time ? this.time : 'Set Time' }}
  </v-btn>
  <v-time-picker
    v-if="opened"
    v-model="time"
  >
    <v-spacer />
    <v-btn flat @click="opened = false">Cancel</v-btn>
    <v-btn flat @click="save()">OK</v-btn>
  </v-time-picker>
</v-dialog>
</template>

<script>
export default {
  name: 'TimeButton',
  props: {
    palette: Array,
    startTime: Date,
  },
  data() {
    return {
      opened: false,
      time: this.startTime,
    };
  },
  computed: {
    btnStyle() {
      return `background: #${this.palette[0].hex}`;
    },
    text() {
      return this.time || 'Set Time';
    },
  },
  methods: {
    save() {
      this.$refs.dialog.save(this.time);
      this.$emit('save', this.time);
    }
  },
}
</script>

<style lang="stylus" scoped>
@import '../styles/themes.styl'



</style>
