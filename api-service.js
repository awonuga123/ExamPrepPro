/**
 * API Service - Centralized API handling for ExamPrepPro
 * Handles all API calls with proper error handling and configuration
 */

class APIService {
    constructor() {
        this.baseURL = CONFIG.API.BASE_URL;
        this.timeout = 30000; // 30 seconds
    }

    /**
     * Get authorization token from localStorage
     */
    getToken() {
        return window.localStorage.getItem("access-token");
    }

    /**
     * Set authorization token
     */
    setToken(token) {
        window.localStorage.setItem("access-token", token);
    }

    /**
     * Build headers with authorization
     */
    buildHeaders(customHeaders = {}) {
        const headers = {
            'Content-Type': 'application/json',
            ...customHeaders
        };

        const token = this.getToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        return headers;
    }

    /**
     * Make a fetch request with error handling
     */
    async request(endpoint, options = {}) {
        try {
            const url = endpoint.startsWith('http') 
                ? endpoint 
                : `${this.baseURL}${endpoint}`;

            const config = {
                method: options.method || 'GET',
                headers: this.buildHeaders(options.headers),
                ...options
            };

            // Add body if it exists (for POST, PUT requests)
            if (options.body && typeof options.body === 'object') {
                config.body = JSON.stringify(options.body);
            }

            const response = await fetch(url, config);

            // Handle response
            if (!response.ok) {
                throw new Error(`API Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            return { success: true, data, status: response.status };

        } catch (error) {
            console.error('API Request Error:', error);
            return {
                success: false,
                error: error.message,
                status: null
            };
        }
    }

    /**
     * GET request helper
     */
    async get(endpoint) {
        return this.request(endpoint, { method: 'GET' });
    }

    /**
     * POST request helper
     */
    async post(endpoint, body, customHeaders = {}) {
        return this.request(endpoint, {
            method: 'POST',
            body,
            headers: customHeaders
        });
    }

    /**
     * PUT request helper
     */
    async put(endpoint, body, customHeaders = {}) {
        return this.request(endpoint, {
            method: 'PUT',
            body,
            headers: customHeaders
        });
    }

    /**
     * GET user data - requires authentication
     */
    async getUserData() {
        return this.get(CONFIG.API.ENDPOINTS.GET_DATA);
    }

    /**
     * Login user
     */
    async login(email, password) {
        return this.post(CONFIG.API.ENDPOINTS.LOGIN, { email, password });
    }

    /**
     * Sign up user
     */
    async signup(userData) {
        return this.post(CONFIG.API.ENDPOINTS.SIGNUP, userData);
    }

    /**
     * Get quiz questions
     */
    async getQuizQuestions(quizId) {
        return this.get(`${CONFIG.API.ENDPOINTS.GET_QUIZ}?quiz_id=${quizId}`);
    }

    /**
     * Submit quiz responses
     */
    async submitQuiz(quizData) {
        return this.post(CONFIG.API.ENDPOINTS.SUBMIT_QUIZ, quizData);
    }

    /**
     * Get external JAMB questions
     */
    async getJAMBQuestions(subject, year) {
        try {
            const url = `${CONFIG.API.EXTERNAL_QUESTIONS}?subject=${subject}&year=${year}&type=utme`;
            const response = await fetch(url, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'AccessToken': CONFIG.API.ACCESS_TOKEN
                }
            });

            if (!response.ok) {
                throw new Error(`External API Error: ${response.status}`);
            }

            const data = await response.json();
            return { success: true, data, status: response.status };

        } catch (error) {
            console.error('External API Error:', error);
            return {
                success: false,
                error: error.message,
                status: null
            };
        }
    }

    /**
     * Check if user is authenticated
     */
    isAuthenticated() {
        return !!this.getToken();
    }

    /**
     * Logout user
     */
    logout() {
        window.localStorage.removeItem("access-token");
        window.sessionStorage.clear();
    }
}

// Create global API service instance
const api = new APIService();

// Export for use in Node.js environments if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = APIService;
}
