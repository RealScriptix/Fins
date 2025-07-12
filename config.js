
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
