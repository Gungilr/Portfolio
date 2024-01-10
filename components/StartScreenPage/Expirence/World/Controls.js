import * as THREE from "three";
import Expirence from "../Experience";
import GSAP from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import ASScroll from "@ashthornton/asscroll";

export default class Controls{
    constructor(){
        this.expirence = new Expirence();
        this.scene = this.expirence.scene;
        this.resources = this.expirence.resources;
        this.time = this.expirence.time;
        this.sizes = this.expirence.sizes;
        this.camera = this.expirence.camera;
        this.room = this.expirence.world.room.actualRoom;
        this.floor = this.expirence.world.floor;
        this.room.children.forEach(child=>{
            if(child.type === "RectAreaLight")
            {
                this.rectLight = child;
            }
        });
        GSAP.registerPlugin(ScrollTrigger);
        this.mm = GSAP.matchMedia();

        this.circleFirst = this.expirence.world.floor.circleFirst;
        this.circleSecond = this.expirence.world.floor.circleSecond;
        this.circleThird = this.expirence.world.floor.circleThird;

        document.querySelector(".page").style.overflow = "visible";

        this.setSmoothScroll();
        this.setScrollTrigger();
    }

    setupASScroll() {
        // https://github.com/ashthornton/asscroll
        const asscroll = new ASScroll({
            ease: 0.3,
            disableRaf: true,
        });

        GSAP.ticker.add(asscroll.update);

        ScrollTrigger.defaults({
            scroller: asscroll.containerElement,
        });

        ScrollTrigger.scrollerProxy(asscroll.containerElement, {
            scrollTop(value) {
                if (arguments.length) {
                    asscroll.currentPos = value;
                    return;
                }
                return asscroll.currentPos;
            },
            getBoundingClientRect() {
                return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight,
                };
            },
            fixedMarkers: true,
        });

        asscroll.on("update", ScrollTrigger.update);
        ScrollTrigger.addEventListener("refresh", asscroll.resize);

        requestAnimationFrame(() => {
            asscroll.enable({
                newScrollElements: document.querySelectorAll(
                    ".gsap-marker-start, .gsap-marker-end, [asscroll]"
                ),
            });
        });
        return asscroll;
    }

    setSmoothScroll() {
        this.asscroll = this.setupASScroll();
    }

    setScrollTrigger()
    {
        this.mm.add("(min-width: 969px)", () => {

            this.room.scale.set(0.11, 0.11, 0.11);
            this.rectLight.width = 0.5;
            this.rectLight.height = 0.7;
            this.camera.orthographicCamera.position.set(0, 6.5, 10);
            this.room.position.set(0, 0, 0);

            // first section ------------------------------------------------------------------
            this.firstMoveTimeline = new GSAP.timeline({
                scrollTrigger: {
                    trigger: ".first-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                    // markers: true,
                    invalidateOnRefresh: true,
                },
            });
            this.firstMoveTimeline.fromTo(
                this.room.position,
                { x: 0, y: 0, z: 0 },
                {
                    x: () => {
                        return this.sizes.width * 0.001;
                    },
                }
            );

            // Second section ------------------------------------------------------------------
            this.secondMoveTimeline = new GSAP.timeline({
                scrollTrigger: {
                    trigger: ".second-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                    // markers: true,
                    invalidateOnRefresh: true,
                },
            });

            this.secondMoveTimeline.to(
                this.room.position,
                {
                    x: () => {
                        return 1;
                    },
                    
                    z:()=>{
                        return this.sizes.height * 0.0032;
                    },
                },
                "same"
            );

            this.secondMoveTimeline.to(
                this.room.scale,
                {
                    x: 0.4,
                    y: 0.4,
                    z: 0.4,
                },
                "same"
            );
            this.secondMoveTimeline.to(
                this.rectLight,
                {
                    width: 0.6 * 4,
                    height: 0.9 * 4.
                     
                },
                "same"
            );   
            // Third section ------------------------------------------------------------------
            this.ThirdMoveTimeline = new GSAP.timeline({
                scrollTrigger: {
                    trigger: ".third-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                    // markers: true,
                    invalidateOnRefresh: true,
                },
            });
            this.ThirdMoveTimeline.to(
                this.room.position,
                {
                    x: 4.5,
                    z: -4.5,
                }
            );

        });

        this.mm.add("(max-width: 968px)", () => {

            // Resets
            this.room.scale.set(0.07, 0.07, 0.07);
            this.room.position.set(0, 0, 0);
            this.rectLight.width = 0.3;
            this.rectLight.height = 0.4;
            this.camera.orthographicCamera.position.set(0, 6.5, 10);


            // first section ------------------------------------------------------------------
            this.firstMoveTimeline = new GSAP.timeline({
                scrollTrigger: {
                    trigger: ".first-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                    // markers: true,
                    invalidateOnRefresh: true,
                },
            });
            this.firstMoveTimeline.to(
                this.room.scale,
                {
                    x: 0.1,
                    y: 0.1,
                    z: 0.1,
                }
            );

            // Second section ------------------------------------------------------------------
            this.secondMoveTimeline = new GSAP.timeline({
                scrollTrigger: {
                    trigger: ".second-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                    // markers: true,
                    invalidateOnRefresh: true,
                },
            });

            this.secondMoveTimeline.to(
                this.room.position,
                {
                    x:1.5
                     
                },
                "same"
            );   
            this.secondMoveTimeline.to(
                this.room.scale,
                {
                    x: 0.25,
                    y: 0.25,
                    z: 0.25,
                },
                "same"
            );
            this.secondMoveTimeline.to(
                this.rectLight,
                {
                    width: 0.3 * 3.4,
                    height: 0.6 * 3.4,
                     
                },
                "same"
            );   
            this.secondMoveTimeline.to(
                this.floor.plane.position,
                {
                    y:-0.55,
                },
                "same"
            );   
            // Third section ------------------------------------------------------------------
            this.thirdMoveTimeline = new GSAP.timeline({
                scrollTrigger: {
                    trigger: ".third-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                    // markers: true,
                    invalidateOnRefresh: true,
                },
            });
            this.thirdMoveTimeline.to(
                this.room.position,
                {
                    z: -4.5,
                }
            );
        });

        this.mm.add("all", ()=>{
            // Mini Platform

            this.sections = document.querySelectorAll(".section");
                this.sections.forEach((section) => {
                    this.progressWrapper =
                        section.querySelector(".progress-wrapper");
                    this.progressBar = section.querySelector(".progress-bar");

                    if (section.classList.contains("right")) {
                        GSAP.to(section, {
                            borderTopLeftRadius: 10,
                            scrollTrigger: {
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                scrub: 0.6,
                            },
                        });
                        GSAP.to(section, {
                            borderBottomLeftRadius: 700,
                            scrollTrigger: {
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                                scrub: 0.6,
                            },
                        });
                    } else {
                        GSAP.to(section, {
                            borderTopRightRadius: 10,
                            scrollTrigger: {
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                scrub: 0.6,
                            },
                        });
                        GSAP.to(section, {
                            borderBottomRightRadius: 700,
                            scrollTrigger: {
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                                scrub: 0.6,
                            },
                        });
                    }
                    GSAP.from(this.progressBar, {
                        scaleY: 0,
                        scrollTrigger: {
                            trigger: section,
                            start: "top top",
                            end: "bottom bottom",
                            scrub: 0.4,
                            pin: this.progressWrapper,
                            pinSpacing: false,
                        },
                    });

                    // first stuff
                    this.firstMoveTimeline = new GSAP.timeline({
                        scrollTrigger: {
                            trigger: ".first-move",
                            start: "top top",
                            end: "bottom bottom",
                            scrub: 0.6,
                            // markers: true,
                            invalidateOnRefresh: true,
                        },
                    });
                    this.firstMoveTimeline.to(
                        this.circleFirst.scale,
                        {
                           x: 3,
                           y: 3,
                           z: 3,
                        }
                    );
        
                    // Second section ------------------------------------------------------------------
                    this.secondMoveTimeline = new GSAP.timeline({
                        scrollTrigger: {
                            trigger: ".second-move",
                            start: "top top",
                            end: "bottom bottom",
                            scrub: 0.6,
                            // markers: true,
                            invalidateOnRefresh: true,
                        },
                    });
                    this.secondMoveTimeline.to(
                        this.circleSecond.scale,
                        {
                           x: 3,
                           y: 3,
                           z: 3,
                        },
                        "same"
                    );
                    this.secondMoveTimeline.to(
                        this.room.position,
                        {
                           y: 0.7,
                        },
                        "same"
                    );
                    // Third section ------------------------------------------------------------------
                    this.thirdMoveTimeline = new GSAP.timeline({
                        scrollTrigger: {
                            trigger: ".third-move",
                            start: "top top",
                            end: "bottom bottom",
                            scrub: 0.6,
                            // markers: true,
                            invalidateOnRefresh: true,
                        },
                    });
                    this.thirdMoveTimeline.to(
                        this.circleThird.scale,
                        {
                           x: 3,
                           y: 3,
                           z: 3,
                        }
                    );
                });




            this.secondPartTimeline = new GSAP.timeline({
                scrollTrigger: {
                    trigger: ".third-move",
                    start: "center center ",
                },
            });

            this.room.children.forEach((child) => {
                if (child.name === "floor_2") {
                    this.first = GSAP.to(child.position, {
                        x: 1,
                        z: -1,
                        duration: 1,
                    });
                } else if (child.name === "mailbox") {
                    this.second = GSAP.to(child.scale, {
                        x: 1,
                        y: 1,
                        z: 1,
                        duration: 0.3,
                    });
                } else if(child.name === "step1")
                {
                    this.third = GSAP.to(child.scale, {
                        x: 2.784,
                        y: 0.155,
                        z: 1,
                        duration: 0.3,
                    });
                }else if(child.name === "step2")
                {
                    this.fourth = GSAP.to(child.scale, {
                        x: 2.784,
                        y: 0.155,
                        z: 1,
                        duration: 0.3,
                    });
                }else if(child.name === "step3")
                {
                    this.fifth = GSAP.to(child.scale, {
                        x: 2.784,
                        y: 0.155,
                        z: 1,
                        duration: 0.3,
                    });
                } else if (child.name === "lamp") {
                    this.sixth = GSAP.to(child.scale, {
                        x: 2.784,
                        y: 0.155,
                        z: 1,  //scale logically should be 1 is these numbers cause i messed up my gltf
                        ease: "back.out(2)",
                        duration: 0.3,
                    });
                } else if (child.name === "dirt") {
                    this.seventh = GSAP.to(child.scale, {
                        x: 2.784,
                        y: 0.155,
                        z: 1,
                        ease: "back.out(2)",
                        duration: 0.3,
                    });
                } else if (child.name === "flower") {
                    this.eighth = GSAP.to(child.scale, {
                        x: 2.784,
                        y: 0.155,
                        z: 1,
                        ease: "back.out(2)",
                        duration: 0.3,
                    });
                }
            });
                this.secondPartTimeline.add(this.first);
                this.secondPartTimeline.add(this.second);
                this.secondPartTimeline.add(this.third);
                this.secondPartTimeline.add(this.fourth, "-=0.2");
                this.secondPartTimeline.add(this.fifth, "-=0.2");
                this.secondPartTimeline.add(this.sixth, "-=0.2");
                this.secondPartTimeline.add(this.seventh, "-=0.2");
                this.secondPartTimeline.add(this.eighth);
         });
    }

    resize()
    {

    }

    update()
    {
        //console.log(this.lerp.target);
        //console.log(this.lerp.current);
    }
}