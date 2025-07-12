// Fins Configuration Example
// Copy this file to config.js and add your API keys

const FINS_CONFIG = {
    // OpenRouter API Configuration
    // Get your API key from: https://openrouter.ai/
    openRouterApiKey: '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
    
    // YouTube Data API Configuration
    // Get your API key from: https://console.cloud.google.com/
    youtubeApiKey: 'AIzaSyDoxfZH9LPbbjZucrqH1LDs0dKdIBc6cw0',
    
    // App Configuration
    app: {
        name: 'Fins',
        version: '1.0.0',
        description: 'A Tinder-style short video platform',
        maxVideoDuration: 90, // seconds
        maxVideoSize: 50 * 1024 * 1024, // 50MB in bytes
        cacheDuration: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
        backgroundFetchInterval: 5 * 60 * 1000, // 5 minutes in milliseconds
    },
    
    // Content Configuration
    content: {
        maxAIGeneratedVideos: 50,
        maxYouTubeVideos: 100,
        videosPerPage: 10,
        defaultTopic: 'all',
        enableMatureContent: false,
        enableAnalytics: true,
    },
    
    // UI Configuration
    ui: {
        darkMode: true,
        autoPlay: true,
        showNotifications: true,
        swipeThreshold: 50,
        animationDuration: 300,
    },
    
    // API Endpoints (for future backend integration)
    api: {
        baseUrl: 'https://api.fins.app',
        endpoints: {
            videos: '/videos',
            upload: '/upload',
            user: '/user',
            analytics: '/analytics',
            recommendations: '/recommendations',
        },
    },
    
    // Feature Flags
    features: {
        aiGeneration: true,
        youtubeIntegration: true,
        offlineMode: true,
        pushNotifications: true,
        backgroundSync: true,
        videoEffects: false,
        liveStreaming: false,
        socialFeatures: false,
    },
    
    // Development Configuration
    development: {
        debug: false,
        mockData: true,
        logLevel: 'info', // 'debug', 'info', 'warn', 'error'
        enableTestMode: false,
    },
};

// Auto-configure if running in browser
if (typeof window !== 'undefined') {
    // Apply configuration to AI integration
    if (window.aiYouTubeIntegration) {
        window.aiYouTubeIntegration.setAPIKeys(
            FINS_CONFIG.openRouterApiKey,
            FINS_CONFIG.youtubeApiKey
        );
    }
    
    // Store configuration globally
    window.FINS_CONFIG = FINS_CONFIG;
}

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FINS_CONFIG;
}

// Usage Instructions:
// 1. Copy this file to config.js
// 2. Replace YOUR_OPENROUTER_API_KEY_HERE with your actual OpenRouter API key
// 3. Replace YOUR_YOUTUBE_API_KEY_HERE with your actual YouTube Data API key
// 4. Include config.js in your HTML: <script src="config.js"></script>
// 5. Make sure to include config.js BEFORE the main application script

// API Key Setup Instructions:
// 
// OpenRouter API Key:
// 1. Go to https://openrouter.ai/
// 2. Sign up for an account
// 3. Navigate to API Keys section
// 4. Generate a new API key
// 5. Copy the key and paste it above
// 
// YouTube Data API Key:
// 1. Go to https://console.cloud.google.com/
// 2. Create a new project or select existing one
// 3. Enable YouTube Data API v3
// 4. Go to Credentials section
// 5. Create API Key
// 6. Copy the key and paste it above
// 
// Security Notes:
// - Never commit config.js with real API keys to version control
// - Use environment variables in production
// - Restrict API key permissions and usage
// - Monitor API key usage regularly
