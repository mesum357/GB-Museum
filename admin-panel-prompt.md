# Admin Panel Development Prompt

## Project Overview
Develop a comprehensive admin panel for the Gilgit-Baltistan Heritage Hub static website. The admin panel should maintain the same design language, styling, and UI components as the existing website while providing dynamic content management capabilities.

## Design Requirements

### Design Consistency
- Use the same Tailwind CSS configuration and design system as the main website
- Maintain the same color scheme, typography, and component styling
- Use the same UI components from `src/components/ui/` (buttons, cards, inputs, etc.)
- Keep the same sidebar navigation pattern and layout structure
- Use Framer Motion for animations (consistent with main site)
- Responsive design for desktop and tablet views

### Layout Structure
- Sidebar navigation (similar to main site's sidebar)
- Main content area with header
- Use the same Hero component style for page headers
- Consistent spacing, padding, and container max-widths

## Features Required

### 1. Dashboard Page (`/admin/dashboard`)
**Purpose**: Overview of key metrics and statistics

**Required Components:**
- **User Count Card**
  - Display total registered users
  - Show recent user registrations (last 7 days)
  - Icon: Users icon from lucide-react
  
- **Daily Visits Card**
  - Show today's visitor count
  - Display weekly/monthly visitor trends
  - Show growth percentage compared to previous period
  - Icon: TrendingUp or BarChart icon
  
- **Blog Posts Card**
  - Total number of blog posts
  - Recent posts count (last 30 days)
  - Show published vs draft status
  - Icon: FileText icon
  
- **Additional Metrics (Optional)**
  - Total gallery images
  - Total library books
  - Recent comments count
  - Most viewed blog post

**Design:**
- Use Card components in a grid layout (2-3 columns)
- Display metrics with icons and numbers
- Include charts/graphs for trends (use a chart library like recharts)

### 2. Blog Management Page (`/admin/blogs`)
**Purpose**: Create, edit, delete, and manage blog posts

**Required Features:**
- **Blog List View**
  - Table or card grid showing all blogs
  - Columns/Fields: Title, Author, Category, Date, Status (Published/Draft), Actions
  - Search and filter functionality
  - Pagination
  
- **Create/Edit Blog Form**
  - Title input (required)
  - Author input/select (required)
  - Category dropdown/select (required)
  - Date picker (required)
  - Excerpt textarea (required)
  - Content textarea/rich text editor (required, multi-line)
  - Image upload (required)
    - Preview uploaded image
    - Support for drag & drop
    - Accept common image formats (jpg, png, webp)
  - Read time input (number, in minutes)
  - Status toggle (Published/Draft)
  - Save/Cancel buttons
  
- **Actions**
  - Edit button (opens form with pre-filled data)
  - Delete button (with confirmation modal)
  - Publish/Unpublish toggle
  - Preview button (shows how blog will look on main site)

**Data Structure:**
- Match the existing `BlogPost` interface from `src/data/blogs.ts`
- Store data in localStorage or a JSON file (for static site)
- Generate unique IDs for new blogs

### 3. Gallery Management Page (`/admin/gallery`)
**Purpose**: Upload and manage gallery images

**Required Features:**
- **Gallery Grid View**
  - Display all gallery images in a grid
  - Show thumbnail previews
  - Image count indicator
  
- **Image Upload**
  - Drag & drop upload area
  - Multiple file selection support
  - Image preview before upload
  - Progress indicator for uploads
  
- **Image Form/Details**
  - Title input (required)
  - Description textarea (optional)
  - Alt text input (required for accessibility)
  - Category dropdown (match existing categories from `src/data/gallery.ts`)
  - Tags input (comma-separated or multi-select)
  - Year input (optional)
  - Location input (optional)
  - Photographer input (optional)
  - Image type selection (image/video)
  
- **Actions**
  - Edit image details
  - Delete image (with confirmation)
  - Bulk select and delete
  
- **Image Preview**
  - Lightbox view when clicking image
  - Full image details in modal

**Data Structure:**
- Match the existing `GalleryItem` interface from `src/data/gallery.ts`
- Store images in `public/assets/img/gallery/` or similar
- Maintain metadata in JSON file

### 4. Library Management Page (`/admin/library`)
**Purpose**: Upload and manage library books

**Required Features:**
- **Library List View**
  - Display all books in a table or card grid
  - Columns/Fields: Title, Author, Category, Year, Language, Actions
  - Search and filter functionality
  
- **Book Upload Form**
  - Title input (required)
  - Author input (required)
  - Category dropdown (required)
  - Description textarea (optional)
  - Year input (optional)
  - Language dropdown (required)
  - Cover image upload
    - Preview uploaded cover
    - Support drag & drop
  - PDF/Book file upload
    - Show file name and size
    - Support multiple formats (PDF, EPUB, etc.)
  - ISBN input (optional)
  - Tags input (optional)
  - Save/Cancel buttons
  
- **Actions**
  - Edit book details
  - Delete book (with confirmation)
  - View/Download book file

**Data Structure:**
- Match existing library book structure
- Store book files in `public/assets/library/` or similar
- Maintain metadata in JSON file

## Technical Requirements

### Routing
- Use React Router for admin routes
- Protect admin routes with authentication (simple login for static site)
- Routes structure:
  - `/admin` - Redirect to dashboard
  - `/admin/dashboard` - Dashboard page
  - `/admin/blogs` - Blog management
  - `/admin/gallery` - Gallery management
  - `/admin/library` - Library management
  - `/admin/login` - Admin login page

### State Management
- Use React Context or simple state management for:
  - Admin authentication state
  - Blog posts data
  - Gallery images data
  - Library books data
- For static site: Use localStorage to persist data
- For future: Easy to migrate to backend API

### Data Persistence (Static Site)
- Store blog posts in `src/data/blogs.ts` or JSON file
- Store gallery items in `src/data/gallery.ts` or JSON file
- Store library books in `src/data/library.ts` or JSON file
- Update files programmatically or use localStorage with export functionality

### File Upload Handling
- For static sites: Use FileReader API to convert images to base64 or save to public folder
- Provide clear instructions for manual file placement if needed
- Show file size limits and accepted formats
- Validate file types and sizes

### Authentication (Simple)
- Simple login page with username/password
- Store credentials in environment variables or config
- Session management with localStorage
- Logout functionality

## UI/UX Requirements

### Navigation
- Sidebar with admin menu items:
  - Dashboard
  - Blogs
  - Gallery
  - Library
  - Settings (optional)
  - Logout
- Active route highlighting
- Collapsible sidebar option

### Forms
- Use existing form components from `src/components/ui/form.tsx`
- Form validation with error messages
- Loading states for async operations
- Success/error toast notifications
- Confirmation dialogs for destructive actions

### Tables/Lists
- Use existing table components or create custom card grids
- Sortable columns
- Search/filter functionality
- Pagination for large datasets
- Empty states with helpful messages

### Modals
- Use existing Modal component from `src/components/shared/Modal.tsx`
- Consistent styling with main site
- Proper focus management

## Additional Features

### Image Handling
- Image compression before upload (optional)
- Image preview component
- Image cropping/resizing tools (optional)
- Support for multiple image formats

### Rich Text Editor
- For blog content, use a rich text editor library (e.g., React Quill, TipTap, or similar)
- Support for formatting (bold, italic, lists, links)
- Image embedding in blog content
- Preview rendered content

### Data Export/Import
- Export data as JSON (for backup)
- Import data from JSON (for migration)

## Code Structure

### File Organization
```
src/
  admin/
    components/
      Dashboard/
        UserCountCard.tsx
        DailyVisitsCard.tsx
        BlogPostsCard.tsx
      BlogManagement/
        BlogList.tsx
        BlogForm.tsx
      GalleryManagement/
        GalleryGrid.tsx
        ImageUpload.tsx
        ImageForm.tsx
      LibraryManagement/
        LibraryList.tsx
        BookForm.tsx
    pages/
      AdminDashboard.tsx
      AdminBlogs.tsx
      AdminGallery.tsx
      AdminLibrary.tsx
      AdminLogin.tsx
    context/
      AdminAuthContext.tsx
      AdminDataContext.tsx
    hooks/
      useAdminAuth.ts
      useBlogs.ts
      useGallery.ts
      useLibrary.ts
    utils/
      dataStorage.ts
      fileUpload.ts
```

## Styling Guidelines

### Colors
- Use existing color scheme from Tailwind config
- Primary color for main actions
- Success/error colors for notifications
- Muted colors for secondary information

### Typography
- Match existing font sizes and weights
- Consistent heading hierarchy
- Readable body text

### Spacing
- Use Tailwind spacing scale
- Consistent padding/margins
- Proper spacing between form elements

## Implementation Notes

1. **Start with Dashboard**: Create the dashboard page first to establish the layout
2. **Reuse Components**: Maximize reuse of existing UI components
3. **Progressive Enhancement**: Build core functionality first, add enhancements later
4. **Error Handling**: Implement proper error handling and user feedback
5. **Loading States**: Show loading indicators for async operations
6. **Responsive Design**: Ensure admin panel works on tablets and desktops
7. **Accessibility**: Maintain accessibility standards (keyboard navigation, ARIA labels)

## Deliverables

1. Complete admin panel with all four main pages
2. Authentication system
3. CRUD operations for blogs, gallery, and library
4. Data persistence (localStorage or file updates)
5. Responsive design matching main site
6. Documentation for usage and deployment

## Future Enhancements (Optional)

- User management (multiple admin users)
- Activity logs
- Analytics dashboard
- Email notifications
- Backup/restore functionality
- Integration with backend API (when moving from static site)

---

**Note**: Since this is for a static website, consider using localStorage for data persistence during development, with a clear migration path to a backend API when needed. Alternatively, implement a system that generates/updates the data files programmatically.

