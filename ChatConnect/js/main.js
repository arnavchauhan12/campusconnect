document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');
    const loginForm = document.getElementById('login-form-element');
    const signupForm = document.getElementById('signup-form-element');
    const loadingOverlay = document.getElementById('loading-overlay');
    const loadingMessage = document.getElementById('loading-message');

    // Helper Functions
    function showLoading(message) {
        loadingMessage.textContent = message || 'Loading...';
        loadingOverlay.classList.add('active');
    }

    function hideLoading() {
        loadingOverlay.classList.remove('active');
    }

    // Auth tabs functionality
    authTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabTarget = this.getAttribute('data-tab');
            
            // Update tab UI
            authTabs.forEach(t => t.classList.remove('auth-tab-active'));
            this.classList.add('auth-tab-active');
            
            // Show corresponding form
            authForms.forEach(form => form.classList.remove('auth-form-active'));
            document.getElementById(`${tabTarget}-form`).classList.add('auth-form-active');
        });
    });

    // Login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showLoading('Logging in...');
            
            // Simulate API call delay
            setTimeout(() => {
                hideLoading();
                // Check if user has completed profile setup
                const hasCompletedProfiles = localStorage.getItem('hasCompletedProfiles');
                
                if (hasCompletedProfiles) {
                    window.location.href = 'dashboard.html';
                } else {
                    window.location.href = 'real-profile.html';
                }
            }, 1000);
        });
    }

    // Signup form submission
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showLoading('Creating account...');
            
            // Simulate API call delay
            setTimeout(() => {
                hideLoading();
                window.location.href = 'verification.html';
            }, 1000);
        });
    }
});