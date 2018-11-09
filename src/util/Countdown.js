import moment from 'moment'

class Countdown {

  constructor({
    id = Countdown.generateID(),
    name = '',
    image,
    gradient = [],
    when = new Date(),
  }) {
    this.id = id
    this.name = name
    this.image = image
    this.gradient = gradient
    this.when = when
  }

  /**
   * Calculates duration between the timer and now using moment.js.
   * @param {Date} now Date of when 'now' should be
   * @returns {moment.duration} Measure of the time between this countdown's completion and now
   */
  until(now) {
    let mnow = moment(now)
    let mwhen = moment(this.when)
    return moment.duration(mwhen.diff(mnow))
  }

  /**
   * Generates a unique ID based on the process id, current time, and an element of randomness.
   * Based on the NPM library found at https://www.npmjs.com/package/uniqid
   * @param {Integer} length Length of ID to generate
   * @returns {String} unique id
   */
  static generateID(length = 32) {
    let secLength = Math.floor(length * (2/5))
    let pid = process && process.pid ? process.pid.toString(36) : ''
    let getNow = (last) => {
      let now = Date.now()
      return now > last ? now : now + 1
    }
    let id = (pid || Math.randomStr(secLength)).substr(0, secLength) +
      getNow(0).toString().substr(0, secLength)
    return id + Math.randomStr(length - id.length)
  }

}

export default Countdown
