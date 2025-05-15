document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginFormDiv = document.getElementById('login-form');
    const registerFormDiv = document.getElementById('register-form');
    const dashboardDiv = document.getElementById('dashboard');
    const showRegisterLink = document.getElementById('showRegister');
    const showLoginLink = document.getElementById('showLogin');
    const logoutBtn = document.getElementById('logoutBtn');
    const userEmailSpan = document.getElementById('userEmail');

    // Check session on page load
    checkAuthStatus();

    // Event Listeners
    loginForm.addEventListener('submit', handleLogin);
    registerForm.addEventListener('submit', handleRegister);
    showRegisterLink.addEventListener('click', showRegister);
    showLoginLink.addEventListener('click', showLogin);
    logoutBtn.addEventListener('click', handleLogout);

    // Functions
    async function checkAuthStatus() {
        try {
            const data = await authService.checkSession();
            showDashboard(data.email);
        } catch (error) {
            showLoginForm();
        }
    }

    async function handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        try {
            await authService.login(email, password);
            showDashboard(email);
        } catch (error) {
            alert('Login failed. Please try again.');
        }
    }

    async function handleRegister(e) {
        e.preventDefault();
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;

        try {
            const response = await authService.register(email, password);
            alert('Registration successful! Please check your email for verification.');
            showLoginForm();
        } catch (error) {
            console.error('Registration error:', error);
            if (error.message.includes('User already exists')) {
                alert('This email is already registered. Please use a different email or login.');
            } else {
                alert('Registration failed. Please try again.');
            }
        }
    }

    async function handleLogout() {
        try {
            await authService.logout();
            alert('You have been logged out successfully.');
            showLoginForm();
        } catch (error) {
            alert('Logout failed. Please try again.');
        }
    }

    function showLoginForm() {
        loginFormDiv.style.display = 'block';
        registerFormDiv.style.display = 'none';
        dashboardDiv.style.display = 'none';
    }

    function showRegisterForm() {
        loginFormDiv.style.display = 'none';
        registerFormDiv.style.display = 'block';
        dashboardDiv.style.display = 'none';
    }

    function showDashboard(email) {
        loginFormDiv.style.display = 'none';
        registerFormDiv.style.display = 'none';
        dashboardDiv.style.display = 'block';
        userEmailSpan.textContent = email;
    }

    function showLogin(e) {
        e.preventDefault();
        showLoginForm();
    }

    function showRegister(e) {
        e.preventDefault();
        showRegisterForm();
    }
}); 