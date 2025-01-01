# Learning Platform

A modern learning platform built with Next.js, Supabase, and Tailwind CSS.

## Features

- User authentication with Supabase
- Course catalog and enrollment
- Progress tracking
- Responsive design
- Modern UI with Tailwind CSS

## Tech Stack

- Next.js 14 with App Router
- Supabase for authentication and database
- Tailwind CSS for styling
- TypeScript for type safety
- Radix UI for accessible components

## Getting Started

1. Clone the repository
```bash
git clone <your-repo-url>
cd <your-repo-name>
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env.local` file in the root directory with your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. Run the development server
```bash
npm run dev
```

## Deployment

### Deploy on Vercel

The easiest way to deploy this app is to use the [Vercel Platform](https://vercel.com).

1. Push your code to a Git repository
2. Import your project to Vercel
3. Add your environment variables in the Vercel dashboard
4. Deploy!

## Environment Variables

Make sure to set these environment variables in your deployment:

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `NEXT_PUBLIC_APP_URL`: Your deployment URL (e.g., https://your-app.vercel.app)

## Database Schema

The application uses the following tables in Supabase:

- `courses`: Stores course information
- `user_progress`: Tracks user progress in courses

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
