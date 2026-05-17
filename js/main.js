// ==================== MAIN APPLICATION ENTRY POINT ====================

// Dark mode stories data
const storiesData = [
    { name: "Your Story", avatar: "You", isOwn: true },
    { name: "leo.exe", avatar: "Leo" },
    { name: "maya.art", avatar: "Maya" },
    { name: "kai_world", avatar: "Kai" },
    { name: "elara", avatar: "Elara" },
    { name: "nova.space", avatar: "Nova" }
];

// Render stories section
function renderStories() {
    const storiesSection = document.getElementById('storiesSection');
    if (!storiesSection) return;
    
    storiesSection.innerHTML = '';
    
    storiesData.forEach(story => {
        const storyItem = document.createElement('div');
        storyItem.className = 'story-item';
        storyItem.setAttribute('data-story', story.name.toLowerCase().replace(/\s/g, ''));
        
        storyItem.innerHTML = `
            <div class="story-ring">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${story.avatar}&backgroundColor=ffdfbf" alt="${story.name}">
            </div>
            <span class="story-name">${story.name}</span>
        `;
        
        storyItem.addEventListener('click', () => {
            if (navigator.vibrate) navigator.vibrate(15);
            if (window.UploadModule) {
                window.UploadModule.showToast('📖 Story: visible to friends for 24 hours!');
            }
        });
        
        storiesSection.appendChild(storyItem);
    });
}

// Dark/Light mode toggle
function initDarkMode() {
    const toggleBtn = document.getElementById('darkModeToggle');
    if (!toggleBtn) return;
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('light-mode');
        toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');
        toggleBtn.innerHTML = isLight ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
        if (navigator.vibrate) navigator.vibrate(15);
    });
}

// Search functionality
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    let debounceTimer;
    
    searchInput.addEventListener('input', (e) => {
        if (debounceTimer) clearTimeout(debounceTimer);
        
        debounceTimer = setTimeout(() => {
            const query = e.target.value.trim();
            if (navigator.vibrate) navigator.vibrate(8);
            
            if (window.UploadModule) {
                window.UploadModule.showToast(query ? `🔍 Searching: "${query}"` : '🔍 Explore');
            }
        }, 300);
    });
}

// Enable video playback on first touch (bypass autoplay restrictions)
function enableVideoPlayback() {
    const enablePlayback = () => {
        document.querySelectorAll('.feed-item video').forEach(video => {
            if (video.getBoundingClientRect().top < window.innerHeight && 
                video.getBoundingClientRect().bottom > 0) {
                video.play().catch(() => {});
            }
        });
        document.removeEventListener('touchstart', enablePlayback);
        document.removeEventListener('click', enablePlayback);
    };
    
    document.addEventListener('touchstart', enablePlayback, { once: true });
    document.addEventListener('click', enablePlayback, { once: true });
}

// Prevent context menu on feed (avoid save image popup)
function preventContextMenu() {
    window.addEventListener('contextmenu', (e) => {
        if (e.target.closest('.feed-container')) {
            e.preventDefault();
        }
    });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Tweaks app initializing...');
    
    // Initialize all modules in order
    renderStories();
    initDarkMode();
    initSearch();
    
    // Initialize feature modules
    if (window.FeedModule) window.FeedModule.renderFeed();
    if (window.TwimojisModule) window.TwimojisModule.initTwimojis();
    if (window.ChatModule) window.ChatModule.initChat();
    if (window.UploadModule) window.UploadModule.initUpload();
    
    // Utility functions
    enableVideoPlayback();
    preventContextMenu();
    
    console.log('✅ All modules loaded! Tap Twimojis above the hold button!');
});
