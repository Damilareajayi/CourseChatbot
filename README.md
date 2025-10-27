# EME 5608 Course Assistant

An AI-powered chatbot that answers questions from the "Trends and Issues in Instructional Design and Technology" textbook with page citations. Built for EME 5608 taught by Dr. Songhee Han.

![Course Assistant](https://img.shields.io/badge/AI-Powered-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue) ![React](https://img.shields.io/badge/React-18-61dafb)

## Features

- 📚 **PDF-Based Knowledge**: Extracts and processes textbook content for accurate answers
- 🤖 **AI-Powered Responses**: Uses Google Gemini AI for intelligent, contextual answers
- 📖 **Page Citations**: Every answer includes specific page references from the textbook
- 💬 **Chat History**: Save and manage multiple conversation sessions
- 🎨 **Beautiful UI**: Material Design with blue academic theme matching the textbook
- 📱 **Responsive**: Works seamlessly on desktop and mobile devices

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for fast development
- TailwindCSS + shadcn/ui for styling
- TanStack Query for state management
- Wouter for routing

### Backend
- Express with TypeScript
- Google Gemini AI integration
- pdf-parse for textbook processing
- In-memory session storage

## Prerequisites

- Node.js 18+ or 20+
- npm or yarn
- Google Gemini API key (free tier available)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd eme5608-course-assistant
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
SESSION_SECRET=your_random_session_secret_here
```

**Getting a Gemini API Key:**
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and paste it in your `.env` file

### 4. Add Your Textbook PDF

Place your textbook PDF in the `attached_assets` folder:

```
attached_assets/
  └── Robert, G. et al. (2024). Trends and Issues in Instructional Design 1_1761520802485.pdf
```

**Important:** The PDF filename must match exactly as shown above, or update the path in `server/pdfExtractor.ts` (line 30).

### 5. Run the Application

**Development Mode:**
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

**Production Build:**
```bash
npm run build
npm start
```

## Project Structure

```
eme5608-course-assistant/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # Utilities and helpers
│   │   └── index.css      # Global styles
│   └── index.html
├── server/                # Backend Express server
│   ├── gemini.ts         # AI integration
│   ├── pdfExtractor.ts   # PDF processing
│   ├── routes.ts         # API endpoints
│   ├── storage.ts        # Session storage
│   └── index.ts          # Server entry point
├── shared/               # Shared TypeScript types
│   └── schema.ts         # Zod schemas and types
├── attached_assets/      # Static assets (PDF, images)
└── package.json
```

## API Endpoints

### Chat
- `POST /api/chat` - Send a message and get AI response
  - Body: `{ message: string, sessionId?: string }`
  - Response: `{ message: string, pageReferences: string[], sessionId: string }`

### Sessions
- `POST /api/sessions` - Create a new chat session
- `GET /api/sessions` - Get all chat sessions
- `GET /api/sessions/:id` - Get a specific session
- `DELETE /api/sessions/:id` - Delete a session

## Usage

### Starting a Conversation

1. Open the application in your browser
2. Click on a suggested prompt or type your question
3. Wait for the AI to process (first request takes 60-90 seconds for PDF extraction)
4. View the response with page references

### Managing Chat History

1. Click the **History** button (clock icon) in the header
2. Use **New Chat** to start a fresh conversation
3. Click any previous session to resume it
4. Hover over a session and click the trash icon to delete it

### Example Questions

- "What is instructional design?"
- "Explain the ADDIE model"
- "What are constructivist learning theories?"
- "Tell me about performance improvement in IDT"
- "What is the history of instructional design?"

## Customization

### Changing the Color Theme

Edit `client/src/index.css` to modify the color variables:

```css
:root {
  --primary: 215 100% 45%;  /* Blue */
  --secondary: 28 95% 55%;   /* Orange */
  /* ... other colors */
}
```

### Using a Different Textbook

1. Replace the PDF in `attached_assets/`
2. Update the filename in `server/pdfExtractor.ts` (line 30)
3. Update course information in `client/src/components/CourseSidebar.tsx`

### Switching AI Models

Edit `server/gemini.ts` (line 38) to change the model:

```typescript
model: "gemini-2.5-flash",  // or "gemini-pro", etc.
```

## Troubleshooting

### PDF Extraction Issues

**Problem:** "Failed to extract textbook content"

**Solutions:**
- Verify the PDF path is correct in `server/pdfExtractor.ts`
- Ensure the PDF is not corrupted
- Check that pdf-parse is properly installed

### Timestamp Errors

**Problem:** "toLocaleTimeString is not a function"

**Solution:** This is already fixed with timestamp normalization utilities. If you encounter it:
- Check that `normalizeChatSession` is used when loading sessions
- Verify all API responses are normalized before rendering

### Empty Responses

**Problem:** AI responds with "textbook content was not provided"

**Solutions:**
- Wait for PDF extraction to complete (check server logs)
- Verify the PDF contains extractable text (not just images)
- Check that page context is being found (see server logs)

## Development

### Adding New Features

1. **Backend:** Add routes in `server/routes.ts`
2. **Frontend:** Create components in `client/src/components/`
3. **Types:** Define schemas in `shared/schema.ts`
4. **Storage:** Update `server/storage.ts` for data persistence

### Running Tests

The project uses Playwright for end-to-end testing:

```bash
npm run test:e2e
```

## Deployment

### Deploying to Replit

1. Import this repository to Replit
2. Add `GEMINI_API_KEY` to Secrets
3. Click "Run"

### Deploying to Vercel/Netlify

1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Configure environment variables in your hosting platform

### Using a Database (Optional)

To persist sessions across server restarts:

1. Install a database driver (e.g., `@neondatabase/serverless` for Postgres)
2. Update `server/storage.ts` to use the database
3. Run migrations to create necessary tables

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for educational purposes.

## Credits

- Course: EME 5608 - Trends and Issues in Instructional Design and Technology
- Instructor: Dr. Songhee Han
- Textbook: Robert, G. et al. (2024). Trends and Issues in Instructional Design and Technology (5th Edition)
- AI: Google Gemini
- Framework: React + Express

## Support

For issues or questions, please open an issue on GitHub.

---

Built with ❤️ for instructional design students
