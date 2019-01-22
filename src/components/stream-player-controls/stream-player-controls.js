/**
 * @customElement
 * @polymer
 */
class StreamPlayerControls extends Polymer.Element {
  static get is() {
    return 'stream-player-controls';
  }

  static get properties() {
    return {
      pauseActive: {
        type: Boolean,
        value: false
      }
    };
  }

  pauseToggle() {
    if (this.pauseActive) {
      this.$.IconPause.icon = "stream-icons:IconPause";
      this.pauseActive = false;
    }
    else {
      this.$.IconPause.icon = "stream-icons:IconPlay";
      this.pauseActive = true;
    }
  }

}

window.customElements.define(StreamPlayerControls.is, StreamPlayerControls);