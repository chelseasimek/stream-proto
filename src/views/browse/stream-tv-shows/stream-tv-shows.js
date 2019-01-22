/**
 * @customElement
 * @polymer
 */

class StreamTvShows extends Polymer.Element {
  static get is() { return 'stream-tv-shows'; }
  static get properties() {
    return {
    };
  }
  connectedCallback() {
    super.connectedCallback();
  }
  ready() {
    super.ready();
  }
}
window.customElements.define(StreamTvShows.is, StreamTvShows);