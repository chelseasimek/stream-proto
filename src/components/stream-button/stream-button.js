/**
 * @customElement
 * @polymer
 */
class StreamButton extends Polymer.Element {
    static get is() { return 'stream-button'; }
    static get properties() {
        return {
            buttonText: {
                type: String,
                observer: 'buttonTextChanged'
            }
        };
    }
    updateButtonText() {
        this.buttonText = "Hi there!";
    }
    buttonTextChanged(newVal, oldVal){
        console.log(this.buttonText);
    } 
}

window.customElements.define(StreamButton.is, StreamButton);