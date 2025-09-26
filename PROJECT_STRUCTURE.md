# 🏗️ GoTrav Papua - Modern Project Structure

## 📁 New Folder Structure

```
├── app/                          # Next.js 14 App Router
│   ├── (marketing)/             # Route groups
│   │   ├── page.tsx             # Home page
│   │   ├── about/               # About pages
│   │   ├── contact/             # Contact pages
│   │   └── layout.tsx           # Marketing layout
│   ├── (tours)/                 # Tour-related pages
│   │   ├── tour-packages/       # Tour packages
│   │   ├── tour-destinations/   # Destinations
│   │   ├── tour-adventures/     # Adventures
│   │   ├── tour-events/         # Events
│   │   └── layout.tsx           # Tours layout
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   ├── loading.tsx              # Global loading
│   ├── error.tsx                # Global error
│   └── not-found.tsx            # 404 page
├── components/                   # Reusable components
│   ├── ui/                      # Base UI components
│   │   ├── Button/              # Button variants
│   │   ├── Card/                # Card components
│   │   ├── Modal/               # Modal dialogs
│   │   ├── Input/               # Form inputs
│   │   ├── Badge/               # Status badges
│   │   ├── Skeleton/            # Loading skeletons
│   │   └── index.ts             # UI exports
│   ├── layout/                  # Layout components
│   │   ├── Header/              # Site header
│   │   ├── Footer/              # Site footer
│   │   ├── Navigation/          # Navigation menus
│   │   └── Sidebar/             # Sidebar components
│   ├── sections/                # Page sections
│   │   ├── Hero/                # Hero sections
│   │   ├── About/               # About sections
│   │   ├── Features/            # Feature sections
│   │   ├── Testimonials/        # Testimonial sections
│   │   └── CTA/                 # Call-to-action sections
│   ├── tours/                   # Tour-specific components
│   │   ├── TourCard/            # Tour card component
│   │   ├── TourGrid/            # Tour grid layout
│   │   ├── TourFilter/          # Filter component
│   │   ├── TourSearch/          # Search component
│   │   └── TourCarousel/        # Tour carousel
│   └── providers/               # Context providers
│       ├── ThemeProvider.tsx    # Theme context
│       ├── SearchProvider.tsx   # Search context
│       └── ToastProvider.tsx    # Toast notifications
├── lib/                         # Utility libraries
│   ├── utils.ts                 # General utilities
│   ├── validations.ts           # Form validations
│   ├── constants.ts             # App constants
│   ├── hooks/                   # Custom hooks
│   │   ├── useDebounce.ts       # Debounce hook
│   │   ├── useLocalStorage.ts   # Local storage hook
│   │   ├── useIntersection.ts   # Intersection observer
│   │   └── useTours.ts          # Tours data hook
│   └── api/                     # API utilities
│       ├── client.ts            # API client
│       ├── tours.ts             # Tours API
│       ├── settings.ts          # Settings API
│       └── types.ts             # API types
├── styles/                      # Styling
│   ├── globals.css              # Global styles
│   ├── components.css           # Component styles
│   └── utilities.css            # Utility classes
├── types/                       # TypeScript types
│   ├── index.ts                 # Main types
│   ├── api.ts                   # API types
│   ├── components.ts            # Component types
│   └── tours.ts                 # Tour types
├── config/                      # Configuration
│   ├── site.ts                  # Site configuration
│   ├── navigation.ts            # Navigation config
│   └── seo.ts                   # SEO configuration
└── public/                      # Static assets
    ├── images/                  # Optimized images
    ├── icons/                   # SVG icons
    └── favicon/                 # Favicon files
```

## 🎨 Design System Components

### Base UI Components
- Button (primary, secondary, outline, ghost variants)
- Card (default, elevated, outlined)
- Input (text, email, search, textarea)
- Badge (status, category indicators)
- Modal (dialog, drawer, popup)
- Skeleton (loading states)

### Layout Components
- Container (responsive wrapper)
- Grid (responsive grid system)
- Stack (vertical/horizontal spacing)
- Divider (section separators)

### Tour Components
- TourCard (consistent tour display)
- TourGrid (responsive tour layout)
- TourFilter (category/price filtering)
- TourSearch (search functionality)
- TourCarousel (featured tours)

## 🎯 Key Improvements

1. **Consistent Design System**
   - Unified color palette
   - Typography scale
   - Spacing system
   - Component variants

2. **Better Performance**
   - Lazy loading components
   - Image optimization
   - Code splitting
   - Caching strategies

3. **Enhanced UX**
   - Loading states
   - Error boundaries
   - Search functionality
   - Filtering options

4. **Accessibility**
   - ARIA labels
   - Keyboard navigation
   - Screen reader support
   - Focus management

5. **Developer Experience**
   - TypeScript everywhere
   - Consistent patterns
   - Reusable components
   - Clear documentation
