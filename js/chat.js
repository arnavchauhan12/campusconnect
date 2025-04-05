document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const backToDashboardBtn = document.getElementById('back-to-dashboard');
    const toggleInfoBtn = document.getElementById('toggle-info');
    const userInfoSidebar = document.getElementById('user-info-sidebar');
    const closeSidebarBtn = document.getElementById('close-sidebar');
    const chatMessageInput = document.getElementById('chat-message-input');
    const sendMessageBtn = document.getElementById('send-message');
    const chatMessages = document.getElementById('chat-messages');
    const revealRequestBtn = document.getElementById('reveal-request-btn');
    const revealModal = document.getElementById('reveal-modal');
    const closeRevealModalBtn = document.getElementById('close-reveal-modal');
    const cancelRevealBtn = document.getElementById('cancel-reveal-btn');
    const confirmRevealBtn = document.getElementById('confirm-reveal-btn');
    const profilesRevealedModal = document.getElementById('profiles-revealed-modal');
    const closeRevealedModalBtn = document.getElementById('close-revealed-modal');
    const continueChatBtn = document.getElementById('continue-chat-btn');
    const endChatBtn = document.getElementById('end-chat-btn');
    const reportUserBtn = document.getElementById('report-user-btn');
    const loadingOverlay = document.getElementById('loading-overlay');
    const loadingMessage = document.getElementById('loading-message');
    const chatInputContainer = document.getElementById('chat-input-container');
    const chatUserAvatarImg = document.getElementById('chat-user-avatar-img');
    const chatUserName = document.getElementById('chat-user-name');
    const sidebarAvatarImg = document.getElementById('sidebar-avatar-img');
    const sidebarName = document.getElementById('sidebar-name');
    const sidebarBio = document.getElementById('sidebar-bio');

    // Load user data
    const userRealProfile = JSON.parse(localStorage.getItem('userRealProfile') || '{}');
    const userProxyProfile = JSON.parse(localStorage.getItem('userProxyProfile') || '{}');

    // Chat partner data (would be replaced with real data from backend)
    const chatPartnerData = {
        realProfile: {
            name: 'Alex Johnson',
            age: '21',
            gender: 'male',
            department: 'Computer Science',
            batch: 'Junior',
            profilePic: 'images/profile-placeholder.jpg'
        },
        proxyProfile: {
            name: 'Iron Man',
            avatar: 'avatar3',
            bio: 'Tech enthusiast and marvel fan. Love discussing new technologies and sci-fi movies.',
            interests: ['Technology', 'Movies', 'Gaming']
        }
    };

    // Chat state
    const chatState = {
        partner: null,
        revealRequested: false,
        revealAccepted: false
    };

    // Helper Functions
    function showLoading(message) {
        loadingMessage.textContent = message || 'Loading...';
        loadingOverlay.classList.add('active');
    }

    function hideLoading() {
        loadingOverlay.classList.remove('active');
    }

    // Back to dashboard
    if (backToDashboardBtn) {
        backToDashboardBtn.addEventListener('click', function() {
            confirmEndChat();
        });
    }

    // Toggle user info sidebar
    if (toggleInfoBtn && userInfoSidebar) {
        toggleInfoBtn.addEventListener('click', function() {
            userInfoSidebar.classList.add('active');
        });
    }

    // Close sidebar
    if (closeSidebarBtn && userInfoSidebar) {
        closeSidebarBtn.addEventListener('click', function() {
            userInfoSidebar.classList.remove('active');
        });
    }

    // Send chat message
    if (sendMessageBtn && chatMessageInput) {
        sendMessageBtn.addEventListener('click', function() {
            sendMessage();
        });
        
        chatMessageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    // Reveal profile request
    if (revealRequestBtn && revealModal) {
        revealRequestBtn.addEventListener('click', function() {
            revealModal.classList.add('active');
            
            // Set avatars in modal
            const myAvatarImg = document.getElementById('reveal-my-avatar-img');
            if (myAvatarImg) {
                myAvatarImg.src = `images/avatars/${userProxyProfile.avatar}.png`;
            }
            
            const partnerAvatarImg = document.getElementById('reveal-partner-avatar-img');
            if (partnerAvatarImg && chatState.partner) {
                partnerAvatarImg.src = `images/avatars/${chatState.partner.proxyProfile.avatar}.png`;
            }
            
            const partnerName = document.getElementById('reveal-partner-name');
            if (partnerName && chatState.partner) {
                partnerName.textContent = chatState.partner.proxyProfile.name;
            }
        });
    }

    // Close reveal modal
    if (closeRevealModalBtn && revealModal) {
        closeRevealModalBtn.addEventListener('click', function() {
            revealModal.classList.remove('active');
        });
    }

    // Cancel reveal request
    if (cancelRevealBtn && revealModal) {
        cancelRevealBtn.addEventListener('click', function() {
            revealModal.classList.remove('active');
        });
    }

    // Confirm reveal request
    if (confirmRevealBtn && revealModal) {
        confirmRevealBtn.addEventListener('click', function() {
            chatState.revealRequested = true;
            revealModal.classList.remove('active');
            
            // Add system message
            if (chatMessages) {
                const systemMessage = document.createElement('div');
                systemMessage.className = 'system-message';
                systemMessage.innerHTML = '<p>You have requested to reveal identities. Waiting for response...</p>';
                chatMessages.appendChild(systemMessage);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
            
            // Simulate partner accepting after delay
            setTimeout(() => {
                simulateRevealAccepted();
            }, 5000);
        });
    }

    // Close revealed profiles modal
    if (closeRevealedModalBtn && profilesRevealedModal) {
        closeRevealedModalBtn.addEventListener('click', function() {
            profilesRevealedModal.classList.remove('active');
        });
    }

    // Continue chat after revealing
    if (continueChatBtn && profilesRevealedModal) {
        continueChatBtn.addEventListener('click', function() {
            profilesRevealedModal.classList.remove('active');
        });
    }

    // End chat button
    if (endChatBtn) {
        endChatBtn.addEventListener('click', function() {
            confirmEndChat();
        });
    }

    // Report user button
    if (reportUserBtn) {
        reportUserBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to report this user? This will end the current chat.')) {
                alert('User reported. Thank you for helping keep our community safe.');
                window.location.href = 'dashboard.html';
            }
        });
    }

    // Send message function
    function sendMessage() {
        const messageText = chatMessageInput.value.trim();
        
        if (messageText) {
            addMessage('outgoing', messageText);
            chatMessageInput.value = '';
            
            // Simulate reply after delay
            if (chatState.partner) {
                setTimeout(() => {
                    simulateReply();
                }, 1000 + Math.random() * 2000);
            }
        }
    }

    // Add message to chat
    function addMessage(type, text) {
        if (!chatMessages) return;
        
        const currentTime = new Date();
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${text}</p>
                <div class="message-time">${timeString}</div>
            </div>
        `;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Start chat matching
    function startChatMatching() {
        if (!chatMessages || !chatInputContainer) return;
        
        // Clear previous messages
        chatMessages.innerHTML = `
            <div class="chat-date-divider">
                <span>Today</span>
            </div>
            <div class="system-message">
                <p>Looking for a match based on your preferences...</p>
            </div>
        `;
        
        // Hide chat input until matched
        chatInputContainer.style.display = 'none';
        
        // Update chat UI
        if (chatUserName) {
            chatUserName.textContent = 'Matching...';
        }
        
        // Simulate finding a match after delay
        setTimeout(() => {
            chatState.partner = chatPartnerData;
            
            // Update UI with partner info
            if (chatUserName) {
                chatUserName.textContent = chatState.partner.proxyProfile.name;
            }
            
            if (chatUserAvatarImg) {
                chatUserAvatarImg.src = `images/avatars/${chatState.partner.proxyProfile.avatar}.png`;
            }
            
            // Add system message
            const systemMessage = document.createElement('div');
            systemMessage.className = 'system-message';
            systemMessage.innerHTML = '<p>You have been matched! Say hello to start the conversation.</p>';
            chatMessages.appendChild(systemMessage);
            
            // Update sidebar info
            updateSidebarInfo();
            
            // Show chat input
            chatInputContainer.style.display = 'block';
        }, 3000);
    }

    // Update sidebar with partner info
    function updateSidebarInfo() {
        if (!chatState.partner) return;
        
        if (sidebarAvatarImg) {
            sidebarAvatarImg.src = `images/avatars/${chatState.partner.proxyProfile.avatar}.png`;
        }
        
        if (sidebarName) {
            sidebarName.textContent = chatState.partner.proxyProfile.name;
        }
        
        if (sidebarBio) {
            sidebarBio.textContent = chatState.partner.proxyProfile.bio || 'No bio available.';
        }
        
        // Update interests
        const interestsContainer = document.getElementById('sidebar-interests');
        if (interestsContainer) {
            const interestsTags = interestsContainer.querySelector('.interests-tags');
            if (interestsTags) {
                interestsTags.innerHTML = '';
                
                chatState.partner.proxyProfile.interests.forEach(interest => {
                    const interestTag = document.createElement('div');
                    interestTag.className = 'interest-tag-item';
                    interestTag.textContent = interest;
                    interestsTags.appendChild(interestTag);
                });
            }
        }
    }

    // Simulate partner replying
    function simulateReply() {
        const replies = [
            "That's interesting! Tell me more.",
            "I can relate to that. I've had similar experiences.",
            "What do you study?",
            "Do you have any plans for the weekend?",
            "Have you watched any good movies lately?",
            "What kind of music do you listen to?",
            "I'm really into sports. Do you play any?",
            "I'm enjoying our conversation!",
            "That's awesome! I feel the same way.",
            "What do you enjoy doing in your free time?"
        ];
        
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        addMessage('incoming', randomReply);
    }

    // Simulate partner accepting reveal request
    function simulateRevealAccepted() {
        chatState.revealAccepted = true;
        
        // Add system message
        if (chatMessages) {
            const systemMessage = document.createElement('div');
            systemMessage.className = 'system-message';
            systemMessage.innerHTML = '<p>Your chat partner has accepted your request to reveal identities!</p>';
            chatMessages.appendChild(systemMessage);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
        
        // Show profiles revealed modal
        setTimeout(() => {
            // Update modal with real profile info
            const myRealName = document.getElementById('my-real-name');
            const myRealAge = document.getElementById('my-real-age');
            const myRealDepartment = document.getElementById('my-real-department');
            const myRealBatch = document.getElementById('my-real-batch');
            
            if (myRealName) myRealName.textContent = userRealProfile.name || 'Your Name';
            if (myRealAge) myRealAge.textContent = userRealProfile.age || '20';
            if (myRealDepartment) myRealDepartment.textContent = userRealProfile.department || 'Your Department';
            if (myRealBatch) myRealBatch.textContent = userRealProfile.batch || 'Your Year';
            
            const partnerRealName = document.getElementById('partner-real-name');
            const partnerRealAge = document.getElementById('partner-real-age');
            const partnerRealDepartment = document.getElementById('partner-real-department');
            const partnerRealBatch = document.getElementById('partner-real-batch');
            
            if (partnerRealName) partnerRealName.textContent = chatState.partner.realProfile.name;
            if (partnerRealAge) partnerRealAge.textContent = chatState.partner.realProfile.age;
            if (partnerRealDepartment) partnerRealDepartment.textContent = chatState.partner.realProfile.department;
            if (partnerRealBatch) partnerRealBatch.textContent = chatState.partner.realProfile.batch;
            
            // Show modal
            if (profilesRevealedModal) {
                profilesRevealedModal.classList.add('active');
            }
            
            // Update reveal status in sidebar
            const revealStatus = document.getElementById('reveal-status');
            if (revealStatus) {
                revealStatus.innerHTML = `
                    <div class="reveal-status-icon">
                        <i class="fas fa-unlock-alt"></i>
                    </div>
                    <p>Real identities have been revealed. You can now connect outside the platform if desired.</p>
                `;
            }
        }, 1000);
    }

    // Confirm end chat
    function confirmEndChat() {
        if (confirm('Are you sure you want to end this chat?')) {
            chatState.partner = null;
            chatState.revealRequested = false;
            chatState.revealAccepted = false;
            window.location.href = 'dashboard.html';
        }
    }

    // Initialize chat
    startChatMatching();
});