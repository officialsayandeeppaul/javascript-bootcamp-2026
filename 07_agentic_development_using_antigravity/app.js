/**
 * THE ARCHIVE — CLIENT PORTAL BUSINESS LOGIC
 * Production-Grade Vanilla JavaScript Implementation
 */

// ==========================================================================
// CRYPTOGRAPHY & UTILITY FUNCTIONS
// ==========================================================================

/**
 * Computes SHA-256 hash using the Web Crypto API
 * @param {string} message 
 * @returns {Promise<string>} Hex representation of SHA-256 hash
 */
async function computeSHA256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Generates a mock signature hash for activities
 */
function generateActivityHash() {
    const chars = '0123456789abcdef';
    let result = '';
    for (let i = 0; i < 24; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}

/**
 * Generates a pseudorandom cryptographically formatted UUID
 */
function generateUUID() {
    return 'ARCHIVE-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16).toUpperCase();
    });
}

/**
 * Format Date to readable local timezone format
 */
function formatDate(date) {
    const pad = (n) => String(n).padStart(2, '0');
    const y = date.getFullYear();
    const m = pad(date.getMonth() + 1);
    const d = pad(date.getDate());
    const hr = pad(date.getHours());
    const min = pad(date.getMinutes());
    const sec = pad(date.getSeconds());
    return `${y}-${m}-${d} ${hr}:${min}:${sec}`;
}

// ==========================================================================
// TOAST NOTIFICATION CONTROLLER
// ==========================================================================
const Toast = {
    containerId: 'toast-container',

    /**
     * Display a toast notification
     * @param {string} title - Header of the toast 
     * @param {string} message - Content message
     * @param {string} type - 'success', 'error', 'warning', 'info'
     * @param {number} duration - ms until auto-dismiss (default: 4000)
     */
    show(title, message, type = 'info', duration = 4500) {
        const container = document.getElementById(this.containerId);
        if (!container) return;

        // Create element
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        // Icon selection based on type
        let iconSvg = '';
        if (type === 'success') {
            iconSvg = `<svg class="toast-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
        } else if (type === 'error') {
            iconSvg = `<svg class="toast-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;
        } else if (type === 'warning') {
            iconSvg = `<svg class="toast-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`;
        } else {
            iconSvg = `<svg class="toast-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
        }

        toast.innerHTML = `
            ${iconSvg}
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close" aria-label="Dismiss">&times;</button>
            <div class="toast-progress"></div>
        `;

        // Append to container
        container.appendChild(toast);

        // Progress bar animation
        const progressBar = toast.querySelector('.toast-progress');
        progressBar.style.width = '100%';
        progressBar.style.transition = `width ${duration}ms linear`;
        
        // Force reflow to trigger CSS transition
        void progressBar.offsetWidth;
        progressBar.style.width = '0%';

        // Dismiss timeout
        let dismissTimeout = setTimeout(() => {
            this.dismiss(toast);
        }, duration);

        // Close button event
        toast.querySelector('.toast-close').addEventListener('click', () => {
            clearTimeout(dismissTimeout);
            this.dismiss(toast);
        });
    },

    dismiss(toast) {
        toast.classList.add('removing');
        toast.addEventListener('transitionend', () => {
            toast.remove();
        });
    }
};

// ==========================================================================
// DATA REGISTRY CONTROL (LOCAL STORAGE)
// ==========================================================================
const StorageManager = {
    KEYS: {
        REGISTRY: 'ARCHIVE_USER_REGISTRY',
        SESSION: 'ARCHIVE_ACTIVE_SESSION',
        LOGS: 'ARCHIVE_SESSION_LOGS'
    },

    /**
     * Fetch all registered users
     * @returns {Array}
     */
    getUsers() {
        const raw = localStorage.getItem(this.KEYS.REGISTRY);
        return raw ? JSON.parse(raw) : [];
    },

    /**
     * Save users list
     * @param {Array} users 
     */
    saveUsers(users) {
        localStorage.setItem(this.KEYS.REGISTRY, JSON.stringify(users));
    },

    /**
     * Find a user by email or username
     * @param {string} identifier 
     * @returns {object|null}
     */
    findUser(identifier) {
        const users = this.getUsers();
        const cleanId = identifier.trim().toLowerCase();
        return users.find(u => 
            u.username.toLowerCase() === cleanId || 
            u.email.toLowerCase() === cleanId
        ) || null;
    },

    /**
     * Register a new user
     * @param {object} userObj 
     * @returns {boolean}
     */
    registerUser(userObj) {
        const users = this.getUsers();
        
        // Check if username or email already exists
        const exists = users.some(u => 
            u.username.toLowerCase() === userObj.username.toLowerCase() ||
            u.email.toLowerCase() === userObj.email.toLowerCase()
        );

        if (exists) return false;

        users.push(userObj);
        this.saveUsers(users);
        return true;
    },

    /**
     * Store active session
     * @param {object} userObj 
     * @param {boolean} rememberMe 
     */
    setSession(userObj, rememberMe) {
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem(this.KEYS.SESSION, JSON.stringify({
            username: userObj.username,
            email: userObj.email,
            fullname: userObj.fullname,
            uuid: userObj.uuid,
            created: userObj.created,
            loginTime: formatDate(new Date())
        }));
    },

    /**
     * Retrieve active session
     * @returns {object|null}
     */
    getSession() {
        const localSession = localStorage.getItem(this.KEYS.SESSION);
        const sessionSession = sessionStorage.getItem(this.KEYS.SESSION);
        const raw = localSession || sessionSession;
        return raw ? JSON.parse(raw) : null;
    },

    /**
     * Terminate active session
     */
    clearSession() {
        localStorage.removeItem(this.KEYS.SESSION);
        sessionStorage.removeItem(this.KEYS.SESSION);
    },

    /**
     * Fetch all event logs
     */
    getLogs() {
        const raw = localStorage.getItem(this.KEYS.LOGS);
        return raw ? JSON.parse(raw) : [];
    },

    /**
     * Append a new log entry
     * @param {string} eventName 
     * @param {string} status - 'SUCCESS' or 'FAILED' or 'INFO'
     * @param {string} origin 
     */
    addLog(eventName, status, origin = 'LOCAL_PORTAL') {
        const logs = this.getLogs();
        const newLog = {
            time: formatDate(new Date()),
            event: eventName,
            status: status,
            origin: origin,
            signature: generateActivityHash()
        };
        logs.unshift(newLog);
        // Keep only last 20 logs for performance
        if (logs.length > 20) logs.pop();
        localStorage.setItem(this.KEYS.LOGS, JSON.stringify(logs));
    }
};

// ==========================================================================
// FORM NAVIGATIONAL STATE
// ==========================================================================

/**
 * Toggle visibility of registration vs login forms
 * @param {string} formType - 'login' or 'register'
 */
function switchForm(formType) {
    const tabLogin = document.getElementById('tab-login');
    const tabRegister = document.getElementById('tab-register');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    if (formType === 'login') {
        tabLogin.classList.add('active');
        tabRegister.classList.remove('active');
        
        registerForm.classList.remove('active');
        setTimeout(() => {
            registerForm.style.display = 'none';
            loginForm.style.display = 'flex';
            // Force layout reflow
            void loginForm.offsetWidth;
            loginForm.classList.add('active');
        }, 150);
    } else {
        tabRegister.classList.add('active');
        tabLogin.classList.remove('active');
        
        loginForm.classList.remove('active');
        setTimeout(() => {
            loginForm.style.display = 'none';
            registerForm.style.display = 'flex';
            // Force layout reflow
            void registerForm.offsetWidth;
            registerForm.classList.add('active');
        }, 150);
    }
}

/**
 * Toggle mask on password fields
 * @param {string} inputId 
 */
function togglePasswordVisibility(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;
    
    const type = input.type === 'password' ? 'text' : 'password';
    input.type = type;
}

/**
 * Evaluates password strength dynamically based on rules
 * @param {string} password 
 */
function checkPasswordStrength(password) {
    const strengthLabel = document.getElementById('strength-label');
    const bars = [
        document.getElementById('bar-1'),
        document.getElementById('bar-2'),
        document.getElementById('bar-3'),
        document.getElementById('bar-4')
    ];

    if (!password) {
        bars.forEach(bar => {
            bar.style.backgroundColor = '';
            bar.style.boxShadow = '';
        });
        strengthLabel.innerText = 'CRITICALLY WEAK';
        strengthLabel.style.color = '';
        return;
    }

    let score = 0;
    
    // Rule 1: Length
    if (password.length >= 8) score++;
    // Rule 2: Upper and Lower case letters
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    // Rule 3: Numbers
    if (/\d/.test(password)) score++;
    // Rule 4: Special Characters
    if (/[^A-Za-z0-9]/.test(password)) score++;

    // Color definitions
    const colors = {
        1: '#ef4444', // Red
        2: '#f59e0b', // Amber
        3: '#fbbf24', // Amber Light
        4: '#10b981'  // Emerald
    };

    const labels = {
        1: 'WEAK KEY',
        2: 'MODERATE SHIELD',
        3: 'STRONG SHIELD',
        4: 'SECURE NODE'
    };

    bars.forEach((bar, index) => {
        if (index < score) {
            bar.style.backgroundColor = colors[score];
            bar.style.boxShadow = `0 0 8px ${colors[score]}40`;
        } else {
            bar.style.backgroundColor = '';
            bar.style.boxShadow = '';
        }
    });

    strengthLabel.innerText = labels[score] || 'WEAK KEY';
    strengthLabel.style.color = colors[score] || colors[1];
}

// ==========================================================================
// CORE BUSINESS HANDLERS
// ==========================================================================

/**
 * Validates and processes user sign up
 */
async function handleRegister(event) {
    event.preventDefault();

    const fullNameInput = document.getElementById('reg-fullname');
    const usernameInput = document.getElementById('reg-username');
    const emailInput = document.getElementById('reg-email');
    const passwordInput = document.getElementById('reg-password');
    const confirmPasswordInput = document.getElementById('reg-confirm-password');
    const termsInput = document.getElementById('reg-terms');

    const fullname = fullNameInput.value.trim();
    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const acceptTerms = termsInput.checked;

    // 1. Validation Checks
    if (!fullname || fullname.length < 2) {
        Toast.show('VALIDATION FAULT', 'Full Name must be at least 2 characters.', 'error');
        fullNameInput.focus();
        return;
    }

    if (!username || username.length < 4) {
        Toast.show('VALIDATION FAULT', 'Username must be at least 4 characters long.', 'error');
        usernameInput.focus();
        return;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        Toast.show('VALIDATION FAULT', 'Username must contain only alphanumeric characters or underscores.', 'error');
        usernameInput.focus();
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        Toast.show('VALIDATION FAULT', 'Please enter a valid, active email address.', 'error');
        emailInput.focus();
        return;
    }

    if (!password || password.length < 8) {
        Toast.show('VALIDATION FAULT', 'Password requires a minimum of 8 characters.', 'error');
        passwordInput.focus();
        return;
    }

    // Advanced strength requirements check
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    if (!hasUpper || !hasLower || !hasDigit) {
        Toast.show('SECURITY PROTOCOL', 'Password must include uppercase, lowercase, and numeric digits.', 'warning');
        passwordInput.focus();
        return;
    }

    if (password !== confirmPassword) {
        Toast.show('VALIDATION FAULT', 'Passwords do not match. Re-enter confirm key.', 'error');
        confirmPasswordInput.focus();
        return;
    }

    if (!acceptTerms) {
        Toast.show('POLICY AGREEMENT', 'You must accept the terms of node protocols to proceed.', 'warning');
        return;
    }

    // 2. Encryption (SHA-256 Hashing)
    Toast.show('CRYPTOGRAPHY', 'Encrypting registration signature...', 'info', 1000);
    const hashedPassword = await computeSHA256(password);

    // 3. Save User
    const newUser = {
        fullname,
        username,
        email,
        password: hashedPassword,
        uuid: generateUUID(),
        created: formatDate(new Date())
    };

    const success = StorageManager.registerUser(newUser);

    if (success) {
        StorageManager.addLog(`USER_REGISTRATION: ${username.toUpperCase()}`, 'SUCCESS');
        Toast.show('ACCESS CREATED', 'Credentials successfully saved to registry. Proceeding to login.', 'success');
        
        // Reset form
        event.target.reset();
        checkPasswordStrength(''); // Reset strength bar
        
        // Auto fill email/username in login page and navigate
        document.getElementById('login-identifier').value = username;
        switchForm('login');
    } else {
        StorageManager.addLog(`USER_REGISTRATION_ATTEMPT: ${username.toUpperCase()}`, 'FAILED');
        Toast.show('REGISTRY DUPLICATE', 'Username or Email is already registered in this node.', 'error');
    }
}

/**
 * Validates and processes user login authentication
 */
async function handleLogin(event) {
    event.preventDefault();

    const identifierInput = document.getElementById('login-identifier');
    const passwordInput = document.getElementById('login-password');
    const rememberInput = document.getElementById('login-remember');

    const identifier = identifierInput.value.trim();
    const password = passwordInput.value;
    const rememberMe = rememberInput.checked;

    if (!identifier) {
        Toast.show('INPUT REQUIRED', 'Enter your registered Username or Email address.', 'warning');
        identifierInput.focus();
        return;
    }

    if (!password) {
        Toast.show('INPUT REQUIRED', 'Please enter your password credential.', 'warning');
        passwordInput.focus();
        return;
    }

    // 1. Locate User in registry
    const user = StorageManager.findUser(identifier);

    if (!user) {
        StorageManager.addLog(`AUTHENTICATION_ATTEMPT: ${identifier.toUpperCase()}`, 'FAILED');
        Toast.show('ACCESS DENIED', 'Invalid credentials provided. Check username/email.', 'error');
        return;
    }

    // 2. Hash and compare passwords
    const hashedInputPassword = await computeSHA256(password);
    
    if (hashedInputPassword === user.password) {
        // Authenticated! Store Session
        StorageManager.setSession(user, rememberMe);
        StorageManager.addLog(`AUTHENTICATION_SUCCESS: ${user.username.toUpperCase()}`, 'SUCCESS');
        
        Toast.show('ACCESS GRANTED', `Authentication validated. Loading secure data room.`, 'success');
        
        // Transition to Dashboard
        setTimeout(() => {
            loadDashboard();
        }, 1200);
    } else {
        StorageManager.addLog(`AUTHENTICATION_FAILURE: ${user.username.toUpperCase()}`, 'FAILED');
        Toast.show('ACCESS DENIED', 'Incorrect password key. Try again.', 'error');
    }
}

/**
 * Loads and renders the post-login dashboard
 */
function loadDashboard() {
    const session = StorageManager.getSession();
    if (!session) {
        showAuthScreen();
        return;
    }

    // Set greeting details
    document.getElementById('dash-fullname').innerText = session.fullname;
    document.getElementById('dash-greeting-name').innerText = session.fullname;
    document.getElementById('dash-user-initials').innerText = session.fullname.charAt(0).toUpperCase();
    
    // Set parameters card
    document.getElementById('dash-uuid').innerText = session.uuid;
    document.getElementById('dash-created').innerText = session.created;
    document.getElementById('dash-username').innerText = `@${session.username}`;
    document.getElementById('dash-email').innerText = session.email;

    // Metrics
    document.getElementById('total-users-stat').innerText = StorageManager.getUsers().length;

    // Load Logs
    renderLogsTable();

    // Fade screens
    const authPanel = document.getElementById('auth-panel');
    const dashPanel = document.getElementById('dashboard-panel');

    authPanel.style.display = 'none';
    dashPanel.style.display = 'flex';
}

/**
 * Renders the localstorage audit logs inside the dashboard table
 */
function renderLogsTable() {
    const logsBody = document.getElementById('logs-tbody');
    if (!logsBody) return;

    const logs = StorageManager.getLogs();
    if (logs.length === 0) {
        logsBody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--color-text-muted);">No records found in current logs registry.</td></tr>`;
        return;
    }

    logsBody.innerHTML = logs.map(log => {
        const badgeClass = log.status === 'SUCCESS' ? 'badge-success' : 'badge-warning';
        return `
            <tr>
                <td class="mono">${log.time}</td>
                <td>${log.event}</td>
                <td><span class="badge ${badgeClass}">${log.status}</span></td>
                <td class="mono">${log.origin}</td>
                <td class="mono" title="${log.signature}">${log.signature}...</td>
            </tr>
        `;
    }).join('');
}

/**
 * Handle system logout
 */
function handleLogout() {
    const session = StorageManager.getSession();
    const userDisplay = session ? session.username.toUpperCase() : 'USER';
    
    StorageManager.clearSession();
    StorageManager.addLog(`LOGOUT_SESSION: ${userDisplay}`, 'SUCCESS');
    
    Toast.show('SESSION TERMINATED', 'Access revoked. Returning to portal login.', 'info');
    
    setTimeout(() => {
        showAuthScreen();
    }, 1000);
}

/**
 * Visual screen switch back to authentication
 */
function showAuthScreen() {
    const authPanel = document.getElementById('auth-panel');
    const dashPanel = document.getElementById('dashboard-panel');

    dashPanel.style.display = 'none';
    authPanel.style.display = 'grid';
    
    // Default to login tab
    switchForm('login');
}

// ==========================================================================
// DOCK DEV TOOLS / MOCK ACTIONS
// ==========================================================================

/**
 * Mock forgot password action trigger
 */
function triggerForgotPassword() {
    Toast.show(
        'RECOVERY DIRECTIVE', 
        'Please contact your system node architect or run WIPE STORAGE REGISTRY to start fresh.', 
        'info'
    );
}

/**
 * Simulates rotating cryptographic secrets
 */
function simulateSecretKeyRotation() {
    const session = StorageManager.getSession();
    if (!session) return;

    // Update UUID randomly to simulate key rotation
    const newUUID = generateUUID();
    session.uuid = newUUID;
    
    // Save to stored session (need to know where it is stored)
    const localSession = localStorage.getItem(StorageManager.KEYS.SESSION);
    const storage = localSession ? localStorage : sessionStorage;
    storage.setItem(StorageManager.KEYS.SESSION, JSON.stringify(session));
    
    document.getElementById('dash-uuid').innerText = newUUID;
    
    StorageManager.addLog('TOKEN_ROTATION_SUCCESS', 'SUCCESS');
    renderLogsTable();
    
    Toast.show('SECURITY PROTOCOL', 'Rotating Node cryptographic parameters. Signature renewed.', 'success');
}

/**
 * Completely wipes out storage registry data
 */
function wipeLocalRegistry() {
    if (confirm("CRITICAL WARNING: This will completely wipe all registered credentials and logs from your browser's localStorage. Proceed?")) {
        localStorage.clear();
        sessionStorage.clear();
        Toast.show('HARD RESET', 'Registry data wiped completely. System restarted.', 'error');
        setTimeout(() => {
            window.location.reload();
        }, 1500);
    }
}

// ==========================================================================
// SYSTEM BOOTSTRAP / INITIALIZATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Clock ticking
    const clockElement = document.getElementById('system-time');
    const updateClock = () => {
        const now = new Date();
        if (clockElement) {
            clockElement.innerText = formatDate(now) + ' UTC';
        }
    };
    updateClock();
    setInterval(updateClock, 1000);

    // 2. Initialize default logs if completely empty
    if (StorageManager.getLogs().length === 0) {
        StorageManager.addLog('SYSTEM_NODE_ONLINE', 'SUCCESS', 'CORE_INIT');
    }

    // 3. Inspect existing authentication sessions
    const activeSession = StorageManager.getSession();
    if (activeSession) {
        loadDashboard();
        Toast.show('SESSION RESTORED', `Active session for ${activeSession.fullname} resumed automatically.`, 'success');
    } else {
        showAuthScreen();
    }
});
