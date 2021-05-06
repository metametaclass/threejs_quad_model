const defaultSize = 300;
const axesSize = defaultSize;

const cameraOffset = defaultSize;

//setup renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);



const scene = new THREE.Scene();

//background color
scene.background = new THREE.Color(0x303030);

//coordinates axis helper
const axesHelper = new THREE.AxesHelper(axesSize);
scene.add(axesHelper);


//ambient light
const light = new THREE.AmbientLight(0xC0C0C0); // soft white light
scene.add(light);

//scene.add(new THREE.HemisphereLight(0x443333, 0x111122));
//const light1 = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
//scene.add(light1);

//directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(-defaultSize * 2, 0, -defaultSize * 2);//.normalize();
scene.add(directionalLight);

const helper = new THREE.DirectionalLightHelper(directionalLight, defaultSize / 2);
scene.add(helper);

//point light
const pointLight = new THREE.PointLight(0xFFFFFF, 1, 100);
pointLight.position.set(-defaultSize, defaultSize, -defaultSize);
scene.add(pointLight);

//point light helper
const sphereSize = defaultSize / 10;
const pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
scene.add(pointLightHelper);

//camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, defaultSize * 10);

//const camera = new THREE.OrthographicCamera(window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 1000);

//set Z axis down, XYZ=NED coordinated system
camera.up.set(0, 0, -1);

//view from behind-right
//camera.position.set(-defaultSize, defaultSize / 2, -defaultSize * 0.866);
camera.position.set(-defaultSize, defaultSize / 2, -defaultSize);

//camera controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.update();

var quad = null;

const loader = new THREE.GLTFLoader();

clock = new THREE.Clock();

const animationLoader = new THREE.AnimationLoader();

var mixer = null;

loader.load(
    // resource URL
    //"quad_x.gltf",
    //"openscad/quad_model.glb",
    "openscad/quad_model_scad.glb",
    //"openscad/3d_cross.gltf ",
    
    //"openscad/handle.glb",
    //"openscad/3d_cross.glb",

    // onLoad callback
    // Here the loaded data is assumed to be an object
    function (obj) {
        // Add the loaded object to the scene
        quad = obj.scene;
        scene.add(obj.scene);


        animationLoader.load(
            // resource URL
            "animations_tennis_racket_effect.json",
            //"animations_handle.json",
            //"animations_3d_cross.json",
            //"animations.json",

            // onLoad callback
            // Here the loaded data is assumed to be an object
            function (clips) {
                // Add the loaded object to the scene
                console.log(clips);


                mixer = new THREE.AnimationMixer(quad);
                mixer.addEventListener('loop', function (e) {
                    //console.log('loop', e);
                }); // properties of e: type, action and loopDelta

                mixer.addEventListener('finished', function (e) {
                    //console.log('finished', e);
                }); // properties of e: type, action and direction

                const clipAction = mixer.clipAction(clips[0]);//.setLoop(THREE.LoopOnce);
                clipAction.play();

            },

            // onProgress callback
            function (xhr) {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },

            // onError callback
            function (err) {
                console.error('An error happened', err);
            }
        );

    },

    // onProgress callback
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },

    // onError callback
    function (err) {
        console.error('An error happened', err);
    }
);





function animate() {
    requestAnimationFrame(animate);

    //cube.rotation.x += 0.01;
    //cube.rotation.y += 0.01;
    //if(quad) {
    //  quad.rotation.y += 0.01;
    //}

    controls.update();

    const delta = clock.getDelta();

    if (mixer) {
        mixer.update(delta);
        //console.log(mixer.time);
    }
    renderer.render(scene, camera);
}
animate();

