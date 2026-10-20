## Application structure

This is a Next.js wedding photography portfolio with server-side rendering. The application uses the App Router with multiple pages for better SEO and navigation.

### Page Structure

- **Home page** (`app/page.tsx`): Hero section with scroll-based photo transitions, intro section, album previews, films section, services overview, process steps, testimonials carousel, FAQ accordion, and contact form
- **Portfolio** (`app/portfolio/page.tsx`): Dedicated page for wedding album galleries
- **Films** (`app/films/page.tsx`): Wedding films showcase
- **Services** (`app/services/page.tsx`): Detailed services offerings
- **Testimonials** (`app/testimonials/page.tsx`): Client testimonials with carousel
- **FAQ** (`app/faq/page.tsx`): Frequently asked questions accordion
- **Contact** (`app/contact/page.tsx`): Contact form for inquiries

### Key Components

- **SiteHeader** (`components/site-header.tsx`): Responsive navigation header with desktop and mobile menus
- **SiteFooter** (`components/site-footer.tsx`): Site footer with navigation links and social media
- **UI Components** (`components/ui/`): shadcn/ui components for buttons, dialogs, forms, etc.

### Styling

- Uses Tailwind CSS v4 with custom design tokens
- Custom CSS variables defined in `app/globals.css`
- Responsive design with mobile-first approach
- Custom fonts: Pinyon Script (display), Cormorant Garamond (serif), Jost (UI)

### Development

- Run `npm run dev` to start the development server
- Run `npm run build` to build for production
- Run `npm run lint` to check for linting errors
- Run `npm run format` to format code with Prettier
