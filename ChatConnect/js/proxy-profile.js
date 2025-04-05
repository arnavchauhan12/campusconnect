document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const proxyProfileForm = document.getElementById('proxy-profile-form');
    const avatarItems = document.querySelectorAll('.avatar-item');
    const bioTextarea = document.getElementById('bio');
    const bioCharacterCount = document.getElementById('bio-character-count');
    const interestCheckboxes = document.querySelectorAll('.interest-checkbox');
    const loadingOverlay = document.getElementById('loading-overlay');
    const loadingMessage = document.getElementById('loading-message');

    // User data
    let userData = {
        realProfile: JSON.parse(localStorage.getItem('userRealProfile') || '{}'),
        proxyProfile: {
            name: '',
            avatar: '',
            bio: '',
            interests: []
        }
    };

    // Helper Functions
    function showLoading(message) {
        loadingMessage.textContent = message || 'Loading...';
        loadingOverlay.classList.add('active');
    }

    function hideLoading() {
        loadingOverlay.classList.remove('active');
    }

    // Avatar selection
    avatarItems.forEach(item => {
        item.addEventListener('click', function() {
            avatarItems.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            userData.proxyProfile.avatar = this.getAttribute('data-avatar');
        });
    });

    // Bio character count
    if (bioTextarea && bioCharacterCount) {
        bioTextarea.addEventListener('input', function() {
            const count = this.value.length;
            bioCharacterCount.textContent = count;
        });
    }

    // Interest tags handling
    interestCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const interest = this.id.replace('interest-', '');
            
            if (this.checked) {
                userData.proxyProfile.interests.push(interest);
            } else {
                const index = userData.proxyProfile.interests.indexOf(interest);
                if (index > -1) {
                    userData.proxyProfile.interests.splice(index, 1);
                }
            }
        });
    });

    // Proxy profile form submission
    if (proxyProfileForm) {
        proxyProfileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate at least 3 interests are selected
            if (userData.proxyProfile.interests.length < 3) {
                alert('Please select at least 3 interests');
                return;
            }
            
            // Save form data
            userData.proxyProfile.name = document.getElementById('proxy-name').value;
            userData.proxyProfile.bio = document.getElementById('bio').value;
            
            // Save to localStorage
            localStorage.setItem('userProxyProfile', JSON.stringify(userData.proxyProfile));
            localStorage.setItem('hasCompletedProfiles', 'true');
            
            showLoading('Creating your profile...');
            
            // Simulate API call delay
            setTimeout(() => {
                hideLoading();
                window.location.href = 'dashboard.html';
            }, 1500);
        });
    }
});