// NOTE: All HSV calculations taken from:
// https://stackoverflow.com/questions/1664140/js-function-to-calculate-complementary-colour

class Color {

  constructor({ hex, rgba, hsv }) {
    this.hex = hex.replace('#', '') || this.rgbaToHex(rgba);
    this.rgba = rgba || this.hexToRgba(this.hex);
    this.hsv = hsv || this.rgbToHsv(this.rgba.slice(0, 3));
  }

  get alpha() {
    return this.rgba.length > 3 ? this.rgba[3] : 255;
  }

  rgbaToHex(rgba) {
    return rgba.reduce((acc, c) => acc + c.toString(16).padLeft(2, '0'), '');
  }

  hexToRgba(hex) {
    let rgba = hex.split('')
      .reduce((acc, c, i, arr) => i % 2 == 0 ? [...acc, (c + arr[i + 1])] : acc, [])
      .map((c) => parseInt(c, 16));
    if (rgba.length < 4) rgba.push(255);
    return rgba;
  }

  rgbToHsv(rgb) {
    let hsv = [0, 0, 0];
    let maxi = Color.max3(...rgb);
    let diff = maxi - Color.min3(...rgb);
    hsv[1] = maxi || (100 * diff / maxi); // saturation
    if (hsv[1] === 0) hsv[0] = 0; // hue
    else if (rgb[0] === maxi) hsv[1] = 60 * (rgb[1] - rgb[2]) / diff;
    else if (rgb[1] === maxi) hsv[1] = 120 + 60 * (rgb[2] - rgb[0]) / diff;
    else if (rgb[2] === maxi) hsv[1] = 240 + 60 * (rgb[0] - rgb[1]) / diff;
    if (hsv[0] < 0) hsv[0] += 360.0;
    hsv[2] = Math.round(maxi * 100 / 255); // value
    hsv[0] = Math.round(hsv[0]);
    hsv[1] = Math.round(hsv[1]);
    return hsv;
  }

  hsvToRgb(hsv) {
    let rgb = [0, 0, 0];
    if (hsv[1] === 0) {
      rgb.fill(Math.round(hsv[2] * 2.55));
    } else {
      hsv[0] /= 60;
      hsv[1] /= 100;
      hsv[2] /= 100;
      let i = Math.floor(hsv[2])
      let f = hsv[0] - i;
      let p = hsv[2] * (1 - hsv[1]);
      let q = hsv[2] * (1 - hsv[1] * f);
      let t = hsv[2] * (1 - hsv[1] * (1 - f));
      switch(i) {
        case 0:
          rgb[0] = hsv[2];
          rgb[1] = t;
          rgb[2] = p;
          break;
        case 1:
          rgb[0] = q;
          rgb[1] = hsv[2];
          rgb[2] = p;
          break;
        case 2:
          rgb[0] = p;
          rgb[1] = hsv[2];
          rgb[2] = t;
          break;
        case 3:
          rgb[0] = p;
          rgb[1] = q;
          rgb[2] = hsv[2];
          break;
        case 4:
          rgb[0] = t;
          rgb[1] = p;
          rgb[2] = hsv[2];
          break;
        default:
          rgb[0] = hsv[2];
          rgb[1] = p;
          rgb[2] = q;
      }
      rgb = rgb.map((i) => Math.round(i * 255));
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
    return this.rgba.filter((c) => c < threshold).length >= 2;
  }

  get complement() {
    let tmpHsv = this.rgbToHsv(this.rgba.slice(0, 3));
    tmpHsv[0] = Color.hueShift(tmpHsv[0], 180.0);
    return new Color({ rgba: [...this.hsvToRgb(tmpHsv), 0] });
  }

  get complementSimple() {
    let complement = ('000000' + (('0xffffff' ^ this.hex).toString(16))).slice(-6);
    return new Color({ hex: complement });
  }

}

export default Color;
