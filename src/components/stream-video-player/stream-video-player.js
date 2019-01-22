/**
 * @customElement
 * @polymer
 */
// var streamVideoPlayer;
var timer;
class StreamVideoPlayer extends Polymer.Element {
    static get is() { return 'stream-video-player'; }
    static get properties() {
        return {
            prop1: {
                type: String,
                value: 'stream-video-player'
            },
            position: {
                tyep: Object,
                value: {
                    corner: "bottom-right"
                },
            },
            size: {
                type: String,
                value: "large",
                reflectToAttribute: true
            },
            videoObj: {
                type: Object,
                value: {
                    frame: 0,
                    maxFrames: 2386
                }
            },
            isPlaying: {
              type: Boolean,
              value: false
            }
        };
    }

    connectedCallback() {
        super.connectedCallback();
    }
    ready() {
        super.ready();
        for (var i = 1; i <= this.videoObj.maxFrames; i++) {
            this.loadImage("../../../images/big-buck-bunny/frames/frame" + i + ".jpg", i, this);
        }
    }
    loadImage(src, counter, scope) {
        setTimeout(function () {
            var img = new Image();
            img.src = src;
        }, 10 * counter);

    }
    updatePosition(x, y, startX, startY) {
        var posX = x + startX;
        var posY = y + startY;
        this.style.left = posX + "px";
        this.style.top = posY + "px";
    }

    getCenterX() {
        return Math.round(this.offsetLeft + (this.getBoundingClientRect().width / 2));
    }
    getCenterY() {
        return Math.round(this.offsetTop + (this.getBoundingClientRect().height / 2));
    }

    animateToTopLeft() {
        this.position.corner = "top-left";
        TweenMax.to(this, .6, {
            left: '20px',
            top: '17px',
            ease: Back.easeOut
        });
    }
    animateToTopRight() {
        this.position.corner = "top-right";
        TweenMax.to(this, 0.4, {
            left: '222px',
            top: '17px',
        });
    }
    animateToBottomLeft() {
        var topVal = screen.availHeight - 92;
        this.position.corner = "bottom-left";
        TweenMax.to(this, 0.4, {
            left: '20px',
            top: topVal,
            ease: Back.easeOut
        });
    }
    animateToBottomRight() {
        // var leftVal = screen.width - 153;
        // var topVal = screen.height - 92;
        this.position.corner = "bottom-right";
        if (this.size === "large") {
            TweenMax.to(this, 0.55, {
                right: "20px",
                bottom: "17px",
                ease: Linear.easeNone
            });
        }
        else if (this.size === "mini") {
            TweenMax.to(this, 0.4, {
                left: leftVal + "px",
                top: topVal + "px",
                ease: Back.easeOut,
            });
        }
    }

    fadeOut(opacity) {
        TweenMax.to(this, .2, { css: { opacity: opacity } });
    }

    removePlayer() {
        this.remove();
    }

    playVideo() {
        clearInterval(timer);
        timer = setInterval(this.updateFrames.bind(this), 90)
        this.isPlaying = true
    }

    pauseVideo() {
        clearInterval(timer);
        this.isPlaying = false
      }


    updateFrames() {
        if (this.videoObj.frame < this.videoObj.maxFrames) {
            this.videoObj.frame++;
            this.$.videoContainer.src = "../../../images/big-buck-bunny/frames/frame" + this.videoObj.frame + ".jpg";
        }
        else this.videoObj.frame = 1;
    }

}

window.customElements.define(StreamVideoPlayer.is, StreamVideoPlayer);
