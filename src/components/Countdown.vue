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
    dateComponent(name, value, forceDraw = false, isEnd = false) {
      return value !== 0 || forceDraw
        ? (<span class='unit'>
            <span class='value'>{ value.toString().padLeft(2, '0') }</span>
            { `${name}${Math.abs(value) > 1 ? 's' : ''}${isEnd ? '' : ' '}` }
          </span>)
        : '';
    },
    formatUntil(countdown) {
      let diff = countdown.until(this.now);
      return (<div>
        { this.dateComponent('year', diff.years()) }
        { this.dateComponent('month', diff.months()) }
        { this.dateComponent('day', diff.days()) }
        { this.dateComponent('hour', diff.hours()) }
        { this.dateComponent('minute', diff.minutes()) }
        { this.dateComponent('second', diff.seconds(), true, true) }
      </div>);
    },
    correctedColor(x, y) {
      return this.countdown
        ? this.countdown.gradient.textAt(x, y, '#333333', '#eeeeee')
        : '#eeeeee'
    }
  },
  render() {
    return (
      <v-card class='rounded-card' style='--aspect-ratio: 1/1;'>
        <div
        class='centered'
        style={ this.countdown
          ? 'background: linear-gradient(' +
            `${this.countdown.gradient.angle}deg,` +
            `${ this.countdown.gradient.colors.map((c) => '#' + c.hex).join(', ') })`
          : '' }
        >{
          this.countdown
            ? <div>
                <h3 style={ `color: ${this.correctedColor(0, 0.85)}` }>{ this.countdown.name }</h3>
                <h5 style={ `color: ${this.correctedColor(0, 0.7)}` }>{ this.formatEndTime(this.countdown.when) }</h5>
                <h2 style={ `color: ${this.correctedColor(0, -0.15)}` }>{ this.formatUntil(this.countdown) }</h2>
              </div>
            : <h2 style={ `color: ${this.correctedColor(0, 0)}` }>Loading</h2>
        }</div>
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

h3
  font-family 'Elianto', Arial, Helvetica, sans-serif
  font-size 2.2em

h5
  font-family 'Elianto', Arial, Helvetica, sans-serif
  font-size 1.2em

h2
  font-family 'Metropolis', Arial, Helvetica, sans-serif
  font-size 1.8em
  letter-spacing 0.15em
  & span.unit
    margin-right 0.3em
  & span.value
    font-family 'Metropolis', Arial, Helvetica, sans-serif
    font-size 2.6em

</style>