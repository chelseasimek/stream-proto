/**
 * @customElement
 * @polymer
 */

class StreamProtoApp extends Polymer.GestureEventListeners(Polymer.Element) {
    static get is() { return 'stream-proto-app'; }
    static get properties() {
        return {
            page: {
                type: String,
                reflectToAttribute: true,
                observer: '_pageChanged',
            },
            menuShown: {
                type: Boolean,
                value: false
            },
            playerOpenCounter: {
                type: Number,
                value: 1
            },
            clickNum: {
                type: Number,
                value: 0
            },
            routeData: Object,
            subroute: Object,
            // This shouldn't be neccessary, but the Analyzer isn't picking up
            // Polymer.Element#rootPath
            rootPath: String
        };
    };

    connectedCallback() {
        super.connectedCallback();
    }
    ready() {
        super.ready();

        // if (window.innerWidth > 650){
        //     this.style.width = "375px";
        //     this.style.height = "667px";
        // }

        this.$.header.$.iconMenu.addEventListener("click", this.toggleMenu.bind(this));
        this.$.forYou.$.poster.addEventListener("click", this.openPlayerView.bind(this));
        this.updateHeaderTitle(this.$.hamburgerMenu.activePage.title);
        for (var i = 1; i < this.$.navViewsContainer.children.length; i++) {
            this.$.navViewsContainer.children[i].style.display = "none";
        }
    }

    toggleMenu() {
        if (this.menuShown) {
            this.closeMenu();
        }
        else {
            this.openMenu();
        }
    }

    openMenu() {
        TweenMax.to(this.$.pageContainer, .2, {
            left: '264px',
            ease: Back
        });
        this.menuShown = true;
    }
    closeMenu() {
        TweenMax.to(this.$.pageContainer, .2, {
            left: '0px',
            ease: Back
        });
        this.changePage(this.$.hamburgerMenu.activePage.title);
        this.menuShown = false;
    }

    changePage(page) {
        for (var i = 0; i < this.$.navViewsContainer.children.length; i++) {
            this.$.navViewsContainer.children[i].style.display = "none";
        }
        if (page === "For You") {
            this.$.forYou.style.display = "block";
        }
        else if (page === "Favorites") {
            this.$.favorites.style.display = "block";
        }
        else if (page === "Purchases") {
            this.$.purchases.style.display = "block";
        }
        else if (page === "Downloads") {
            this.$.downloads.style.display = "block";
        }
        else if (page === "All Channels") {
            this.$.allChannels.style.display = "block";
        }
        else if (page === "Favorite Channels") {
            this.$.favoriteChannels.style.display = "block";
        }
        else if (page === "TV Go Channels") {
            this.$.tvGoChannels.style.display = "block";
        }
        else {
            this.$.tvShows.style.display = "block";
        }
        this.updateHeaderTitle(page);
    }

    updateHeaderTitle(headerTitle) {
        this.$.header.titleText = headerTitle;
    }

    openPlayerView() {
        var hideTimer;
        this.$.playerView.$.playerControls.$.IconPause.icon = "stream-icons:IconPause";
        if (!this.$.playerView.active) {
            this.$.playerView.showControls();
            this.$.playerView.active = true;
            this.$.playerView.$.playerControls.pauseActive = false;
            if (this.playerOpenCounter === 1) {
                this.$.playerView.$.contorlContainer.style.marginTop = (this.$.playerView.$.contorlContainer.style.marginTop.split("p")[0] - (1000 - 45)) + "px";
            }
            this.$.playerView.$.videoPlayer.playVideo();
            this.playerOpenCounter++;
        }
    }

    // clearTimer(timer) {
    //     clearTimeout(timer);
    //     this.$.playerView.removeEventListener("click", this.clearTimer.bind(this, timer));
    // }

    // static get observers() {
    //     return [
    //         '_routePageChanged(routeData.page)',
    //     ];
    // }

    // _routePageChanged(page) {
    //     // If no page was found in the route data, page will be an empty string.
    //     // Default to 'view1' in that case.
    //     this.page = page || 'view1';

    //     // Close a non-persistent drawer when the page & route are changed.
    //     if (!this.$.drawer.persistent) {
    //         this.$.drawer.close();
    //     }
    // }

    // _pageChanged(page) {
    //     // Load page import on demand. Show 404 page if fails
    //     const resolvedPageUrl = this.resolveUrl('my-' + page + '.html');
    //     Polymer.importHref(
    //         resolvedPageUrl,
    //         null,
    //         this._showPage404.bind(this),
    //         true);
    // }

    // _showPage404() {
    //     this.page = 'view404';
    // }
}
window.customElements.define(StreamProtoApp.is, StreamProtoApp);
