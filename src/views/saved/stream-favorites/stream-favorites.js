/**
 * @customElement
 * @polymer
 */

class StreamFavorites extends Polymer.Element {
  static get is() { return 'stream-favorites'; }
  static get properties() {
    return {
    };
  }
}
window.customElements.define(StreamFavorites.is, StreamFavorites);