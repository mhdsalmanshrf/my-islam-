// MyIslam App - Main JavaScript
class MyIslamApp {
    constructor() {
        this.prayerTimes = {};
        this.currentLocation = { lat: 40.7128, lng: -74.0060 }; // Default: NYC
        this.nextPrayer = null;
        this.audioPlayer = null;
        this.currentVerse = null;
        
        this.init();
    }

    init() {
        this.setupTypedText();
        this.getUserLocation();
        this.calculatePrayerTimes();
        this.updateHijriDate();
        this.setupEventListeners();
        this.startCountdown();
        this.loadUserData();
    }

    setupTypedText() {
        if (typeof Typed !== 'undefined') {
            new Typed('#typed-text', {
                strings: ['MyIslam', 'Your Islamic Companion', 'Pray • Read • Reflect'],
                typeSpeed: 80,
                backSpeed: 50,
                backDelay: 2000,
                loop: true,
                showCursor: true,
                cursorChar: '|'
            });
        }
    }

    getUserLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.currentLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    this.calculatePrayerTimes();
                    this.updateQiblaDirection();
                },
                (error) => {
                    console.log('Location access denied, using default location');
                    this.updateQiblaDirection();
                }
            );
        }
    }

    calculatePrayerTimes() {
        const today = new Date();
        const times = this.getPrayerTimesForDate(today, this.currentLocation.lat, this.currentLocation.lng);
        this.prayerTimes = times;
        this.findNextPrayer();
        this.updatePrayerDisplay();
    }

    getPrayerTimesForDate(date, lat, lng) {
        // Simplified prayer time calculation
        // In a real app, you'd use a proper Islamic prayer time library
        const sunrise = new Date(date);
        sunrise.setHours(6, 30, 0, 0);
        
        const sunset = new Date(date);
        sunset.setHours(18, 30, 0, 0);
        
        const midday = new Date(date);
        midday.setHours(12, 45, 0, 0);
        
        const afternoon = new Date(date);
        afternoon.setHours(15, 30, 0, 0);
        
        const evening = new Date(date);
        evening.setHours(18, 45, 0, 0);
        
        const night = new Date(date);
        night.setHours(20, 0, 0, 0);
        
        return {
            fajr: sunrise,
            sunrise: sunrise,
            dhuhr: midday,
            asr: afternoon,
            maghrib: evening,
            isha: night
        };
    }

    findNextPrayer() {
        const now = new Date();
        const prayers = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'];
        
        for (let prayer of prayers) {
            if (this.prayerTimes[prayer] > now) {
                this.nextPrayer = prayer;
                break;
            }
        }
        
        if (!this.nextPrayer) {
            this.nextPrayer = 'fajr';
            // Tomorrow's fajr
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            this.prayerTimes.fajr = new Date(tomorrow);
            this.prayerTimes.fajr.setHours(6, 30, 0, 0);
        }
    }

    updatePrayerDisplay() {
        const nextPrayerName = document.getElementById('next-prayer-name');
        const prayerTime = document.getElementById('prayer-time');
        
        if (nextPrayerName && this.nextPrayer) {
            nextPrayerName.textContent = this.capitalizeFirst(this.nextPrayer);
        }
        
        if (prayerTime && this.prayerTimes[this.nextPrayer]) {
            prayerTime.textContent = this.formatTime(this.prayerTimes[this.nextPrayer]);
        }
    }

    startCountdown() {
        setInterval(() => {
            const now = new Date();
            const nextPrayerTime = this.prayerTimes[this.nextPrayer];
            
            if (nextPrayerTime) {
                const timeDiff = nextPrayerTime - now;
                
                if (timeDiff <= 0) {
                    this.calculatePrayerTimes();
                    return;
                }
                
                const hours = Math.floor(timeDiff / (1000 * 60 * 60));
                const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
                
                const countdown = document.getElementById('countdown');
                if (countdown) {
                    countdown.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                }
            }
        }, 1000);
    }

    updateHijriDate() {
        const hijriDate = this.toHijri(new Date());
        const hijriElement = document.getElementById('hijri-date');
        if (hijriElement) {
            hijriElement.textContent = `${hijriDate.day} ${hijriDate.month} ${hijriDate.year}`;
        }
    }

    toHijri(gregorianDate) {
        // Simplified Hijri conversion
        // In a real app, you'd use a proper Hijri calendar library
        const jd = this.gregorianToJulian(gregorianDate);
        const hijriJd = jd - 1948439; // Approximate conversion
        const hijriYear = Math.floor(hijriJd / 354.367) + 1;
        const dayOfYear = hijriJd % 354.367;
        const hijriMonth = Math.floor(dayOfYear / 29.531) + 1;
        const hijriDay = Math.floor(dayOfYear % 29.531) + 1;
        
        const months = [
            'Muharram', 'Safar', 'Rabi\' al-Awwal', 'Rabi\' al-Thani',
            'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Shaban',
            'Ramadan', 'Shawwal', 'Dhu al-Qidah', 'Dhu al-Hijjah'
        ];
        
        return {
            day: hijriDay,
            month: months[Math.floor(hijriMonth) - 1] || 'Muharram',
            year: hijriYear
        };
    }

    gregorianToJulian(date) {
        const a = Math.floor((14 - (date.getMonth() + 1)) / 12);
        const y = date.getFullYear() - a;
        const m = (date.getMonth() + 1) + 12 * a - 3;
        
        return date.getDate() + Math.floor((153 * m + 2) / 5) + 365 * y + 
               Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) + 1721119;
    }

    updateQiblaDirection() {
        const qiblaElement = document.getElementById('qibla-direction');
        if (qiblaElement) {
            const bearing = this.calculateQiblaBearing(this.currentLocation.lat, this.currentLocation.lng);
            const direction = this.getCardinalDirection(bearing);
            qiblaElement.textContent = `${Math.round(bearing)}° ${direction}`;
        }
    }

    calculateQiblaBearing(lat, lng) {
        const R = (d) => d * Math.PI / 180;
        const D = (r) => r * 180 / Math.PI;
        
        const Kφ = R(21.4225); // Kaaba latitude
        const Kλ = R(39.8262); // Kaaba longitude
        const φ1 = R(lat);
        const λ1 = R(lng);
        
        const y = Math.sin(Kλ - λ1) * Math.cos(Kφ);
        const x = Math.cos(φ1) * Math.sin(Kφ) - Math.sin(φ1) * Math.cos(Kφ) * Math.cos(Kλ - λ1);
        
        return (D(Math.atan2(y, x)) + 360) % 360;
    }

    getCardinalDirection(degrees) {
        const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
        const index = Math.round(degrees / 22.5) % 16;
        return directions[index];
    }

    setupEventListeners() {
        // Navigation active state
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                navItems.forEach(nav => nav.classList.remove('active'));
                e.currentTarget.classList.add('active');
            });
        });

        // Quick actions hover effects
        const quickActions = document.querySelectorAll('.quick-action');
        quickActions.forEach(action => {
            action.addEventListener('mouseenter', () => {
                if (typeof anime !== 'undefined') {
                    anime({
                        targets: action,
                        scale: 1.05,
                        duration: 200,
                        easing: 'easeOutQuad'
                    });
                }
            });
            
            action.addEventListener('mouseleave', () => {
                if (typeof anime !== 'undefined') {
                    anime({
                        targets: action,
                        scale: 1,
                        duration: 200,
                        easing: 'easeOutQuad'
                    });
                }
            });
        });
    }

    loadUserData() {
        // Load user preferences and data from localStorage
        const userData = localStorage.getItem('myislam-userdata');
        if (userData) {
            const data = JSON.parse(userData);
            this.updatePrayerStreak(data.prayerStreak || 0);
        } else {
            this.updatePrayerStreak(7); // Default streak
        }
    }

    updatePrayerStreak(streak) {
        const streakElement = document.getElementById('prayer-streak');
        if (streakElement) {
            streakElement.textContent = `${streak} days`;
        }
    }

    // Utility functions
    formatTime(date) {
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    }

    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // Audio functionality
    playVerseAudio(surah, ayah) {
        // In a real app, you'd load actual audio files
        console.log(`Playing audio for ${surah}:${ayah}`);
        this.showAudioPlayer();
    }

    showAudioPlayer() {
        const player = document.querySelector('.audio-player');
        if (player) {
            player.classList.add('active');
        }
    }

    hideAudioPlayer() {
        const player = document.querySelector('.audio-player');
        if (player) {
            player.classList.remove('active');
        }
    }

    // Search functionality
    searchQuran(query, inArabic = false) {
        // Simplified search - in real app would search through actual Quran data
        console.log(`Searching for: ${query} (Arabic: ${inArabic})`);
        return [];
    }

    // Notification functionality
    scheduleNotification(prayer, time) {
        if ('Notification' in window) {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    const timeUntilPrayer = time.getTime() - Date.now();
                    setTimeout(() => {
                        new Notification(`Time for ${prayer}`, {
                            body: `It's time for ${prayer} prayer`,
                            icon: '/favicon.ico'
                        });
                    }, timeUntilPrayer);
                }
            });
        }
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.myIslamApp = new MyIslamApp();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MyIslamApp;
}