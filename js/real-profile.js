document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const realProfileForm = document.getElementById('real-profile-form');
    const uploadProfilePicBtn = document.getElementById('upload-profile-pic');
    const profilePicInput = document.getElementById('profile-pic-input');
    const loadingOverlay = document.getElementById('loading-overlay');
    const loadingMessage = document.getElementById('loading-message');

    // User data
    const userData = {
        realProfile: {
            name: '',
            age: '',
            gender: '',
            department: '',
            batch: '',
            profilePic: null,
            sexuality: ''
        },
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

    // Profile picture upload
    if (uploadProfilePicBtn && profilePicInput) {
        uploadProfilePicBtn.addEventListener('click', function() {
            profilePicInput.click();
        });
        
        profilePicInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    const profilePicPreview = document.querySelector('.profile-pic-preview');
                    profilePicPreview.innerHTML = '';
                    
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    profilePicPreview.appendChild(img);
                    
                    userData.realProfile.profilePic = e.target.result;
                };
                
                reader.readAsDataURL(this.files[0]);
            }
        });
    }

    // Real profile form submission
    if (realProfileForm) {
        realProfileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Save form data
            userData.realProfile.name = document.getElementById('real-name').value;
            userData.realProfile.age = document.getElementById('age').value;
            userData.realProfile.gender = document.getElementById('gender').value;
            userData.realProfile.department = document.getElementById('department').value;
            userData.realProfile.batch = document.getElementById('batch').value;
            userData.realProfile.sexuality = document.getElementById('sexuality').value;
            
            // Save to localStorage
            localStorage.setItem('userRealProfile', JSON.stringify(userData.realProfile));
            
            showLoading('Saving profile...');
            
            // Simulate API call delay
            setTimeout(() => {
                hideLoading();
                window.location.href = 'proxy-profile.html';
            }, 1000);
        });
    }
});