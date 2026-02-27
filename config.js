// Centralized configuration for API endpoints and colors
const CONFIG = {
    // API Endpoints
    API: {
        EXTERNAL_QUESTIONS: 'https://questions.aloc.com.ng/api/v2/q/40',
        ENDPOINTS: {
            GET_DATA: '/api/getdata',
            LOGIN: '/api/login',
            SIGNUP: '/api/signup',
            GET_QUIZ: '/api/getquiz',
            SUBMIT_QUIZ: '/api/submitquiz'
        },
        ACCESS_TOKEN: 'ALOC-e0ad6ccb9775c443b248'
    },
    // Consistent Color Scheme
    COLORS: {
        // Primary Colors
        primary: '#6366f1',      // Indigo
        primaryLight: '#818cf8',  // Light Indigo
        primaryDark: '#4f46e5',   // Dark Indigo
        
        // Secondary Colors
        secondary: '#f97316',     // Orange
        secondaryLight: '#fb923c', // Light Orange
        secondaryDark: '#ea580c', // Dark Orange
        
        // Backgrounds
        bgLight: '#f8fafc',       // Very Light Gray/Blue
        bgDark: '#1e293b',        // Very Dark Blue/Gray
        bgNeutral: '#f1f5f9',     // Light Gray
        
        // Text Colors
        textPrimary: '#1e293b',   // Dark Gray
        textSecondary: '#64748b', // Medium Gray
        textLight: '#cbd5e1',     // Light Gray
        textInverse: '#f1f5f9',   // Light text on dark
        
        // Status Colors
        success: '#22c55e',       // Green
        error: '#ef4444',         // Red
        warning: '#eab308',       // Yellow
        info: '#3b82f6',          // Blue
        
        // Borders
        borderLight: '#e2e8f0',   // Light border
        borderPrimary: '#cbd5e1', // Primary border
        
        // Special
        white: '#ffffff',
        black: '#000000',
        accent: '#06b6d4'         // Cyan for accents
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
