/**
 * Interactive Particle Animation with Parallax Effect
 * 
 * Features:
 * - 80-120 drifting particles with connection lines
 * - Cursor interaction (attract/repel particles)
 * - Parallax background layers
 * - Optimized for performance
 * - Responsive design
 */
class ParticleAnimation {
  constructor(options = {}) {
    // Default configuration
    this.config = {
      containerId: options.containerId || 'background-animation',
      particleCount: options.particleCount || this._getResponsiveParticleCount(),
      particleColor: options.particleColor || '#64748b',
      particleSize: options.particleSize || { min: 1, max: 3 },
      lineColor: options.lineColor || 'rgba(100, 116, 139, 0.2)',
      lineThreshold: options.lineThreshold || 100,
      particleSpeed: options.particleSpeed || { min: 0.2, max: 0.5 },
      cursorRadius: options.cursorRadius || 100,
      cursorEffect: options.cursorEffect || 'repel', // 'attract' or 'repel'
      cursorStrength: options.cursorStrength || 100,
      colors: options.colors || ['#94a3b8', '#64748b', '#475569'], // Slate colors based on the image
      responsive: options.responsive !== undefined ? options.responsive : true,
    };

    // Internal state
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.parallaxLayers = [];
    this.lastFrameTime = 0;
    this.mouse = { x: null, y: null, active: false };
    this.resizeTimeout = null;
    this.animationFrame = null;
    this.windowCenter = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    
    // Initialize the animation
    this._init();
  }

  /**
   * Initialize the animation
   * @private
   */
  _init() {
    // Create container if it doesn't exist
    this._setupContainer();
    
    // Create canvas
    this._setupCanvas();
    
    // Create parallax background layers
    this._createParallaxLayers();
    
    // Generate particles
    this._generateParticles();
    
    // Add event listeners
    this._setupEventListeners();
    
    // Start animation loop
    this.start();
  }

  /**
   * Set up the container element
   * @private
   */
  _setupContainer() {
    this.container = document.getElementById(this.config.containerId);
    
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.id = this.config.containerId;
      this.container.className = 'background-animation';
      document.body.appendChild(this.container);
    }
    
    if (!this.container.classList.contains('background-animation')) {
      this.container.classList.add('background-animation');
    }
  }

  /**
   * Set up the canvas element
   * @private
   */
  _setupCanvas() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.container.appendChild(this.canvas);
    
    // Set canvas size
    this._resizeCanvas();
  }

  /**
   * Resize canvas to match window size
   * @private
   */
  _resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = window.innerWidth * dpr;
    this.canvas.height = window.innerHeight * dpr;
    this.ctx.scale(dpr, dpr);
    
    this.windowCenter = { 
      x: window.innerWidth / 2, 
      y: window.innerHeight / 2 
    };
    
    // Update particle count if responsive
    if (this.config.responsive) {
      const newCount = this._getResponsiveParticleCount();
      
      // Only regenerate if the count has changed significantly
      if (Math.abs(newCount - this.particles.length) > 10) {
        this.config.particleCount = newCount;
        this._generateParticles();
      }
    }
  }

  /**
   * Determine appropriate particle count based on screen size
   * @private
   * @returns {number} Appropriate particle count
   */
  _getResponsiveParticleCount() {
    const width = window.innerWidth;
    
    if (width < 768) {
      return 30; // Mobile devices
    } else if (width < 1024) {
      return 60; // Tablets
    } else if (width < 1440) {
      return 90; // Small desktops
    } else {
      return 120; // Large desktops
    }
  }

  /**
   * Create parallax background layers
   * @private
   */
  _createParallaxLayers() {
    const colors = this.config.colors;
    
    // Create 3 parallax layers with gradients that match the image
    for (let i = 0; i < 3; i++) {
      const layer = document.createElement('div');
      layer.className = 'parallax-blob';
      
      // Size and position
      const size = 300 + Math.random() * 400;
      
      // Position layers to create an effect similar to the image
      const left = i === 0 ? 10 + Math.random() * 20 : 
                  i === 1 ? 40 + Math.random() * 20 : 
                  70 + Math.random() * 20;
                  
      const top = 30 + Math.random() * 40;
      
      layer.style.width = `${size}px`;
      layer.style.height = `${size}px`;
      layer.style.left = `${left}%`;
      layer.style.top = `${top}%`;
      layer.style.backgroundColor = colors[i % colors.length];
      layer.style.zIndex = `-${20 - i}`; // Layer stacking
      
      // Adjusted opacity and blur for a more subtle effect like in the image
      layer.style.opacity = `${0.15 - (i * 0.03)}`;
      layer.style.filter = `blur(${70 + i * 10}px)`;
      
      this.container.appendChild(layer);
      this.parallaxLayers.push(layer);
    }
  }

  /**
   * Generate particles
   * @private
   */
  _generateParticles() {
    // Clear existing particles
    this.particles = [];
    
    for (let i = 0; i < this.config.particleCount; i++) {
      this.particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: this._getRandomRange(this.config.particleSize.min, this.config.particleSize.max),
        speed: this._getRandomRange(this.config.particleSpeed.min, this.config.particleSpeed.max),
        directionX: Math.random() * 2 - 1,
        directionY: Math.random() * 2 - 1,
        color: this.config.particleColor,
        // Add slight opacity variation for depth
        opacity: 0.7 + Math.random() * 0.3
      });
    }
  }

  /**
   * Get a random number within a range
   * @private
   * @param {number} min - Minimum value
   * @param {number} max - Maximum value
   * @returns {number} Random value within range
   */
  _getRandomRange(min, max) {
    return min + Math.random() * (max - min);
  }

  /**
   * Set up event listeners
   * @private
   */
  _setupEventListeners() {
    // Mouse movement
    const throttledMouseMove = this._throttle((e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.mouse.active = true;
      
      // Update parallax layers
      this._updateParallaxLayers();
    }, 16); // ~60fps
    
    document.addEventListener('mousemove', throttledMouseMove);
    
    // Touch movement
    const throttledTouchMove = this._throttle((e) => {
      if (e.touches && e.touches.length > 0) {
        this.mouse.x = e.touches[0].clientX;
        this.mouse.y = e.touches[0].clientY;
        this.mouse.active = true;
        
        // Update parallax layers
        this._updateParallaxLayers();
      }
    }, 16); // ~60fps
    
    document.addEventListener('touchmove', throttledTouchMove);
    
    // Mouse leave
    document.addEventListener('mouseleave', () => {
      this.mouse.active = false;
    });
    
    // Touch end
    document.addEventListener('touchend', () => {
      this.mouse.active = false;
    });
    
    // Window resize
    const throttledResize = this._throttle(() => {
      this._resizeCanvas();
    }, 100);
    
    window.addEventListener('resize', throttledResize);
  }

  /**
   * Update parallax layers based on mouse position
   * @private
   */
  _updateParallaxLayers() {
    if (!this.mouse.active) return;
    
    // Calculate mouse offset from center
    const offsetX = (this.mouse.x - this.windowCenter.x) / this.windowCenter.x;
    const offsetY = (this.mouse.y - this.windowCenter.y) / this.windowCenter.y;
    
    // Update each layer with different intensities
    this.parallaxLayers.forEach((layer, index) => {
      const intensity = 20 - (index * 5); // Decreasing intensity for deeper layers
      const x = -offsetX * intensity;
      const y = -offsetY * intensity;
      
      layer.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  /**
   * Throttle function to limit event firing
   * @private
   * @param {function} func - Function to throttle
   * @param {number} limit - Time limit in ms
   * @returns {function} Throttled function
   */
  _throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function() {
      const context = this;
      const args = arguments;
      if (!lastRan) {
        func.apply(context, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(function() {
          if (Date.now() - lastRan >= limit) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    };
  }

  /**
   * Draw a single particle
   * @private
   * @param {object} particle - Particle to draw
   */
  _drawParticle(particle) {
    this.ctx.beginPath();
    this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    this.ctx.fillStyle = particle.color.replace(')', `, ${particle.opacity})`).replace('rgb', 'rgba');
    this.ctx.fill();
  }

  /**
   * Draw connection lines between particles
   * @private
   */
  _drawConnections() {
    const particles = this.particles;
    const threshold = this.config.lineThreshold;
    
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < threshold) {
          // Opacity based on distance
          const opacity = (1 - distance / threshold) * 0.3; // More subtle lines
          this.ctx.strokeStyle = this.config.lineColor.replace('0.2', opacity.toFixed(2));
          this.ctx.lineWidth = 0.3; // Thinner lines for subtlety
          this.ctx.beginPath();
          this.ctx.moveTo(particles[i].x, particles[i].y);
          this.ctx.lineTo(particles[j].x, particles[j].y);
          this.ctx.stroke();
        }
      }
    }
  }

  /**
   * Apply cursor interaction to particles
   * @private
   */
  _applyCursorInteraction() {
    if (!this.mouse.active || this.mouse.x === null || this.mouse.y === null) return;
    
    const particles = this.particles;
    const cursorRadius = this.config.cursorRadius;
    const strength = this.config.cursorStrength;
    const isRepel = this.config.cursorEffect === 'repel';
    
    for (let i = 0; i < particles.length; i++) {
      const dx = particles[i].x - this.mouse.x;
      const dy = particles[i].y - this.mouse.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Only affect particles within cursor radius
      if (distance < cursorRadius) {
        // Calculate force direction and magnitude
        const force = (isRepel ? 1 : -1) * strength / (distance * 2); // Reduced strength for subtlety
        const forceX = dx * force;
        const forceY = dy * force;
        
        // Apply force with easing
        particles[i].x += forceX * 0.03; // Slower movement
        particles[i].y += forceY * 0.03;
      }
    }
  }

  /**
   * Update particle positions
   * @private
   * @param {number} deltaTime - Time since last frame in ms
   */
  _updateParticles(deltaTime) {
    const timeScale = deltaTime / 16; // Normalize to ~60fps
    
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      
      // Move particles (slower for more subtle effect)
      p.x += p.directionX * p.speed * timeScale * 0.5;
      p.y += p.directionY * p.speed * timeScale * 0.5;
      
      // Boundary collision detection
      if (p.x < 0 || p.x > window.innerWidth) {
        p.directionX *= -1;
      }
      
      if (p.y < 0 || p.y > window.innerHeight) {
        p.directionY *= -1;
      }
      
      // Keep particles within bounds
      p.x = Math.max(0, Math.min(window.innerWidth, p.x));
      p.y = Math.max(0, Math.min(window.innerHeight, p.y));
    }
  }

  /**
   * Draw all elements for one frame
   * @private
   * @param {number} timestamp - Current timestamp from requestAnimationFrame
   */
  _draw(timestamp) {
    // Calculate delta time
    const deltaTime = timestamp - this.lastFrameTime;
    this.lastFrameTime = timestamp;
    
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width / window.devicePixelRatio, this.canvas.height / window.devicePixelRatio);
    
    // Update and draw particles
    this._updateParticles(deltaTime);
    this._applyCursorInteraction();
    this._drawConnections();
    
    for (let i = 0; i < this.particles.length; i++) {
      this._drawParticle(this.particles[i]);
    }
    
    // Request next frame
    this.animationFrame = requestAnimationFrame(this._draw.bind(this));
  }

  /**
   * Start the animation
   * @public
   */
  start() {
    if (!this.animationFrame) {
      this.lastFrameTime = performance.now();
      this.animationFrame = requestAnimationFrame(this._draw.bind(this));
    }
  }

  /**
   * Stop the animation
   * @public
   */
  stop() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }

  /**
   * Destroy the animation and clean up resources
   * @public
   */
  destroy() {
    this.stop();
    
    // Remove event listeners
    document.removeEventListener('mousemove', this._throttle);
    document.removeEventListener('touchmove', this._throttle);
    document.removeEventListener('mouseleave', this._throttle);
    document.removeEventListener('touchend', this._throttle);
    window.removeEventListener('resize', this._throttle);
    
    // Remove DOM elements
    this.parallaxLayers.forEach(layer => {
      if (layer.parentNode) {
        layer.parentNode.removeChild(layer);
      }
    });
    
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
    
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
  }
}

// Export for ES modules
export default ParticleAnimation;