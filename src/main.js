import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

gsap.registerPlugin(ScrollTrigger);

// Get <canvas>
const canvas = document.getElementById("canvas3d");

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    2000
);
camera.position.z = 5;

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
renderer.setSize(canvas.clientWidth, canvas.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Light
const dirLight = new THREE.DirectionalLight(0xf9f9f9, 2);
scene.add(dirLight);
scene.add(new THREE.AmbientLight(0xffffff, 0.2));

// Load 3D Model
new GLTFLoader().load(
    "/model/mini_keyboard.glb",
    (gltf) => {
        
        const model = gltf.scene;
        scene.add(model);

        // Animate Using GSAP
        gsap.set(model.position, { x: 0.5, y: 3, z: 0 });
        gsap.set(model.scale, { x: 0.008, y: 0.008, z: 0.008 });
        gsap.set(model.rotation, {
            x: 1.0471975511966,
            y: 0.349065850398866,
            z: 0
        });
        
        // 1st Animation 
        gsap.timeline({
            scrollTrigger: {
                trigger: "#sec-2",
                start: "-15% center",
                end: "bottom bottom",
                scrub: true,
            }, 
            defaults: { ease: "power1.inOut" }
        })
        .to(model.position, { x: -1, y: 1 })
        .to(model.scale, { x: 0.01, y: 0.01, z: 0.01 }, "<")
        .to(model.rotation, { x: 0.35, y: 5.589 }, "<");

        // 2nd Animation
        gsap.timeline({
            scrollTrigger: {
                trigger: "#sec-3",
                start: "-15% center",
                end: "bottom bottom",
                scrub: true,
            }, 
            defaults: { ease: "power1.inOut" }
        })
        .to(model.position, { x: 0.8, y: -1 })
        .to(model.scale, { x: 0.007, y: 0.007, z: 0.007 }, "<")
        .to(model.rotation, { x: 3.667, y: 0, z: 0 }, "<");

        // 3rd Animation
        gsap.timeline({
            scrollTrigger: {
                trigger: "#sec-4",
                start: "-15% center",
                end: "bottom bottom",
                scrub: true,
            }, 
            defaults: { ease: "power1.inOut" }
        })
        .to(model.position, { x: 0, y: -2.5 })
        .to(model.scale, { x: 0.006, y: 0.006, z: 0.006 }, "<")
        .to(model.rotation, { x: 0.350, y: 0, z: 0 }, "<")
        .fromTo(".text", { y: -40, opacity: 0 }, { y: 100, opacity: 1 })

    },
    undefined, 
    (error) => {
        console.error(error);
    }
);

// Animation Loop
const animate = () => {
    window.requestAnimationFrame(animate);

    renderer.render(scene, camera);
};

animate();

