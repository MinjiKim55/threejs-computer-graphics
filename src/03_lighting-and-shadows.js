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
perspCamera .position.z = 7;
perspCamera.lookAt(0,0,0);


// Orthographic 카메라(직교 투영) 추가
const aspect = h_scr / v_scr;
const frustumSize = 10;
const orthoCamera = new THREE.OrthographicCamera(
    -frustumSize * aspect, frustumSize * aspect, frustumSize, -frustumSize, 0.1, 1000);
orthoCamera.position.set(0,3,7);
orthoCamera.lookAt(0,0,0);


let camera = perspCamera; // 현재 활성 카메라

let speed = 1.0;

const clock = new THREE.Clock();

window.addEventListener('keydown', (e) => {
  const k = e.key.toLowerCase();

  if (k == 'p') camera = perspCamera;  // P키: Perspective 카메라 활성
  if (k == 'o') camera = orthoCamera;  // O키: Orthographic 카메라 활성
  if (k == '+') speed += 0.2;          // +키: 속도 증가
  if (k == '-') speed = Math.max(0.1, speed - 0.2);  // -키: 속도 감소, 최소 속도는 0.1

  // 4. 키보드 입력으로 라이트 이동하기
  if (k == 'i') directionalLight.position.z -= 0.2;
  if (k == 'k') directionalLight.position.z += 0.2;
  if (k == 'j') directionalLight.position.x -= 0.2;
  if (k == 'l') directionalLight.position.x += 0.2;

})


// 3. Renderer 설정 및 DOM 추가
const renderer = new THREE.WebGLRenderer();


// 1. 렌더러 그림자 켜기
renderer.shadowMap.enabled = true;  // 그림자 활성화
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.body.appendChild(renderer.domElement);
renderer.setSize( h_scr, v_scr );



// 2. 그림자가 투영될 바닥 만들기
const floorGeometry = new THREE.PlaneGeometry(30,30);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x808080, side: THREE.DoubleSide });


const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -1.5;
floor.receiveShadow = true; // 그림자 받기 설정
scene.add(floor);



// 왼쪽 사면체 생성 및 배치
const meshA = new THREE.Mesh(
    new THREE.TetrahedronGeometry  (),
    new THREE.MeshBasicMaterial( { color: 0x90EE90 } )
);
meshA.position.x = -1.2;
meshA.castShadow = true;


// 오른쪽 도넛 생성 및 배치
const meshB = new THREE.Mesh(
  new THREE.TorusGeometry(0.7, 0.3, 32, 100),
  new THREE.MeshNormalMaterial()
);
meshB.position.x = 1.5;
meshB.castShadow = true;


// 생성된 도형들을 Scene에 추가
scene.add(meshA);  // meshA는 부모
meshA.add(meshB);  // meshB는 meshA의 자식


// 자식의 위치는 부모 기준 상대좌표
meshB.position.x = 2.5; // 부모의 오른쪽 2.5 옆으로 설정


// 3. 라이트 추가 및 그림자 설정
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
directionalLight.position.set(5, 10, 7);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 50;
scene.add(directionalLight);


const lightHelper = new THREE.DirectionalLightHelper(directionalLight, 1); // 라이트의 방향을 시각적으로 확인하기 위해 헬퍼 추가
scene.add(lightHelper);

let baseY = 0;
let vy = 0;

function animate() {
    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();

    const targetVy = Math.sin(elapsedTime * speed *2) * 2.0;
    vy += (targetVy - vy) * 0.1;
    baseY += vy * delta;

    const floorY = floor.position.y;    // 바닥 위치
    const minY = floorY + 0.2;  


    if(baseY < minY){
        baseY = minY;
        vy = 0;
    }
    meshA.position.y = baseY;


    // 사면체 애니메이션 (부모)
    meshA.rotation.x += 0.01 * speed;
    meshA.rotation.y += 0.01 * speed;
    meshA.scale.x =1 + Math.sin(elapsedTime * speed) * 0.7;

    // 도넛 애니메이션 (자식)
    meshB.rotation.x += 0.015 * speed; // 자식은 부모에 대해 상대적으로 회전
    meshB.rotation.y += 0.025 * speed;


    // 최종 렌더링
    renderer.render(scene, camera); // 현재 활성화 된 카메라로 렌더링
}
// 화면 리사이즈 대응
window.addEventListener('resize', () => {
  const w = window.innerWidth;
  const h = window.innerHeight;

  // Perspective 카메라 업데이트
  perspCamera.aspect = w / h;
  perspCamera.updateProjectionMatrix();

  // Orthographic 카메라 업데이트
  const aspect = w / h;
  orthoCamera.left = -frustumSize * aspect;
  orthoCamera.right = frustumSize * aspect;
  orthoCamera.top = frustumSize;
  orthoCamera.bottom = -frustumSize;
  orthoCamera.updateProjectionMatrix();

  // 렌더러 크기 업데이트
  renderer.setSize(w, h);
});


// 에니메이션 루프 실행
renderer.setAnimationLoop(animate);