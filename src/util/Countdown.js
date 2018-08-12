class Countdown {

  constructor({
    id,
    name,
    image,
    gradient,
    when,
  }) {
    this.id = id || Countdown.generateID();
    this.name = name;
    this.image = image;
    this.gradient = gradient;
    this.when = when;
  }

  until(now) {
    let diff = new Date(null);
    let ms = this.when - now;
    let isPast = ms < 0;
    diff.setTime(Math.abs(ms));
    return {isPast, diff };
  }

  /**
   * Generates a unique ID based on the process id, current time, and an element of randomness.
   * Based on the NPM library found at https://www.npmjs.com/package/uniqid
   * @param {Integer} length Length of ID to generate
   * @returns {String} unique id
   */
  static generateID(length = 32) {
    let secLength = Math.floor(length * (2/5));
    let pid = process && process.pid ? process.pid.toString(36) : '';
    let getNow = (last) => {
      let now = Date.now();
      return now > last ? now : now + 1;
    };
    let id = (pid || Math.randomStr(secLength)).substr(0, secLength) +
      getNow(0).toString().substr(0, secLength);
    return id + Math.randomStr(length - id.length);
  }

}

export default Countdown;
