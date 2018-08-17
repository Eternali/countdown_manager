<template>
<v-dialog
  ref="dialog"
  v-model="opened"
  :return-value.sync="date"
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
    {{ text }}
  </v-btn>
  <v-date-picker
    v-if="opened"
    reactive
    v-model="date"
  >
    <v-spacer />
    <v-btn flat @click="opened = false">Cancel</v-btn>
    <v-btn flat @click="save()">OK</v-btn>
  </v-date-picker>
</v-dialog>
</template>

<script>
export default {
  name: 'DateButton',
  props: {
    palette: Array,
    startDate: Date,
  },
  data() {
    return {
      opened: false,
      date: this.startDate
        ? `${this.startDate.getFullYear()}-${this.startDate.getMonth()}-${this.startDate.getDate()}`
        : null,
    };
  },
  computed: {
    btnStyle() {
      return `
        background: #${this.palette[0].hex};
        color: #${this.palette[0].textPrimary(
          this.$vuetify.theme.bodyOnLight,
          this.$vuetify.theme.bodyOnDark
        )};
      `;
    },
    text() {
      return this.date
        ? this.date.split('-', 3)[0] + '-' +
          this.date.split('-', 3)[1].padLeft(2, '0') + '-' +
          this.date.split('-', 3)[2].padLeft(2, '0')
        : 'Set Date';
    },
  },
  methods: {
    save() {
      this.$refs.dialog.save(this.date);
      this.startDate = this.startDate || new Date();
      this.startDate.setFullYear(this.date.split('-', 3)[0]);
      this.startDate.setMonth(this.date.split('-', 3)[1]);
      this.startDate.setDate(this.date.split('-', 3)[2]);
      this.$emit('save', this.startDate);
    }
  },
}
</script>

<style lang="stylus" scoped>
@import '../styles/themes.styl'



</style>
