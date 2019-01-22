/**
 * @customElement
 * @polymer
 */
var navItemArray;
var _this = null;
class StreamHamburgerMenu extends Polymer.Element {
  static get is() { return 'stream-hamburger-menu'; }
  static get properties() {
    return {
      activePage: {
        type: Object,
        value: {
          page: "",
          title: ""
        }
      }
    };
  }
  connectedCallback() {
    super.connectedCallback();
  }
  ready() {
    super.ready();
    _this = this;

    // set the current active page to be passed by to the main app
    navItemArray = this.shadowRoot.querySelectorAll(".nav-item");
    for (var i=0; i < navItemArray.length; i++){
      navItemArray[i]. addEventListener("click", this.changePage.bind(navItemArray[i]));
      if (navItemArray[i].attributes.active.value === "true"){
        this.activePage.page = navItemArray[i].attributes.page.value;
        this.activePage.title = navItemArray[i].innerText;
      }
    }
  }

  // change which is going to be the new active page
  changePage() {
    for (var i=0; i < navItemArray.length; i++){
      navItemArray[i].attributes.active.value = "false";
    }
    this.attributes.active.value = true;
   _this.activePage.title = this.innerText;
  }
}
window.customElements.define(StreamHamburgerMenu.is, StreamHamburgerMenu);