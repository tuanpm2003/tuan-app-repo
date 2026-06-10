# AI Study Buddy

AI-powered study assistant for better learning outcomes. Upload lecture PDFs/slides and get AI-generated study guides, flashcards, quizzes, and Q&A with citations.

## Features

- 📚 **Document Management** - Upload and manage study materials
- 🤖 **AI Study Assistant** - Ask questions with slide citations
- 📝 **Auto-generated Summaries** - Get key concepts from documents
- 🎴 **Flashcards** - Review with spaced repetition
- ✅ **Quizzes** - Test your knowledge with AI-generated questions
- ⚔️ **Quiz Battle** - Gamified learning with boss fights
- 📊 **Progress Tracking** - Monitor your learning journey
- ⚙️ **Management Dashboard** - View processing logs and evaluation metrics

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: lucide-react
- **Charts**: recharts

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-study-buddy
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
ai-study-buddy/
├── app/                      # Next.js App Router pages
│   ├── dashboard/           # Dashboard overview
│   ├── documents/           # Document management
│   ├── study/[id]/         # Study session with AI chat
│   ├── summary/[id]/       # Document summary
│   ├── quiz/[id]/          # Quiz interface
│   ├── quiz-battle/        # 🆕 Quiz Battle game mode
│   ├── flashcards/         # Flashcard review
│   ├── progress/           # Progress tracking
│   ├── management/         # System management
│   └── settings/           # User settings
├── components/              # React components
│   ├── ui/                 # shadcn/ui components
│   ├── quiz-battle/        # 🆕 Quiz Battle components
│   ├── app-sidebar.tsx     # Navigation sidebar
│   ├── app-header.tsx      # Top header
│   ├── document-card.tsx   # Document display card
│   ├── stat-card.tsx       # Statistics card
│   └── status-badge.tsx    # Status indicator
├── lib/                     # Utilities
│   ├── mock-data.ts        # Mock data for demo
│   ├── mock-questions.ts   # 🆕 Quiz Battle questions
│   └── utils.ts            # Helper functions
└── types/                   # TypeScript types
    ├── index.ts            # Type definitions
    └── quiz-battle.ts      # 🆕 Quiz Battle types
```

## Pages Overview

### Dashboard (`/dashboard`)
- Overview of learning progress
- Study activity charts
- Weak topics identification
- Recent documents and suggested actions

### Documents (`/documents`)
- Upload new PDFs (mock)
- Search and filter documents
- View document status (Uploading → Extracting → Chunking → Ready)
- Quick actions: Study, Quiz, Summary

### Study (`/study/[documentId]`)
- Split view: Slide viewer + AI chat
- Navigate through slides
- Ask questions with AI responses
- Citations linked to specific slides

### Summary (`/summary/[documentId]`)
- One-page document summary
- Top 5 testable concepts
- Actions: Generate flashcards, quiz, export

### Quiz (`/quiz/[documentId]`)
- Multiple choice questions
- Instant feedback with explanations
- Slide citations for each answer
- Score tracking and weak topic identification

### Quiz Battle (`/quiz-battle`) 🆕
- Gamified quiz experience with boss fight mechanics
- Boss: "Deep Dark Fantasy" (1000 HP) with dramatic boss image
- Hero: "Student Hero" (300 HP)
- Setup screen: Choose document, difficulty, and time limit
- Auto-attack on answer selection (no attack button needed)
- Timer countdown with visual warnings
- Damage system based on question difficulty
- Streak bonuses and healing mechanics
- Cinematic boss image with damage/counter animations
- Victory/defeat screens with stats
- Dark fantasy theme with particle effects

### Flashcards (`/flashcards`)
- Interactive flashcard review
- Difficulty rating (Easy/Medium/Hard)
- Progress tracking

### Progress (`/progress`)
- Weekly study activity charts
- Quiz score trends
- Topic mastery progress bars
- Document completion status

### Management (`/management`)
- Document processing logs
- Retrieval evaluation metrics
- Chunking configuration
- AWS architecture overview

### Settings (`/settings`)
- Profile management
- Study preferences
- AI model selection
- Document processing settings

## AWS Architecture (for deployment)

The application is designed to be deployed on AWS with the following architecture:

- **Frontend**: S3 + CloudFront or AWS Amplify
- **Backend API**: API Gateway + Lambda
- **Storage**: S3 (documents), DynamoDB (metadata), OpenSearch (vectors)
- **AI Services**: Amazon Bedrock (Claude), Titan Embeddings, Textract (OCR)
- **Processing**: Lambda / ECS Fargate
- **Monitoring**: CloudWatch

## Mock Data

This is a frontend demo with mock data. No backend connection is required. All interactions are simulated:

- Document upload shows processing states
- AI responses are pre-defined
- Quiz questions are static
- All data resets on page reload

## Customization

### Adding New Documents

Edit `lib/mock-data.ts` and add to the `documents` array:

```typescript
{
  id: "doc-5",
  title: "Your Document Title",
  slides: 50,
  status: "Ready",
  lastStudied: "1 hour ago",
  uploadedBy: "user@example.com",
  createdAt: "2026-05-27",
}
```

### Changing Theme Colors

Edit `app/globals.css` to modify the color scheme:

```css
:root {
  --primary: 221.2 83.2% 53.3%; /* Blue primary color */
}
```

## Development

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Lint Code

```bash
npm run lint
```

## License

MIT

## Author

Built with ❤️ for EduTech AI Study Buddy demo
