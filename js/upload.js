// ==================== UPLOAD MODULE - Hold to Upload ====================

// DOM elements
let uploadMenu, progressCircle, pressArea, closeMenuBtn;
let pressTimer = null;
let animationFrame = null;
let pressStartTime = 0;
const HOLD_DURATION = 700;

// Initialize upload module
function initUpload() {
    uploadMenu = document.getElementById('uploadMenu');
    progressCircle = document.getElementById('progressCircle');
    pressArea = document.getElementById('pressArea');
    closeMenuBtn = document.getElementById('closeMenuBtn');
    
    if (!pressArea) return;
    
    // Set up long press events
    pressArea.addEventListener('touchstart', startPress, { passive: false });
    pressArea.addEventListener('touchend', endPress);
    pressArea.addEventListener('touchcancel', endPress);
    pressArea.addEventListener('mousedown', startPress);
    window.addEventListener('mouseup', endPress);
    pressArea.addEventListener('mouseleave', endPress);
    
    // Close menu handlers
    if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeUploadMenu);
    if (uploadMenu) uploadMenu.addEventListener('click', (e) => {
        if (e.target === uploadMenu) closeUploadMenu();
    });
    
    // Menu option handlers
    document.querySelectorAll('[data-option]').forEach(opt => {
        opt.addEventListener('click', handleUploadOption);
    });
    
    // Reset progress circle
    if (progressCircle) progressCircle.style.strokeDashoffset = '125.6';
}

// Trigger haptic feedback
function triggerHaptic(intensity = 25) {
    if (navigator.vibrate) navigator.vibrate(intensity);
}

// Long press achieved - show upload menu
function longPressAchieved() {
    if (uploadMenu && uploadMenu.style.display !== 'flex') {
        triggerHaptic(60);
        uploadMenu.style.display = 'flex';
        if (navigator.vibrate) navigator.vibrate([50, 40]);
    }
    resetPressVisuals();
}

// Reset visual progress indicator
function resetPressVisuals() {
    if (animationFrame) cancelAnimationFrame(animationFrame);
    if (progressCircle) {
        progressCircle.style.transition = 'stroke-dashoffset 0.15s ease';
        progressCircle.style.strokeDashoffset = '125.6';
    }
    pressStartTime = 0;
}

// Update progress ring based on hold duration
function updateProgress() {
    if (!pressStartTime) return;
    
    const elapsed = Date.now() - pressStartTime;
    const percent = Math.min(1, elapsed / HOLD_DURATION);
    const dashOffset = 125.6 * (1 - percent);
    
    if (progressCircle) progressCircle.style.strokeDashoffset = dashOffset;
    
    if (percent >= 1.0) {
        clearTimeout(pressTimer);
        longPressAchieved();
        if (animationFrame) cancelAnimationFrame(animationFrame);
        animationFrame = null;
    } else {
        animationFrame = requestAnimationFrame(updateProgress);
    }
}

// Start press / hold
function startPress(e) {
    e.preventDefault();
    if (pressTimer) clearTimeout(pressTimer);
    
    pressStartTime = Date.now();
    
    if (progressCircle) {
        progressCircle.style.transition = 'none';
        progressCircle.style.strokeDashoffset = '125.6';
        progressCircle.style.transition = 'stroke-dashoffset 0.02s linear';
    }
    
    pressTimer = setTimeout(() => {
        longPressAchieved();
        resetPressVisuals();
        if (animationFrame) cancelAnimationFrame(animationFrame);
    }, HOLD_DURATION);
    
    animationFrame = requestAnimationFrame(updateProgress);
    triggerHaptic(10);
}

// End press / hold (cancel or complete)
function endPress(e) {
    if (pressTimer) {
        clearTimeout(pressTimer);
        pressTimer = null;
    }
    if (animationFrame) {
        cancelAnimationFrame(animationFrame);
        animationFrame = null;
    }
    
    if (uploadMenu && uploadMenu.style.display !== 'flex' && progressCircle) {
        progressCircle.style.transition = 'stroke-dashoffset 0.2s ease';
        progressCircle.style.strokeDashoffset = '125.6';
    }
    pressStartTime = 0;
}

// Close upload menu
function closeUploadMenu() {
    if (uploadMenu) {
        uploadMenu.style.display = 'none';
        resetPressVisuals();
    }
}

// Handle upload option click
function handleUploadOption(e) {
    e.stopPropagation();
    const type = this.getAttribute('data-option');
    triggerHaptic(35);
    
    // Show success toast
    showToast(`✨ ${type.toUpperCase()} posted!`);
    
    // Close menu
    closeUploadMenu();
    
    // Simulate adding new content to feed
    if (type === 'photo' || type === 'video') {
        const newPost = {
            id: Date.now(),
            type: type,
            url: type === 'video' 
                ? "https://assets.mixkit.co/videos/preview/mixkit-clouds-of-smoke-from-a-smoke-machine-4210-large.mp4"
                : "https://images.unsplash.com/photo-1536240474400-bd0e35b2efc8?auto=format&fit=crop&w=1000&q=80",
            username: "@your_tweak",
            caption: "Just posted something fresh 🔥",
            music: "New wave edit",
            likes: 0,
            comments: 0
        };
        
        if (window.FeedModule && window.FeedModule.addNewPost) {
            window.FeedModule.addNewPost(newPost);
        }
    }
}

// Show toast notification
function showToast(message, duration = 1500) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.style.bottom = '100px';
    toast.innerHTML = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), duration);
}

// Export upload module
window.UploadModule = {
    initUpload,
    closeUploadMenu,
    showToast
};
