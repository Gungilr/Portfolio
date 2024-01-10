import * as THREE from "three";

export default class Expirence
{
    static instance
    constructor(canvas)
    {
        if(Expirence.instance)
        {
             return Expirence.instance
        }
        Expirence.instance = this;
        this.canvas = canvas;
        this.scene = new THREE.Scene();
    }
}