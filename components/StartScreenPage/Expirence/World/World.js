import * as THREE from "three";
import Expirence from "../Expirence";
import Enviroment from "./Enviroment";
import Controls from "./Controls"
import Floor from "./Floor"

import Room from "./Room";
import { EventEmitter } from "events";


export default class World extends EventEmitter{
    constructor(){
        super();
        this.expirence = new Expirence();
        this.sizes = this.expirence.sizes;
        this.scene = this.expirence.scene;
        this.canvas = this.expirence.canvas;
        this.camera = this.expirence.camera;
        this.resources = this.expirence.resources;
        this.theme = this.expirence.theme;

        this.resources.on("ready", ()=> {
            this.floor = new Floor();    
            this.room = new Room();      
            this.enviroment = new Enviroment(); 
            //this.controls = new Controls();

            this.emit("worldready");
        });

        this.theme.on("switch", (theme)=>{
            this.switchTheme(theme);
        });
    }

    switchTheme(theme){
        if(this.enviroment)
        {
            this.enviroment.switchTheme(theme);
        }
    }

    resize()
    {

    }

    update()
    {
        if(this.room)
        {
            this.room.update();
        }
        if(this.controls)
        {
            this.controls.update();
        }
    }
}