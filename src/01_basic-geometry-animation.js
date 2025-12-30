/*

 사용한 Three.js 방법: npm 
 
 */

import * as THREE from 'three';

const h_scr = window.innerWidth;
const v_scr = window.innerHeight; 
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, h_scr/v_scr, 0.1, 1000 );
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);
renderer.setSize( h_scr, v_scr ); 

const meshA = new THREE.Mesh(
    new THREE.TetrahedronGeometry  (),
    new THREE.MeshBasicMaterial( { color: 0x90EE90 } )
);

meshA.position.x = -1.2;

const meshB = new THREE.Mesh(
  new THREE.TorusGeometry(0.7, 0.3, 32, 100),
  new THREE.MeshNormalMaterial()
);
meshB.position.x = 1.2;

scene.add(meshA);
scene.add(meshB);

function animate() {
  meshA.rotation.x += 0.01;
  meshA.rotation.y += 0.01;
  meshA.position.y = Math.sin(Date.now() * 0.002) * 1.2;

  meshB.rotation.x += 0.015;
  meshB.rotation.y += 0.025;

  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

