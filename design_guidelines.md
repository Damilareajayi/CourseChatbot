# Design Guidelines: EME 5608 Course Chatbot

## Design Approach
**Selected Framework:** Material Design with academic refinement
**Rationale:** This is a utility-focused educational tool requiring clarity, accessibility, and efficiency. Material Design provides excellent chat interface patterns while allowing customization for academic branding.

## Design Principles
1. **Academic Authority:** Professional, trustworthy design reflecting the textbook's academic credibility
2. **Conversational Clarity:** Clear visual hierarchy between user and bot messages
3. **Information Density:** Efficient use of space while maintaining readability for study sessions
4. **Contextual Learning:** Seamless integration of page references and course branding

---

## Typography System

**Primary Font:** Inter (Google Fonts)
- Headers: 600-700 weight
- Body: 400-500 weight
- Code/Citations: 400 weight, monospace fallback

**Type Scale:**
- Course Title/Hero: text-3xl to text-4xl, font-semibold
- Section Headers: text-xl, font-semibold
- Chat Messages: text-base, font-normal
- Metadata (timestamps, page refs): text-sm, font-medium
- Input Placeholder: text-base, font-normal

---

## Layout System

**Spacing Primitives:** Tailwind units of 2, 3, 4, 6, 8, 12
- Tight spacing: p-2, gap-2
- Standard spacing: p-4, gap-4, m-4
- Section spacing: p-6, p-8
- Large spacing: p-12

**Container Structure:**
- Full viewport height application (h-screen)
- Two-column layout on desktop (lg:grid-cols-[320px_1fr])
- Single column on mobile (stack sidebar above chat)
- Max content width: max-w-4xl for chat messages

---

## Core Layout Components

### 1. Application Shell
**Header Bar** (fixed top):
- Height: h-16
- Contains: Course branding (EME 5608), textbook title, instructor name
- Layout: Flex row with space-between
- Padding: px-6 py-4
- Shadow: subtle elevation

### 2. Sidebar (Desktop Only, lg:block hidden on mobile)
**Dimensions:** w-80, full height below header
**Contents:**
- Textbook cover image (aspect-square, rounded-lg, mb-6)
- Course information card (p-4):
  - Course code: EME 5608
  - Course title: "Trends and Issues in IDT"
  - Instructor: Dr. Songhee Han
- Quick reference links (p-4, space-y-2):
  - "About the Textbook"
  - "How to Use This Chatbot"
  - "View Table of Contents"

### 3. Main Chat Area
**Structure:**
- Messages container: flex-1, overflow-y-auto
- Message padding: p-6 to p-8
- Message spacing: space-y-6

**Message Components:**

**User Messages:**
- Alignment: ml-auto, max-w-2xl
- Padding: p-4
- Border radius: rounded-2xl rounded-br-md (speech bubble effect)
- Typography: text-base

**Bot Messages:**
- Alignment: mr-auto, max-w-3xl
- Padding: p-4 to p-6
- Border radius: rounded-2xl rounded-bl-md
- Typography: text-base, line-height relaxed
- Page References: Prominent display with icon, text-sm, font-semibold, mt-3

**Page Reference Badge:**
- Inline flex, gap-2
- Padding: px-3 py-1.5
- Rounded: rounded-full
- Icon: Book/document icon (Heroicons)
- Format: "📖 Page 45-47"

**Timestamp:**
- Text size: text-xs
- Margin: mt-2
- Format: "2:34 PM"

### 4. Input Area (Fixed Bottom)
**Container:**
- Padding: p-4 to p-6
- Border top: subtle
- Shadow: elevated

**Input Field:**
- Height: min-h-[56px], can expand
- Padding: p-4
- Border radius: rounded-2xl
- Placeholder: "Ask about instructional design, learning theories, evaluation..."
- Max height: max-h-32 (scrollable for long queries)

**Send Button:**
- Position: Absolute right within input container
- Size: w-12 h-12
- Icon: Paper airplane (Heroicons)
- Rounded: rounded-full
- Disabled state: When input empty

---

## Component Details

### Welcome Screen (Empty State)
**Layout:** Centered, max-w-2xl
**Contents:**
1. Textbook icon (large, w-20 h-20, mb-6)
2. Greeting heading: text-2xl, font-semibold, mb-4
   - "Welcome to EME 5608 Course Assistant"
3. Description: text-base, mb-8
   - "Ask me anything about Trends and Issues in Instructional Design and Technology. I'll provide answers with specific page references from your textbook."
4. Suggested prompts (grid, grid-cols-1 md:grid-cols-2, gap-3):
   - Card buttons: p-4, rounded-xl, text-left
   - Examples:
     * "What is instructional design?"
     * "Explain constructivist learning theory"
     * "What are the ADDIE model phases?"
     * "Tell me about performance improvement"

### Loading State
- Animated typing indicator (three dots)
- Padding: p-4
- Alignment: mr-auto

### Error State
- Alert box: p-4, rounded-lg
- Icon: Warning icon (Heroicons)
- Message: text-sm
- Retry button: inline, text-sm, font-medium

### Course Branding Card (Mobile Header)
**Mobile Only** (block lg:hidden):
- Collapsed by default
- Expandable accordion
- Contains same info as sidebar

---

## Interaction Patterns

### Chat Scroll Behavior
- Auto-scroll to bottom on new messages
- Smooth scroll animation
- "Scroll to bottom" FAB when scrolled up (fixed bottom-right, outside input area)

### Input Interactions
- Auto-focus on page load
- Enter to send, Shift+Enter for new line
- Clear button appears when text entered (x icon, inside input right)
- Character count indicator for long messages (text-xs, bottom right)

### Message Animations
- Messages fade and slide in from appropriate side
- Stagger animation for page references
- Smooth transitions (transition-all duration-300)

---

## Responsive Breakpoints

**Mobile (< 768px):**
- Single column layout
- Sidebar hidden, course info in collapsible header
- Full-width messages
- Reduced padding (p-4)
- Smaller text sizes

**Tablet (768px - 1024px):**
- Same as mobile or experimental two-column
- Optional: Slide-out sidebar

**Desktop (> 1024px):**
- Two-column layout with persistent sidebar
- Maximum content width constrains chat area
- Comfortable padding (p-6 to p-8)

---

## Accessibility Features
- ARIA labels for all interactive elements
- Keyboard navigation throughout (Tab, Enter, Escape)
- Focus indicators (ring-2 ring-offset-2)
- Screen reader announcements for new messages
- Alt text for textbook cover image
- Sufficient contrast ratios (WCAG AA minimum)

---

## Special Features

### Citation Display
When bot provides page numbers:
- Prominent badge with book icon
- Format: "Source: Pages 45-47, Chapter 3"
- Clickable (future: could open PDF viewer)

### Context Awareness
Visual indicators when chatbot references:
- Multiple pages: Chain icon
- Specific chapter: Chapter badge
- Cross-references: Link icon

### Loading Intelligence
- Skeleton loaders for messages
- Progressive response rendering (stream-like effect)
- "Bot is thinking..." status

---

## Images

**Textbook Cover Image:**
- Location: Sidebar top
- Dimensions: Full width of sidebar, aspect-square or original ratio
- Treatment: rounded-lg, subtle shadow
- Mobile: Smaller version in collapsed header

**Empty State Illustration:**
- Location: Welcome screen center
- Type: Icon-based or simple illustration
- Theme: Book, chat bubble, or learning concept
- Size: w-24 h-24

No large hero image needed - this is a chat application focused on functionality.