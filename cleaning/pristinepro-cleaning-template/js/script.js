        // Initialize Three.js scene
        function initThreeScene() {
            // Create scene
            const scene = new THREE.Scene();
            scene.background = new THREE.Color(0x1a1a1a); // Set background to light black
            
            // Create camera
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.z = 5;
            
            // Create renderer
            const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
            document.getElementById('three-canvas').appendChild(renderer.domElement);
            
            // Add lighting
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
            scene.add(ambientLight);
            
            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
            directionalLight.position.set(1, 1, 1);
            scene.add(directionalLight);
            
            // Create floating cleaning objects
            const objects = [];
            // Colors for bubbles/water droplets (matching new brand colors)
            const colors = [0x007bff, 0x28a745, 0xffc107, 0x999999]; // Darker shades of blue, green, gold, and grey 
            const geometries = [
                new THREE.SphereGeometry(0.3, 32, 32), // Smaller, smoother spheres for bubbles
                new THREE.SphereGeometry(0.5, 32, 32)
            ];
            
            // Create floating objects (bubbles/water droplets)
            for (let i = 0; i < 15; i++) { // Increased number of objects
                const geometry = geometries[Math.floor(Math.random() * geometries.length)];
                const material = new THREE.MeshPhongMaterial({
                    color: colors[Math.floor(Math.random() * colors.length)],
                    transparent: true,
                    opacity: 0.6 + Math.random() * 0.2, // Varying transparency
                    shininess: 150, // More shiny
                    specular: 0xAAAAAA // Add specular for highlights
                });
                
                const object = new THREE.Mesh(geometry, material);
                
                // Position randomly
                object.position.x = (Math.random() - 0.5) * 12; // Wider spread
                object.position.y = (Math.random() - 0.5) * 6;
                object.position.z = (Math.random() - 0.5) * 12 - 5;
                
                // Random rotation
                object.rotation.x = Math.random() * Math.PI;
                object.rotation.y = Math.random() * Math.PI;
                
                // Random scale
                const scale = 0.4 + Math.random() * 0.6; // Varying sizes
                object.scale.set(scale, scale, scale);
                
                // Store original position for floating effect
                object.userData = {
                    originalY: object.position.y,
                    speed: 0.05 + Math.random() * 0.05, // Slower, more gentle movement
                    rotationSpeed: {
                        x: (Math.random() - 0.5) * 0.01,
                        y: (Math.random() - 0.5) * 0.01
                    }
                };
                
                scene.add(object);
                objects.push(object);
            }
            
            // Add a larger central object (representing a clean, sparkling item)
            const centralGeometry = new THREE.SphereGeometry(1.5, 64, 64); // Smooth sphere
            const centralMaterial = new THREE.MeshPhongMaterial({
                color: 0x1a2a4a, // Primary color for central object
                emissive: 0x000000, // No self-illumination
                specular: 0xFFFFFF, // Strong specular highlights
                shininess: 200, // Very shiny
                transparent: true,
                opacity: 0.9 // Slightly transparent
            });
            const centralObject = new THREE.Mesh(centralGeometry, centralMaterial);
            centralObject.scale.set(0.8, 0.8, 0.8);
            scene.add(centralObject);
            
            // Add particles
            const particleCount = 1000;
            const particles = new THREE.BufferGeometry();
            const particlePositions = new Float32Array(particleCount * 3);
            const particleColors = new Float32Array(particleCount * 3);
            
            for (let i = 0; i < particleCount; i++) {
                const i3 = i * 3;
                
                // Positions
                particlePositions[i3] = (Math.random() - 0.5) * 20;
                particlePositions[i3 + 1] = (Math.random() - 0.5) * 20;
                particlePositions[i3 + 2] = (Math.random() - 0.5) * 20;
                
                // Colors
                particleColors[i3] = Math.random() * 0.5 + 0.5;
                particleColors[i3 + 1] = Math.random() * 0.5 + 0.5;
                particleColors[i3 + 2] = Math.random() * 0.5 + 0.5;
            }
            
            particles.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
            particles.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
            
            const particleMaterial = new THREE.PointsMaterial({
                size: 0.05,
                vertexColors: true,
                transparent: true,
                opacity: 0.8
            });
            
            const particleSystem = new THREE.Points(particles, particleMaterial);
            scene.add(particleSystem);
            
            // Animation
            function animate() {
                requestAnimationFrame(animate);
                
                // Animate floating objects
                const time = Date.now() * 0.001;
                
                objects.forEach(object => {
                    // Floating effect
                    object.position.y = object.userData.originalY + Math.sin(time * object.userData.speed) * 0.3;
                    
                    // Rotation
                    object.rotation.x += object.userData.rotationSpeed.x;
                    object.rotation.y += object.userData.rotationSpeed.y;
                });
                
                // Rotate central object
                centralObject.rotation.x += 0.005;
                centralObject.rotation.y += 0.007;
                
                // Rotate particles
                particleSystem.rotation.y += 0.001;
                
                renderer.render(scene, camera);
            }
            
            // Handle window resize
            window.addEventListener('resize', () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            });
            
            animate();
        }
        
        // Initialize when page loads
        document.addEventListener('DOMContentLoaded', () => {
            // Header scroll effect
            window.addEventListener('scroll', function() {
                const header = document.querySelector('header');
                if (window.scrollY > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
            
            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        window.scrollTo({
                            top: target.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                });
            });
            
            // Initialize Three.js scene
            initThreeScene();
            
            // 3D hover effects for cards
            document.querySelectorAll('.service-card, .pricing-card').forEach(card => {
                card.addEventListener('mousemove', function(e) {
                    const cardRect = this.getBoundingClientRect();
                    const cardCenterX = cardRect.left + cardRect.width / 2;
                    const cardCenterY = cardRect.top + cardRect.height / 2;
                    
                    const angleX = (e.clientY - cardCenterY) / 20;
                    const angleY = (cardCenterX - e.clientX) / 20;
                    
                    this.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.02)`;
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
                });
            });
        });