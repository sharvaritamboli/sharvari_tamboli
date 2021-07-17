var container;
var camera;
var renderer;
var scene;
var house;

function init() {
  container = document.querySelector(".scene");

  //Create scene
  scene = new THREE.Scene();

  const fov = 35;
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.1;
  const far = 1000;

  //Camera setup
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(6, -1.5, 30);

  const ambient = new THREE.AmbientLight(0x404040, 2);
  scene.add(ambient);

  const light = new THREE.DirectionalLight(0xffffff, 2);
  light.position.set(50, 50, 100);
  scene.add(light);
  //Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);

  //Load Model
  let loader = new THREE.GLTFLoader();
  loader.load("./house/scene.gltf", function(gltf) {
    scene.add(gltf.scene);
    house = gltf.scene.children[0];
    animate();
  });
}

function animate() {
  requestAnimationFrame(animate);
  house.rotation.z += 0.005;
  renderer.render(scene, camera);
}

init();

function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener("resize", onWindowResize);


// scrool flying animation

var flightPath = {
    curviness: 1.25,
    autoRotate: true,
    values: [{ x: 100, y: -20} , { x: 300, y: 10} , { x: 500, y: 100}, { x: 750, y: -100}, { x: 350, y: -50}, { x: 600, y: 100}, { x: 800, y: 0}, {x:window.innerWidth, y: 10}]
};

const tween = new TimelineLite();

tween.add(
    TweenLite.to(".flying",1,{
        bezier: flightPath,
        ease: Power1.easeInOut
    })
);

var controller1= new ScrollMagic.Controller();

 scene1 = new ScrollMagic.Scene({
    triggerElement: ".animation",
    duration: 1000,

})
.setTween(tween)
.addIndicators()
.addTo(controller1);