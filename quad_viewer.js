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

clock = new THREE.Clock();

const animationLoader = new THREE.AnimationLoader();

var mixer = null;

loader.load(
    // resource URL
    "quad_x.gltf",

    // onLoad callback
    // Here the loaded data is assumed to be an object
    function ( obj ) {
        // Add the loaded object to the scene
        quad = obj.scene;
        scene.add( obj.scene );


        animationLoader.load(
            // resource URL
            "animations.json",

            // onLoad callback
            // Here the loaded data is assumed to be an object
            function ( clips ) {
                // Add the loaded object to the scene
                console.log(clips);

/*
// POSITION
const positionKF = new THREE.VectorKeyframeTrack( '.position', [ 0, 1, 2 ], [ 0, 0, 0, 30, 0, 0, 0, 0, 0 ] );

const xAxis = new THREE.Vector3( 1, 0, 0 );
const qInitial = new THREE.Quaternion().setFromAxisAngle( xAxis, 0 );
const qFinal = new THREE.Quaternion().setFromAxisAngle( xAxis, Math.PI );
const quaternionKF = new THREE.QuaternionKeyframeTrack( '.quaternion', [ 0, 1, 2 ], [ qInitial.x, qInitial.y, qInitial.z, qInitial.w, qFinal.x, qFinal.y, qFinal.z, qFinal.w, qInitial.x, qInitial.y, qInitial.z, qInitial.w ] );

const clip_hardcoded = new THREE.AnimationClip( 'Action', -1, [ positionKF, quaternionKF] );
console.log(THREE.AnimationClip.toJSON(clip_hardcoded));
*/

                mixer = new THREE.AnimationMixer(quad);
                mixer.addEventListener( 'loop', function( e ) {
                    //console.log('loop', e);
                }); // properties of e: type, action and loopDelta

                mixer.addEventListener( 'finished', function( e ) {
                    //console.log('finished', e);
                }); // properties of e: type, action and direction

                const clipAction = mixer.clipAction( clips[0] );//.setLoop(THREE.LoopOnce);
                clipAction.play();

            },

            // onProgress callback
            function ( xhr ) {
                console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
            },

            // onError callback
            function ( err ) {
                console.error( 'An error happened', err );
            }
        );

    },

    // onProgress callback
    function ( xhr ) {
        console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
    },

    // onError callback
    function ( err ) {
        console.error( 'An error happened', err );
    }
);





function animate() {
    requestAnimationFrame( animate );

    //cube.rotation.x += 0.01;
    //cube.rotation.y += 0.01;
    //if(quad) {
    //  quad.rotation.y += 0.01;
    //}

    controls.update();

    const delta = clock.getDelta();

    if ( mixer ) {
        mixer.update( delta );
        //console.log(mixer.time);
    }
    renderer.render( scene, camera );
}
animate();

