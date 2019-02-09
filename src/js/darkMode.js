export default class DarkMode {
  constructor(document) {
    this.state = {
      isDark: false,
      darkMode: {
        background: 'black',
        text: 'white',
      },
      lightMode: {
        background: 'white',
        text: 'black',
      },
    };
    this.document = document;
    // get toggle button
    this.toggle = document.getElementById('dark-mode-toggle');
    this.myName = document.getElementById('my-name');
    console.log(this.document);
  }

  setState({ key, val }) {
    this.state[key] = val;
  }

  setColor({ background, text }) {
    console.log('set color');
    this.document.body.style.backgroundColor = background;
    this.document.body.style.color = text;
    this.myName.style.borderBottom = `solid ${text} 4px`;
  }

  toggleColor() {
    this.setState({ isDark: !this.state.isDark });
    if (this.state.isDark) {
      this.setColor(this.state.darkMode);
    } else if (!this.state.isDark) {
      this.setColor(this.state.lightMode);
    }
  }
}
