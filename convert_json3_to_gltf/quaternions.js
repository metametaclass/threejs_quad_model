#!/usr/bin/env node

//const fs = require( 'fs' );
//const path = require( 'path' );
//const Canvas = require( 'canvas' );
//const { Blob, FileReader } = require( 'vblob' );
THREE = global.THREE = require( 'three' );


const zAxis = new THREE.Vector3( 0, 0, 1 );

for(i=0;i<8;i++){
  a = i*Math.PI/2;
  q = new THREE.Quaternion().setFromAxisAngle( zAxis, a );
  console.log(a/2,q)
}
