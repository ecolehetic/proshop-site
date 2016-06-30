'use strict';
var $ = jQuery || {}

class App {

    _body = document.getElementsByTagName('body')[0];
    _html = document.getElementsByTagName('html');
    _main = document.getElementsByTagName('main')[0];

    // _homepage = document.getElementsByClassName('homepage')[0];

    _burger = document.getElementById('js-burger');
    _menu = document.getElementById('js-menu');

    headerFixed = false;
    _headerDesktop = document.querySelectorAll('header.desktop')[0];

    // md = new MobileDetect(window.navigator.userAgent);

    stateMenu = false;
    ie = false;

    constructor() {
        // var wrapper = document.getElementById('iscroller');
        // var myScroll = new IScroll(wrapper, {
        //   click: true
        // });
        console.log($);
        // this.events();
        this.msieversion();
        this.initSLider();
        // this.paralax();
    }

    /**
    * Initialize All events
    */
    events() {
        let app = this;
        let scroller = document.querySelectorAll('main, footer');

        for (let i = 0; i < scroller.length; i++) {
            scroller[i].addEventListener('touchstart', function(e) {

                if (app.stateMenu === true) {
                    app.menuClose();
                }
            });
        }

        // if (app._homepage !== undefined) {
            app._burger.addEventListener('click', function(e) {
                e.preventDefault();
                if (app.stateMenu === true) {
                    app.menuClose();
                } else {
                    app.menuOpen();
                }
            });

            document.addEventListener('scroll', (e) => {
                this.paralax();
            })

            window.addEventListener('resize', () => {
                this.paralax();
            })
        // }

    }

    initSLider() {
      $('.fade-punchline').slick({
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        fade: true,
        cssEase: 'linear'
      });

    }

    /**
     * paralax()
     * Init Paralax for image section
     */
    paralax() {
        var body = document.body;
        var html = document.documentElement;

        let doc = document.documentElement;
        let scrollTopCur = (window.pageYOffset || doc.scrollTop) + (doc.clientTop || 0);

        var heightCur = Math.max( body.scrollHeight, body.offsetHeight,
                       html.clientHeight, html.scrollHeight, html.offsetHeight );

        let windowHeight = this.getWindowHeight();

        let _elemParalax = document.getElementsByClassName('paralax');

        var value = Math.round(windowHeight - 200 - (scrollTopCur + windowHeight - heightCur) / 7);
        let valueS = (value / 100) * 70;
        for ( var i = 0; i < _elemParalax.length; i++) {
            _elemParalax[i].style.webkitTransform = 'translate3d(0px, -' + valueS + 'px, 0px)';
        }
    }

    getWindowHeight() {
        var windowHeight = 0;
        if (typeof (window.innerHeight) == 'number') {
            windowHeight = window.innerHeight;
        } else {
            if (document.documentElement && document.documentElement.clientHeight) {
                windowHeight = document.documentElement.clientHeight;
            } else {
                if (document.body && document.body.clientHeight) {
                    windowHeight = document.body.clientHeight;
                }
            }
        }
        return windowHeight;
    }

    msieversion() {

        let app = this;
        let ua = window.navigator.userAgent;
        let msie = ua.indexOf("MSIE ");

        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
            app.ie = true;
        }
        return false;
    }

    /**
     * paralax()
     * Function for opening menu when is mobile version
     */
    menuOpen() {
        let app = this;
        app._menu.className += ' open';
        app.stateMenu = true;
    }

    /**
     * paralax()
     * Function for closing menu when is mobile version
     */
    menuClose() {
        let app = this;
        app._menu.classList.remove('open');
        app.stateMenu = false;
    }

    hasClass(el, cls) {
        return el.className && new RegExp("(\\s|^)" + cls + "(\\s|$)").test(el.className);
    }
}

window.onload = function() {
    let app = new App();
}
