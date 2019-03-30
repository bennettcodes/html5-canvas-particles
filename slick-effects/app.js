window.onload = function () {

    var imageCacheContainer = $('#image-cache-container');
    var imageCache = $('.image-cache');
    var cover = $('#cover');
    var backgroundImagesContainer = $('#background-images-container');
    var backgroundImages = $('#background-images');
    var backgroundImage = $('.background-image');

    imageCache.imagesLoaded(function () {
        backgroundImage.imagesLoaded(function () {

            TweenMax.set(imageCacheContainer, {
                display: 'none'
            });

            TweenMax.set(backgroundImagesContainer, {
                perspective: 800,
                perspectiveOrigin: 'center',
                transformStyle: '2d',
                top: 0,
                left: 0
            });

            TweenMax.set(backgroundImages, {
                perspective: 800,
                perspectiveOrigin: 'center',
                transformStyle: '2d'
            });

            var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
            var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

            var chromeChecker = $('#chrome-checker');
            var chromeCheckerClose = $('#chrome-checker-close');
            var originTracker = $('#origin-tracker');
            var container = $('#container');
            var wrapper = $('#wrapper');
            var overlay = $('#overlay');
            var header = $('#header');
            var sections = $('#sections');
            var section = $('.section');
            var sectionsMarginTop = sections.css('margin-top');
            var sectionsMarginTopInt = sections.css('margin-top').replace(/[^-\d\.]/g, '');
            var testText = $('#test-text');
            var testTextItem = $('.test-text-item');
            var introText = $('.intro-text');
            var introTextItem = $('.intro-text-item');
            var introTextI = $('.intro-text-i');
            var introTextLike = $('.intro-text-like');
            var introTextTo = $('.intro-text-to');
            var introTextMake = $('.intro-text-make');
            var introTextThings = $('.intro-text-things');
            var backgroundBlurStartInitial = 10;
            var backgroundBlurStart = backgroundBlurStartInitial;
            var backgroundBlurBennettStart = backgroundBlurStartInitial;
            var backgroundBlurResumeStart = backgroundBlurStartInitial;
            var backgroundBlurPortfolioStart = backgroundBlurStartInitial;
            var backgroundBlurContactStart = backgroundBlurStartInitial;
            var backgroundBlurEnd = 0;
            var backgroundBlurStep = 1;

            var heroContainer = $('.hero-container');
            var heroTileContainer = $('.hero-tile-container');
            var heroTile = $('.hero-tile');
            var heroTextContainer = $('.hero-text-container');
            var heroText = $('.hero-text');
            var heroTextTitle = $('.hero-text-title');
            var heroTextStaggerItem = $('.hero-text-stagger-item');
            var heroImageContainer = $('.hero-image-container');
            var hero = $('.hero');
            var bennettHero = $('#bennett-hero');

            var sectionContent = $('.section-content');
            var sectionContentBackground = $('.section-content-bg');
            var sectionContentText = $('.section-content-text');
            var sectionContentSubheader = $('.section-content-subheader');
            var sectionContentParagraph = $('.section-content-paragraph');
            var staggerItem = $('.stagger-item');

            var mouseXOld = -1;
            var mouseXNew = 0;
            var mouseXFromOrigin = 0;
            var mouseXFromOriginToPercentage = 0;
            var mouseYOld = -1;
            var mouseYNew = 0;
            var mouseYFromOrigin = 0;
            var mouseYFromOriginToPercentage = 0;

            var bennettHue = 0;
            var resumeHue = 120;
            var portfolioHue = 275;
            var contactHue = 60;

            var currentActiveBackgroundZIndex = 11;

            var particleGravity = 0;

            var introTextIts = $('.intro-text-its');
            var introTextA = $('.intro-text-a');
            var introTextFun = $('.intro-text-fun');
            var introTextJourney = $('.intro-text-journey');
            var introTextAhead = $('.intro-text-ahead');

            var downtownLABackground = $('#downtown-la-bg');
            var agouraHillsBackground = $('#agoura-hills-bg');
            var pierBackground = $('#pier-bg');
            var desertBackground = $('#desert-bg');

            var buttons = $('#buttons');
            var button = $('.button');
            var bennettButton = $('#bennett-button');
            var resumeButton = $('#resume-button');
            var portfolioButton = $('#portfolio-button');
            var contactButton = $('#contact-button');

            var introTextSpace = 20;

            var section1Active = true;
            var section2Active = false;
            var section3Active = false;
            var section4Active = false;

            var snapInXEnd = 0;
            var snapInOpacityEnd = 0.5;
            var snapInDuration = 2;
            var snapInEase = Expo.easeInOut;
            var snapInStaggerDelay = 0.05;

            var snapInParentXStart = 650;
            var snapInParentXEnd = 0;
            var snapInParentZStart = 800;
            var snapInParentZEnd = 0;
            var snapInParentOpacityEnd = 1;
            var snapInParentDuration = 7.5;
            var snapInParentEase = Expo.easeOut;
            var snapInParentDelay = 0;

            var pageTransitionTextEase = Expo.easeOut;
            var backgroundTransitionEase = Expo.easeInOut;

            var introTextXEnd = introText.offset().left * -1;
            var introTextOpacityEnd = 1;
            var introTextDuration = 5;
            var introTextEase = Expo.easeOut;
            var introTextDelay = 1;

            var backgroundImagesXOld = 0;
            var backgroundImagesXNew = 0;
            var backgroundImagesYOld = 0;
            var backgroundImagesYNew = 0;

            var cursorOffsetOriginTracker;

            var introTextLetterXStart = $(window).width() * 0.1;
            var introTextLetterXEnd = 0;
            var introTextLetterOpacityEnd = 0.5;
            var introTextLetterOpacityDuration = 1;
            var introTextLetterXDuration = 2;
            var introTextLetterOpacityEase = Linear.easeNone;
            var introTextLetterXEase = Expo.easeInOut;
            var introTextLetterStaggerDelay = 0.05;
            var delayStep = 0.15;
            var introTextLetterFirstDelay = 0;
            var introTextLetterDelay = introTextLetterFirstDelay + delayStep;
            var thingsDelay = introTextLetterFirstDelay + (delayStep * 2);
            var initialIntroTextLetterFirstDelay = 1;
            var initialIntroTextLetterDelay = initialIntroTextLetterFirstDelay + delayStep;
            var initialThingsDelay = initialIntroTextLetterFirstDelay + (delayStep * 2);

            var phrase1Active = true;
            var phrase2Active = false;
            var phrase3Active = false;
            var phrase4Active = false;

            var introEnded = false;

            var initialIntroTextLetter = $('.initial-intro-text-letter');
            var introTextLetter = $('.intro-text-letter');
            var thingsLetter = $('.things-letter');

            var regSections = document.getElementById('sections');

            var sectionsMarginTop = Math.ceil(sections.css('margin-top').replace(/[^-\d\.]/g, ''));

            var topContentTotalHeight;

            var xOrigin;
            var yOrigin;

            var pageTransitioning = false;


            if (isChrome) {
                chromeChecker.hide();
            }

            $(window).resize(function initial() {
                TweenMax.set(heroTextContainer, {
                    perspective: 800,
                    perspectiveOrigin: 'center',
                    transformStyle: '2d'
                });
                TweenMax.set(heroText, {
                    transformOrigin: 'right'
                });
                TweenMax.set(heroTextContainer, {
                    top: (heroContainer.height() / 2) - (heroTextContainer.height() / 2)
                });
                if (introEnded) {
                    TweenMax.set(sectionContentBackground, {
                        height: sectionContentText.outerHeight()
                    });
                    TweenMax.set(heroTile, {
                        width: heroTileContainer.width() / 2
                    });
                }
                xOrigin = (originTracker.width() / 2);
                yOrigin = (originTracker.height() / 2);
                topContentTotalHeight = buttons.outerHeight() + introText.outerHeight() + Math.ceil(container.css('padding-top').replace(/[^-\d\.]/g, '')) + Math.ceil(sections.css('margin-top').replace(/[^-\d\.]/g, ''));
                TweenMax.set(sections, {
                    minHeight: $(window).height() - topContentTotalHeight
                });
                return initial;
            }());

            var logIt = function () {
                console.log('donenee');
            };

            var releaseButtons = function () {
                TweenMax.set(buttons, {
                    pointerEvents: 'auto'
                });
            };

            var getMouseCoord = function (e) {
                e.preventDefault();
                if (!isFirefox) {
                    $(window).resize(function initial() {
                        mouseXOld = mouseXNew;
                        mouseXNew = e.clientX;
                        mouseYOld = mouseYNew;
                        mouseYNew = e.clientY;
                        cursorOffsetOriginTracker = mouseYNew - originTracker.height();
                        mouseXFromOrigin = mouseXNew - xOrigin;
                        mouseXFromOriginToPercentage = (mouseXFromOrigin / ($(window).width() / 2)) * 100;
                        mouseYFromOrigin = mouseYNew - yOrigin;
                        mouseYFromOriginToPercentage = (mouseYFromOrigin / ($(window).height() / 2)) * 100;
                        backgroundImagesXOld = backgroundImagesXNew;
                        backgroundImagesXNew = (mouseXFromOriginToPercentage / 200);
                        backgroundImagesYOld = backgroundImagesYNew;
                        backgroundImagesYNew = (mouseYFromOriginToPercentage / 100);
                        TweenMax.set(backgroundImages, {
                            //                        x: backgroundImagesXNew,
                            //                        y: backgroundImagesYNew,
                            rotationX: (backgroundImagesYNew * 360) / 100,
                            rotationY: ((backgroundImagesXNew * 2) * 360) / 100
                        });
                        TweenMax.set(hero, {
                            //                        x: ((backgroundImagesXNew * 2) * 360) / 50,
                            //                        y: (backgroundImagesYNew * 360) / 50,
                            rotationX: (backgroundImagesYNew * 360) / 50,
                            rotationY: ((backgroundImagesXNew * 2) * 360) / 50
                        });
                        return initial;
                    }());
                }
            };

            window.addEventListener('mousemove', getMouseCoord, false);

            setTimeout(function () {
                TweenMax.set(button, {
                    y: 0
                });
                TweenMax.staggerTo(button, 1, {
                    scaleX: 1,
                    scaleY: 1,
                    ease: Elastic.easeOut,
                    delay: 0.5
                }, 0.1, releaseButtons);
            }, (introTextLetterXDuration * 1.8) * 1000);

            //            console.log(`Sections margin top: ${sectionsMarginTop}`);
            //
            //            console.log(`Buttons height: ${buttons.outerHeight()}`);
            //
            //            console.log(`Intro text height: ${introText.outerHeight()}`);
            //
            //            console.log(`Intro text offset top: ${introText.offset().top}`);
            //
            //            console.log(`Total: ${topContentTotalHeight}`);

            var snapInParent = function (parent, duration = 2, opacityEnd = 1, parentXStart = 0, parentXEnd = 0, parentZStart = 0, parentZEnd = 0, ease = Expo.easeInOut, staggerDelay = 0.05, parentDelay = 1) {
                TweenMax.set(parent, {
                    perspective: 800,
                    perspectiveOrigin: 'center',
                    transformStyle: '2d',
                    x: parentXStart,
                    z: parentZStart,
                    rotationY: 120,
                    opacity: 1
                });

                var parentTl = new TimelineMax();

                parentTl.to(parent, duration, {
                    x: parentXEnd,
                    z: parentZEnd,
                    rotationY: 0,
                    ease: ease,
                    delay: parentDelay
                }, 0);

                parentTl.to(parent, 0.75, {
                    y: 0,
                    ease: Back.easeInOut,
                    delay: -3.8,
                    onComplete: function () {
                        //                        TweenMax.set(section, {
                        //                            height: 'auto'
                        //                        });
                        afterIntro();
                    }
                });

                $(window).resize(function () {
                    if ($(window).width() <= 1280) {
                        likePhrase1PosY = 0;
                        likePhrase2PosY = `-${$('.intro-text-like').height()}`;
                        likePhrase3PosY = `-${$('.intro-text-like').height() * 2}`;
                        likePhrase4PosY = `-${$('.intro-text-like').height() * 3}`;
                        toPhrase1PosY = 0;
                        toPhrase2PosY = `-${$('.intro-text-to').height()}`;
                        toPhrase3PosY = `-${$('.intro-text-to').height() * 2}`;
                        toPhrase4PosY = `-${$('.intro-text-to').height() * 3}`;
                        makePhrase1PosY = 0;
                        makePhrase2PosY = `-${$('.intro-text-make').height()}`;
                        makePhrase3PosY = `-${$('.intro-text-make').height() * 2}`;
                        makePhrase4PosY = `-${$('.intro-text-make').height() * 3}`;
                        switch (true) {
                        case phrase1Active:
                            TweenMax.set(introTextLetterRowContainer, {
                                y: likePhrase1PosY
                            });
                            TweenMax.set(toLetterRowContainer, {
                                y: toPhrase1PosY
                            });
                            TweenMax.set(makeLetterRowContainer, {
                                y: makePhrase1PosY
                            });
                            break;
                        case phrase2Active:
                            TweenMax.set(introTextLetterRowContainer, {
                                y: likePhrase2PosY
                            });
                            TweenMax.set(toLetterRowContainer, {
                                y: toPhrase2PosY
                            });
                            TweenMax.set(makeLetterRowContainer, {
                                y: makePhrase2PosY
                            });
                            break;
                        case phrase3Active:
                            TweenMax.set(introTextLetterRowContainer, {
                                y: likePhrase3PosY
                            });
                            TweenMax.set(toLetterRowContainer, {
                                y: toPhrase3PosY
                            });
                            TweenMax.set(makeLetterRowContainer, {
                                y: makePhrase3PosY
                            });
                            break;
                        case phrase4Active:
                            TweenMax.set(introTextLetterRowContainer, {
                                y: likePhrase4PosY
                            });
                            TweenMax.set(toLetterRowContainer, {
                                y: toPhrase4PosY
                            });
                            TweenMax.set(makeLetterRowContainer, {
                                y: makePhrase4PosY
                            });
                            break;
                        }
                        TweenMax.set(heroImageContainer, {
                            opacity: 1,
                            clip: `rect(0, ${container.width() * 0.63}, ${container.width() * 0.24}, ${container.width() * 0.315})`
                        });
                    }
                    if ($(window).width() > 1280) {
                        likePhrase1PosY = 0;
                        likePhrase2PosY = `-${$('.intro-text-like').height()}`;
                        likePhrase3PosY = `-${$('.intro-text-like').height() * 2}`;
                        likePhrase4PosY = `-${$('.intro-text-like').height() * 3}`;
                        toPhrase1PosY = 0;
                        toPhrase2PosY = `-${$('.intro-text-to').height()}`;
                        toPhrase3PosY = `-${$('.intro-text-to').height() * 2}`;
                        toPhrase4PosY = `-${$('.intro-text-to').height() * 3}`;
                        makePhrase1PosY = 0;
                        makePhrase2PosY = `-${$('.intro-text-make').height()}`;
                        makePhrase3PosY = `-${$('.intro-text-make').height() * 2}`;
                        makePhrase4PosY = `-${$('.intro-text-make').height() * 3}`;
                        switch (true) {
                        case phrase1Active:
                            TweenMax.set(introTextLetterRowContainer, {
                                y: likePhrase1PosY
                            });
                            TweenMax.set(toLetterRowContainer, {
                                y: toPhrase1PosY
                            });
                            TweenMax.set(makeLetterRowContainer, {
                                y: makePhrase1PosY
                            });
                            break;
                        case phrase2Active:
                            TweenMax.set(introTextLetterRowContainer, {
                                y: likePhrase2PosY
                            });
                            TweenMax.set(toLetterRowContainer, {
                                y: toPhrase2PosY
                            });
                            TweenMax.set(makeLetterRowContainer, {
                                y: makePhrase2PosY
                            });
                            break;
                        case phrase3Active:
                            TweenMax.set(introTextLetterRowContainer, {
                                y: likePhrase3PosY
                            });
                            TweenMax.set(toLetterRowContainer, {
                                y: toPhrase3PosY
                            });
                            TweenMax.set(makeLetterRowContainer, {
                                y: makePhrase3PosY
                            });
                            break;
                        case phrase4Active:
                            TweenMax.set(introTextLetterRowContainer, {
                                y: likePhrase4PosY
                            });
                            TweenMax.set(toLetterRowContainer, {
                                y: toPhrase4PosY
                            });
                            TweenMax.set(makeLetterRowContainer, {
                                y: makePhrase4PosY
                            });
                            break;
                        }
                        TweenMax.set(heroImageContainer, {
                            //                            '-webkit-clip': 'rect(0px, 1050px, 400px, 525px)',
                            clip: 'rect(0px, 1050px, 400px, 525px)'
                        });
                    }
                    //                    TweenMax.set(introText, {
                    //                        y: 0
                    //                    });
                    //                    TweenMax.set(button, {
                    //                        y: 0
                    //                    });
                    //                    TweenMax.set(parent, {
                    //                        x: snapInParentXEnd
                    //                    });
                });
            }

            var checkLast = function () {
                console.log('last');
            }

            var resumeTextLetterContainer,
                haveArray,
                resumeTextLetter,
                initialLikeLetter,
                introTextLetterRow,
                introTextLetterToRow,
                codeRow,
                haveRow,
                loveRow,
                allRow,
                lotsRow,
                talkingRow,
                theRow,
                ofRow,
                aboutRow,
                introTextLetterRowContainer,
                toLetterRowContainer,
                makeLetterRowContainer,
                likePhrase1PosY,
                likePhrase2PosY,
                likePhrase3PosY,
                likePhrase4PosY,
                toPhrase1PosY,
                toPhrase2PosY,
                toPhrase3PosY,
                toPhrase4PosY,
                makePhrase1PosY,
                makePhrase2PosY,
                makePhrase3PosY,
                makePhrase4PosY,
                initialIntroTextLetterContainer;

            var createLikePhrases = function () {
                introTextLike.append('<div class="resume-text-letter-container intro-text-letter-row code-row"></div>');
                codeRow = $('.code-row');
                resumeTextLetterContainer = $('.resume-text-letter-container');
                codeArray = ['C', 'o', 'd', 'e'];
                haveArray = ['H', 'a', 'v', 'e'];
                loveArray = ['L', 'o', 'v', 'e'];
                for (var i = 0; i < 4; i++) {
                    resumeTextLetterContainer.append(`<div class="resume-text-letter">${codeArray[i]}</div>`);
                }
                initialLikeLetter = $('.initial-like-letter');
                initialLikeLetter.wrapAll("<div class='initial-intro-text-letter-container intro-text-letter-row'></div>");
                initialIntroTextLetterContainer = $('.initial-intro-text-letter-container');
                introTextLetterRow = $('.intro-text-letter-row');
                introTextLetterRow.wrapAll("<div class='intro-text-letter-row-container'></div>");
                introTextLetterRowContainer = $('.intro-text-letter-row-container');
                resumeTextLetter = $('.resume-text-letter');

                introTextLetterRowContainer.eq(0).append('<div class="resume-text-letter-container intro-text-letter-row have-row"></div>');
                haveRow = $('.have-row');
                introTextLetterRowContainer.eq(0).append('<div class="resume-text-letter-container intro-text-letter-row love-row"></div>');
                loveRow = $('.love-row');
                for (var i = 0; i < 4; i++) {
                    haveRow.append(`<div class="resume-text-letter">${haveArray[i]}</div>`);
                }
                for (var i = 0; i < 4; i++) {
                    loveRow.append(`<div class="resume-text-letter">${loveArray[i]}</div>`);
                }

                TweenMax.set(introTextItem, {
                    overflow: 'hidden',
                    height: '1em'
                });
                likePhrase1PosY = 0;
                likePhrase2PosY = `-${$('.intro-text-like').height()}`;
                likePhrase3PosY = `-${$('.intro-text-like').height() * 2}`;
                likePhrase4PosY = `-${$('.intro-text-like').height() * 3}`;
            }

            var createToPhrases = function () {
                //                introTextTo.append('<div class="resume-text-letter-container intro-text-letter-row all-row"></div>');
                //                allRow = $('.all-row');
                allArray = ['A', 'l', 'l'];
                lotsArray = ['L', 'o', 't', 's'];
                talkingArray = ['T', 'a', 'l', 'k', 'i', 'n', 'g'];
                initialToLetter = $('.initial-to-letter');
                initialToLetter.wrapAll("<div class='initial-intro-text-letter-container intro-text-letter-to-row'></div>");
                introTextLetterToRow = $('.intro-text-letter-to-row');
                introTextLetterToRow.wrapAll("<div class='intro-text-letter-row-container to-letter-row-container'></div>");
                toLetterRowContainer = $('.to-letter-row-container');

                toLetterRowContainer.append('<div class="resume-text-letter-container intro-text-letter-row all-row"></div>');
                allRow = $('.all-row');
                toLetterRowContainer.append('<div class="resume-text-letter-container intro-text-letter-row lots-row"></div>');
                lotsRow = $('.lots-row');
                toLetterRowContainer.append('<div class="resume-text-letter-container intro-text-letter-row talking-row"></div>');
                talkingRow = $('.talking-row');
                for (var i = 0; i < 3; i++) {
                    allRow.append(`<div class="resume-text-letter">${allArray[i]}</div>`);
                }
                for (var i = 0; i < 4; i++) {
                    lotsRow.append(`<div class="resume-text-letter">${lotsArray[i]}</div>`);
                }
                for (var i = 0; i < 7; i++) {
                    talkingRow.append(`<div class="resume-text-letter">${talkingArray[i]}</div>`);
                }

                TweenMax.set(introTextItem, {
                    overflow: 'hidden',
                    height: '1em'
                });
                toPhrase1PosY = 0;
                toPhrase2PosY = `-${$('.intro-text-to').height()}`;
                toPhrase3PosY = `-${$('.intro-text-to').height() * 2}`;
                toPhrase4PosY = `-${$('.intro-text-to').height() * 3}`;
            }

            var createMakePhrases = function () {
                //                introTextTo.append('<div class="resume-text-letter-container intro-text-letter-row all-row"></div>');
                //                allRow = $('.all-row');
                theArray = ['T', 'h', 'e'];
                ofArray = ['O', 'f'];
                aboutArray = ['A', 'b', 'o', 'u', 't'];
                initialMakeLetter = $('.initial-make-letter');
                initialMakeLetter.wrapAll("<div class='initial-intro-text-letter-container intro-text-letter-make-row'></div>");
                introTextLetterMakeRow = $('.intro-text-letter-make-row');
                introTextLetterMakeRow.wrapAll("<div class='intro-text-letter-row-container make-letter-row-container'></div>");
                makeLetterRowContainer = $('.make-letter-row-container');

                makeLetterRowContainer.append('<div class="resume-text-letter-container intro-text-letter-row the-row"></div>');
                theRow = $('.the-row');
                makeLetterRowContainer.append('<div class="resume-text-letter-container intro-text-letter-row of-row"></div>');
                ofRow = $('.of-row');
                makeLetterRowContainer.append('<div class="resume-text-letter-container intro-text-letter-row about-row"></div>');
                aboutRow = $('.about-row');
                for (var i = 0; i < 3; i++) {
                    theRow.append(`<div class="resume-text-letter">${theArray[i]}</div>`);
                }
                for (var i = 0; i < 2; i++) {
                    ofRow.append(`<div class="resume-text-letter">${ofArray[i]}</div>`);
                }
                for (var i = 0; i < 5; i++) {
                    aboutRow.append(`<div class="resume-text-letter">${aboutArray[i]}</div>`);
                }

                TweenMax.set(introTextItem, {
                    overflow: 'hidden',
                    height: '1em'
                });
                makePhrase1PosY = 0;
                makePhrase2PosY = `-${$('.intro-text-make').height()}`;
                makePhrase3PosY = `-${$('.intro-text-make').height() * 2}`;
                makePhrase4PosY = `-${$('.intro-text-make').height() * 3}`;
            }

            var createPhrases = function () {
                createLikePhrases();
                createToPhrases();
                createMakePhrases();
            };

            var snapInChild = function (child, brokenId, brokenClass, secondBrokenClass = null, opacityDuration = 2, xDuration = 2, opacityEnd = 1, brokenXStart = 300, brokenXEnd = 0, opacityEase = Expo.easeOut, xEase = Expo.easeInOut, staggerDelay = 0.05, brokenDelay = 0, lastItem = 0) {
                var childBroken = child.html().split("");
                child.html('');
                childBroken.map(function (item, i) {
                    if (secondBrokenClass !== null) {
                        child.append(`<div id="${brokenId}-${i}" class="${brokenClass} ${secondBrokenClass}">${item}</div>`);
                    } else {
                        child.append(`<div id="${brokenId}-${i}" class="${brokenClass}">${item}</div>`);
                    }
                });
                brokenIdCached = $(`.${brokenId}`);
                brokenClassCached = $(`.${secondBrokenClass}`);
                secondBrokenClassCached = $(`.${secondBrokenClass}`);
                TweenMax.set(child, {
                    transformOrigin: 'center',
                    opacity: 1
                });
                TweenMax.set(brokenClassCached, {
                    width: 'auto',
                    height: 'auto',
                    display: 'inline-block',
                    opacity: 0,
                    x: brokenXStart
                });
                TweenMax.set(secondBrokenClassCached, {
                    width: 'auto',
                    height: 'auto',
                    display: 'inline-block',
                    opacity: 0,
                    x: brokenXStart
                });
                TweenMax.staggerTo(secondBrokenClassCached, opacityDuration, {
                    opacity: opacityEnd,
                    ease: opacityEase,
                    delay: brokenDelay
                }, staggerDelay, 0);

                function allComplete() {
                    console.log('all complete');
                }

                if (lastItem) {
                    TweenMax.staggerTo(secondBrokenClassCached, xDuration, {
                        x: brokenXEnd,
                        ease: xEase,
                        delay: brokenDelay
                    }, staggerDelay, createPhrases);
                } else {
                    TweenMax.staggerTo(secondBrokenClassCached, xDuration, {
                        x: brokenXEnd,
                        ease: xEase,
                        delay: brokenDelay
                    }, staggerDelay, 0);
                }
            }

            $(window).scroll(function () {
                switch (true) {
                case ($(window).scrollTop() > $(window).outerHeight() / 2) && (!section2Active):
                    section1Active = false;
                    section2Active = true;
                    section3Active = false;
                    section4Active = false;

                    //                introTextTwoSnapIn(1, 0);
                    break;
                }
            });

            var introTextIndex = 0;

            var thingsIndex = 0;

            var introTextOneSnapIn = function (parentIndex, childIndex) {

                //I
                snapInChild(introTextI.eq(childIndex), `initial-i-letter`, `initial-i-letter`, `initial-intro-text-first-letter`, introTextLetterOpacityDuration, introTextLetterXDuration, 1, introTextLetterXStart, introTextLetterXEnd, introTextLetterOpacityEase, introTextLetterXEase, 0.05, initialIntroTextLetterFirstDelay);

                //LIKE
                snapInChild(introTextLike.eq(childIndex), `initial-like-letter`, `initial-like-letter`, `initial-intro-text-letter`, introTextLetterOpacityDuration, introTextLetterXDuration, 1, introTextLetterXStart, introTextLetterXEnd, introTextLetterOpacityEase, introTextLetterXEase, 0.05, initialIntroTextLetterDelay);

                //TO
                snapInChild(introTextTo.eq(childIndex), `initial-to-letter`, `initial-to-letter`, `initial-intro-text-letter`, introTextLetterOpacityDuration, introTextLetterXDuration, 1, introTextLetterXStart, introTextLetterXEnd, introTextLetterOpacityEase, introTextLetterXEase, 0.05, initialIntroTextLetterDelay);

                //MAKE
                snapInChild(introTextMake.eq(childIndex), `initial-make-letter`, `initial-make-letter`, `initial-intro-text-letter`, introTextLetterOpacityDuration, introTextLetterXDuration, 1, introTextLetterXStart, introTextLetterXEnd, introTextLetterOpacityEase, introTextLetterXEase, 0.05, initialIntroTextLetterDelay);

                //THINGS
                snapInChild(introTextThings.eq(childIndex), `initial-things-letter`, `initial-things-letter`, `initial-things-letter`, introTextLetterOpacityDuration, introTextLetterXDuration, 1, introTextLetterXStart, introTextLetterXEnd, introTextLetterOpacityEase, introTextLetterXEase, 0.05, initialThingsDelay, 1);

                //Intro Text
                snapInParent(introText.eq(parentIndex), snapInParentDuration, snapInParentOpacityEnd, snapInParentXStart, snapInParentXEnd, snapInParentZStart, snapInParentZEnd, snapInParentEase, 0.05, snapInParentDelay);
                snapInParent(introText.eq(parentIndex), snapInParentDuration, snapInParentOpacityEnd, snapInParentXStart, snapInParentXEnd, snapInParentZStart, snapInParentZEnd, snapInParentEase, 0.05, snapInParentDelay);
            }

            var introTextTwoSnapIn = function (parentIndex, childIndex) {

                //IT'S
                snapInChild(introTextIts.eq(childIndex), `intro-text-first-letter-${childIndex}`, introTextLetterOpacityDuration, introTextLetterXDuration, 1, introTextLetterXStart, introTextLetterXEnd, introTextLetterOpacityEase, introTextLetterXEase, 0.05, introTextLetterFirstDelay);

                //A
                snapInChild(introTextA.eq(childIndex), `intro-text-letter-${childIndex}`, introTextLetterOpacityDuration, introTextLetterXDuration, 1, introTextLetterXStart, introTextLetterXEnd, introTextLetterOpacityEase, introTextLetterXEase, 0.05, introTextLetterDelay);

                //FUN
                snapInChild(introTextFun.eq(childIndex), `intro-text-letter-${childIndex}`, introTextLetterOpacityDuration, introTextLetterXDuration, 1, introTextLetterXStart, introTextLetterXEnd, introTextLetterOpacityEase, introTextLetterXEase, 0.05, introTextLetterDelay);

                //JOURNEY
                snapInChild(introTextJourney.eq(childIndex), `intro-text-letter-${childIndex}`, introTextLetterOpacityDuration, introTextLetterXDuration, 1, introTextLetterXStart, introTextLetterXEnd, introTextLetterOpacityEase, introTextLetterXEase, 0.05, introTextLetterDelay);

                //AHEAD
                snapInChild(introTextAhead.eq(childIndex), `things-letter-${childIndex}`, introTextLetterOpacityDuration, introTextLetterXDuration, 1, introTextLetterXStart, introTextLetterXEnd, introTextLetterOpacityEase, introTextLetterXEase, 0.05, thingsDelay);

                //Intro Text
                snapInParent(introText.eq(parentIndex), 5, 1, 100, introText.eq(parentIndex).offset().left * -1, Expo.easeOut, 0.05, introTextLetterFirstDelay);
            }

            introTextOneSnapIn(0, 0);

            TweenMax.set(overlay, {
                perspective: 800,
                perspectiveOrigin: 'center',
                transformStyle: '2d'
            });

            TweenMax.set(introText, {
                perspective: 800,
                perspectiveOrigin: 'center',
                transformStyle: '2d',
                y: $(window).width() * 0.1715
            });

            //            TweenMax.set(buttons, {
            //                y: $(window).width() * 0.1715
            //            });

            TweenMax.set(introTextItem, {
                transformOrigin: 'center'
            });

            TweenMax.set(introTextLetter, {
                opacity: 0
            });

            TweenMax.set(thingsLetter, {
                opacity: 0
            });

            TweenMax.set(backgroundImage.not('#downtown-la-bg'), {
                filter: `blur(${backgroundBlurStartInitial}px)`
            });

            TweenMax.set(button, {
                scaleX: 0,
                scaleY: 0.5,
                opacity: 1
            });

            TweenMax.set(agouraHillsBackground, {
                z: 20,
                opacity: 1,
                onComplete: function () {
                    TweenMax.set(downtownLABackground, {
                        z: 20,
                        opacity: 1
                    });
                    TweenMax.set(agouraHillsBackground, {
                        z: 10,
                        opacity: 1,
                        onComplete: function () {
                            TweenMax.set(cover, {
                                display: 'none'
                            });
                        }
                    });
                }
            });

            TweenMax.set($('#my-canvas'), {
                userSelect: 'none'
            });

            TweenMax.set(container, {
                perspective: 800,
                perspectiveOrigin: 'center',
                userSelect: 'none'
            });

            TweenMax.set(wrapper, {
                perspective: 1600,
                perspectiveOrigin: 'center',
                userSelect: 'none'
            });

            TweenMax.set(sections, {
                perspective: 800,
                perspectiveOrigin: 'center',
                transformStyle: '2d'
            });

            $(window).resize(function initial() {
                TweenMax.set(backgroundImage, {
                    minWidth: $(window).width() * 1.25
                });
                TweenMax.set(backgroundImage, {
                    minHeight: $(window).height() * 1.25
                });
                TweenMax.set(backgroundImage, {
                    top: (backgroundImages.outerHeight() / 2) - (backgroundImage.outerHeight() / 2),
                    left: (backgroundImages.outerWidth() / 2) - (backgroundImage.outerWidth() / 2)
                });
                TweenMax.set(heroImageContainer, {
                    perspective: 800,
                    perspectiveOrigin: 'center',
                    transformStyle: '2d'
                });
                TweenMax.set(hero, {
                    minWidth: (heroImageContainer.width() / 2) * 1.05
                });
                TweenMax.set(hero, {
                    //                    minHeight: (heroImageContainer.height() / 2) * 1.05
                });
                TweenMax.set(hero, {
                    left: (heroImageContainer.width() / 4) * 0.6,
                    top: (heroImageContainer.height() / 2) - (hero.height() / 2),
                    //                    left: (heroImageContainer.width() / 2) - (hero.width() / 2),
                    //                    top: (heroImageContainer.height() / 2) - (hero.height() / 2)
                });
                return initial;
            }());

            TweenMax.set(section.eq(0), {
                //                height: container.outerHeight() - sectionsMarginTopInt,
                opacity: 1
            });

            TweenMax.to(header, 1, {
                opacity: 1,
                scaleX: 1,
                scaleY: 1,
                delay: 0.75,
                ease: Elastic.easeOut,
                onComplete: function () {
                    TweenMax.set(header, {
                        pointerEvents: 'auto'
                    });
                }
            }, 0);

            const random = function (min, max) {
                return Math.ceil(Math.random() * (max - min) + min);
            }

            var canvas = document.getElementById('my-canvas'),
                c = canvas.getContext('2d'),
                particles = {},
                particleIndex = 0,
                particleNum = 4;

            $(window).resize(function initial() {

                c.fillStyle = 'black';
                c.fillRect(0, 0, canvas.width, canvas.height);

                canvas.width = $('#my-canvas').outerWidth();
                canvas.height = $('#my-canvas').outerHeight();
                return initial;
            }());

            var reloadTime = 2000;

            //            var panel = QuickSettings.create()
            //                .addRange('Multiplier', 0, 1, 0.5, 0.01, Particle.prototype.draw);

            function Particle() {
                this.width = random(10, 50);
                this.height = this.width;
                this.radius = this.width / 2;
                this.x = random(0, canvas.width);
                this.y = random(0, canvas.height);
                this.vxRate = 0.5;
                this.vyRate = 0;
                this.vyRateStep = 0.1;
                this.lifeRate = 50;
                this.vx = random(-15, 15) * 0.1;
                this.vy = Math.random() * (10 * this.vyRate) - (5 * this.vyRate);
                this.gravity = particleGravity;
                particleIndex++;
                particles[particleIndex] = this;
                this.id = particleIndex;
                this.life = 0;
                this.hue = random(210, 360);
                this.r = random(0, 255);
                this.g = random(0, 255);
                this.b = random(0, 255);
                this.maxLife = 300;
                this.alpha = 0;
                this.alphaChange = 0.005;
                this.alphaMax = random(0, 50) * 0.1;
                this.hitHalf = false;
                this.shapeDecider = random(0, 20);
                this.counter = 0;
                this.speedMultiplier = 0.1;
                this.speed = random(1, 5) * this.speedMultiplier;
                var grav = this.gravity;
            }

            Particle.prototype.draw = function () {
                if (this.vyRate >= 5) {
                    this.vyRateStep *= -1;
                }
                if (this.vyRate <= 0) {
                    this.vyRateStep *= -1;
                }
                if ((this.alpha <= 0.5) && (this.counter == 0)) {
                    this.alpha += this.alphaChange;
                    this.hitHalf = true;
                }
                if (this.alpha >= 0.5) {
                    this.counter++;
                    this.alpha -= this.alphaChange;
                }
                if (this.counter != 0) {
                    this.alpha -= this.alphaChange;
                }
                this.color = 'hsla(' + this.hue + ',50%,50%,' + this.alpha + ')';
                this.whiteColor = 'hsla(' + this.hue + ',100%,100%,' + this.alpha + ')';
                this.x += this.vx * this.speed;
                this.y += this.vy * this.speed;
                this.vy += this.gravity;
                this.life++;
                if (this.life >= this.maxLife) {
                    delete particles[this.id];
                }

                if (this.shapeDecider < 10) {
                    c.fillStyle = this.color;
                    c.fillRect(this.x, this.y, this.width, this.height);
                } else {
                    c.beginPath();
                    c.fillStyle = this.color;
                    c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
                    c.fill();
                }
            }

            var raf = function (item) {
                window.requestAnimationFrame(item);
            }

            var fps = 60;
            var now;
            var then = Date.now();
            var interval = 1000 / fps;
            var delta;

            var drawParticles = function () {
                raf(drawParticles);
                now = Date.now();
                delta = now - then;

                if (delta > interval) {
                    // update time stuffs

                    // Just `then = now` is not enough.
                    // Lets say we set fps at 10 which means
                    // each frame must take 100ms
                    // Now frame executes in 16ms (60fps) so
                    // the loop iterates 7 times (16*7 = 112ms) until
                    // delta > interval === true
                    // Eventually this lowers down the FPS as
                    // 112*10 = 1120ms (NOT 1000ms).
                    // So we have to get rid of that extra 12ms
                    // by subtracting delta (112) % interval (100).
                    // Hope that makes sense.

                    then = now - (delta % interval);
                    c.globalCompositeOperation = 'source-over';
                    c.fillStyle = 'rgba(0,0,0,0)';
                    c.clearRect(0, 0, canvas.width, canvas.height);

                    for (var i = 0; i < particleNum; i++) {
                        new Particle();
                    }

                    c.globalCompositeOperation = 'lighter';


                    for (var i in particles) {
                        particles[i].draw();
                    }
                }
            };


            drawParticles();

            header.on('mouseover', function () {
                TweenMax.to($(this), 0.75, {
                    backgroundColor: 'white',
                    color: 'black',
                    ease: Expo.easeOut
                }, 0);
                TweenMax.to($(this), 1, {
                    scale: 1.3,
                    ease: Elastic.easeOut
                }, 0);
            });

            header.on('mouseout', function () {
                TweenMax.to($(this), 0.5, {
                    scale: 1,
                    backgroundColor: 'black',
                    color: 'white',
                    ease: Expo.easeOut
                }, 0);
            });
            var hueStart = 0;
            // a step of 3 will travel exactly 180 degrees of hue rotation in 1 second
            var hueStep = 3;
            var hueCounter = 0;

            var toBennett = function () {

                backgroundBlurContactStart = backgroundBlurStartInitial;

                TweenMax.set(downtownLABackground, {
                    opacity: 0,
                    zIndex: currentActiveBackgroundZIndex++,
                    z: 400,
                    filter: `blur(${backgroundBlurContactStart}px)`
                });
                TweenMax.set(buttons, {
                    pointerEvents: 'none'
                });
                TweenMax.to(downtownLABackground, 0.5, {
                    opacity: 1
                }, 0);
                TweenMax.to(downtownLABackground, 1, {
                    z: 0,
                    ease: backgroundTransitionEase,
                    onComplete: function () {
                        TweenMax.set(backgroundImage.not('#downtown-la-bg'), {
                            opacity: 0
                        });
                    }
                }, 0);
                TweenMax.to(backgroundImage.not('#downtown-la-bg'), 1, {
                    z: -400,
                    ease: backgroundTransitionEase
                }, 0);

                function rotateCanvasHue() {
                    if (!isFirefox) {
                        if ((hueStart >= bennettHue - hueStep) && (hueStart <= bennettHue + hueStep)) {
                            return;
                        } else {
                            if (hueStart >= bennettHue) {
                                hueStart -= hueStep;
                            }
                            if (hueStart <= bennettHue) {
                                hueStart += hueStep;
                            }
                        }
                        TweenMax.set(document.getElementById('my-canvas'), {
                            filter: `hue-rotate(${hueStart}deg)`
                        });
                        window.requestAnimationFrame(rotateCanvasHue);
                    } else {
                        TweenMax.set(document.getElementById('my-canvas'), {
                            filter: 'hue-rotate(' + random(bennettHue - hueStep, bennettHue + hueStep) + 'deg)'
                        });
                        window.requestAnimationFrame(rotateCanvasHue);
                    }
                }
                window.requestAnimationFrame(rotateCanvasHue);

                function blurAnimation() {
                    if (backgroundBlurContactStart > 1) {
                        backgroundBlurContactStart -= (backgroundBlurStep / 6);
                        TweenMax.set(downtownLABackground, {
                            filter: `blur(${backgroundBlurContactStart}px)`
                        });
                        window.requestAnimationFrame(blurAnimation);
                    } else {
                        window.cancelAnimationFrame(blurAnimation);
                        TweenMax.set(downtownLABackground, {
                            filter: `blur(${backgroundBlurEnd}px)`
                        });
                        //                        TweenMax.set(backgroundImage.not('#downtown-la-bg'), {
                        //                            z: 10
                        //                        });
                    }
                }

                window.requestAnimationFrame(blurAnimation);
            };

            var toResume = function () {

                backgroundBlurContactStart = backgroundBlurStartInitial;

                TweenMax.set(agouraHillsBackground, {
                    opacity: 0,
                    zIndex: currentActiveBackgroundZIndex++,
                    z: 400,
                    filter: `blur(${backgroundBlurContactStart}px)`
                });
                TweenMax.set(buttons, {
                    pointerEvents: 'none'
                });

                TweenMax.to(agouraHillsBackground, 0.5, {
                    opacity: 1
                }, 0);
                TweenMax.to(agouraHillsBackground, 1, {
                    z: 0,
                    ease: backgroundTransitionEase,
                    onComplete: function () {
                        TweenMax.set(backgroundImage.not('#agoura-hills-bg'), {
                            opacity: 0
                        });
                    }
                }, 0);
                TweenMax.to(backgroundImage.not('#agoura-hills-bg'), 1, {
                    z: -400,
                    ease: backgroundTransitionEase
                }, 0);

                function rotateCanvasHue() {
                    if (!isFirefox) {
                        if ((hueStart >= resumeHue - hueStep) && (hueStart <= resumeHue + hueStep)) {
                            return;
                        } else {
                            if (hueStart >= resumeHue) {
                                hueStart -= hueStep;
                            }
                            if (hueStart <= resumeHue) {
                                hueStart += hueStep;
                            }
                        }
                        TweenMax.set(document.getElementById('my-canvas'), {
                            filter: `hue-rotate(${hueStart}deg)`
                        });
                        window.requestAnimationFrame(rotateCanvasHue);
                    } else {
                        TweenMax.set(document.getElementById('my-canvas'), {
                            filter: 'hue-rotate(' + random(resumeHue - hueStep, resumeHue + hueStep) + 'deg)'
                        });
                        window.requestAnimationFrame(rotateCanvasHue);
                    }
                }
                window.requestAnimationFrame(rotateCanvasHue);

                function blurAnimation() {
                    if (backgroundBlurContactStart > 1) {
                        backgroundBlurContactStart -= (backgroundBlurStep / 6);
                        TweenMax.set(agouraHillsBackground, {
                            filter: `blur(${backgroundBlurContactStart}px)`
                        });
                        window.requestAnimationFrame(blurAnimation);
                    } else {
                        window.cancelAnimationFrame(blurAnimation);
                        TweenMax.set(agouraHillsBackground, {
                            filter: `blur(${backgroundBlurEnd}px)`
                        });
                        //                        TweenMax.set(backgroundImage.not('#desert-bg'), {
                        //                            z: 10
                        //                        });
                    }
                }

                window.requestAnimationFrame(blurAnimation);
            };

            var toPortfolio = function () {

                backgroundBlurContactStart = backgroundBlurStartInitial;

                TweenMax.set(pierBackground, {
                    opacity: 0,
                    zIndex: currentActiveBackgroundZIndex++,
                    z: 400,
                    filter: `blur(${backgroundBlurContactStart}px)`
                });
                TweenMax.set(buttons, {
                    pointerEvents: 'none'
                });

                TweenMax.to(pierBackground, 0.5, {
                    opacity: 1
                }, 0);
                TweenMax.to(pierBackground, 1, {
                    z: 0,
                    ease: backgroundTransitionEase,
                    onComplete: function () {
                        TweenMax.set(backgroundImage.not('#pier-bg'), {
                            opacity: 0
                        });
                    }
                }, 0);
                TweenMax.to(backgroundImage.not('#pier-bg'), 1, {
                    z: -400,
                    ease: backgroundTransitionEase
                }, 0);

                function rotateCanvasHue() {
                    if (!isFirefox) {
                        if ((hueStart >= portfolioHue - hueStep) && (hueStart <= portfolioHue + hueStep)) {
                            return;
                        } else {
                            if (hueStart >= portfolioHue) {
                                hueStart -= hueStep;
                            }
                            if (hueStart <= portfolioHue) {
                                hueStart += hueStep;
                            }
                        }
                        TweenMax.set(document.getElementById('my-canvas'), {
                            filter: `hue-rotate(${hueStart}deg)`
                        });
                        window.requestAnimationFrame(rotateCanvasHue);
                    } else {
                        TweenMax.set(document.getElementById('my-canvas'), {
                            filter: 'hue-rotate(' + random(portfolioHue - hueStep, portfolioHue + hueStep) + 'deg)'
                        });
                        window.requestAnimationFrame(rotateCanvasHue);
                    }
                }
                window.requestAnimationFrame(rotateCanvasHue);

                function blurAnimation() {
                    if (backgroundBlurContactStart > 1) {
                        backgroundBlurContactStart -= (backgroundBlurStep / 6);
                        TweenMax.set(pierBackground, {
                            filter: `blur(${backgroundBlurContactStart}px)`
                        });
                        window.requestAnimationFrame(blurAnimation);
                    } else {
                        window.cancelAnimationFrame(blurAnimation);
                        TweenMax.set(pierBackground, {
                            filter: `blur(${backgroundBlurEnd}px)`
                        });
                        //                        TweenMax.set(backgroundImage.not('#desert-bg'), {
                        //                            z: 10
                        //                        });
                    }
                }

                window.requestAnimationFrame(blurAnimation);
            };

            var toContact = function () {

                backgroundBlurContactStart = backgroundBlurStartInitial;

                TweenMax.set(desertBackground, {
                    opacity: 0,
                    zIndex: currentActiveBackgroundZIndex++,
                    z: 400,
                    filter: `blur(${backgroundBlurContactStart}px)`
                });
                TweenMax.set(buttons, {
                    pointerEvents: 'none'
                });

                TweenMax.to(desertBackground, 0.5, {
                    opacity: 1
                }, 0);
                TweenMax.to(desertBackground, 1, {
                    z: 0,
                    ease: backgroundTransitionEase,
                    onComplete: function () {
                        TweenMax.set(backgroundImage.not('#desert-bg'), {
                            opacity: 0
                        });
                    }
                }, 0);
                TweenMax.to(backgroundImage.not('#desert-bg'), 1, {
                    z: -400,
                    ease: backgroundTransitionEase
                }, 0);

                function rotateCanvasHue() {
                    if (!isFirefox) {
                        if ((hueStart >= contactHue - hueStep) && (hueStart <= contactHue + hueStep)) {
                            return;
                        } else {
                            if (hueStart >= contactHue) {
                                hueStart -= hueStep;
                            }
                            if (hueStart <= contactHue) {
                                hueStart += hueStep;
                            }
                        }
                        TweenMax.set(document.getElementById('my-canvas'), {
                            filter: `hue-rotate(${hueStart}deg)`
                        });
                        window.requestAnimationFrame(rotateCanvasHue);
                    } else {
                        TweenMax.set(document.getElementById('my-canvas'), {
                            filter: 'hue-rotate(' + random(contactHue - hueStep, contactHue + hueStep) + 'deg)'
                        });
                        window.requestAnimationFrame(rotateCanvasHue);
                    }
                }
                window.requestAnimationFrame(rotateCanvasHue);

                function blurAnimation() {
                    if (backgroundBlurContactStart > 1) {
                        backgroundBlurContactStart -= (backgroundBlurStep / 6);
                        TweenMax.set(desertBackground, {
                            filter: `blur(${backgroundBlurContactStart}px)`
                        });
                        window.requestAnimationFrame(blurAnimation);
                    } else {
                        window.cancelAnimationFrame(blurAnimation);
                        TweenMax.set(desertBackground, {
                            filter: `blur(${backgroundBlurEnd}px)`
                        });
                        //                        TweenMax.set(backgroundImage.not('#desert-bg'), {
                        //                            z: 10
                        //                        });
                    }
                }

                window.requestAnimationFrame(blurAnimation);
            };

            bennettButton.on('click', function () {
                //                window.removeEventListener('mousemove', getMouseCoord, false);
                if (!pageTransitioning) {
                    pageTransitioning = true;
                    if (!($(this).hasClass('active-button'))) {
                        bennettButton.removeClass('active-button').addClass('active-button');
                        button.not('#bennett-button').removeClass('active-button');
                        toBennett();
                        phrase1Active = true;
                        phrase2Active = false;
                        phrase3Active = false;
                        phrase4Active = false;
                        TweenMax.to(introTextLetterRowContainer, 1, {
                            y: likePhrase1PosY,
                            ease: pageTransitionTextEase
                        }, 0);
                        TweenMax.to(toLetterRowContainer, 1, {
                            y: toPhrase1PosY,
                            ease: pageTransitionTextEase,
                            delay: 0.1
                        }, 0);
                        TweenMax.to(makeLetterRowContainer, 1, {
                            y: makePhrase1PosY,
                            ease: pageTransitionTextEase,
                            delay: 0.2,
                            onComplete: function () {
                                pageTransitioning = false;
                                TweenMax.set(buttons, {
                                    pointerEvents: 'auto'
                                });
                                //                            window.addEventListener('mousemove', getMouseCoord, false);
                            }
                        }, 0);
                    }
                }
            });

            resumeButton.on('click', function () {
                //                window.removeEventListener('mousemove', getMouseCoord, false);
                if (!pageTransitioning) {
                    pageTransitioning = true;
                    if (!($(this).hasClass('active-button'))) {
                        resumeButton.removeClass('active-button').addClass('active-button');
                        button.not('#resume-button').removeClass('active-button');
                        toResume();
                        phrase1Active = false;
                        phrase2Active = true;
                        phrase3Active = false;
                        phrase4Active = false;
                        TweenMax.to(introTextLetterRowContainer, 1, {
                            y: likePhrase2PosY,
                            ease: pageTransitionTextEase
                        }, 0);
                        TweenMax.to(toLetterRowContainer, 1, {
                            y: toPhrase2PosY,
                            ease: pageTransitionTextEase,
                            delay: 0.1
                        }, 0);
                        TweenMax.to(makeLetterRowContainer, 1, {
                            y: makePhrase2PosY,
                            ease: pageTransitionTextEase,
                            delay: 0.2,
                            onComplete: function () {
                                pageTransitioning = false;
                                TweenMax.set(buttons, {
                                    pointerEvents: 'auto'
                                });
                                //                            window.addEventListener('mousemove', getMouseCoord, false);
                            }
                        }, 0);
                    }
                }
            });

            portfolioButton.on('click', function () {
                //                window.removeEventListener('mousemove', getMouseCoord, false);
                if (!pageTransitioning) {
                    pageTransitioning = true;
                    if (!($(this).hasClass('active-button'))) {
                        portfolioButton.removeClass('active-button').addClass('active-button');
                        button.not('#portfolio-button').removeClass('active-button');
                        toPortfolio();
                        phrase1Active = false;
                        phrase2Active = false;
                        phrase3Active = true;
                        phrase4Active = false;
                        TweenMax.to(introTextLetterRowContainer, 1, {
                            y: likePhrase3PosY,
                            ease: pageTransitionTextEase
                        }, 0);
                        TweenMax.to(toLetterRowContainer, 1, {
                            y: toPhrase3PosY,
                            ease: pageTransitionTextEase,
                            delay: 0.1
                        }, 0);
                        TweenMax.to(makeLetterRowContainer, 1, {
                            y: makePhrase3PosY,
                            ease: pageTransitionTextEase,
                            delay: 0.2,
                            onComplete: function () {
                                pageTransitioning = false;
                                TweenMax.set(buttons, {
                                    pointerEvents: 'auto'
                                });
                                //                            window.addEventListener('mousemove', getMouseCoord, false);
                            }
                        }, 0);
                    }
                }
            });

            contactButton.on('click', function () {
                //                window.removeEventListener('mousemove', getMouseCoord, false);
                if (!pageTransitioning) {
                    pageTransitioning = true;
                    if (!($(this).hasClass('active-button'))) {
                        contactButton.removeClass('active-button').addClass('active-button');
                        button.not('#contact-button').removeClass('active-button');
                        toContact();
                        phrase1Active = false;
                        phrase2Active = false;
                        phrase3Active = false;
                        phrase4Active = true;
                        TweenMax.to(introTextLetterRowContainer, 1, {
                            y: likePhrase4PosY,
                            ease: pageTransitionTextEase
                        }, 0);
                        TweenMax.to(toLetterRowContainer, 1, {
                            y: toPhrase4PosY,
                            ease: pageTransitionTextEase,
                            delay: 0.1
                        }, 0);
                        TweenMax.to(makeLetterRowContainer, 1, {
                            y: makePhrase4PosY,
                            ease: pageTransitionTextEase,
                            delay: 0.2,
                            onComplete: function () {
                                pageTransitioning = false;
                                TweenMax.set(buttons, {
                                    pointerEvents: 'auto'
                                });
                                //                            window.addEventListener('mousemove', getMouseCoord, false);
                            }
                        }, 0);
                    }
                }
            });

            chromeCheckerClose.on('click', function () {
                TweenMax.to(chromeChecker, 0.5, {
                    y: -50,
                    ease: Quart.easeInOut,
                    onComplete: function () {
                        chromeChecker.hide();
                    }
                }, 0);
            });

            var afterIntro = function () {
                introEnded = true;
                //                TweenMax.set($('body, html'), {
                //                    overflowY: 'initial'
                //                });
                //                TweenMax.set(container, {
                //                    overflowY: 'initial'
                //                });
                TweenMax.set(sections, {
                    overflow: 'initial'
                });
                if ($(window).width() <= 1280) {
                    TweenMax.set(heroImageContainer, {
                        opacity: 1,
                        clip: `rect(0, ${container.width() * 0.315}, ${container.width() * 0.24}, ${container.width() * 0.315})`
                    });
                }
                if ($(window).width() > 1280) {
                    TweenMax.set(heroImageContainer, {
                        opacity: 1,
                        clip: 'rect(0px, 525px, 400px, 525px)'
                    });
                }
                TweenMax.set(sectionContentBackground, {
                    opacity: 1,
                    height: 0
                });
                TweenMax.set(staggerItem, {
                    opacity: 0,
                    y: 50
                });
                TweenMax.set(heroImageContainer, {
                    x: (heroContainer.width() / 2) - (heroImageContainer.width() / 2)
                });
                TweenMax.set(hero, {
                    left: (heroImageContainer.width() / 4) * 0.6,
                    top: (heroImageContainer.height() / 2) - (hero.height() / 2),
                });
                TweenMax.set(heroTile, {
                    opacity: 1,
                    backgroundColor: 'rgba(255,255,255,1)',
                    width: 0
                });
                TweenMax.to(heroTile, 0.75, {
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    ease: Quad.easeIn
                }, -0.2);
                TweenMax.to(heroTile, 1, {
                    width: heroTileContainer.width() / 2,
                    ease: Expo.easeOut
                }, -0.2);
                var currentHeroTextWidth;
                var heroTextSetStagger = 0;
                var heroTextToStagger = 0;
                var currentHeroText;
                var heroTextWidths = [
                        heroText.eq(0).width(),
                        heroText.eq(1).width(),
                        heroText.eq(2).width(),
                        heroText.eq(3).width()
                ];
                TweenMax.set(heroText, {
                    opacity: 1,
                    scaleX: 0,
                    x: 100
                });
                TweenMax.staggerTo(heroTextStaggerItem, 1.5, {
                    scaleX: 1,
                    ease: Expo.easeOut
                }, 0.1);
                TweenMax.staggerTo(heroTextStaggerItem, 1, {
                    x: 0,
                    ease: Back.easeOut.config(8)
                }, 0.1, 0);
                if ($(window).width() <= 1280) {
                    TweenMax.to(heroImageContainer, 1, {
                        clip: `rect(0, ${container.width() * 0.63}, ${container.width() * 0.24}, ${container.width() * 0.315})`,
                        x: 0,
                        ease: Expo.easeOut,
                        delay: 0.4
                    }, 0);
                }
                if ($(window).width() > 1280) {
                    TweenMax.to(heroImageContainer, 1, {
                        clip: 'rect(0px, 1050px, 400px, 525px)',
                        x: 0,
                        ease: Expo.easeOut,
                        delay: 0.4
                    }, 0);
                }
                TweenMax.to(hero, 1, {
                    left: (heroImageContainer.width() / 4) * 0.6,
                    top: (heroImageContainer.height() / 2) - (hero.height() / 2),
                    ease: Expo.easeOut,
                    delay: 0.4
                }, 0);
                TweenMax.to(sectionContentBackground, 1, {
                    height: sectionContentText.outerHeight(),
                    ease: Expo.easeInOut,
                    delay: 0.8
                }, 0);
                TweenMax.staggerTo(staggerItem, 1, {
                    opacity: 1,
                    y: 0,
                    ease: Expo.easeOut,
                    delay: 1.2
                }, 0.1);
            }
            var heroHue = 0;
            var rotateHeroHue = function () {
                TweenMax.set(heroImageContainer, {
                    filter: `hue-rotate(${heroHue+=2}deg)`
                });
                TweenMax.set(introTextThings, {
                    filter: `hue-rotate(${heroHue+=1}deg)`
                });

                window.requestAnimationFrame(rotateHeroHue);
            };

            window.requestAnimationFrame(rotateHeroHue);

        });

    });

}