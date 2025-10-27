# Project Structure

Complete overview of the EME 5608 Course Assistant codebase.

## 📁 Directory Tree

```
eme5608-course-assistant/
│
├── 📱 client/                          # Frontend React Application
│   ├── src/
│   │   ├── components/                # React Components
│   │   │   ├── ui/                   # shadcn/ui components
│   │   │   ├── ChatHistory.tsx       # Chat history sidebar
│   │   │   ├── ChatInput.tsx         # Message input component
│   │   │   ├── ChatMessage.tsx       # Message bubble component
│   │   │   ├── CourseSidebar.tsx     # Course information sidebar
│   │   │   ├── TypingIndicator.tsx   # AI typing animation
│   │   │   └── WelcomeScreen.tsx     # Landing page with prompts
│   │   │
│   │   ├── pages/
│   │   │   └── ChatPage.tsx          # Main chat interface
│   │   │
│   │   ├── lib/
│   │   │   ├── queryClient.ts        # TanStack Query setup
│   │   │   └── utils.ts              # Utility functions (timestamp normalization)
│   │   │
│   │   ├── hooks/
│   │   │   └── use-toast.ts          # Toast notification hook
│   │   │
│   │   ├── App.tsx                   # Root React component
│   │   ├── main.tsx                  # Entry point
│   │   └── index.css                 # Global styles & theme
│   │
│   └── index.html                     # HTML template
│
├── 🖥️  server/                         # Backend Express Application
│   ├── gemini.ts                      # Google Gemini AI integration
│   ├── pdfExtractor.ts                # PDF text extraction & context retrieval
│   ├── routes.ts                      # API route definitions
│   ├── storage.ts                     # In-memory session storage
│   ├── index.ts                       # Server entry point
│   └── vite.ts                        # Vite dev server integration
│
├── 🔄 shared/                          # Shared TypeScript Code
│   └── schema.ts                      # Zod schemas & TypeScript types
│
├── 📚 attached_assets/                 # Static Assets
│   └── [textbook PDF]                 # Course textbook
│
├── ⚙️  Configuration Files
│   ├── package.json                   # Dependencies & scripts
│   ├── package-lock.json              # Dependency lock file
│   ├── tsconfig.json                  # TypeScript configuration
│   ├── vite.config.ts                 # Vite bundler config
│   ├── tailwind.config.ts             # Tailwind CSS config
│   ├── .gitignore                     # Git ignore rules
│   └── .env.example                   # Environment variable template
│
└── 📖 Documentation
    ├── README.md                      # Main documentation
    ├── QUICK_START_GUIDE.md           # 5-minute setup guide
    ├── GITHUB_SETUP.md                # GitHub push instructions
    ├── DEPLOYMENT.md                  # Deployment guides (Replit, Vercel, etc.)
    ├── CONTRIBUTING.md                # Contribution guidelines
    ├── PROJECT_STRUCTURE.md           # This file
    ├── FILES_TO_INCLUDE.md            # File checklist for GitHub
    └── LICENSE                        # MIT License
```

## 🎯 Key Files Explained

### Frontend Core

**`client/src/pages/ChatPage.tsx`** (Main Component)
- Manages chat state and session management
- Handles message sending and receiving
- Coordinates between chat interface and history panel
- ~300 lines

**`client/src/components/ChatMessage.tsx`**
- Renders individual message bubbles
- Displays page references as badges
- Handles timestamp formatting
- ~80 lines

**`client/src/components/ChatHistory.tsx`**
- Slide-in history panel from right
- Session list with titles and metadata
- New chat and delete functionality
- ~110 lines

**`client/src/lib/utils.ts`**
- Timestamp normalization utilities
- Prevents Date serialization bugs
- Used across all data ingestion points
- ~30 lines

### Backend Core

**`server/routes.ts`** (API Routes)
- `POST /api/chat` - Send message, get AI response
- `POST /api/sessions` - Create new chat session
- `GET /api/sessions` - List all sessions
- `GET /api/sessions/:id` - Get specific session
- `DELETE /api/sessions/:id` - Delete session
- ~120 lines

**`server/pdfExtractor.ts`** (PDF Processing)
- Extracts text from PDF using pdf-parse v2
- Chunks text into searchable segments
- Scores chunks by keyword relevance
- Estimates page numbers for citations
- Caches extraction results
- ~170 lines

**`server/gemini.ts`** (AI Integration)
- Google Gemini AI client setup
- System prompt configuration
- Page reference extraction from responses
- Formats AI responses
- ~100 lines

**`server/storage.ts`** (Data Storage)
- In-memory session storage (MemStorage)
- CRUD operations for sessions
- Auto-generates session titles
- ~90 lines

### Shared Code

**`shared/schema.ts`** (Type Definitions)
- Zod schemas for runtime validation
- TypeScript types for compile-time safety
- Shared between frontend and backend
- Includes: ChatMessage, ChatSession, API request/response types
- ~40 lines

## 🔧 Configuration Files

### `package.json`
**Purpose:** Dependencies and npm scripts

**Key Scripts:**
- `dev` - Run development server (frontend + backend)
- `build` - Build for production
- `start` - Start production server

**Key Dependencies:**
- React 18, TypeScript, Vite
- Express, TanStack Query
- Google Gemini AI, pdf-parse
- TailwindCSS, shadcn/ui

### `tsconfig.json`
**Purpose:** TypeScript compiler options

**Key Settings:**
- Target: ES2020
- Module: ESNext
- Strict mode enabled
- Path aliases configured

### `vite.config.ts`
**Purpose:** Vite bundler configuration

**Key Features:**
- React plugin
- Path aliases (@/, @shared/, @assets/)
- Dev server port: 5000
- Error modal for development

### `tailwind.config.ts`
**Purpose:** Tailwind CSS customization

**Key Customizations:**
- HSL color variables
- Custom spacing and fonts
- shadcn/ui integration
- Dark mode support

## 📊 Code Statistics

| Category | Files | Lines of Code (approx) |
|----------|-------|------------------------|
| Frontend Components | 7 | 800 |
| Backend Services | 4 | 480 |
| Shared Types | 1 | 40 |
| Configuration | 5 | 250 |
| Documentation | 8 | 2000+ |
| **Total** | **25** | **~3,570** |

## 🔄 Data Flow

### Message Send Flow
```
User Input (ChatInput)
    ↓
ChatPage.handleSendMessage()
    ↓
POST /api/chat (routes.ts)
    ↓
pdfExtractor.getRelevantContext()
    ↓
gemini.generateChatResponse()
    ↓
storage.addMessageToSession()
    ↓
Response with pageReferences
    ↓
ChatMessage renders with badges
```

### Session Management Flow
```
User clicks History Button
    ↓
ChatHistory panel opens
    ↓
GET /api/sessions (fetches all sessions)
    ↓
Timestamps normalized (utils.ts)
    ↓
User clicks session
    ↓
GET /api/sessions/:id
    ↓
Messages loaded and normalized
    ↓
ChatPage displays conversation
```

## 🎨 Styling Architecture

### Color System
- **Primary:** Blue (`hsl(215 100% 45%)`)
- **Secondary:** Orange (`hsl(28 95% 55%)`)
- **Background:** Light gray/white
- **Card:** Subtle gray backgrounds

### Component Styling
- TailwindCSS utility classes
- shadcn/ui components
- CSS variables in `:root`
- HSL color format for theme consistency

## 🧩 Key Design Patterns

### Frontend
- **Component Composition** - Small, reusable components
- **Custom Hooks** - useToast, TanStack Query hooks
- **State Management** - Local state + TanStack Query for server state
- **Timestamp Normalization** - Centralized utilities prevent bugs

### Backend
- **Thin Controllers** - Routes delegate to services
- **Service Layer** - gemini.ts, pdfExtractor.ts
- **Storage Interface** - Abstracted for future database migration
- **Error Handling** - Try-catch with meaningful messages

### Shared
- **Type Safety** - Zod schemas + TypeScript
- **Single Source of Truth** - Types defined once, used everywhere

## 🚀 Performance Considerations

### Frontend
- Code splitting via dynamic imports
- TanStack Query for caching
- Debounced scroll detection
- Memoized components (as needed)

### Backend
- PDF extraction cached globally
- Context retrieval optimized with scoring
- Efficient chunk-based search
- Minimal memory footprint for sessions

## 🔐 Security Features

- Environment variables for secrets
- No API keys in code
- Input validation with Zod
- Secure session management
- .env never committed

## 📝 Testing Strategy

### Manual Testing
- First message triggers PDF extraction
- Session creation and switching
- Delete confirmation
- Page references display
- Timestamp rendering

### Automated Testing (Future)
- Unit tests for utilities
- Integration tests for API routes
- E2E tests with Playwright
- Snapshot tests for components

## 🔜 Future Enhancements

### High Priority
- [ ] Database persistence (PostgreSQL)
- [ ] User authentication
- [ ] Export chat functionality
- [ ] Search within chats

### Medium Priority
- [ ] Multiple textbook support
- [ ] Dark mode toggle
- [ ] Keyboard shortcuts
- [ ] Better mobile UX

### Low Priority
- [ ] Chat sharing
- [ ] Analytics dashboard
- [ ] Admin panel
- [ ] Multi-language support

## 📚 Additional Resources

- **API Documentation:** See routes.ts JSDoc comments
- **Component Props:** See TypeScript interfaces
- **Deployment:** DEPLOYMENT.md
- **Contributing:** CONTRIBUTING.md

---

Last updated: 2024
Project: EME 5608 Course Assistant
Version: 1.0.0
