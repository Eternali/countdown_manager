<script>
export default {
  name: 'Countdown',
  props: {
    countdown: Object,
    now: Date,
    fullscreen: {
      default: false,
      type: Boolean,
    },
    deleteAction: Function,
    editAction: Function,
  },
  methods: {
    formatEndTime(when) {
      return when.toLocaleDateString() + ' - ' + when.toLocaleTimeString();
    },
    dateComponent(name, value, forceDraw = false, isEnd = false) {
      let aval = Math.abs(value);
      return aval !== 0 || forceDraw
        ? (<span class='unit'>
            <span class='value'>{ aval.toString().padLeft(2, '0') }</span>
            { `${name}${Math.abs(aval) > 1 ? 's' : ''}${isEnd ? '' : ' '}` }
          </span>)
        : '';
    },
    isNegative(duration) {
      return duration.seconds() < 0 ||
        duration.minutes() < 0 ||
        duration.hours() < 0 ||
        duration.days() < 0 ||
        duration.months() < 0 ||
        duration.years() < 0;
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
        { this.isNegative(diff) ? '(past)' : '' }
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
      <div onDblclick={ this.editAction }>
        <v-card
          class='rounded-card countdown'
          style={
            '--aspect-ratio: 1/1; ' +
            (this.countdown
              ? 'background: linear-gradient(' +
                `${this.countdown.gradient.angle}deg,` +
                `${ this.countdown.gradient.colors.map((c) => '#' + c.hex).join(', ') })`
              : '')
          }
        >
          <div class='centered'>{
            this.countdown
              ? <div>
                  <h3 style={ `color: ${this.correctedColor(0, 0.85)}` }>{ this.countdown.name }</h3>
                  <h5 style={ `color: ${this.correctedColor(0, 0.7)}` }>{ this.formatEndTime(this.countdown.when) }</h5>
                  <h2 style={ `color: ${this.correctedColor(0, -0.15)}` }>{ this.formatUntil(this.countdown) }</h2>
                </div>
              : <h2 style={ `color: ${this.correctedColor(0, 0)}` }>Loading</h2>
          }</div>
          <div class='deleter'>
            <v-btn
              dark
              icon
              style={ `color: ${this.correctedColor(0.9, 0.9)}` }
              onClick={ this.deleteAction }
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-card>
      </div>
    );
  }
}
</script>

<style lang="stylus" scoped>
@import '../styles/boxes.css'
@import '../styles/themes.styl'

.countdown:hover
  & .deleter
    opacity 1

.deleter
  position absolute
  opacity 0
  top 0
  right 0
  transition all 0.2s ease-in-out

.centered
  height 100%
  display flex
  justify-content center
  align-items center
  padding: 2%

h3
  font-family 'Elianto', Arial, Helvetica, sans-serif
  font-size 2.0em

h5
  font-family 'Elianto', Arial, Helvetica, sans-serif
  font-size 1em
  padding-bottom 0.4em

h2
  font-family 'CPMono', Arial, Helvetica, sans-serif
  font-size 1.5em
  letter-spacing 0.15em
  line-height 2.2em
  & span.unit
    margin-right 0.3em
  & span.value
    font-family 'CPMono', Arial, Helvetica, sans-serif
    font-size 2.3em

</style>