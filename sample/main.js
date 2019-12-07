!function ($, e, a) {
    Common.Page = this,
    this.setupOnce = function () {
        function e() {
            TweenMax.to("#timer", 4, {
                opacity: 0,
                onComplete: function () {
                    Common.trace("TIMER -> CHANGE"),
                    a()
                }
            })
        }
        function a() {
            d > C
                ? C++
                : C = 1,
            p = "is__v" + C,
            g = "is__bg" + C,
            m.changeSlider(),
            TweenMax.to("#visualLogo, #visualLoad, #visualDate", .5, {
                x: -50,
                opacity: 0,
                ease: "easeInQuart"
            });
            var a = 80;
            "sp" == Common.LAYOUT_MODE && (a = -80),
            TweenMax.to("#visual .visual__block__copy", .5, {
                x: a,
                opacity: 0,
                ease: "easeInQuart"
            }),
            TweenMax.to("#visual .visual__block__copy span", .5, {
                width: "0%",
                ease: "easeInQuart"
            }),
            $("#bgCover").removeClass("is__finish is__bg1 is__bg2 is__bg3 is__bg4 is__bg5 is__bg6 is__bg7 is__bg8 is__bg9 is__bg10").addClass("is__start " + g),
            TweenMax.fromTo("#bgCover", .5, {
                scaleX: 0
            }, {
                scaleX: 1,
                ease: "easeInOutCirc",
                onComplete: function () {
                    $("#teaser-page").removeClass("is__v1 is__v2 is__v3 is__v4 is__v5 is__v6 is__v7 is__v8 is__v9 is__v10").addClass(p),
                    $("#bgCover").removeClass("is__start").addClass("is__finish"),
                    TweenMax.to("#bgCover", .5, {
                        scaleX: 0,
                        ease: "easeInOutCirc"
                    }),
                    TweenMax.to("#visualLogo, #visualLoad, #visualDate", .5, {
                        x: 0,
                        opacity: 1,
                        ease: "easeOutQuint"
                    }),
                    TweenMax.to("#visual .visual__block__copy", .5, {
                        x: 0,
                        opacity: 1,
                        ease: "easeOutQuint"
                    }),
                    TweenMax.to("#visual .visual__block__copy span", .5, {
                        width: "100%",
                        ease: "easeOutQuint",
                        onComplete: function () {
                            e()
                        }
                    })
                }
            })
        }
        function o() {
            Common.isMoveIntro = !1,
            $("#introMovie").remove(),
            $("#introCover").removeClass("is__start").addClass("is__finish"),
            Common.$body.css({overflow: "visible"});
            var a = 80;
            "sp" == Common.LAYOUT_MODE && (a = 80),
            TweenMax.set("#visualLogo, #visualLoad, #visualDate", {
                x: -80,
                opacity: 0
            }),
            TweenMax.set("#visual .visual__block__copy", {
                x: a,
                opacity: 0
            }),
            TweenMax.set("#visual .visual__block__copy span", {width: "0%"});
            var o = 0;
            "sp" == Common.LAYOUT_MODE && (o = 0, TweenMax.to("#introLogo .intro__logo__inner", .5, {
                width: 0,
                x: 100,
                delay: o,
                ease: "easeInOutCirc"
            })),
            TweenMax.to("#introCover", .5, {
                scaleX: 0,
                delay: o,
                ease: "easeInOutCirc",
                onComplete: function () {
                    $("#intro").remove(),
                    TweenMax.to("#visualLogo, #visualLoad, #visualDate", .7, {
                        x: 0,
                        opacity: 1,
                        delay: .3,
                        ease: "easeOutQuint"
                    }),
                    TweenMax.to("#visual .visual__block__copy", .7, {
                        x: 0,
                        opacity: 1,
                        delay: .3,
                        ease: "easeOutQuint"
                    }),
                    TweenMax.to("#visual .visual__block__copy span", .7, {
                        width: "100%",
                        delay: .3,
                        ease: "easeOutQuint",
                        onComplete: function () {
                            e()
                        }
                    })
                }
            })
        }
        Common.trace("Page -> setupOnce"),
        Common.setLoadedInit(!1),
        Common.ResizeEvent.setResizeSize(),
        Common.ScrollEvent.setParallaxObjects();
        var s,
            i,
            t = [0, 0];
        1 == Common.URL_QUERY.type
            ? (s = "teaser/img/dmaps/crystalize.jpg", i =[
                200, 0
            ], t =[0, 0])
            : (s = "teaser/img/dmaps/crystalize.jpg", i =[
                200, 0
            ], t =[0, 0]);
        for (var n = document.querySelectorAll(".slide-item__image"), _ =[], l =[], r, c, u = 0; u < n.length; u++) {
            var v = n[u];
            v.nextElementSibling
                ? l.push(v.nextElementSibling.innerHTML)
                : l.push(""),
            _.push(v.getAttribute("src"))
        }
        "pc" == Common.LAYOUT_MODE
            ? (r = 1920, c = 1240)
            : (r = 750, c = 1150);
        var m = new CanvasSlideshow({
                stageWidth: r,
                stageHeight: c,
                sprites: _,
                displacementImage: s,
                autoPlay: !1,
                autoPlaySpeed: [
                    4, 3
                ],
                fullScreen: !0,
                displaceScale: i,
                displaceScaleTo: t,
                interactive: !1,
                interactionEvent: "click",
                displaceAutoFit: !1,
                dispatchPointerOver: !1
            }),
            d = 10,
            C = 1,
            p = "is__v" + C,
            g;
        if ($("#teaser-page").addClass(p), "sp" == Common.LAYOUT_MODE) 
            return void o();
        
        var M = $("#video"),
            T = document.getElementById("video"),
            O,
            x;
        M.attr("src", "/teaser/movie/ls_intro.mp4"),
        O = M.get(0),
        O.load(),
        T.addEventListener("loadedmetadata", function () {
            Common.trace("MOVIE -> LOADED"),
            x = T.duration,
            Common.trace("MOVIE -> TOTAL -> " + x),
            O.currentTime = 0,
            TweenMax.to("#introLogo .intro__logo__inner", .5, {
                width: 0,
                ease: "easeInOutCirc"
            }),
            $("#introCover").addClass("is__finish"),
            TweenMax.to("#introCover", .5, {
                scaleX: 0,
                ease: "easeInOutCirc",
                onComplete: function () {
                    setTimeout(function () {
                        $("#introMovieCover").remove()
                    }, 100),
                    O.play()
                }
            })
        }),
        T.addEventListener("timeupdate", function () {
            Common.trace("MOVIE -> " + T.currentTime)
        }),
        T.addEventListener("ended", function () {
            Common.trace("MOVIE -> FINISHED"),
            $("#introCover").removeClass("is__finish").addClass("is__start"),
            TweenMax.to("#introCover", .5, {
                scaleX: 1,
                ease: "easeInOutCirc",
                onComplete: function () {
                    o()
                }
            })
        })
    }
}(jQuery, window);