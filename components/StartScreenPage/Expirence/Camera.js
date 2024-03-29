import * as THREE from "three";
import Expirence from "./Experience";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

export default class Camera{
    constructor(){
        this.expirence = new Expirence();
        this.sizes = this.expirence.sizes;
        this.scene = this.expirence.scene;
        this.canvas = this.expirence.canvas;
        //console.log(this.expirence, this.scene, this.sizes, this.canvas)

        this.createPerspectiveCamera();
        this.createOrthographicCamera();
        this.setOrbitControls();
    }

    createPerspectiveCamera()
    {
        this.perspectiveCamera = new THREE.PerspectiveCamera(
            35, 
            this.sizes.aspect,
            0.1, 
            1000
        );
        this.scene.add(this.perspectiveCamera);
        this.perspectiveCamera.position.x = 29;
        this.perspectiveCamera.position.y = 14;
        this.perspectiveCamera.position.z = 12;
    }

    createOrthographicCamera()
    {

        this.orthographicCamera = new THREE.OrthographicCamera(
            (-this.sizes.aspect * this.sizes.frustrum)/2,
            (this.sizes.aspect * this.sizes.frustrum)/2,
            this.sizes.frustrum/2,
            - this.sizes.frustrum/2,
            -50,
            
        );
        this.scene.add(this.orthographicCamera);

        const size = 20;
        const divisions = 20;

        //const gridHelper = new THREE.GridHelper(size, divisions);
        //this.scene.add(gridHelper);

       // const axesHelper = new THREE.AxesHelper(10);
        //this.scene.add(axesHelper);

        this.scene.add(this.orthographicCamera);

        //this.helper = new THREE.CameraHelper(this.orthographicCamera);
        //this.scene.add(this.helper);

        this.orthographicCamera.position.y = 5.65;
        this.orthographicCamera.position.z = 10;
        this.orthographicCamera.rotation.x = -Math.PI / 6;
    }

    setOrbitControls()
    {
        this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
        this.controls.enableDamping = true;
        this.controls.enableZoom = false;
    }

    resize() {
         // Updating Perspective Camera on Resize
         this.perspectiveCamera.aspect = this.sizes.aspect;
         this.perspectiveCamera.updateProjectionMatrix();
 
         // Updating Orthographic Camera on Resize
         this.orthographicCamera.left =
             (-this.sizes.aspect * this.sizes.frustrum) / 2;
         this.orthographicCamera.right =
             (this.sizes.aspect * this.sizes.frustrum) / 2;
         this.orthographicCamera.top = this.sizes.frustrum / 2;
         this.orthographicCamera.bottom = -this.sizes.frustrum / 2;
         this.orthographicCamera.updateProjectionMatrix();
    }

    update()
    {
        this.controls.update();

        //this.helper.updateProjectionMatrix = true;
        //this.helper.update();
        //this.ahelper.rotation.copy(this.orthographicCamera.rotation);
    }
}