class AuthService {
    constructor() {
        this.baseUrl = 'http://localhost:3001/api/auth';
        this.checkSession();
    }

    async login(email, password) {
        try {
            const response = await fetch(`${this.baseUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include'
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    async register(email, password) {
        try {
            console.log('Attempting registration with:', { email });
            const response = await fetch(`${this.baseUrl}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include'
            });

            const responseData = await response.json();
            console.log('Registration response:', responseData);

            if (!response.ok) {
                throw new Error(responseData.message || 'Registration failed');
            }

            return responseData;
        } catch (error) {
            console.error('Registration error details:', error);
            throw error;
        }
    }

    async logout() {
        try {
            const response = await fetch(`${this.baseUrl}/logout`, {
                method: 'POST',
                credentials: 'include'
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Logout failed');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
    }

    async checkSession() {
        try {
            const response = await fetch(`${this.baseUrl}/me`, {
                credentials: 'include'
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Session invalid');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Session check error:', error);
            throw error;
        }
    }
}

const authService = new AuthService(); 