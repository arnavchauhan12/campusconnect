document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const userMenuTrigger = document.getElementById('user-menu-trigger');
    const userDropdown = document.getElementById('user-dropdown');
    const startRandomChatBtn = document.getElementById('start-random-chat');
    const startInterestChatBtn = document.getElementById('start-interest-chat');
    const logoutLink = document.getElementById('logout-link');
    const headerAvatarImg = document.getElementById('header-avatar-img');
    const loadingOverlay = document.getElementById('loading-overlay');
    const loadingMessage = document.getElementById('loading-message');

    // Load user data
    const userProxyProfile = JSON.parse(localStorage.getItem('userProxyProfile') || '{}');

    // Helper Functions
    function showLoading(message) {
        loadingMessage.textContent = message || 'Loading...';
        loadingOverlay.classList.add('active');
    }

    function hideLoading() {
        loadingOverlay.classList.remove('active');
    }

    // Update header avatar
    if (headerAvatarImg && userProxyProfile.avatar) {
        headerAvatarImg.src = `images/avatars/${userProxyProfile.avatar}.png`;
    }

    // User menu dropdown
    if (userMenuTrigger && userDropdown) {
        userMenuTrigger.addEventListener('click', function() {
            userDropdown.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!userMenuTrigger.contains(e.target) && !userDropdown.contains(e.target)) {
                userDropdown.classList.remove('active');
            }
        });
    }

    // Start random chat
    if (startRandomChatBtn) {
        startRandomChatBtn.addEventListener('click', function() {
            showLoading('Finding a chat partner...');
            
            // Simulate finding a match
            setTimeout(() => {
                hideLoading();
                window.location.href = 'chat.html?type=random';
            }, 2000);
        });
    }

    // Start interest-based chat
    if (startInterestChatBtn) {
        startInterestChatBtn.addEventListener('click', function() {
            showLoading('Finding a match based on your interests...');
            
            // Simulate finding a match
            setTimeout(() => {
                hideLoading();
                window.location.href = 'chat.html?type=interest';
            }, 3000);
        });
    }

    // Logout link
    if (logoutLink) {
        logoutLink.addEventListener('click', function(e) {
            e.preventDefault();
            showLoading('Logging out...');
            
            // Simulate API call delay
            setTimeout(() => {
                hideLoading();
                window.location.href = 'index.html';
            }, 1000);
        });
    }

    // Simulate active user count update
    function updateActiveUserCount() {
        const activeUserCount = document.getElementById('active-user-count');
        if (activeUserCount) {
            const randomChange = Math.floor(Math.random() * 5) - 2; // -2 to +2
            const currentCount = parseInt(activeUserCount.textContent);
            const newCount = Math.max(50, currentCount + randomChange);
            activeUserCount.textContent = newCount;
        }
    }

    // Update active user count every 10 seconds
    setInterval(updateActiveUserCount, 10000);
});