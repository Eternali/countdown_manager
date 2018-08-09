class Breakpoints {

  constructor() {
    this.xs = false;
    this.sm = false;
    this.md = false;
    this.lg = false;
    this.xl = false;
  }

  bind(dom) {
    dom.addEventListener('resize', () => {
      this.update();
    });
  }

  update() {
    this.xs = window.innerWidth < 600;
    this.sm = window.innerWidth < 960 && !this.xs;
    this.md = window.innerWidth < (1280 - 16) && !(this.xs || this.sm);
    this.lg = window.innerWidth < (1920 - 16) && !(this.xs || this.sm || this.md);
    this.xl = window.innerWidth >= (1920 - 16);
  }

}

const breakpoints = new Breakpoints();

export {
  breakpoints,
};