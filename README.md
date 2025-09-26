# 🏝️ GoTrav Papua - Travel Website

A modern, high-performance travel website built with Next.js 14, showcasing the beauty of Papua through tour packages, destinations, and adventures.

## ✨ Features

- **Modern Tech Stack**: Next.js 14 with App Router, TypeScript, and Tailwind CSS
- **Responsive Design**: Mobile-first approach with beautiful UI/UX
- **Performance Optimized**: Image optimization, lazy loading, and efficient caching
- **SEO Friendly**: Comprehensive meta tags, structured data, and optimized content
- **Interactive Components**: Modern carousel with Swiper.js, smooth animations with Framer Motion
- **Accessibility**: WCAG compliant with proper focus management and screen reader support
- **Type Safety**: Full TypeScript implementation with proper type definitions

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd gotravpapua-main
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your environment variables in `.env.local`:
```env
NEXT_PUBLIC_HOST_API=https://nokenpanel.gotravpapua.com/api/v1/
NEXT_PUBLIC_HOSTNAME=https://nokenpanel.gotravpapua.com/
NEXT_PUBLIC_HOST=https://gotravpapua.com/
```

5. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
├── app/                    # Next.js 14 App Router
│   ├── globals.css        # Global styles and Tailwind CSS
│   ├── layout.tsx         # Root layout with SEO optimization
│   ├── page.tsx           # Home page
│   ├── loading.tsx        # Loading UI
│   └── [routes]/          # Dynamic routes
├── components/            # Reusable React components
│   ├── ui/               # UI components (buttons, modals, etc.)
│   ├── hero/             # Hero carousel component
│   ├── about/            # About section
│   └── ...               # Other feature components
├── config/               # Configuration files
│   ├── navigation/       # Navigation component
│   └── footer/           # Footer component
├── data/                 # API functions and data fetching
│   └── api.ts            # Centralized API functions
├── lib/                  # Utility functions
│   └── utils.ts          # Helper functions
├── types/                # TypeScript type definitions
│   └── index.ts          # Global types
├── public/               # Static assets
└── styles/               # Additional styles
```

## 🎨 Key Improvements Made

### 1. **Technology Upgrade**
- ✅ Upgraded to Next.js 14 with App Router
- ✅ Added TypeScript for type safety
- ✅ Implemented modern Tailwind CSS
- ✅ Replaced Bootstrap carousel with Swiper.js
- ✅ Added Framer Motion for smooth animations

### 2. **Performance Optimization**
- ✅ Optimized image loading with Next.js Image component
- ✅ Reduced external CSS dependencies
- ✅ Implemented proper caching strategies
- ✅ Added loading states and skeleton screens
- ✅ Optimized font loading with Google Fonts

### 3. **SEO & Accessibility**
- ✅ Comprehensive meta tags and Open Graph
- ✅ Structured data implementation
- ✅ Proper heading hierarchy
- ✅ Focus management and keyboard navigation
- ✅ Screen reader compatibility

### 4. **Code Quality**
- ✅ TypeScript implementation with proper types
- ✅ Consistent code formatting
- ✅ Error handling and loading states
- ✅ Modular component architecture
- ✅ Utility functions for common operations

### 5. **User Experience**
- ✅ Modern, responsive design
- ✅ Smooth animations and transitions
- ✅ Intuitive navigation
- ✅ Fast loading times
- ✅ Mobile-optimized interface

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run type-check   # TypeScript type checking
```

## 📱 API Integration

The website integrates with the GoTrav Papua API for:

- **Sliders**: Hero carousel content
- **Tour Packages**: Available tour packages
- **Destinations**: Travel destinations
- **Adventures**: Adventure activities
- **Events**: Upcoming events
- **Settings**: Site configuration and contact info

## 🎯 Key Components

### Hero Carousel
Modern, responsive carousel with:
- Swiper.js integration
- Smooth fade transitions
- Auto-play functionality
- Touch/swipe support
- Accessible navigation

### Tour Cards
Interactive cards featuring:
- Optimized images
- Hover effects
- Price formatting
- Responsive layout
- Call-to-action buttons

### Loading States
Beautiful loading experiences:
- Skeleton screens
- Animated spinners
- Progress indicators
- Smooth transitions

## 🌐 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables
4. Deploy automatically

### Other Platforms
The app can be deployed to any platform that supports Node.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Email: support@gotravpapua.com
- Website: https://gotravpapua.com

---

Built with ❤️ for Papua tourism by the GoTrav Papua team.
