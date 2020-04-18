var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );

camera.position.z = 5;
camera.position.x = 0;
camera.position.y = 0;
camera.rotation.z = 0;


var renderer = new THREE.WebGLRenderer({antialisias: true});
renderer.setSize( window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement);
window.addEventListener('resize', ()=>{
    renderer.setSize( window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
});
var geometry = new THREE.SphereGeometry( 1, 32, 32 );
var texture = new THREE.TextureLoader().load('/img/texture.jpg');
var material = new THREE.MeshLambertMaterial( {map: texture} );
var earth = new THREE.Mesh(geometry, material);
scene.add(earth);

var light = new THREE.PointLight('#ffff4a', 3);
light.position.x = 6;
light.position.y = 3;
light.position.z = 0;
light.receiveShadow = true;
scene.add(light);

var render = function(){
    requestAnimationFrame(render);
    cube.rotation.y += 0.001;
    renderer.render(scene, camera);
}
render();