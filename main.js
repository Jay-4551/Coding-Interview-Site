// Jaylan "Jay" Sanford coding interview 


import './style.css'

// Import statements for functionality of project
import * as THREE from 'three';
import { GUI } from 'dat.gui';
import { AmbientLight, WireframeGeometry } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


//This code is used for creating the scene, as well as giving it a grey background
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x555555);

//initializing dat.gui and it's libraries
const gui = new GUI();

//camera for the project
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,1000);

//3D renderer for three js
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

//setting the pixel ratio of the device and size of the window
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);

//zooming the camera position out using the z axis
camera.position.setZ(50);


/*
*This block of code creates the geometry of a cube that has the dimensions 20x20x20
*It assigns it the MeshStandardMaterial and gives it an offwhite color
*The cube itself is actually created and added to the scene
*/
const geometry = new THREE.BoxGeometry(20,20,20);
const material = new THREE.MeshStandardMaterial( {color: 0xF8F8FF} );
const cube = new THREE.Mesh( geometry, material );

scene.add( cube )

//Point light added to the top of the cube
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(0,20,0)

//Point light added to the right size of the cube
const pointLight2 = new THREE.PointLight(0xffffff)
pointLight2.position.set(10,0,20)

//ambient light used for lighting the whole scene equally
const ambient = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, pointLight2, ambient)

//Orbit controls that were added so that the users could rotate the cube as they wanted
const controls = new OrbitControls(camera, renderer.domElement);

//getting the hex value of the color of the cube
const colors = {
  cubeColor: cube.material.color.getHex(),
};
// getting the roughness value of the cube
const roughness = {
  cubeRoughness: cube.material.roughness,
};

// getting the metalness value of the cube
const metalness = {
  cubeMetal: cube.material.metalness,
}
;
//adding a wireframe toggle to dat.gui
gui.add(cube.material, 'wireframe');

//allows the user to change the color of the cube using hex wit dat.gui
gui.addColor(colors, 'cubeColor').onChange((value) => cube.material.color.set(value) );

//allows the user to set the value of roughness with .gui
gui.add(cube.material, 'roughness').onChange((value) => cube.material.roughness.set(value));

//allows the user to set the value of metalness with .gui
gui.add(cube.material, 'metalness').onChange((value) => cube.material.metalness.set(value));


/*
*this is an event listener that is assigned to the window/page
*If the r key is pressed
* Red blue and green values are generated and then appended to a string
*The string is then inserted into color.set which changes the color of the cube
*/

window.addEventListener("keydown",function(e){
  var key = e.key;
  if(key == "r"){
    var red = Math.trunc(Math.random() * 255);
    var blue = Math.trunc(Math.random() * 255);
    var green = Math.trunc(Math.random() * 255);

    var color = "rgb(" + red + "," + green + "," + blue + ")";
    cube.material.color.set(color);
  }
});


function animate(){
  //A function that loops itself so that it can continuously run
  requestAnimationFrame(animate);

  //rotates the cube on the y axis
  cube.rotation.y += 0.007;

  // Calling of the orbit controls as the scene is updated
  controls.update();

  //calling the renderer in a continuous loop so that we do not have to keep calling rederer.render when new elements are added
  renderer.render(scene,camera);
}

//calling the animate function
animate()