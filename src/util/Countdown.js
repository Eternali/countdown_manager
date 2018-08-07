class Countdown {

  constructor({
    id,
    name,
    image,
    gradient,
    when,
    timer,
  }) {
    this.id = id || this.generateID();
    this.name = name;
    this.image = image;
    this.gradient = gradient;
    if (when && timer)
      throw new Error('Only one of [when] or [timer] can be defined.');
    if (when) this.when = when;
    else if (timer) this.timer = timer;
    else
      throw new Error('[when] or [timer] must be defined.');
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
