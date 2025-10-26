# EME 5608 Course Chatbot - Replit Agent Guide

## Overview

This is an educational chatbot application designed for EME 5608: Trends and Issues in Instructional Design and Technology, taught by Dr. Songhee Han. The application provides an AI-powered teaching assistant that answers student questions about the course textbook, with responses that include specific page references.

**Core Functionality:**
- Students ask questions about instructional design concepts
- AI assistant provides answers based on textbook content
- Responses include accurate page citations from the source material
- Clean, educational-focused chat interface

**Technology Stack:**
- Frontend: React with TypeScript
- Backend: Express.js with TypeScript
- UI Framework: shadcn/ui (Radix UI + Tailwind CSS)
- AI: Google Gemini API
- PDF Processing: pdf-parse for textbook content extraction
- Build Tool: Vite
- Routing: Wouter

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Component Structure:**
- Single-page application with chat-focused design
- Component organization follows shadcn/ui conventions
- Main page component: `ChatPage.tsx` manages chat state and interactions
- Reusable components: `ChatMessage`, `ChatInput`, `WelcomeScreen`, `TypingIndicator`, `CourseSidebar`

**State Management:**
- React hooks for local component state
- TanStack Query (React Query) for server state management and API calls
- No global state management library (Redux/Zustand) - kept intentionally simple

**Design System:**
- Material Design principles adapted for academic use
- Tailwind CSS for styling with custom theme configuration
- CSS variables for consistent theming (defined in `index.css`)
- Typography: Inter font family for clean, readable interface
- Color scheme: Professional blue primary color with neutral grays

**Key Design Decisions:**
- Two-column layout on desktop (sidebar + chat area)
- Mobile-responsive with collapsible sidebar
- Message bubbles differentiated by role (user vs. assistant)
- Page references displayed as interactive badges below assistant messages
- Auto-scrolling chat interface with manual scroll-to-bottom button when needed

### Backend Architecture

**API Structure:**
- RESTful API with single primary endpoint: `POST /api/chat`
- Express.js server with TypeScript
- Middleware: JSON body parsing with raw body capture for potential webhook integration

**Request/Response Flow:**
1. Client sends user question via POST to `/api/chat`
2. Server extracts relevant textbook context using `getRelevantContext()`
3. Context + question sent to Google Gemini API
4. AI response parsed for page references
5. Response with message and page citations returned to client

**PDF Processing Strategy:**
- Textbook PDF stored in `attached_assets/` directory
- Content extracted and cached on server startup using pdf-parse
- Page-aware extraction maintains page number associations
- Context retrieval finds relevant pages based on question content

**AI Integration:**
- Google Gemini 2.5 Flash model for fast, cost-effective responses
- System prompt engineered to enforce page citation requirements
- Temperature set to 0.7 for balanced creativity and accuracy
- Fallback page reference extraction if AI doesn't provide citations

**Error Handling:**
- Try-catch blocks around API calls
- Meaningful error messages returned to client
- Toast notifications for user-facing errors

### Data Storage

**Current Implementation:**
- In-memory storage for user data (MemStorage class in `storage.ts`)
- No persistent database currently configured
- User schema defined but not actively used in chat flow

**Schema Design:**
- Zod schemas for type-safe validation (`shared/schema.ts`)
- `ChatMessage` type with role, content, page references, timestamp
- `ChatRequest` and `ChatResponse` types for API contract

**Database Configuration:**
- Drizzle ORM configured for PostgreSQL (see `drizzle.config.ts`)
- Schema file: `shared/schema.ts`
- Database credentials expected via `DATABASE_URL` environment variable
- Migration files would be generated in `./migrations/` directory

**Note:** The application is configured to use PostgreSQL with Neon Database (@neondatabase/serverless), but database integration is not currently active in the chat workflow. The storage layer exists for potential future user authentication or conversation persistence features.

### External Dependencies

**Third-Party Services:**
- **Google Gemini API**: Primary AI service for generating chat responses
  - API key required via `GEMINI_API_KEY` environment variable
  - Model: `gemini-2.5-flash`
  - Used for natural language understanding and textbook-based Q&A

**Cloud Database (Configured but not active):**
- **Neon Database**: Serverless PostgreSQL provider
  - Connection via `@neondatabase/serverless` package
  - Requires `DATABASE_URL` environment variable
  - Drizzle ORM for database operations

**UI Component Libraries:**
- **Radix UI**: Comprehensive set of unstyled, accessible React components
  - Used for: dialogs, dropdowns, tooltips, accordions, etc.
  - Provides accessibility and keyboard navigation out of the box
  
- **shadcn/ui**: Pre-styled component collection built on Radix UI + Tailwind
  - Configuration in `components.json`
  - Components copied into project rather than npm package
  - Customizable via Tailwind theme variables

**Styling & Utilities:**
- **Tailwind CSS**: Utility-first CSS framework
  - Custom theme configuration in `tailwind.config.ts`
  - CSS variables for dynamic theming
  - PostCSS for processing

- **class-variance-authority (CVA)**: Type-safe component variant system
- **clsx & tailwind-merge**: Utility for conditional className merging

**Development Tools:**
- **Vite**: Build tool and dev server
  - React plugin for JSX/TSX support
  - Path aliases configured for clean imports (@/, @shared/)
  
- **TypeScript**: Type safety across frontend and backend
  - Shared types in `/shared` directory
  - Strict mode enabled

**PDF Processing:**
- **pdf-parse**: Extract text content from PDF files
  - Used to process course textbook
  - Maintains page number associations

**Fonts:**
- **Google Fonts**: Inter and Roboto font families
  - Loaded via CDN in `index.html`
  - Fonts downloaded on-demand based on usage

**Routing:**
- **Wouter**: Lightweight React routing library
  - Simple, hook-based routing
  - Smaller alternative to React Router

**Environment Requirements:**
- Node.js environment (ESM modules)
- Environment variables: `GEMINI_API_KEY`, optionally `DATABASE_URL`
- PDF file must exist at: `attached_assets/Robert, G. et al. (2024). Trends and Issues in Instructional Design 1_1761520802485.pdf`