// AI and YouTube Integration for Fins
// Enhanced content discovery with OpenRouter API and YouTube Shorts

class AIYouTubeIntegration {
    constructor() {
        this.openRouterApiKey = null; // Set your OpenRouter API key
        this.youtubeApiKey = null; // Set your YouTube API key
        this.topicHierarchy = this.buildTopicHierarchy();
        this.aiGeneratedContent = [];
        this.youtubeShorts = [];
        this.isInitialized = false;
    }

    async initialize() {
        if (this.isInitialized) return;
        
        try {
            // Initialize API keys from localStorage or environment
            this.openRouterApiKey = localStorage.getItem('openrouter_api_key') || process.env.OPENROUTER_API_KEY;
            this.youtubeApiKey = localStorage.getItem('youtube_api_key') || process.env.YOUTUBE_API_KEY;
            
            // Load cached content
            await this.loadCachedContent();
            
            // Start background content fetching
            this.startBackgroundFetching();
            
            this.isInitialized = true;
            console.log('AI YouTube Integration initialized successfully');
        } catch (error) {
            console.error('Failed to initialize AI YouTube Integration:', error);
        }
    }

    buildTopicHierarchy() {
        return {
            gaming: {
                name: 'Gaming',
                subcategories: {
                    fps: {
                        name: 'FPS Games',
                        subcategories: {
                            valorant: { name: 'Valorant', keywords: ['valorant', 'tactical shooter'] },
                            csgo: { name: 'CS:GO', keywords: ['csgo', 'counter-strike'] },
                            apex: { name: 'Apex Legends', keywords: ['apex legends', 'battle royale'] }
                        }
                    },
                    moba: {
                        name: 'MOBA Games',
                        subcategories: {
                            lol: { name: 'League of Legends', keywords: ['lol', 'league of legends'] },
                            dota: { name: 'Dota 2', keywords: ['dota', 'dota 2'] }
                        }
                    },
                    minecraft: {
                        name: 'Minecraft',
                        subcategories: {
                            builds: { name: 'Builds', keywords: ['minecraft builds', 'construction'] },
                            mods: { name: 'Mods', keywords: ['minecraft mods', 'modded minecraft'] }
                        }
                    }
                }
            },
            sports: {
                name: 'Sports',
                subcategories: {
                    baseball: {
                        name: 'Baseball',
                        subcategories: {
                            mlb: { name: 'MLB', keywords: ['mlb', 'major league baseball'] },
                            college: { name: 'College Baseball', keywords: ['college baseball', 'ncaa baseball'] },
                            bananaball: {
                                name: 'Banana Ball',
                                subcategories: {
                                    savannah: { name: 'Savannah Bananas', keywords: ['savannah bananas', 'banana ball'] }
                                }
                            }
                        }
                    },
                    basketball: {
                        name: 'Basketball',
                        subcategories: {
                            nba: { name: 'NBA', keywords: ['nba', 'basketball'] },
                            college: { name: 'College Basketball', keywords: ['college basketball', 'march madness'] }
                        }
                    },
                    football: {
                        name: 'Football',
                        subcategories: {
                            nfl: { name: 'NFL', keywords: ['nfl', 'football'] },
                            college: { name: 'College Football', keywords: ['college football', 'ncaa football'] }
                        }
                    }
                }
            },
            music: {
                name: 'Music',
                subcategories: {
                    pop: { name: 'Pop', keywords: ['pop music', 'popular music'] },
                    hip_hop: { name: 'Hip Hop', keywords: ['hip hop', 'rap'] },
                    electronic: { name: 'Electronic', keywords: ['electronic music', 'edm'] },
                    rock: { name: 'Rock', keywords: ['rock music', 'rock band'] },
                    country: { name: 'Country', keywords: ['country music', 'country singer'] }
                }
            },
            cooking: {
                name: 'Cooking',
                subcategories: {
                    quick_meals: { name: 'Quick Meals', keywords: ['quick recipes', 'fast cooking'] },
                    baking: { name: 'Baking', keywords: ['baking', 'desserts'] },
                    international: { name: 'International Cuisine', keywords: ['international food', 'world cuisine'] },
                    healthy: { name: 'Healthy Cooking', keywords: ['healthy recipes', 'nutritious meals'] }
                }
            },
            comedy: {
                name: 'Comedy',
                subcategories: {
                    skits: { name: 'Comedy Skits', keywords: ['comedy skit', 'funny video'] },
                    pranks: { name: 'Pranks', keywords: ['prank', 'funny prank'] },
                    standup: { name: 'Stand-up', keywords: ['stand up comedy', 'comedian'] }
                }
            },
            tech: {
                name: 'Technology',
                subcategories: {
                    reviews: { name: 'Tech Reviews', keywords: ['tech review', 'gadget review'] },
                    tutorials: { name: 'Tutorials', keywords: ['tech tutorial', 'how to'] },
                    news: { name: 'Tech News', keywords: ['tech news', 'technology updates'] }
                }
            },
            fitness: {
                name: 'Fitness',
                subcategories: {
                    workouts: { name: 'Workouts', keywords: ['workout', 'exercise'] },
                    yoga: { name: 'Yoga', keywords: ['yoga', 'meditation'] },
                    nutrition: { name: 'Nutrition', keywords: ['nutrition', 'healthy eating'] }
                }
            },
            travel: {
                name: 'Travel',
                subcategories: {
                    destinations: { name: 'Destinations', keywords: ['travel destination', 'places to visit'] },
                    tips: { name: 'Travel Tips', keywords: ['travel tips', 'travel advice'] },
                    food: { name: 'Food & Travel', keywords: ['travel food', 'local cuisine'] }
                }
            },
            art: {
                name: 'Art',
                subcategories: {
                    digital: { name: 'Digital Art', keywords: ['digital art', 'digital drawing'] },
                    traditional: { name: 'Traditional Art', keywords: ['traditional art', 'painting'] },
                    crafts: { name: 'Crafts', keywords: ['crafts', 'diy art'] }
                }
            }
        };
    }

    async generateAIContent(topic, subtopic = null) {
        if (!this.openRouterApiKey) {
            console.warn('OpenRouter API key not configured');
            return null;
        }

        try {
            const topicData = this.getTopicData(topic, subtopic);
            const prompt = this.buildContentPrompt(topicData);
            
            const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.openRouterApiKey}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': window.location.origin,
                    'X-Title': 'Fins Video Platform'
                },
                body: JSON.stringify({
                    model: 'anthropic/claude-3-haiku',
                    messages: [
                        {
                            role: 'user',
                            content: prompt
                        }
                    ],
                    max_tokens: 1000,
                    temperature: 0.7
                })
            });

            const data = await response.json();
            
            if (data.choices && data.choices[0]) {
                const content = JSON.parse(data.choices[0].message.content);
                return this.formatAIContent(content, topic, subtopic);
            }
        } catch (error) {
            console.error('Failed to generate AI content:', error);
        }
        
        return null;
    }

    buildContentPrompt(topicData) {
        return `Generate a creative short video concept for the topic "${topicData.name}" with keywords: ${topicData.keywords.join(', ')}.
        
        Return a JSON object with:
        - title: Catchy video title (max 60 characters)
        - description: Brief description (max 150 characters)
        - script: Short script or concept (max 300 characters)
        - tags: Array of relevant hashtags
        - duration: Estimated duration in seconds (15-90)
        - creator_persona: Fictional creator name and style
        - engagement_hooks: Array of engagement tactics
        
        Focus on viral, entertaining, and shareable content that would work well in a 60-90 second format.`;
    }

    formatAIContent(content, topic, subtopic) {
        return {
            id: `ai_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            title: content.title,
            description: content.description,
            script: content.script,
            creator: content.creator_persona || 'AI Creator',
            avatar: this.getRandomAvatar(),
            category: topic,
            subcategory: subtopic,
            tags: content.tags || [],
            duration: content.duration || 60,
            views: Math.floor(Math.random() * 10000) + 1000,
            likes: Math.floor(Math.random() * 1000) + 100,
            isAIGenerated: true,
            url: this.generatePlaceholderVideo(),
            engagementHooks: content.engagement_hooks || [],
            bio: `AI-generated content creator specializing in ${topic}`,
            followers: Math.floor(Math.random() * 50000) + 10000,
            videoCount: Math.floor(Math.random() * 100) + 20
        };
    }

    async fetchYouTubeShorts(topic, maxResults = 10) {
        if (!this.youtubeApiKey) {
            console.warn('YouTube API key not configured');
            return [];
        }

        try {
            const topicData = this.getTopicData(topic);
            const searchQuery = topicData.keywords.join(' OR ');
            
            const response = await fetch(
                `https://www.googleapis.com/youtube/v3/search?` +
                `part=snippet&` +
                `q=${encodeURIComponent(searchQuery + ' shorts')}&` +
                `type=video&` +
                `duration=short&` +
                `maxResults=${maxResults}&` +
                `key=${this.youtubeApiKey}&` +
                `publishedAfter=${new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()}&` +
                `relevanceLanguage=en`
            );

            const data = await response.json();
            
            if (data.items) {
                return data.items.map(item => this.formatYouTubeContent(item, topic));
            }
        } catch (error) {
            console.error('Failed to fetch YouTube Shorts:', error);
        }
        
        return [];
    }

    formatYouTubeContent(item, topic) {
        return {
            id: `yt_${item.id.videoId}`,
            title: item.snippet.title,
            description: item.snippet.description,
            creator: item.snippet.channelTitle,
            avatar: item.snippet.thumbnails.default?.url || '📺',
            category: topic,
            tags: item.snippet.tags || [],
            views: Math.floor(Math.random() * 100000) + 10000,
            likes: Math.floor(Math.random() * 10000) + 1000,
            duration: this.getRandomDuration(),
            isYouTubeShort: true,
            youtubeId: item.id.videoId,
            url: `https://www.youtube.com/embed/${item.id.videoId}`,
            thumbnail: item.snippet.thumbnails.high?.url,
            publishedAt: item.snippet.publishedAt,
            bio: `YouTube creator specializing in ${topic}`,
            followers: Math.floor(Math.random() * 100000) + 50000,
            videoCount: Math.floor(Math.random() * 500) + 100
        };
    }

    getTopicData(topic, subtopic = null) {
        const topicData = this.topicHierarchy[topic];
        if (!topicData) {
            return { name: topic, keywords: [topic] };
        }

        if (subtopic && topicData.subcategories && topicData.subcategories[subtopic]) {
            const subData = topicData.subcategories[subtopic];
            return {
                name: subData.name,
                keywords: subData.keywords || [subtopic, topic]
            };
        }

        // Get all keywords from subcategories
        const allKeywords = [topic];
        if (topicData.subcategories) {
            Object.values(topicData.subcategories).forEach(sub => {
                if (sub.keywords) {
                    allKeywords.push(...sub.keywords);
                }
            });
        }

        return {
            name: topicData.name,
            keywords: allKeywords
        };
    }

    getRandomAvatar() {
        const avatars = ['🎮', '🎵', '🎬', '🎨', '🍳', '⚽', '🏀', '🎪', '🎭', '🎯', '🎸', '🎤', '🎧', '🎼', '🎺', '🎷'];
        return avatars[Math.floor(Math.random() * avatars.length)];
    }

    getRandomDuration() {
        const durations = ['0:15', '0:30', '0:45', '1:00', '1:15', '1:30'];
        return durations[Math.floor(Math.random() * durations.length)];
    }

    generatePlaceholderVideo() {
        // Generate a placeholder video URL or use a video generation service
        return `https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4`;
    }

    async loadCachedContent() {
        try {
            const cachedAI = localStorage.getItem('fins_ai_content');
            const cachedYT = localStorage.getItem('fins_youtube_content');
            
            if (cachedAI) {
                this.aiGeneratedContent = JSON.parse(cachedAI);
            }
            
            if (cachedYT) {
                this.youtubeShorts = JSON.parse(cachedYT);
            }
        } catch (error) {
            console.error('Failed to load cached content:', error);
        }
    }

    async saveContentToCache() {
        try {
            localStorage.setItem('fins_ai_content', JSON.stringify(this.aiGeneratedContent));
            localStorage.setItem('fins_youtube_content', JSON.stringify(this.youtubeShorts));
        } catch (error) {
            console.error('Failed to save content to cache:', error);
        }
    }

    startBackgroundFetching() {
        // Fetch content every 5 minutes
        setInterval(() => {
            this.backgroundContentFetch();
        }, 5 * 60 * 1000);
        
        // Initial fetch
        this.backgroundContentFetch();
    }

    async backgroundContentFetch() {
        try {
            const topics = Object.keys(this.topicHierarchy);
            const randomTopic = topics[Math.floor(Math.random() * topics.length)];
            
            // Generate AI content
            if (this.aiGeneratedContent.length < 50) {
                const aiContent = await this.generateAIContent(randomTopic);
                if (aiContent) {
                    this.aiGeneratedContent.push(aiContent);
                }
            }
            
            // Fetch YouTube content
            if (this.youtubeShorts.length < 100) {
                const ytContent = await this.fetchYouTubeShorts(randomTopic, 5);
                this.youtubeShorts.push(...ytContent);
            }
            
            // Save to cache
            await this.saveContentToCache();
            
        } catch (error) {
            console.error('Background fetch failed:', error);
        }
    }

    async getRecommendedContent(currentTopic, userLikes = [], userSubscriptions = []) {
        const recommendations = [];
        
        // Mix of AI generated content and YouTube shorts
        const aiContent = this.aiGeneratedContent.filter(content => 
            content.category === currentTopic || 
            userLikes.some(like => content.tags.includes(like))
        );
        
        const ytContent = this.youtubeShorts.filter(content => 
            content.category === currentTopic ||
            userSubscriptions.includes(content.creator)
        );
        
        // Interleave AI and YouTube content
        const maxLength = Math.max(aiContent.length, ytContent.length);
        for (let i = 0; i < maxLength; i++) {
            if (i < aiContent.length) recommendations.push(aiContent[i]);
            if (i < ytContent.length) recommendations.push(ytContent[i]);
        }
        
        return recommendations;
    }

    getTopicHierarchyForUI() {
        const hierarchy = {};
        
        Object.entries(this.topicHierarchy).forEach(([key, value]) => {
            hierarchy[key] = {
                name: value.name,
                subcategories: value.subcategories ? Object.keys(value.subcategories) : []
            };
        });
        
        return hierarchy;
    }

    async setAPIKeys(openRouterKey, youtubeKey) {
        this.openRouterApiKey = openRouterKey;
        this.youtubeApiKey = youtubeKey;
        
        // Save to localStorage
        if (openRouterKey) localStorage.setItem('openrouter_api_key', openRouterKey);
        if (youtubeKey) localStorage.setItem('youtube_api_key', youtubeKey);
        
        // Reinitialize if needed
        if (!this.isInitialized) {
            await this.initialize();
        }
    }
}

// Global instance
window.aiYouTubeIntegration = new AIYouTubeIntegration();

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.aiYouTubeIntegration.initialize();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AIYouTubeIntegration;
}