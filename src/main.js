/**
 * To have all of the three.js modules accessible, use 'npm i three' at the src folder,
 * so the path of the needed files can be accessed correctly
 */

// import * as THREE from "/node_modules/three/build/three.module.js";

var fs = require('fs');
let scene, camera, renderer, light, mesh;
let BG_COLOR = 0x80bde0;
let STRING_BG_COLOR = '#80bde0'

document.body.style.overflow = 'hidden';
document.body.style.backgroundColor = STRING_BG_COLOR;

var mainLoop = () => {
    requestAnimationFrame(mainLoop);
    renderer.render(scene, camera);
    mesh.rotation.y += 0.01;
}

function init3D() {
    // creates the scene
    scene = new THREE.Scene();
    // scene.background = new THREE.Color(BG_COLOR);
    camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 1, 5000);
    camera.rotation.y = 90/180*Math.PI;
    camera.position.x = 50;
    camera.position.y = 0;
    camera.position.z = 0;

    // creates ambient light
    let hlight = new THREE.AmbientLight(0x404040, 100);
    // scene.add(hlight);

    //creates a direcctional light -> shadow
    let directionalLight = new THREE.DirectionalLight(0xffffff, 100);
    directionalLight.position.set(0, 1, 0);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // adds a point light
    let light2 = new THREE.PointLight(0xc4c4c4, 10);
    light2.position.set(0, 300, 500);
    // scene.add(light2);

    // creates the renderer for the scene
    renderer = new THREE. WebGLRenderer({antialias:true, alpha: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff, 0);
    document.body.appendChild(renderer.domElement);

    // resizes model and button layout with window resize
    window.addEventListener('resize', onWindowResize, false);

    // loads the 3D objectr from a GLTF loader class
    let loader = new THREE.GLTFLoader();
    
    loader.load("./assets/testMonkey2.glb", function(gltf) {
        mesh = gltf.scene.children[0];
        scene.add(mesh);
        renderer.render(scene, camera);
        mesh.scale.set(10, 10, 10);
        mesh.position.set(0, 3, -5);
        // console.log(mesh.position);
        mainLoop();
    });
}


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function initializeFields() {
    var data = fs.readFileSync("questions.json");
    var questionsJSON = JSON.parse(data);
    var popups = questionsJSON.popups;
    for (var i = 0; i < popups.length; ++i) {
        document.getElementsByClassName("popuptext")[i].innerHTML = popups[i];
    }
}

init3D();
initializeFields();

