# 🐟 Fins - Short Video Platform

A Tinder-style short video platform with swipe-based navigation, AI-powered content generation, and YouTube Shorts integration.

## ✨ Features

### 🎬 Core Features
- **Swipe Navigation**: Tinder-style swipe controls for video interaction
  - **Swipe Right**: Like video ❤️
  - **Swipe Left**: Next video ➡️
  - **Swipe Down**: View channel/creator profile 📺
  - **Swipe Up**: Next video ⬆️
- **Video Upload**: Upload videos up to 1 minute 30 seconds
- **Channel System**: Creator profiles with bio, follower count, and video galleries
- **Topic-Based Discovery**: Hierarchical content categorization
- **Dark/Light Mode**: Customizable UI themes
- **Progressive Web App**: Installable with offline functionality

### 🤖 AI Integration
- **OpenRouter API**: AI-generated video content suggestions
- **Smart Recommendations**: Content based on user preferences and viewing history
- **Hierarchical Topics**: Advanced categorization system
  - Gaming → FPS → Valorant/CS:GO/Apex
  - Sports → Baseball → MLB/College/Banana Ball → Savannah Bananas
  - Music → Pop/Hip-Hop/Electronic/Rock/Country
  - And many more...

### 📺 YouTube Integration
- **YouTube Shorts**: Fetch and display YouTube Shorts content
- **Real-time Fetching**: Background content updates
- **Creator Integration**: YouTube channel information and statistics

### 🎨 User Experience
- **Responsive Design**: Works on all devices
- **Touch & Mouse Support**: Full desktop and mobile compatibility
- **Keyboard Controls**: Arrow keys and spacebar navigation
- **Visual Feedback**: Swipe indicators and animations
- **Settings Panel**: Customizable user preferences

## 🚀 Getting Started

### Quick Start
1. Clone or download the repository
2. Open `index.html` in a modern web browser
3. Start swiping through videos!

### File Structure
```
fins-platform/
├── index.html              # Main application file
├── manifest.json           # PWA manifest
├── sw.js                  # Service worker for offline functionality
├── js/
│   └── ai-youtube-integration.js  # AI and YouTube integration
├── icons/                 # PWA icons (you'll need to add these)
└── README.md             # This file
```

## 🔧 Configuration

### API Keys Setup
To enable AI content generation and YouTube integration:

1. **OpenRouter API Key** (for AI content):
   - Sign up at [OpenRouter](https://openrouter.ai/)
   - Get your API key
   - Add it via Settings → API Keys in the app

2. **YouTube API Key** (for YouTube Shorts):
   - Create a project in [Google Cloud Console](https://console.cloud.google.com/)
   - Enable YouTube Data API v3
   - Create an API key
   - Add it via Settings → API Keys in the app

### Icons Setup
Create the following icon files in the `icons/` directory:
- `icon-72x72.png`
- `icon-96x96.png`
- `icon-128x128.png`
- `icon-144x144.png`
- `icon-152x152.png`
- `icon-192x192.png`
- `icon-384x384.png`
- `icon-512x512.png`

## 🎮 Usage Guide

### Navigation
- **Desktop**: Use mouse to drag/swipe or arrow keys
- **Mobile**: Touch gestures (swipe in any direction)
- **Keyboard Shortcuts**:
  - `↑/↓`: Previous/Next video
  - `←/→`: Next video/Like video
  - `Space`: Play/Pause video

### Controls
- **Like Button**: Heart icon on the right side
- **Subscribe/Follow**: User icon on the right side
- **Share**: Share icon on the right side
- **Channel View**: TV icon on the right side

### Video Upload
1. Click the upload button (📤) in the header
2. Select video file (max 1:30 duration)
3. Add title, description, category, and tags
4. Click "Upload Video"

### Settings
Access settings via the gear icon (⚙️) in the header:
- **Display**: Dark mode, auto-play, video quality
- **Content**: Mature content filter, language
- **Notifications**: Push and email notifications
- **Privacy**: Private account, analytics

## 🏗️ Technical Architecture

### Core Technologies
- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with animations and responsive design
- **Vanilla JavaScript**: No external dependencies
- **Service Worker**: Offline functionality and caching
- **Web APIs**: File API, Canvas API, Intersection Observer

### Data Structure
```javascript
// Video Object Structure
{
    id: "unique_id",
    title: "Video Title",
    creator: "Creator Name",
    avatar: "🎮",
    views: 15420,
    likes: 1230,
    duration: "0:45",
    category: "gaming",
    subcategory: "fps",
    tags: ["gaming", "montage", "fps"],
    url: "video_url",
    bio: "Creator bio",
    followers: 25000,
    videoCount: 150
}
```

### Topic Hierarchy
```javascript
{
    gaming: {
        fps: {
            valorant: ["valorant", "tactical shooter"],
            csgo: ["csgo", "counter-strike"],
            apex: ["apex legends", "battle royale"]
        }
    },
    sports: {
        baseball: {
            mlb: ["mlb", "major league baseball"],
            bananaball: {
                savannah: ["savannah bananas", "banana ball"]
            }
        }
    }
    // ... and more
}
```

## 🎯 Advanced Features

### AI Content Generation
The platform uses OpenRouter API to generate creative video concepts:
- Analyzes topic hierarchies and user preferences
- Generates titles, descriptions, and engagement hooks
- Creates fictional creator personas
- Suggests trending hashtags and content strategies

### YouTube Integration
- Fetches recent YouTube Shorts based on topic keywords
- Caches content for offline viewing
- Respects API rate limits with intelligent background fetching
- Displays YouTube creator information and statistics

### Recommendation Engine
- Analyzes user likes and subscriptions
- Considers viewing history and time spent on content
- Balances AI-generated and real content
- Implements topic-based filtering

## 🔮 Future Enhancements

### Planned Features
- [ ] Real-time chat and comments
- [ ] Live streaming capabilities
- [ ] Advanced analytics dashboard
- [ ] Creator monetization tools
- [ ] Social features (friends, groups)
- [ ] Video editing tools
- [ ] AR/VR content support
- [ ] Voice and gesture controls

### Technical Improvements
- [ ] Backend API integration
- [ ] Real-time database synchronization
- [ ] Advanced caching strategies
- [ ] Performance optimizations
- [ ] Accessibility enhancements
- [ ] Internationalization support

## 🐛 Troubleshooting

### Common Issues
1. **Videos not loading**: Check internet connection and video URLs
2. **Swipe not working**: Ensure JavaScript is enabled
3. **Upload failing**: Check file size and format (max 1:30, video formats only)
4. **API errors**: Verify API keys are set correctly
5. **PWA not installing**: Ensure HTTPS and valid manifest.json

### Browser Compatibility
- **Chrome**: Full support ✅
- **Firefox**: Full support ✅
- **Safari**: Limited PWA support ⚠️
- **Edge**: Full support ✅

## 📱 Mobile Optimization

### Performance
- Lazy loading for videos
- Efficient memory management
- Optimized for touch interactions
- Responsive design for all screen sizes

### Features
- Pull-to-refresh functionality
- Swipe gestures optimization
- Battery usage optimization
- Offline content caching

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Code Style
- Use modern JavaScript (ES6+)
- Follow consistent naming conventions
- Add comments for complex logic
- Ensure mobile compatibility

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- OpenRouter for AI content generation
- YouTube Data API for content integration
- Progressive Web App standards
- Modern web development practices

---

**Made with ❤️ for the short video community**

Start swiping and discover amazing content! 🎬✨