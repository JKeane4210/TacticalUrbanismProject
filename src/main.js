/**
 * To have all of the three.js modules accessible, use 'npm i three' at the src folder,
 * so the path of the needed files can be accessed correctly
 */

// import * as THREE from "/node_modules/three/build/three.module.js";

let scene, camera, renderer, light;
function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 1, 5000);
    camera.rotation.y = 45/180*Math.PI;
    camera.position.x = 10;
    camera.position.y = -5;
    camera.position.z = 15;

    let hlight = new THREE.AmbientLight(0x404040, 100);
    scene.add(hlight);

    let directionalLight = new THREE.DirectionalLight(0xffffff, 100);
    directionalLight.position.set(0, 1, 0);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    
    let light2 = new THREE.PointLight(0xc4c4c4, 10);
    light2.position.set(0, 300, 500);
    scene.add(light2);
    
    renderer = new THREE. WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    let loader = new THREE.GLTFLoader();
    loader.load("./assets/scene.gltf", function(gltf) {
        let car = gltf.scene.children[0];
        scene.add(car);
        renderer.render(scene, camera);
        car.scale.set(10, 10, 10);
    })
}
init();