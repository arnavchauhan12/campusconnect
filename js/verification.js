document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const verificationInputs = document.querySelectorAll('.verification-input');
    const verifyCodeBtn = document.getElementById('verify-code-btn');
    const resendCodeBtn = document.getElementById('resend-code');
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

    // Verification code input handling
    verificationInputs.forEach((input, index) => {
        input.addEventListener('input', function() {
            if (this.value.length === 1) {
                // Move focus to the next input
                if (index < verificationInputs.length - 1) {
                    verificationInputs[index + 1].focus();
                }
            }
        });
        
        input.addEventListener('keydown', function(e) {
            // Handle backspace
            if (e.key === 'Backspace' && !this.value && index > 0) {
                verificationInputs[index - 1].focus();
            }
        });
    });

    // Verify code button
    if (verifyCodeBtn) {
        verifyCodeBtn.addEventListener('click', function() {
            showLoading('Verifying email...');
            
            // Simulate API call delay
            setTimeout(() => {
                hideLoading();
                window.location.href = 'real-profile.html';
            }, 1000);
        });
    }

    // Resend code link
    if (resendCodeBtn) {
        resendCodeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            this.textContent = 'Code sent!';
            this.style.pointerEvents = 'none';
            this.style.opacity = '0.7';
            
            // Reset after 5 seconds
            setTimeout(() => {
                this.textContent = 'Resend it';
                this.style.pointerEvents = 'auto';
                this.style.opacity = '1';
            }, 5000);
        });
    }
});