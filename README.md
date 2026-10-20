# Wedding Photography Portfolio

A modern wedding photography portfolio built with Next.js, featuring server-side rendering and optimized performance. The site showcases wedding albums, films, services, testimonials, and contact information with a beautiful, responsive design.

## Features

- **Server-Side Rendering** with Next.js App Router
- **Multiple Pages**: Home, Portfolio, Films, Services, Testimonials, FAQ, and Contact
- **Responsive Design** optimized for all devices
- **SEO Optimized** with proper metadata and structured data
- **Modern UI** built with shadcn/ui components and Tailwind CSS v4
- **Fast Performance** with Next.js optimization

## Development

You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm install
npm run dev
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Project Structure

```
app/
├── layout.tsx          # Root layout with providers
├── page.tsx            # Home page
├── portfolio/          # Portfolio albums page
├── films/              # Wedding films page
├── services/           # Services page
├── testimonials/       # Testimonials page
├── faq/                # FAQ page
├── contact/            # Contact form page
└── globals.css         # Global styles

components/
├── ui/                 # shadcn/ui components
├── site-header.tsx     # Site navigation header
└── site-footer.tsx     # Site footer

src/
└── lib/
    └── utils.ts        # Utility functions
```
