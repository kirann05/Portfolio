
/**
 * Render Reusable Footer Component
 * @param {string} containerId - ID of the element to inject the footer into
 * @param {object} props - { pageTagline, pageDescription }
 */
function renderFooter(containerId, props) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Inject CSS for animations if not already present
    if (!document.getElementById('footer-styles')) {
        const style = document.createElement('style');
        style.id = 'footer-styles';
        style.textContent = `
            /* Dynamic Sky Gradient */
            .bg-sky-gradient {
              background: linear-gradient(to bottom, #0f172a, #1e293b);
            }
            .dark .bg-sky-gradient {
              background: linear-gradient(to bottom, #020617, #0f172a);
            }
            /* The Sun Animation */
            .sun-orb {
              position: absolute;
              width: 80px;
              height: 80px;
              background: radial-gradient(circle, #fcd34d 0%, #f59e0b 70%, transparent 100%);
              border-radius: 50%;
              filter: blur(15px);
              opacity: 0.6;
              bottom: -40px;
              left: 10%;
              animation: celestial-arc 20s infinite alternate ease-in-out;
            }
            @keyframes celestial-arc {
              0% { transform: translate(0, 0); opacity: 0.3; }
              50% { transform: translate(40vw, -120px); opacity: 0.8; background: radial-gradient(circle, #fff7ed 0%, #fcd34d 70%, transparent 100%); }
              100% { transform: translate(80vw, 0); opacity: 0.3; }
            }
            /* Subtle Cloud Movement */
            .clouds-layer {
              position: absolute;
              top: 0; left: 0; width: 200%; height: 100%;
              background: url('https://www.transparenttextures.com/patterns/cloudy-day.png');
              opacity: 0.1;
              animation: cloud-drift 60s linear infinite;
              pointer-events: none;
            }
            @keyframes cloud-drift {
              from { transform: translateX(0); }
              to { transform: translateX(-50%); }
            }
        `;
        document.head.appendChild(style);
    }

    const { pageTagline, pageDescription } = props;

    container.innerHTML = `
    <footer class="relative overflow-hidden w-full border-t border-slate-800 text-slate-400 font-sans py-16 bg-sky-gradient transition-colors duration-700">
        <!-- Animated Background -->
        <div class="absolute inset-0 z-0 pointer-events-none sky-background">
            <div class="sun-orb"></div>
            <div class="clouds-layer"></div>
        </div>

        <div class="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            <!-- Left Column: Brand & Bio -->
            <div class="space-y-6">
                <div>
                     <h2 class="text-2xl font-bold text-white tracking-tight">Kiran Gandluri</h2>
                     <p class="text-slate-400 italic mt-1 font-serif text-lg">${pageTagline}</p>
                </div>
                <p class="text-slate-500 leading-relaxed max-w-md text-sm">
                    ${pageDescription}
                </p>
                
                <div class="pt-8 space-y-4">
                     <p class="text-xs text-slate-600">&copy; 2024 Kiran Gandluri. All rights reserved. 
                        <span class="mx-2">•</span> <a href="#" class="hover:text-slate-300 transition-colors">Privacy</a>
                        <span class="mx-2">•</span> <a href="#" class="hover:text-slate-300 transition-colors">Terms</a>
                     </p>
                     
                     <!-- View Counter -->
                     <span class="view-counter inline-flex items-center gap-2 text-xs font-medium text-slate-500">
                        <svg class="w-4 h-4 text-teal-500/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 5 8.268 7.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <span id="page-views">1,245</span>
                     </span>
                </div>
            </div>

            <!-- Right Column: Navigation & Connect -->
            <div class="grid grid-cols-2 gap-8 lg:pl-20">
                <!-- Navigate -->
                <div>
                    <h3 class="text-xs font-bold text-white uppercase tracking-widest mb-6">Navigate</h3>
                    <ul class="space-y-3 text-sm">
                         <li><a href="index.html#work-page" class="hover:text-teal-400 transition-colors">Work</a></li>
                         <li><a href="index.html#projects-page" class="hover:text-teal-400 transition-colors">Projects</a></li>
                         <li><a href="about.html" class="hover:text-teal-400 transition-colors">About</a></li>
                         <li><a href="index.html#resume-page" target="_blank" class="hover:text-teal-400 transition-colors">Resume</a></li>
                    </ul>
                </div>

                <!-- Connect -->
                <div>
                    <h3 class="text-xs font-bold text-white uppercase tracking-widest mb-6">Connect</h3>
                    <div class="flex gap-4">
                        <a href="https://linkedin.com/in/kirangandluri" target="_blank" class="p-2 bg-slate-900/50 rounded-full border border-slate-800 hover:border-teal-500 hover:text-teal-400 transition-all group backdrop-blur-sm">
                             <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                        </a>
                         <a href="https://github.com/kirangandluri" target="_blank" class="p-2 bg-slate-900/50 rounded-full border border-slate-800 hover:border-teal-500 hover:text-teal-400 transition-all group backdrop-blur-sm">
                             <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                        </a>
                        <a href="https://twitter.com/kirangandluri" target="_blank" class="p-2 bg-slate-900/50 rounded-full border border-slate-800 hover:border-teal-500 hover:text-teal-400 transition-all group backdrop-blur-sm">
                             <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    `;

    // Initialize View Counter logic
    const viewCounter = container.querySelector('#page-views');
    if (viewCounter) {
        let views = localStorage.getItem('portfolio_views');
        if (!views || isNaN(views)) views = 1240;
        views = parseInt(views) + 1;
        localStorage.setItem('portfolio_views', views);
        viewCounter.innerText = views.toLocaleString();
    }
}

