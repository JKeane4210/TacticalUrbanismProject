/**
 * To have all of the three.js modules accessible, use 'npm i three' at the src folder,
 * so the path of the needed files can be accessed correctly
 */

// import * as THREE from "/node_modules/three/build/three.module.js";

var fs = require('fs');
let scene, camera, renderer, light, mesh;
let BG_COLOR = 0x80bde0;
let STRING_BG_COLOR = '#80bde0'
var isClockwise = false;

document.body.style.overflow = 'hidden';
document.body.style.backgroundColor = STRING_BG_COLOR;

var mainLoop = () => {
    requestAnimationFrame(mainLoop);
    renderer.render(scene, camera);
    if (isClockwise) {
        let currentDifference =  Math.PI * (Math.PI / 2 - mesh.rotation.y) / (Math.PI / 2 + Math.PI / 6);
        mesh.rotation.y += 0.01 * Math.sin(currentDifference) + 0.002;
    } else {
        let currentDifference =  Math.PI * (-1 * Math.PI / 6 - mesh.rotation.y) / (-1 * Math.PI / 6 - Math.PI / 2);
        mesh.rotation.y -= 0.01 * Math.sin(currentDifference) + 0.002;
    }
    if (isClockwise && mesh.rotation.y > Math.PI / 2) {
        isClockwise = false;
    }
    if (!isClockwise && mesh.rotation.y < -1 * Math.PI / 6) {
        isClockwise = true;
    }
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
    let hlight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(hlight);

    //creates a direcctional light -> shadow
    let directionalLight = new THREE.DirectionalLight(0xffffff, 1);
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
    
    loader.load("./assets/CommunityWellnessHub.glb", function(gltf) {
        mesh = gltf.scene;
        // var materials = [];
        // gltf.scene.children[0].children.forEach(element => {
        //     materials.push(element.material);
        // });
        

        // mesh.traverse(function (child) {
        //     if (child.isMesh && child.geometry) {
        //         let geometry = child.geometry;
        //         geometry.clearGroups();
        //         geometry.addGroup(0, Infinity, 0);
        //         geometry.addGroup(0, Infinity, 1);
        //         child.material = materials;
        //     }
        // })
        scene.add(mesh);
        console.log(mesh);

        // console.log(gltf.scene.children.length);
        // child
        // scene.add(mesh);
        // console.log(mesh);
        renderer.render(scene, camera);
        mesh.scale.set(3, 3, 3);
        mesh.position.set(0, 2, -7);
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

