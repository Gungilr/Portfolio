import { EventEmitter } from "events";
import Expirence from "./Experience";
import GSAP from "gsap";
import convert from "./Utils/convertDivsToSpans";

export default class Preloader extends EventEmitter{
    constructor()
    {
        super();
        this.expirence = new Expirence();
        this.scene = this.expirence.scene;
        this.resources = this.expirence.resources;
        this.sizes = this.expirence.sizes;
        this.camera = this.expirence.camera;
        this.world = this.expirence.world;
        this.device = this.sizes.device;

        this.sizes.on("switchdevice", (device)=> {
            this.device = device;
        });

        this.world.on("worldready", ()=>{
            console.log("stuuffff")
            this.setAssets();
            this.playIntro();
        });
    }

    setAssets()
    {
        convert(document.querySelector(".intro-text"));
        convert(document.querySelector(".hero-main-title"));
        convert(document.querySelector(".hero-main-description"));
        convert(document.querySelector(".hero-second-subheading"));
        convert(document.querySelector(".second-sub"));

        this.room = this.expirence.world.room.actualRoom;
        this.roomChildren = this.world.room.roomChildren;
        console.log("stuff");
    }

    firstAnimation()
    {
        return new Promise((resolve)=>{
            this.timeline = new GSAP.timeline();
            this.timeline.set(".animatedis", {y:0, yPercent: 100});
                this.timeline.to(".preloader", {
                   opacity: 0,
                   onComplete: ()=>{
                    document.querySelector(".preloader").classList.add("hidden");
                   },
                });
        
            if(this.device === "mobile"){
                this.timeline.to(this.roomChildren.cube.scale, {
                    x: 1.4,
                    y: 1.4,
                    z: 1.4,
                    ease: "back.out(2.5)",
                    duration: 0.7,
                });
                this.timeline.to(this.room.position, {
                    z: -1,
                    ease: "power1.out",
                    duration: 0.7,
                });
    
            }
    
            if(this.device === "desktop")
            {
                this.timeline.to(this.roomChildren.cube.scale, {
                    x: 1.4,
                    y: 1.4,
                    z: 1.4,
                    ease: "back.out(2.5)",
                    duration: 0.7,
                });
    
                this.timeline.to(this.room.position, {
                    x: -1,
                    ease: "power1.out",
                    duration: 0.7,
                });
            }

            this.timeline.to(".intro-text .animatedis", {
                yPercent: 0,
                stagger: 0.05,
                ease: "back.out(1.7)",
            });
            this.timeline.to(".arrow-svg-wrapper", {
                opacity: 1,
            }, "loaded");

            this.timeline.to(".toggle-bar", {
                opacity: 1,
                onComplete: resolve,
            }, "loaded");
        });
    }

    secondAnimation()
    {
        return new Promise((resolve)=>{
            this.secondTimeline = new GSAP.timeline();

            this.secondTimeline.to(".intro-text .animatedis", {
                yPercent: 100,
                stagger: 0.05,
                ease: "back.in(1.7)",
            }).to(".arrow-svg-wrapper", {
                opacity: 0,
            }, "fadeout");

                this.secondTimeline.to(this.room.position, {
                    x: 0,
                    y: 0,
                    z: 0,
                    ease: "back.out(2.5)",
                }, "same").to(this.roomChildren.cube.rotation, {
                    y: 2*Math.PI + Math.PI / 4
                }, "same").to(this.roomChildren.cube.position, {
                    y: 8.5618,
                    x: 0.63,
                    z: -1.3,
                }, "same").to(this.roomChildren.cube.scale,{
                    x: 12,
                    y: 12,
                    z: 12,
                }, "same").to(this.camera.orthographicCamera.position, {
                    y: 6.5,
                }, "same").to(this.roomChildren.body.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                }).to(this.roomChildren.cube.scale, {
                    y: 0,
                    x: 0,
                    z: 0,
                }).to(".hero-main-title .animatedis", {
                    yPercent: 0,
                    stagger: 0.07,
                    ease: "back.out(1.7)",
                }, "text").to(".hero-main-description .animatedis", {
                    yPercent: 0,
                    stagger: 0.07,
                    ease: "back.out(1.7)",
                }, "text").to(".first-sub .animatedis", {
                    yPercent: 0,
                    stagger: 0.07,
                    ease: "back.out(1.7)",
                }, "text").to(".second-sub .animatedis", {
                    yPercent: 0,
                    stagger: 0.07,
                    ease: "back.out(1.7)",
                }, "text").to(
                    this.roomChildren.tank.scale,
                    {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(2.2)",
                        duration: 0.5,
                    },
                    ">-0.5"
                ).to(
                    this.roomChildren.clock.scale,
                    {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(2.2)",
                        duration: 0.5,
                    },
                    ">-0.4"
                )
                .to(
                    this.roomChildren.shelves.scale,
                    {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(2.2)",
                        duration: 0.5,
                    },
                    ">-0.3"
                )
                .to(
                    this.roomChildren.floor_stiff.scale,
                    {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(2.2)",
                        duration: 0.5,
                    },
                    ">-0.2"
                )
                .to(
                    this.roomChildren.tables.scale,
                    {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(2.2)",
                        duration: 0.5,
                    },
                    ">-0.1"
                )
                .to(
                    this.roomChildren.table_stuff.scale,
                    {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(2.2)",
                        duration: 0.5,
                    },
                    ">-0.1"
                )
                .to(this.roomChildren.computer.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                })
                .set(this.roomChildren.floor_2.position, {
                    x: 10,
                    z: -10,
                })
                .set(this.roomChildren.floor_2.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                })
                .to(
                    this.roomChildren.seat.scale,
                    {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(2.2)",
                        duration: 0.5,
                    },
                    "chair"
                )
                .to(
                    this.roomChildren.fish.scale,
                    {
                        x: 1,
                        y: 0.275,
                        z: 1,
                        ease: "back.out(2.2)",
                        duration: 0.5,
                    },
                    "chair"
                )
                .to(
                    this.roomChildren.seat.rotation,
                    {
                        y: 4 * Math.PI + Math.PI / 4,
                        ease: "power2.out",
                        duration: 1,
                    },
                    "chair"
                )
                .to(".arrow-svg-wrapper", {
                    opacity: 1,
                    onComplete: resolve,
                });
            
        });
    }

    onScroll(e)
    {
        if(e.deltaY > 0)
        {
            this.removeEventListener();  
            this.playSecondIntro();
        }
    }

    onTouch(e)
    {
        this.initalY = e.touches[0].clientY;
    }

    onTouchMove(e){
        let currentY = e.touches[0].clientY;
        let differnce = this.initalY - currentY;

        if(differnce > 0)
        {
            console.log("swipped up");
            this.removeEventListener();
            this.playSecondIntro();
        }
        this.initalY = null;
    }

    removeEventListener()
    {
        window.removeEventListener("wheel", this.scrollOnceEvent);
        window.removeEventListener("touchstart", this.touchStartEvent);
        window.removeEventListener("touchmove", this.touchMoveEvent);
    }

    async playIntro(){
        await this.firstAnimation();
        this.moveFlag = true;
        this.scrollOnceEvent = this.onScroll.bind(this);
        this.touchStartEvent = this.onTouch.bind(this);
        this.touchMoveEvent = this.onTouchMove.bind(this);
        window.addEventListener("wheel", this.scrollOnceEvent);
        window.addEventListener("touchstart", this.touchStartEvent);
        window.addEventListener("touchmove", this.touchMoveEvent);
    }

    async playSecondIntro(){
        this.moveFlag = false;
        this.scaleFlag = true;
        await this.secondAnimation();
        this.scaleFlag = false;

        this.emit("enablecontrols");
    }

    move() {
        if (this.device === "desktop") {
            this.room.position.set(-1, 0, 0);
        } else {
            this.room.position.set(0, 0, -1);
        }
    }

    scale() {
        this.roomChildren.rectlight.width = 0;
        this.roomChildren.rectlight.height = 0;

        if (this.device === "desktop") {
            this.room.scale.set(0.11, 0.11, 0.11);
        } else {
            this.room.scale.set(0.07, 0.07, 0.07);
        }
    }

    update() {
        if (this.moveFlag) {
            this.move();
        }

        if (this.scaleFlag) {
            this.scale();
        }
    }
}