# MyIslam - Your Complete Islamic Companion

A comprehensive web application for Islamic practices including prayer times, Quran reading, Qibla direction, and more.

## Features

### 🕌 Prayer Times
- Accurate prayer time calculations using multiple methods (MWL, ISNA, Egyptian, etc.)
- Customizable calculation and juristic methods
- Prayer notifications and reminders
- 7-day prayer time forecast

### 🧭 Qibla Direction
- Interactive compass showing direction to Kaaba
- GPS-based location detection
- Distance to Kaaba calculation
- Compass calibration tools

### 📖 Quran Reader
- Complete Quran with Arabic text and translations
- Multiple translation options (Sahih International, Pickthall, etc.)
- Search functionality (Arabic and English)
- Audio playback support
- Bookmark and sharing features

### 🤲 Daily Duas
- Comprehensive collection of Islamic supplications
- Categorized by occasion (Morning, Evening, Prayer, etc.)
- Arabic text, transliteration, and translation
- Audio playback and sharing options

### 📿 Tasbeeh Counter
- Digital dhikr counter with haptic feedback
- Multiple preset dhikr options
- Session tracking and statistics
- Customizable counter settings

### ✅ Habits Tracker
- Track Islamic practices and prayers
- Streak counting and progress visualization
- Weekly and monthly progress views
- Motivational quotes and achievements

### 💰 Zakat Calculator
- Comprehensive asset and liability tracking
- Real-time gold and silver price updates
- Nisab threshold calculations
- Zakat amount computation (2.5%)

### 📅 Islamic Calendar
- Hijri and Gregorian date display
- Important Islamic dates and events
- Date conversion tools
- Month navigation

### ⚙️ Settings
- Language preferences (English, Arabic, French, Urdu)
- Theme customization (Light, Dark, Auto)
- Prayer time calculation methods
- Notification settings
- Data backup and export

## Technology Stack

- **Frontend**: HTML5, CSS3 (Tailwind CSS), JavaScript (ES6+)
- **Styling**: Tailwind CSS with custom claymorphic design system
- **Animations**: Anime.js for smooth transitions and effects
- **Typography**: Inter (Latin), Amiri (Arabic)
- **Icons**: Emoji-based icon system
- **Storage**: LocalStorage for user data persistence

## Design Features

### Claymorphic Design
- Soft, rounded cards with subtle shadows
- Smooth hover effects and transitions
- Glassmorphism effects with backdrop blur
- Consistent color palette with Islamic green accents

### Responsive Design
- Mobile-first approach
- Touch-friendly interface
- Optimized for various screen sizes
- Bottom navigation for easy thumb access

### Accessibility
- High contrast text and backgrounds
- Large touch targets (minimum 44px)
- Keyboard navigation support
- Screen reader friendly markup

## Installation & Usage

1. **Clone or download** the project files
2. **Open** `index.html` in a web browser
3. **Allow** location access for accurate prayer times and Qibla direction
4. **Customize** settings according to your preferences

## File Structure

```
MyIslam/
├── index.html              # Home page with dashboard
├── prayer.html             # Prayer times and settings
├── qibla.html              # Qibla compass and direction
├── quran.html              # Quran reader with search
├── duas.html               # Daily supplications
├── tasbeeh.html            # Digital dhikr counter
├── habits.html             # Islamic habits tracker
├── zakat.html              # Zakat calculator
├── calendar.html           # Islamic calendar
├── settings.html           # App settings and preferences
├── main.js                 # Core JavaScript functionality
├── styles.css              # Custom styles and animations
└── README.md               # This file
```

## Browser Compatibility

- **Modern Browsers**: Chrome 80+, Firefox 75+, Safari 13+, Edge 80+
- **Mobile Browsers**: iOS Safari 13+, Chrome Mobile 80+
- **Features**: ES6+, CSS Grid, Flexbox, Web APIs

## Data Sources & Attributions

### Quran Text & Translations
- **Arabic Text**: Tanzil.net (Uthmani Script)
- **Translations**: Sahih International, Pickthall, Yusuf Ali
- **Attribution**: Used with proper attribution as per license requirements

### Duas & Azkar
- **Sources**: Hisnul Muslim, MuslimKit Azkar collection
- **Attribution**: Used with attribution to original sources

### Islamic Calendar
- **Hijri Conversion**: Simplified algorithm for demonstration
- **Important Dates**: Based on traditional Islamic calendar

### Fonts
- **Arabic**: Amiri (SIL Open Font License)
- **Latin**: Inter (SIL Open Font License)

## Privacy & Data

- **Local Storage**: All data stored locally on your device
- **No Tracking**: No analytics or tracking code
- **Location**: Location data used only for prayer times and Qibla
- **Offline Capable**: Core features work without internet

## Development

### Local Development
```bash
# Serve files locally
python -m http.server 8000
# or
npx serve .

# Open http://localhost:8000
```

### Customization
- Modify `styles.css` for design changes
- Update `main.js` for functionality changes
- Edit HTML files for layout modifications
- Add new features by creating additional pages

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is created for educational and spiritual purposes. Please respect the attributions and licenses of the original content sources.

## Support

For issues, feature requests, or questions:
- Check the settings page for troubleshooting
- Review browser console for error messages
- Ensure location services are enabled for best experience

---

**MyIslam** - Built with ❤️ for the Muslim community. May Allah accept our efforts and guide us all.