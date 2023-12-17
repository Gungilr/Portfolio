import * as THREE from "three";
import Expirence from "./Expirence";

export default class Renderer{
    constructor(){
        this.expirence = new Expirence();
        this.sizes = this.expirence.sizes;
        this.scene = this.expirence.scene;
        this.canvas = this.expirence.canvas;
        this.camera = this.expirence.camera;
        //console.log(this.camera, this.camera.perspectiveCamera);

        this.setRenderer();
    }

    setRenderer(){
        this.renderer = new THREE.WebGLRenderer({
            canvas : this.canvas,
            antialias : true,
        });

        this.renderer.toneMapping = THREE.CineonToneMapping;
        this.renderer.toneMappingExposure = 1.75;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio);
    }

    resize()
    {
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio); 
    }

    update()
    {
        this.renderer.render(this.scene, this.camera.orthographicCamera);
    }
}