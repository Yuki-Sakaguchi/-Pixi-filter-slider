!function () {
    window.CanvasSlideshow = function (e) {
        function t() {
            l.rotation += .001,
            v = requestAnimationFrame(t)
        }
        function n(e, t) {
            var n,
                a,
                i,
                r;
            n = window.innerWidth / e.offsetWidth,
            a = window.innerHeight / e.offsetHeight,
            i = Math.min(n, a),
            e.style.transformOrigin = "0 0",
            e.style.transform = "scale(" + i + ")",
            r = e.offsetWidth > e.offsetHeight
                ? e.offsetWidth * i < window.innerWidth
                    ? "horizontally"
                    : "vertically"
                : e.offsetHeight * i < window.innerHeight
                    ? "vertically"
                    : "horizontally";
            var o;
            "horizontally" === r && (o =( window.innerWidth - e.offsetWidth * i) / 2, e.style.marginTop = "0px", e.style.marginBottom = "0px", e.style.marginLeft = o + "px", e.style.marginRight = o + "px"),
            "vertically" === r && (o =( window.innerHeight - e.offsetHeight * i) / 2, e.style.marginTop = o + "px", e.style.marginBottom = o + "px", e.style.marginLeft = "0px", e.style.marginRight = "0px"),
            e.style.paddingLeft = "0px",
            e.style.paddingRight = "0px",
            e.style.paddingTop = "0px",
            e.style.paddingBottom = "0px",
            e.style.display = "block",
            document
                .body
                .style
                .backgroundColor = t;
            var l = navigator.userAgent.toLowerCase();
            return -1 != l.indexOf("safari") && l.indexOf("chrome") > -1,
            i
        }
        var a = this;
        e = e || {},
        e.stageWidth = e.hasOwnProperty("stageWidth")
            ? e.stageWidth
            : 1920,
        e.stageHeight = e.hasOwnProperty("stageHeight")
            ? e.stageHeight
            : 1240,
        e.pixiSprites = e.hasOwnProperty("sprites")
            ? e.sprites
            : [],
        e.centerSprites = e.hasOwnProperty("centerSprites")
            ? e.centerSprites
            : !1,
        e.texts = e.hasOwnProperty("texts")
            ? e.texts
            : [],
        e.autoPlay = e.hasOwnProperty("autoPlay")
            ? e.autoPlay
            : !0,
        e.autoPlaySpeed = e.hasOwnProperty("autoPlaySpeed")
            ? e.autoPlaySpeed
            : [
                10, 3
            ],
        e.fullScreen = e.hasOwnProperty("fullScreen")
            ? e.fullScreen
            : !0,
        e.displaceScale = e.hasOwnProperty("displaceScale")
            ? e.displaceScale
            : [
                200, 70
            ],
        e.displacementImage = e.hasOwnProperty("displacementImage")
            ? e.displacementImage
            : "",
        e.navElement = e.hasOwnProperty("navElement")
            ? e.navElement
            : document.querySelectorAll(".scene-nav"),
        e.displaceAutoFit = e.hasOwnProperty("displaceAutoFit")
            ? e.displaceAutoFit
            : !1,
        e.wacky = e.hasOwnProperty("wacky")
            ? e.wacky
            : !1,
        e.interactive = e.hasOwnProperty("interactive")
            ? e.interactive
            : !1,
        e.interactionEvent = e.hasOwnProperty("interactionEvent")
            ? e.interactionEvent
            : "",
        e.displaceScaleTo = e.autoPlay === !1
            ? [0, 0]
            : [
                20, 20
            ],
        e.textColor = e.hasOwnProperty("textColor")
            ? e.textColor
            : "#fff",
        e.displacementCenter = e.hasOwnProperty("displacementCenter")
            ? e.displacementCenter
            : !1,
        e.dispatchPointerOver = e.hasOwnProperty("dispatchPointerOver")
            ? e.dispatchPointerOver
            : !1;
        var i = new PIXI.autoDetectRenderer(e.stageWidth, e.stageHeight, {
                transparent: !0
            }),
            r = new PIXI.Container,
            o = new PIXI.Container,
            l = new PIXI.Sprite.fromImage(e.displacementImage),
            s = new PIXI.filters.DisplacementFilter(l),
            c = new PIXI.TextStyle({
                fill: e.textColor,
                wordWrap: !0,
                wordWrapWidth: 400,
                letterSpacing: 20,
                fontSize: 14
            });
        if (this.currentIndex = 0, this.initPixi = function () {
            document.body.appendChild(i.view),
            r.addChild(o),
            r.interactive = !0,
            e.fullScreen === !0
                ? (i
                    .view
                    .style
                    .objectFit = "cover", i
                    .view
                    .style
                    .width = "100%", i
                    .view
                    .style
                    .height = "100%", i
                    .view
                    .style
                    .top = "50%", i
                    .view
                    .style
                    .left = "50%", i
                    .view
                    .style
                    .webkitTransform = "translate( -50%, -50% )", i
                    .view
                    .style
                    .transform = "translate( -50%, -50% )")
                : (i
                    .view
                    .style
                    .maxWidth = "100%", i
                    .view
                    .style
                    .top = "50%", i
                    .view
                    .style
                    .left = "50%", i
                    .view
                    .style
                    .webkitTransform = "translate( -50%, -50% )", i
                    .view
                    .style
                    .transform = "translate( -50%, -50% )"),
            l
                .texture
                .baseTexture
                .wrapMode = PIXI.WRAP_MODES.REPEAT,
            r.filters = [s],
            e.autoPlay === !1 && (s.scale.x = 0, s.scale.y = 0),
            e.wacky === !0 && (l.anchor.set(.5), l.x = i.width / 2, l.y = i.height / 2),
            l.scale.x = 2,
            l.scale.y = 2,
            s.autoFit = e.displaceAutoFit,
            r.addChild(l)
        }, this.loadPixiSprites = function (t) {
            for (var n = e.sprites, a = e.texts, r = 0; r < n.length; r++) {
                var l = new PIXI.Texture.fromImage(t[r]),
                    s = new PIXI.Sprite(l);
                if (a) {
                    var d = new PIXI.Text(a[r], c);
                    s.addChild(d),
                    d.anchor.set(.5),
                    d.x = s.width / 2,
                    d.y = s.height / 2
                }
                e.centerSprites === !0 && (s.anchor.set(.5), s.x = i.width / 2, s.y = i.height / 2),
                0 !== r && TweenMax.set(s, {alpha: 0}),
                o.addChild(s)
            }
        }, e.autoPlay === !0) {
            var d = new PIXI.ticker.Ticker;
            d.autoStart = e.autoPlay,
            d.add(function (t) {
                l.x += e.autoPlaySpeed[0] * t,
                l.y += e.autoPlaySpeed[1],
                i.render(r)
            })
        } else {
            var p = new PIXI.ticker.Ticker;
            p.autoStart = !0,
            p.add(function (e) {
                i.render(r)
            })
        }
        var h = !1,
            y = o.children;
        this.moveSlider = function (t) {
            h = !0;
            var n = new TimelineMax,
                i = new TimelineMax({
                    onComplete: function () {
                        a.currentIndex = t,
                        h = !1,
                        e.wacky === !0 && l.scale.set(1)
                    },
                    onUpdate: function () {
                        e.wacky === !0 && (l.rotation += .02 * i.progress(), l.scale.set(3 * i.progress()))
                    }
                });
            n.clear(),
            i.clear(),
            i.isActive() || (i.to(s.scale, .5, {
                x: - e.displaceScale[0],
                y: - e.displaceScale[1],
                ease: "easeInCirc",
                onComplete: function () {
                    i.fromTo(s.scale, .5, {
                        x: e.displaceScale[0],
                        y: e.displaceScale[1]
                    }, {
                        x: e.displaceScaleTo[0],
                        y: e.displaceScaleTo[1],
                        ease: "easeOutQuart"
                    })
                }
            }), n.to(y[a.currentIndex], .2, {
                alpha: 0,
                ease: Power2.easeOut
            }, .5).to(y[t], .2, {
                alpha: 1,
                ease: Power2.easeOut
            }, .5))
        },
        this.changeSlider = function () {
            return h
                ? !1
                : void(
                    a.currentIndex >= 0 && a.currentIndex < y.length - 1
                        ? a.moveSlider(a.currentIndex + 1)
                        : a.moveSlider(0)
                )
        };
        for (var w = e.navElement, u = 0; u < w.length; u++) {
            var x = w[u];
            x.onclick = function (e) {
                return h
                    ? !1
                    : (
                        "next" === this.getAttribute("data-nav")
                            ? a.currentIndex >= 0 && a.currentIndex<y.length-1?a.moveSlider(a.currentIndex+1):a.moveSlider(0):a.currentIndex> 0 && a.currentIndex < y.length
                                ? a.moveSlider(a.currentIndex - 1)
                                : a.moveSlider(spriteImages.length - 1),
                        !1
                    )
            }
        }
        if (this.init = function () {
            a.initPixi(),
            a.loadPixiSprites(e.pixiSprites)
        }, e.interactive === !0) {
            var v,
                f,
                g;
            o.interactive = !0,
            o.buttonMode = !0,
            "hover" !== e.interactionEvent && "both" !== e.interactionEvent || (o.pointerover = function (e) {
                f = e
                    .data
                    .global
                    .x,
                g = e
                    .data
                    .global
                    .y,
                TweenMax.to(s.scale, 1, {
                    x: "+=" + 100 *Math.sin(f),
                    y: "+=" + 100 *Math.cos(g)
                }),
                t()
            }, o.pointerout = function (e) {
                TweenMax.to(s.scale, 1, {
                    x: 0,
                    y: 0
                }),
                cancelAnimationFrame(v)
            }),
            "click" !== e.interactionEvent && "both" !== e.interactionEvent || (o.pointerup = function (t) {
                e.dispatchPointerOver === !0
                    ? TweenMax.to(s.scale, 1, {
                        x: 0,
                        y: 0,
                        onComplete: function () {
                            TweenMax.to(s.scale, 1, {
                                x: 20,
                                y: 20
                            })
                        }
                    })
                    : (TweenMax.to(s.scale, 1, {
                        x: 0,
                        y: 0
                    }), cancelAnimationFrame(v))
            }, o.pointerdown = function (e) {
                f = e
                    .data
                    .global
                    .x,
                g = e
                    .data
                    .global
                    .y,
                TweenMax.to(s.scale, 1, {
                    x: "+=" + 1200 *Math.sin(f),
                    y: "+=" + 200 *Math.cos(g)
                })
            })
        }
        e.displacementCenter === !0 && (l.anchor.set(.5), l.x = i.view.width / 2, l.y = i.view.height / 2),
        this.init()
    }
}();