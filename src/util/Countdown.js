class Countdown {

  constructor({
    name,
    image,
    gradient,
    when,
    timer,
  }) {
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

}

export default Countdown;