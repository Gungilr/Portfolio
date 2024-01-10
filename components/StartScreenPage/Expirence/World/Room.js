import * as THREE from "three";
import Expirence from "../Experience";
import GSAP from 'gsap';
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";

export default class Room{
    constructor(){
        this.expirence = new Expirence();
        this.scene = this.expirence.scene;
        this.resources = this.expirence.resources;
        this.time = this.expirence.time;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;
        this.roomChildren = {};
        
        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1,
        }

        this.onMouseMove();
        this.setModel();
        this.setAnimation();
    }

    setModel()
    {

        this.actualRoom.children.forEach((child) => {
            child.castShadow = true;
            child.receiveShadow = true;

            if (child instanceof THREE.Group) {
                child.children.forEach((groupchild) => {
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                });
            }

            if(child.name === "tank")
            {   
                child.children[4].material = new THREE.MeshPhysicalMaterial();
                child.children[4].material.roughness = 0;
                child.children[4].material.color.set(0xA2f7E5);
                child.children[4].material.ior = 3;
                child.children[4].material.transmission = 1;
                child.children[4].material.opacity = 3;
                child.children[4].material.depthWrite = false;
                child.children[4].material.depthTest = false;
            }

            else if(child.name === "computer")
            {
                child.children[1].material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.screen,
                });
            }
            
            child.scale.set(0, 0, 0);

            if(child.name === "Cube")
            {
                child.position.set(0, -1.5, 0);
                child.rotation.y = Math.PI / 4;
                //child.scale.set(1,1,1); 
            }

            this.roomChildren[child.name.toLowerCase()] = child;
        });

        const width = 0.6;
        const height = 0.9;
        const intensity = 1;
        const rectLight = new THREE.RectAreaLight(
            0xffffff,
            intensity,
            width,
            height
        );
        rectLight.position.set(7, 6.1, 0.72);
        rectLight.rotation.x = -Math.PI / 2;
        rectLight.rotation.z = Math.PI / 4;
        this.actualRoom.add(rectLight);

        this.roomChildren['rectlight'] = rectLight;

        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.11,0.11,0.11);
    }

    setAnimation()
    {
        this.mixer = new THREE.AnimationMixer(this.actualRoom);
        this.swim = this.mixer.clipAction(this.room.animations[0]);
        this.swim.play();
    }

    onMouseMove()
    {
        window.addEventListener("mousemove", (e)=>{
            this.rotation  =  2 * (e.clientX - window.innerWidth/2) / window.innerWidth;  
            this.lerp.target = this.rotation * .1;
        });
    }

    resize()
    {

    }

    update()
    {
        this.mixer.update(this.time.delta * 0.0009);
        this.lerp.current =  GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );

        this.actualRoom.rotation.y = this.lerp.current;
    }
}