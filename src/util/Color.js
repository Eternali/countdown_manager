class Color {

  constructor({ hex, rgba }) {
    this.hex = hex.replace('#', '') || this.rgbaToHex(rgba);
    this.rgba = rgba || this.hexToRGBA(this.hex);
  }

  rgbaToHex(col) {
    return col.reduce((acc, c) => acc + c.toString(16).padLeft(2, '0'), '');
  }

  hexToRGBA(col) {
    return col.split('')
      .reduce((acc, c, i, arr) => i % 2 == 0 ? [...acc, (c + arr[i + 1])] : acc, [])
      .map((c) => parseInt(c, 16))
      .join();
  }

}

export default Color;
