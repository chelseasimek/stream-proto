/**
 * @customElement
 * @polymer
 */
class StreamTransportBar extends Polymer.Element {
    static get is() { return 'stream-transport-bar'; }
    static get properties() {
        return {
            progressPrecentage: {
                type: Number,
                value: 0
            },
            totalTime: {
                type: Number,
                valuse: 0
            },
            elapsedTime: {

            }
        };
    }

    calculateProgressPercentage(frame, maxFrames) {
        this.progressPrecentage = (frame/maxFrames)*100;
    }

    calculateTotalTime(maxFrames, fps) {
        var minutes = Math.floor((maxFrames - ((maxFrames/fps) % 60))/60);
    }

    calculateElapsedTime(frame, maxFrames, fps) {

    }

    updateProgressPercentage(frame, maxFrames, fps) {

    }

    updateTotalTime(frame, maxFrames, fps) {

    }
    updateElapsedTime(frame, maxFrames, fps) {

    }
}

window.customElements.define(StreamTransportBar.is, StreamTransportBar);