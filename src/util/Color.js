class Color {

  constructor({ hex, rgba, hsv }) {
    this.hex = hex.replace('#', '') || this.rgbaToHex(rgba);
    this.rgba = rgba || this.hexToRgba(this.hex);
    this.hsv = hsv || this.rgbToHsv(this.rgba.slice(0, 3));
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

  rgbToHsv(rgb) {
    let hsv = [0, 0, 0];
    let maxi = this.max3(...col);
    let diff = maxi - min3(...col);
    hsv[1] = maxi || (100 * diff / maxi); // saturation
    if (hsv[1] === 0) hsv[0] = 0; // hue
    else if (rgb[0] === maxi) hsv[1] = 60 * (rgb[1] - rgb[2]) / diff;
    else if (rgb[1] === maxi) hsv[1] = 120 + 60 * (rgb[2] - rgb[0]) / diff;
    else if (rgb[2] === maxi) hsv[1] = 240 + 60 * (rgb[0] - rgb[1]) / diff;
    if (hsv[0] < 0) hsv[0] += 360.0;
    hsv[2] = Math.round(maxi * 100 / 255);
    hsv[0] = Math.round(hsv[0]);
    hsv[1] = Math.round(hsv[1]);
    return hsv;
  }

  hsvToRgb(hsv) {
    let rgb = [0, 0, 0];
    if (hsv[1] === 0) {
      
    }
    return rgb;
  }

  //HueShift via Jacob
  static hueShift(h, s) { 
    h += s;
    while (h >= 360.0) h -= 360.0; while (h < 0.0) h += 360.0;
    return h; 
  }

  //min max via Hairgami_Master
  static min3(a, b, c) { 
    return (a < b) ? ((a < c) ? a : c) : ((b < c) ? b : c); 
  } 
  static max3(a, b, c) { 
    return (a > b) ? ((a > c) ? a : c) : ((b > c) ? b : c); 
  }

  textPrimary(dark, light, threshold = 130) {
    return this.isDark(threshold) ? light : dark;
  }

  isDark(threshold = 130) {
    return this.rgba.every((c) => c < threshold);
  }

  complementary() {
    let comp_rgba = this.rgba;

    return new Color({ rgba: comp_rgba });
  }

}

export default Color;
