import * as THREE from "three";
import Expirence from "../Expirence";
import GSAP from "gsap";
import GUI from "lil-gui"

export default class Enviroment{
    constructor(){
        this.expirence = new Expirence();
        this.scene = this.expirence.scene;
        this.resources = this.expirence.resources;
        this.room = this.expirence.world.room.actualRoom;


        this.setSunlight();     
        //this.setGui(); 
    }
    

    setSunlight() {
        this.sunLight = new THREE.DirectionalLight("#ffffff", 0.75);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 20;
        this.sunLight.shadow.mapSize.set(2048, 2048);
        this.sunLight.shadow.normalBias = 0.05;
        // const helper = new THREE.CameraHelper(this.sunLight.shadow.camera);
        // this.scene.add(helper);

        this.sunLight.position.set(-1.5, 7, 3);
        this.scene.add(this.sunLight);

        this.ambientLight = new THREE.AmbientLight("#ffffff", 0.25);
        this.scene.add(this.ambientLight);
    }

    switchTheme(theme)
    {
        if(theme === "dark")
        {
            GSAP.to(this.sunLight.color, {
                r: 0.25882352941176473, 
                g: 0.16862745098039217, 
                b: 0.47058823529411764
            });
            GSAP.to(this.ambientLight.color, {
                r: 0.25882352941176473, 
                g: 0.16862745098039217, 
                b: 0.47058823529411764
            });
            GSAP.to(this.sunLight, {intensity: 0.2});
            GSAP.to(this.ambientLight, {intensity: 0.2});
            
        }else{
            GSAP.to(this.sunLight.color, {
                r: 255 / 255,
                g: 255 / 255,
                b: 255 / 255,
            });
            GSAP.to(this.ambientLight.color, {
                r: 255 / 255,
                g: 255 / 255,
                b: 255 / 255,
            });
            GSAP.to(this.sunLight, {intensity: 0.75});
            console.log(this.sunLight.intensity);
            GSAP.to(this.ambientLight, {intensity: 0.25});
        }
    }

    resize()
    {

    }

    update()
    {
        
    }
}