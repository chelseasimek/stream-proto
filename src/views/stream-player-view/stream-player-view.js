/**
 * @customElement
 * @polymer
 */
var videoTop;
var videoHeight;
var visibilityDelay;
var controlsTimer;
class StreamPlayerView extends Polymer.GestureEventListeners(Polymer.Element) {
    static get is() { return 'stream-player-view'; }
    static get properties() {
        return {
            prop1: {
                type: String,
                value: 'stream-player-view'
            },
            isTapped: {
                type: Boolean,
                value: true
            },
            controlsShown: {
                type: Boolean,
                value: false,
                notify: true
            },
            blackoutSelf: {
                type: Boolean,
                value: true,
                reflectToAttribute: true
            },
            active: {
                type: Boolean,
                value: false,
                reflectToAttribute: true
            },
            wasMini: {
              type: Boolean,
              value: false
          }
        };
    }

    connectedCallback() {
        super.connectedCallback();
        videoTop = this.$.videoPlayer.getBoundingClientRect().y;
        videoHeight = this.$.videoPlayer.getBoundingClientRect().height
        // console.log("calledback!!!")
        this.$.contorlContainer.style.marginTop =
            Math.ceil((videoTop + (videoHeight / 2))) + "px";

    }
    ready() {
        //   console.log("ready!!!")
        super.ready();

        this.addEventListener("click", this.tappedState);

        // CODE FOR DRAG AND SNAP TO CORNER AS WELL AS SWIPE AND DELETE.
        // DO NOT DELETE CODE BLOCK

        // var options = {
        //     preventDefault: true
        // };
        // var mc = new Hammer(this.$.videoPlayer, options);
        // mc.add(new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 }));
        // var appBounds = this.getBoundingClientRect();
        // var appCenterX = appBounds.width / 2;vi
        // var appCenterY = appBounds.height / 2;
        // var opacity = 1;
        // var isDragging = false;
        // var startX = 0;
        // var startY = 0;
        // mc.on("pan", function (ev) {
        //     var _this = ev.target;
        //     if (_this.size === "mini") {
        //         if (!isDragging) {
        //             isDragging = true;
        //             startX = _this.offsetLeft;
        //             startY = _this.offsetTop;
        //         }

        //         _this.updatePosition(ev.deltaX, ev.deltaY, startX, startY);
        //         if (ev.overallVelocity > 1.5 || ev.overallVelocity < -1.5) {
        //             if (opacity >= 0) {
        //                 _this.fadeOut(opacity);
        //                 opacity = opacity - .1;
        //                 console.log(opacity);
        //                 if (ev.isFinal) {
        //                     _this.removePlayer();
        //                 }
        //             }
        //         }
        //     }
        // });
        // mc.on("panend", function (ev) {
        //     var _this = ev.target;
        //     if (_this.size === "mini") {
        //         isDragging = false;
        //         if (_this.getCenterX() < (appCenterX) &&
        //             _this.getCenterY() > (appCenterY)) {
        //             _this.animateToBottomLeft();
        //         }
        //         else if (_this.getCenterX() < (appCenterX) &&
        //             _this.getCenterY() < (appCenterY)) {
        //             _this.animateToTopLeft();
        //         }
        //         else if (_this.getCenterX() > (appCenterX) &&
        //             _this.getCenterY() > (appCenterY)) {
        //             _this.animateToBottomRight();
        //         }
        //         else {
        //             _this.animateToTopRight();
        //         }
        //     }
        // });
    }

    tappedState() {
        //pause button has already toggled
        //if the video isnt paused or coming from mini state
        if (visibilityDelay !== null || visibilityDelay !== "undefined"){
            clearTimeout(visibilityDelay);
        }
        if (!this.$.playerControls.pauseActive || this.wasMini) {
          
          //if the video isn't paused make sure video is playing if not coming from mini view  
          if (!this.wasMini){
              this.$.videoPlayer.playVideo();
          }
          
          //if this is coming from the miniview
          if (this.wasMini){
            //make mini view false. this is the first action in expanded
            this.wasMini = false
            //if the video is not currently playing, or if paused, make sure controls are shown
            if(this.$.playerControls.pauseActive || !this.$.videoPlayer.isPlaying){
              this.showControls();
              //make sure pause active is synced with video
              this.$.playerControls.pauseActive = true;
            }
          }
          else if (!this.isTapped) {
              this.showControls();
              this.isTapped = true;
              
          } else {
              this.hideContorls();
              this.isTapped = false;
          }
        }
        else {
            this.$.videoPlayer.pauseVideo();
            this.showControls();
        }
    }

    minifyPlayer() {
        this.$.videoPlayer.style.opacity = 1.0;
        this.hideContorls();
        this.blackoutSelf = false;
        this.$.videoPlayer.size = "mini";
        this.$.videoPlayer.style.pointerEvents = "auto";
        this.style.pointerEvents = "none";
        this.removeEventListener("click", this.tappedState);
        this.wasMini = true
    }

    maximizePlayer() {
        this.$.videoPlayer.style.pointerEvents = "none";
        this.showControls();
        this.blackoutSelf = true;
        this.$.videoPlayer.size = "Large";
        this.style.pointerEvents = "auto";
        this.addEventListener("click", this.tappedState);
    }

    showControls() {
        clearTimeout(controlsTimer);
        this.$.videoPlayer.style.opacity = 0.6;
        this.$.playerControls.$.IconPause.style.pointerEvents = "auto";
        this.$.screenTop.style.display = "block";
        TweenMax.to(this.$.screenTop, 0.4, {
            css: {
                opacity: 1,
                marginTop: 0
            },
            ease: Back
        });
        TweenMax.to(this.$.playerControls, 0.2, {
            css: {
                opacity: 1
            },
        });
        TweenMax.to(this.$.transportBar, 0.4, {
            css: {
                opacity: 1,
                marginTop: "28px"
            },
            ease: Back
        });
        this.controlsShown = true;
        this.isTapped = true;
        controlsTimer = setTimeout(this.hideContorls.bind(this), 3000);
    }

    hideContorls() {
        clearTimeout(controlsTimer);
        this.$.videoPlayer.style.opacity = 1.0;
        this.$.playerControls.$.IconPause.style.pointerEvents = "none";
        TweenMax.to(this.$.screenTop, 0.4, {
            css: {
                opacity: 0,
                marginTop: "-25px"
            },
            ease: Back
        });
        this.controlsShown = false;
        TweenMax.to(this.$.playerControls, 0.2, {
            css: {
                opacity: 0,
            },
        });
        TweenMax.to(this.$.transportBar, 0.4, {
            css: {
                opacity: 0,
                marginTop: "78px",
            },
            ease: Back
        });
        this.controlsShown = false;
        visibilityDelay = setTimeout(function () {
            this.$.screenTop.style.display = "none";
        }.bind(this), 400);
        this.isTapped = false;


    }

    closeView() {
        this.active = false;
        this.$.videoPlayer.videoObj.frame = 1;
        // setTimeout(function(){
        //     this.remove();
        // }.bind(this), 400);
    }

    expandMoreOverlay() {
        this.$.moreOverlay.attributes.active.value = "true";
        // this.isTapped = true;
        this.$.screenTop.style.filter = "blur(10px)";
        this.$.contorlContainer.style.filter = "blur(10px)";
        this.$.videoPlayer.style.filter = "blur(10px)";
    }
    closeMoreOverlay() {
        // this.isTapped = true;
        this.$.moreOverlay.attributes.active.value = "false";
        this.$.videoPlayer.style.filter = "blur(0px)";
        this.$.screenTop.style.filter = "blur(0px)";
        this.$.contorlContainer.style.filter = "blur(0px)";
    }
}

window.customElements.define(StreamPlayerView.is, StreamPlayerView);
