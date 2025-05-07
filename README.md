# 🌱 Clean Bounty

Clean Bounty is an innovative platform that incentivizes community-driven environmental cleanup by rewarding users for reporting and cleaning waste in their localities. By combining cutting-edge AI technology with a gamified reward system, we're making environmental conservation both impactful and rewarding.

## 🌟 Vision

Our vision is to create a cleaner, more sustainable world by empowering communities to take action against waste pollution. We believe that by providing incentives and making waste management engaging, we can create a positive impact on our environment while fostering community participation.

## ✨ Key Features

### 🤖 AI-Powered Waste Classification
- Utilizes Google's Gemini AI for accurate waste classification
- Identifies different types of waste for proper disposal
- Helps in determining appropriate cleanup methods

### 📍 Location-Based Reporting
- GPS integration for precise waste location tracking
- Google Maps integration for easy navigation
- Visual representation of cleanup areas

### 💰 Reward System
- Earn bounties for reporting waste
- Additional rewards for participating in cleanup
- Redeemable rewards for verified cleanup actions

### 🎯 Community Impact
- Track local cleanup progress
- Community leaderboards
- Impact statistics and achievements

## 🛠️ Technology Stack

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS
- **AI Integration**: Google Gemini
- **Maps**: Google Maps API
- **Database**: Supabase
- **Authentication**: Clerk

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or bun package manager
- Google Maps API key
- Gemini API key
- Clerk API keys

### Installation

1. Clone the repository:
```bash
git clone https://github.com/HacksterAman/Clean-Bounty.git
cd Clean-Bounty
```

2. Install dependencies:
```bash
npm install
# or
bun install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```env
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_CLERK_SECRET_KEY=your_clerk_secret_key
```

4. Start the development server:
```bash
npm run dev
# or
bun dev
```

## 🤝 Contributing

We welcome contributions from the community! Whether it's bug fixes, feature enhancements, or documentation improvements, your input helps make Clean Bounty better.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google Gemini AI for waste classification
- Google Maps for location services
- Clerk for secure authentication
- The open-source community for their invaluable tools and libraries

---

Join us in making the world a cleaner place, one bounty at a time! 🌍✨
