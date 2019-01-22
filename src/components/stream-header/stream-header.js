/**
 * @customElement
 * @polymer
 */

class StreamHeader extends Polymer.Element {
  static get is() { return 'stream-header'; }
  static get properties() {
      return {
        titleText: {
          type: String,
          value: ""
        }
      };
  }
}
  window.customElements.define(StreamHeader.is, StreamHeader);