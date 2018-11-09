class Gradient {

  constructor(colors, angle) {
    this.colors = colors
    this.angle = angle
  }

  /**
   * Calculates which color of the gradient plays the largest role in coloring the background at
   * a given position. Returns 0 if it's the first, 1 if it's the second.
   * Note that position { x: 0, y: 0 } is the center of the gradient.
   * @param {Number} x The x position on the gradient (-1 to 1)
   * @param {Number} y The y position on the gradient (-1 to 1)
   * @param {Number} angle An optional override for the angle the gradient should be evaluated at
   * @returns {Integer} Indicates which color the majority of the position is over
   */
  boundary(x, y, angle = this.angle) {
    let reversed = angle > 180
    let theta = angle * (Math.PI / 180)
    let tangent = Math.tan(theta)
    let threshold = -tangent * x
    let index
    if (tangent > 100) { // if angle = 90 (Thanks Javascript math for never giving the exact answer)
      index = x < 0 ? 0 : 1
    } else {
      index = y > threshold ? 1 : 0
    }
    return !reversed ? Math.abs(index - 1) : index
  }

  colorAt(x, y, reversed = false, angle = this.angle) {
    let index = this.boundary(x, y, angle)
    index = reversed ? Math.abs(index - 1) : index
    return this.colors[index]
  }

  textAt(x, y, dark, light, threshold = 130) {
    // console.log(`${this.angle}: ${this.boundary(x, y)} (${this.colors[this.boundary(x, y)].hex})`);
    return this.colors[this.boundary(x, y)].textPrimary(dark, light, threshold)
  }

  clone() {
    return new Gradient(
      [...this.colors],
      this.angle
    )
  }

}

export default Gradient