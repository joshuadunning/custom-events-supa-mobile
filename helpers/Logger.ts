class Logger {
  src: string;
  constructor(src: string) {
    this.src = src;
  }

  private formatObjects(...args: Array<any>) {
    return args.map((arg) => {
      if (typeof arg === 'object') {
        return JSON.stringify(arg, null, 2);
      }
      return arg;
    });
  }

  info(...args: Array<any>) {
    console.info(`[${this.src}]: `, this.formatObjects(...args));
  }
  warn(...args: Array<any>) {
    console.warn(`[${this.src}]: `, this.formatObjects(...args));
  }
  error(...args: Array<any>) {
    console.error(`[${this.src}]: `, this.formatObjects(...args));
  }
}

export default Logger;
