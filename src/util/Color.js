class Color {

  constructor({ hex, rgba }) {
    this.hex = hex.replace('#', '') || this.rgbaToHex(rgba);
    this.rgba = rgba || this.hexToRGBA(this.hex);
  }

  get alpha() {
    return this.rgba.length > 3 ? this.rgba[3] : 255;
  }

  rgbaToHex(col) {
    return col.reduce((acc, c) => acc + c.toString(16).padLeft(2, '0'), '');
  }

  hexToRGBA(col) {
    return col.split('')
      .reduce((acc, c, i, arr) => i % 2 == 0 ? [...acc, (c + arr[i + 1])] : acc, [])
      .map((c) => parseInt(c, 16));
  }

  textPrimary(dark, light, threshold = 130) {
    return this.rgba.every((c) => c > threshold) ? dark : light;
  }

}

export default Color;
