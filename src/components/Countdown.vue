<script>
export default {
  name: 'Countdown',
  props: {
    countdown: Object,
    now: Date,
    fullscreen: {
      default: false,
      type: Boolean,
    }
  },
  methods: {
    formatEndTime(when) {
      return when.toLocaleDateString() + ' - ' + when.toLocaleTimeString();
    },
    dateComponent(name, value, isEnd = false) {
      return value > 0 ? `${value.toString().padLeft(2, '0')}${name}${value > 1 ? 's' : ''}${isEnd ? '' : ' '}` : '';
    },
    formatUntil(countdown) {
      let {isPast, diff} = countdown.until(this.now);
      return this.dateComponent('year', diff.getFullYear() - 1970) + // for epoch
        this.dateComponent('month', diff.getMonth()) +
        this.dateComponent('day', diff.getDate()) +
        this.dateComponent('hour', diff.getHours()) +
        this.dateComponent('minute', diff.getMinutes()) +
        this.dateComponent('second', diff.getSeconds(), true);
    },
  },
  render() {
    return (
      <v-card class='rounded-card' style='--aspect-ratio: 1/1;'>
        <div class='centered'>
          {
            this.countdown
              ? <div>
                  <h3>{ this.countdown.name }</h3>
                  <h5>{ this.formatEndTime(this.countdown.when) }</h5>
                  <h2>{ this.formatUntil(this.countdown) }</h2>
                </div>
              : <h2>Loading</h2>
          }
        </div>
      </v-card>
    );
  }
}
</script>

<style lang="stylus" scoped>
@import '../styles/boxes.css'
@import '../styles/themes.styl'

.centered
  height 100%
  display flex
  justify-content center
  align-items center
  padding: 2%

</style>