var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );

camera.position.z = 5;
camera.position.x = 0;
camera.position.y = 0;

var renderer = new THREE.WebGLRenderer({antialisias: true});
renderer.setSize( window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement);
window.addEventListener('resize', ()=>{
    renderer.setSize( window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
});
var geometry = new THREE.SphereGeometry( 1, 32, 32 );
var texture = new THREE.TextureLoader().load('https://mml20.github.io/Earth/img/texture.jpg');
var material = new THREE.MeshLambertMaterial( {map: texture} );
var earth = new THREE.Mesh(geometry, material);
earth.receiveShadow = true;
earth.castShadow = true;
scene.add(earth);

var loader = new THREE.TextureLoader();
var texture = loader.load( 'https://mml20.github.io/Earth/img/texture_sky.jpg' );
var backgroundMesh = new THREE.Mesh(new THREE.PlaneGeometry(5, 5, 0), new THREE.MeshBasicMaterial({map: texture}));
//scene.add(backgroundMesh);

var geometry2 = new THREE.SphereGeometry( 0.1, 32, 32 );
var texture2 = new THREE.TextureLoader().load('/img/texture_moon.jpg');
var material2 = new THREE.MeshLambertMaterial( {map: texture2} );
var moon = new THREE.Mesh(geometry2, material2);
moon.castShadow = true;
moon.receiveShadow = true;
scene.add(moon);

var light = new THREE.PointLight('#ffff4a', 3);
light.position.x = 6;
light.position.y = 3;
light.position.z = 0;
light.castShadow = true;
light.shadow.camera.near = 0.01;
light.shadow.camera.far = 10;
scene.add(light);

var timer = document.getElementById('timer');
var hour = 0;
var min = 0;
var sec = 0;
var year = 0;
var day = 0;

function add_time(){
    day++;
    if ( day == 365){
        year++;
    }  
    if (day == 1){
        hour+=24;
    }
    timer.innerHTML =  year + " years  " + day + " days ";
    //timer.innerHTML =  hour + ":" + min + ":" + sec + "  " + year + " years  " + day + " days";
};

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap
var i = 0;
var render = function(){
    requestAnimationFrame(render);
    earth.rotation.y += 0.001;
    moon.position.x = 2* Math.cos((i*(Math.PI/180)));  //5 second moon go
    moon.position.z = 2* Math.sin((i*(Math.PI/180)));
    moon.position.x -= 0.001;
    i ++;
    renderer.render(scene, camera);
}
render();
setInterval(add_time, 5000);
