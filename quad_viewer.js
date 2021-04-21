const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );        


const light = new THREE.AmbientLight( 0xC0C0C0 ); // soft white light
scene.add( light );

//const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
//scene.add( light );

/*
const directionalLight = new THREE.DirectionalLight( 0xffffff, 10 );
directionalLight.position.set( 10, 10, 10 );//.normalize();
scene.add( directionalLight );

const helper = new THREE.DirectionalLightHelper( directionalLight, 5 );
scene.add( helper );
*/
//

const pointLight = new THREE.PointLight( 0xFFFFFF, 1, 100 );
pointLight.position.set( 10, 10, 10 );
scene.add( pointLight );

//const sphereSize = 1;
//const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
//scene.add( pointLightHelper );



const controls = new THREE.OrbitControls( camera, renderer.domElement );
camera.position.set( 0, 5, 10 );
controls.update();

const geometry = new THREE.BoxGeometry();
//const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
material = new THREE.MeshNormalMaterial();
const cube = new THREE.Mesh( geometry, material );
//scene.add( cube );

camera.position.z = 10;

var quad = null;

//const loader = new THREE.ObjectLoader();
//const loader = new THREE.JSONLoader();
const loader = new THREE.GLTFLoader();

loader.load(
    // resource URL
    //"quad_x.json",
    "quad_x.gltf",

    // onLoad callback
    // Here the loaded data is assumed to be an object
    function ( obj ) {
        // Add the loaded object to the scene
        quad = obj.scene;
        scene.add( obj.scene );
    },

    // onProgress callback
    function ( xhr ) {
        console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
    },

    // onError callback
    function ( err ) {
        console.error( 'An error happened' );
    }
);


function animate() {
    requestAnimationFrame( animate );

    //cube.rotation.x += 0.01;
    //cube.rotation.y += 0.01;
    if(quad) {
      quad.rotation.y += 0.01;
    }

    controls.update();
    renderer.render( scene, camera );
}
animate();

