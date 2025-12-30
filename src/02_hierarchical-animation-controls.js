/*

 사용한 Three.js 방법: npm 

 */

import * as THREE from 'three';

const h_scr = window.innerWidth;
const v_scr = window.innerHeight; 

// 1. Scene 생성
const scene = new THREE.Scene();

// 2. Camera 설정
const perspCamera  = new THREE.PerspectiveCamera( 75, h_scr/v_scr, 0.1, 1000 );
perspCamera .position.z = 5;

// Orthographic 카메라(직교 투영) 추가
const aspect = h_scr / v_scr;
const orthoCamera = new THREE.OrthographicCamera(-5*aspect, 5*aspect, 3, -3, 0.1, 1000);
orthoCamera.position.z = 10;


let camera = perspCamera; // 현재 활성 카메라

let speed = 1.0;

window.addEventListener('keydown', (e) => {
  const k = e.key.toLowerCase();

  if (k == 'p') camera = perspCamera;  // P키: Perspective 카메라 활성
  if (k == 'o') camera = orthoCamera;  // O키: Orthographic 카메라 활성
  if (k == '+') speed += 0.5;          // +키: 속도 증가
  if (k == '-') speed = Math.max(0.1, speed - 0.5);  // -키: 속도 감소, 최소 속도는 0.1

})

// 3. Renderer 설정 및 DOM 추가
const renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);
renderer.setSize( h_scr, v_scr ); 

// 왼쪽 사면체 생성 및 배치
const meshA = new THREE.Mesh(
    new THREE.TetrahedronGeometry  (),
    new THREE.MeshBasicMaterial( { color: 0x90EE90 } )
);

meshA.position.x = -1.2;

// 오른쪽 도넛 생성 및 배치
const meshB = new THREE.Mesh(
  new THREE.TorusGeometry(0.7, 0.3, 32, 100),
  new THREE.MeshNormalMaterial()
);
meshB.position.x = 1.2;

// 생성된 도형들을 Scene에 추가
scene.add(meshA);  // meshA는 부모
meshA.add(meshB);  // meshB는 meshA의 자식

// 자식의 위치는 부모 기준 상대좌표
meshB.position.x = 2.5; // 부모의 오른쪽 2.5 옆으로 설정

function animate() {

  // 사면체 애니메이션 (부모)
  meshA.rotation.x += 0.01 * speed; 
  meshA.rotation.y += 0.01 * speed;
  meshA.position.y = Math.sin(Date.now() * 0.002 * speed) * 1.2;
  meshA.scale.x =1 + Math.sin(Date.now() * 0.001 * speed) * 0.7;

  // 도넛 애니메이션 (자식)
  meshB.rotation.x += 0.015 * speed; // 자식은 부모에 대해 상대적으로 회전
  meshB.rotation.y += 0.025 * speed;

  // 최종 렌더링
  renderer.render(scene, camera); // 현재 활성화 된 카메라로 렌더링
}

// 에니메이션 루프 실행
renderer.setAnimationLoop(animate);

