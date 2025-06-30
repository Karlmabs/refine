# Refine - AI-Powered Prompt Optimizer

Refine is a web application that helps beginners learn effective prompting by providing real-time evaluation and improvement suggestions for their prompts. Built with Next.js, TypeScript, and Tailwind CSS.

![Refine App Preview](https://img.shields.io/badge/Status-MVP%20Complete-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38bdf8)

## 🎯 Features

### ✨ Core MVP Features
- **🔍 Prompt Evaluation**: Analyze prompts across 4 key categories (Clarity, Context, Format, Completeness)
- **📊 Visual Scoring**: Color-coded scoring system with detailed breakdown
- **💡 Smart Feedback**: Specific suggestions on what's missing and how to improve
- **🔄 Before/After Comparison**: Side-by-side view of original vs. improved prompts
- **📚 Example Scenarios**: 5 pre-built examples across different use cases
- **📱 Responsive Design**: Optimized for desktop and mobile devices
- **⚡ Real-time Analysis**: Fast evaluation with loading states and error handling

### 🎨 Design Highlights
- Modern gradient design with glassmorphism effects
- Smooth animations and hover interactions
- Clean typography and visual hierarchy
- Accessible color scheme and contrast ratios
- Mobile-first responsive layout

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd refine-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Configure Claude API (Optional)**
   ```bash
   # Copy environment file
   cp .env.example .env.local
   
   # Add your Anthropic API key to .env.local
   # ANTHROPIC_API_KEY=your_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.
   
   > **Note**: Without an API key, the app will use mock data for demonstrations.

## 📁 Project Structure

```
refine-app/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── evaluate/
│   │   │       └── route.ts          # API endpoint for prompt evaluation
│   │   ├── globals.css               # Global styles
│   │   ├── layout.tsx                # Root layout component
│   │   └── page.tsx                  # Main page component
│   ├── components/
│   │   ├── FeedbackSection.tsx       # Feedback and improvement display
│   │   ├── Header.tsx                # App header with branding
│   │   ├── LoadingSpinner.tsx        # Loading state component
│   │   ├── PromptInput.tsx           # Prompt input form with examples
│   │   └── ScoreDisplay.tsx          # Score visualization component
│   ├── lib/
│   │   └── examples.ts               # Example scenarios data
│   └── types/
│       └── index.ts                  # TypeScript type definitions
├── public/                           # Static assets
├── package.json                      # Project dependencies and scripts
└── README.md                         # This file
```

## 🛠️ Available Scripts

- **`npm run dev`** - Start development server with Turbopack
- **`npm run build`** - Build the application for production
- **`npm run start`** - Start production server
- **`npm run lint`** - Run ESLint for code quality

## 🧩 Components Overview

### Core Components

| Component | Purpose | Key Features |
|-----------|---------|--------------|
| `Header` | App branding and navigation | Gradient logo, sticky positioning |
| `PromptInput` | User input interface | Text area, examples dropdown, validation |
| `ScoreDisplay` | Score visualization | Color-coded scores, progress bars, icons |
| `FeedbackSection` | Improvement suggestions | Missing elements, before/after comparison |
| `LoadingSpinner` | Loading state | Animated spinner with progress dots |

### API Routes

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/evaluate` | POST | Evaluate prompts and return feedback |

## 📊 Scoring System

The app evaluates prompts across 4 categories, each scored 1-10:

1. **Clarity** - How specific and clear is the request?
2. **Context** - Is there enough background information?
3. **Format** - Is the desired output format clearly specified?
4. **Completeness** - Are all necessary details included?

### Score Ranges
- **0-40**: ❌ Needs Work (Red)
- **41-70**: ⚠️ Getting Better (Orange)  
- **71-100**: ✅ Great! (Green)

## 🎨 Styling & Theme

The app uses a modern design system with:

- **Color Palette**: Slate grays with blue/indigo accents
- **Typography**: System fonts with clear hierarchy
- **Effects**: Glassmorphism, gradients, subtle shadows
- **Animations**: Smooth transitions and hover effects

## 🔮 Future Enhancements

### Version 1.1 - Enhanced Learning
- [ ] Progress tracking over time
- [ ] Achievement badges and gamification
- [ ] Expanded example scenarios (15+)
- [ ] Prompt history and favorites

### Version 1.2 - Personalization  
- [ ] User accounts and profiles
- [ ] Difficulty level adjustments
- [ ] Category-specific focus areas
- [ ] Custom scenario creation

### Version 2.0 - Advanced Features
- [ ] Real-time suggestions as you type
- [ ] Prompt templates library
- [ ] A/B testing for prompt variations
- [ ] Integration tutorials

## 🔧 Claude API Setup

The project is **ready for Claude API integration**! Follow these steps to connect with Anthropic's Claude API:

### 🚀 Quick Setup

1. **Get your Claude API key**
   - Visit [Anthropic Console](https://console.anthropic.com/)
   - Create an account or sign in
   - Generate an API key

2. **Configure environment variables**
   ```bash
   # Copy the example environment file
   cp .env.example .env.local
   
   # Edit .env.local and add your API key
   ANTHROPIC_API_KEY=your_actual_api_key_here
   ```

3. **Restart the development server**
   ```bash
   npm run dev
   ```

4. **Test the integration**
   - The app will automatically use Claude API when configured
   - Without an API key, it falls back to mock data
   - Check the console for "Claude API not configured" messages

### 📋 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `ANTHROPIC_API_KEY` | Yes | Your Anthropic API key from console.anthropic.com |

### 🔄 Fallback Behavior

- **With API key**: Uses Claude 3.5 Sonnet for real evaluations
- **Without API key**: Uses mock data for testing and development
- **API errors**: Graceful fallback with user-friendly error messages

### 💰 Cost Management

The app includes built-in cost management features:

- **Efficient prompting**: Optimized prompt length to minimize tokens
- **Error handling**: Proper handling of rate limits and API errors
- **Model selection**: Uses Claude 3.5 Sonnet (balanced cost/performance)
- **Token limits**: Max 2000 tokens per evaluation

### 🛡️ Security Features

- Environment variables for API key security
- Server-side API calls only (keys never exposed to client)
- Input validation and sanitization
- Rate limiting error handling

## 🔧 Troubleshooting

### Common Issues

**Q: I'm getting "Claude API not configured" in the console**
- A: This is normal if you haven't added your API key yet. The app will use mock data.

**Q: API calls are failing**
- A: Check that your `ANTHROPIC_API_KEY` is correct in `.env.local`
- A: Ensure you have credits available in your Anthropic account
- A: Check the console for specific error messages

**Q: The app is using mock data even with an API key**
- A: Restart your development server after adding the API key
- A: Check that the file is named `.env.local` (not `.env`)
- A: Verify the API key doesn't have extra spaces

**Q: Getting rate limit errors**
- A: Wait a few moments and try again
- A: Consider upgrading your Anthropic plan for higher limits

### Support

- Check the [Anthropic Documentation](https://docs.anthropic.com/)
- Review error messages in the browser console
- Open an issue in this repository for bug reports

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Heroicons](https://heroicons.com/)
- Inspired by the need to democratize effective AI prompting

---

**Made with ❤️ to help you master the art of prompting**