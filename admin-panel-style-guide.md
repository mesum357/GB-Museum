# Admin Panel Detailed Style Guide

## Introduction

This document provides comprehensive styling specifications for every page, component, and UI element in the admin panel. All styling must match the main website's design system exactly, using the same Tailwind CSS configuration, color tokens, typography, spacing, and component styling.

## Page-by-Page Style Specifications

### Login Page Style

The login page is a centered layout with a single column design. The page has a full-screen background using the background color from the design system. The login form is centered both horizontally and vertically on the page, with a maximum width of 400 pixels. The form container uses the Card component with white background, rounded corners of 12 pixels, padding of 32 pixels on all sides, and a subtle shadow matching the main site's card shadows.

The page title appears at the top of the form using the largest heading size, typically text-3xl or text-4xl, with bold font weight and the primary color. The title has a bottom margin of 8 pixels. Below the title, a subtitle appears using smaller text size, typically text-sm or text-base, with muted text color and a bottom margin of 24 pixels.

The username input field has a label above it using the Label component with standard text size and font weight, positioned 8 pixels above the input. The input field uses the Input component with standard height, padding of 12 pixels on left and right, padding of 10 pixels on top and bottom, rounded corners of 6 pixels, border using the border color, and background color matching the input background. The input has a focus state with border color changing to primary color and a ring effect of 2 pixels.

The password input field has identical styling to the username field, with a label above it and the same spacing. The password field includes a show/hide toggle button on the right side, using an icon from lucide-react, sized 20 pixels, with muted text color that changes to primary color on hover.

The login button appears below the form fields with a top margin of 24 pixels. The button uses the primary button style with full width, padding of 12 pixels on top and bottom, padding of 24 pixels on left and right, rounded corners of 6 pixels, primary background color, white text, bold font weight, and hover effects with darker background color. The button has a disabled state with reduced opacity and no interaction when form validation fails.

Error messages appear below the form or below specific fields using red or destructive color, standard text size, and italic font style. Error messages have a top margin of 8 pixels and fade in animation using Framer Motion.

The login page includes a loading state with a spinner centered on the button when authentication is in progress. The spinner uses the primary color and rotates animation.

### Dashboard Page Style

The dashboard page has a header section at the top with the page title "Dashboard" using the largest heading size, typically text-4xl, with bold font weight and primary color. The header has padding of 32 pixels on all sides, a bottom border using the border color, and a bottom margin of 24 pixels.

Below the header, metric cards are arranged in a responsive grid layout. On desktop, the grid has 3 columns with gaps of 24 pixels between items. On tablet, the grid has 2 columns with gaps of 16 pixels. On mobile, the grid has 1 column with gaps of 16 pixels. Each metric card uses the Card component with white background, rounded corners of 12 pixels, padding of 24 pixels on all sides, subtle border using border color, and shadow matching main site cards.

Each metric card displays a large number at the top using text size of text-4xl or text-5xl, with bold font weight and primary color. The number has a bottom margin of 8 pixels. Below the number, a label describes the metric using smaller text size, typically text-sm, with muted text color. An icon appears on the right side of the card, sized 48 pixels by 48 pixels, using primary color or a gradient color. The icon has a subtle background circle with primary color at 10 percent opacity, rounded fully, and padding of 12 pixels.

Cards have hover effects with shadow increase from sm to md, and slight elevation change. Cards are clickable when they link to other pages, with cursor pointer on hover.

Below the metric cards, a recent activity section appears with a heading "Recent Activity" using heading size text-2xl, with bold font weight and primary color. The heading has a bottom margin of 16 pixels. Activity items are displayed in a vertical list with consistent spacing of 16 pixels between items.

Each activity item uses a Card component with white background, rounded corners of 8 pixels, padding of 16 pixels on all sides, and subtle border. Activity items show an icon on the left side, sized 24 pixels, using primary color. The icon has a circular background with primary color at 10 percent opacity, rounded fully, and padding of 8 pixels. Next to the icon, activity details appear with the action description using standard text size and bold font weight, followed by a timestamp using smaller text size and muted text color. The activity item has a hover effect with background color change to muted color.

### Blog Management Page Style

The blog management page has a header section at the top with the page title "Blog Management" using heading size text-3xl, with bold font weight and primary color. The header includes a "Create New Blog" button on the right side using primary button style with padding of 10 pixels on top and bottom, padding of 20 pixels on left and right, rounded corners of 6 pixels, and an icon before the text. The header has padding of 32 pixels on all sides, a bottom border, and a bottom margin of 24 pixels.

Below the header, a search and filter bar appears with a search input on the left side using Input component with search icon on the left, padding of 12 pixels on all sides, rounded corners of 6 pixels, and maximum width of 300 pixels. Filter dropdowns appear next to the search input using Select component with the same styling. Filter chips or badges appear below the search bar showing active filters, with remove buttons using X icon from lucide-react.

The blog posts list displays in a table layout using the Table component. Table headers have a background color that's slightly lighter than the main background, bold font weight, standard text size, and padding of 16 pixels on all sides. Table headers have a bottom border using border color. Table rows have alternating background colors for better readability, with even rows having a subtle background tint. Table rows have hover effects with background color change to muted color at 50 percent opacity.

Each table row displays blog post information in cells. The image cell shows a thumbnail image sized 80 pixels by 80 pixels, rounded corners of 6 pixels, object cover to maintain aspect ratio. The title cell uses standard text size and bold font weight, with primary color on hover and cursor pointer. The author cell uses standard text size with muted text color. The category cell displays a Badge component with rounded corners of 4 pixels, padding of 4 pixels on top and bottom, padding of 8 pixels on left and right, and category-specific background colors. The date cell uses smaller text size with muted text color. The status cell displays a Badge with green background for published status and yellow background for draft status.

Action buttons in each row include Edit, Delete, and Preview buttons using icon buttons with ghost style, sized 32 pixels by 32 pixels, with hover effects showing background color change. The delete button uses destructive color on hover.

Pagination appears at the bottom of the table with page number buttons, previous and next buttons, and optional first and last page buttons. Active page number has primary background color, inactive page numbers have transparent background with border, and all buttons have hover effects.

### Blog Form Page Style

The blog form page has a header section with the page title "Create New Blog" or "Edit Blog" using heading size text-3xl, with bold font weight and primary color. The header includes a back button on the left side and save/cancel buttons on the right side. The header has padding of 32 pixels on all sides, a bottom border, and a bottom margin of 24 pixels.

The form is displayed in a two-column layout on desktop, with the main form fields on the left taking up two-thirds of the width, and the sidebar on the right taking up one-third of the width. On tablet and mobile, the layout stacks vertically.

Form fields are arranged vertically with consistent spacing of 20 pixels between fields. Each field has a label above it using the Label component with standard text size and font weight, positioned 8 pixels above the input. Required fields have an asterisk after the label using red or destructive color.

The title input field uses the Input component with standard height, padding of 12 pixels on all sides, rounded corners of 6 pixels, border using border color, and full width. The input has a focus state with border color changing to primary color and ring effect.

The author input field has identical styling to the title field. If using a select dropdown, it uses the Select component with the same styling and a dropdown arrow indicator.

The category select dropdown uses the Select component with standard height, padding, rounded corners, and full width. The dropdown shows options matching existing categories.

The date picker uses the Calendar component with the same styling as input fields, and opens a calendar popup for date selection.

The excerpt textarea uses the Textarea component with minimum height of 100 pixels, padding of 12 pixels on all sides, rounded corners of 6 pixels, border using border color, and full width. The textarea has a character counter below it showing remaining characters.

The content rich text editor has a toolbar at the top with formatting buttons arranged horizontally. Toolbar buttons are grouped logically with separators between groups. Each toolbar button is sized 32 pixels by 32 pixels, with rounded corners of 4 pixels, and hover effects showing background color change. Active formatting buttons have primary background color. The editor content area has a border using border color, rounded corners of 6 pixels, padding of 16 pixels on all sides, and minimum height of 400 pixels. The editor shows formatting as the user types, with consistent styling matching the main site's typography.

The image upload area has a dashed border of 2 pixels width, rounded corners of 8 pixels, padding of 24 pixels on all sides, and a light background color that's slightly different from the main background. The upload area shows drag and drop states with border color changing to primary color and background color changing to primary color at 5 percent opacity. The upload area displays instructions text using muted text color, centered, with an upload icon sized 48 pixels above it. When an image is uploaded, a preview appears showing the image thumbnail, sized 200 pixels by 200 pixels, rounded corners of 8 pixels, with object cover to maintain aspect ratio. The preview has a remove button in the top right corner using an X icon with destructive color.

The read time input uses the Input component with type number, standard height, padding, rounded corners, and width of 150 pixels. The input has increment and decrement buttons.

The status toggle uses a Switch component with primary color when enabled, and muted color when disabled. The toggle has labels "Draft" and "Published" on either side.

Form buttons appear at the bottom of the form, aligned to the right, with spacing of 12 pixels between them. The save button uses primary button style with padding of 10 pixels on top and bottom, padding of 24 pixels on left and right, rounded corners of 6 pixels, and bold font weight. The cancel button uses outline button style with the same padding and rounded corners. The preview button uses ghost button style with the same padding.

Validation errors appear below each field using red or destructive color, standard text size, italic font style, and top margin of 4 pixels. Errors fade in using Framer Motion animation.

### Gallery Management Page Style

The gallery management page has a header section with the page title "Gallery Management" using heading size text-3xl, with bold font weight and primary color. The header includes an "Upload Images" button on the right side using primary button style. The header has padding of 32 pixels on all sides, a bottom border, and a bottom margin of 24 pixels.

Below the header, a search and filter bar appears with search input and filter dropdowns matching the blog management page style.

The gallery grid displays images in a responsive grid layout. On desktop, the grid has 4 columns with gaps of 16 pixels. On tablet, the grid has 3 columns with gaps of 16 pixels. On mobile, the grid has 2 columns with gaps of 12 pixels. Each image card uses the Card component with white background, rounded corners of 8 pixels, padding of 8 pixels on all sides, and subtle border.

Each image card displays the image thumbnail with aspect ratio of 4 to 3, rounded corners of 6 pixels, object cover to maintain aspect ratio, and hover effects with slight scale up and shadow increase. Below the image, the title appears using standard text size and bold font weight, with a bottom margin of 4 pixels. The category badge appears below the title using the Badge component with rounded corners of 4 pixels, padding of 4 pixels on top and bottom, padding of 8 pixels on left and right, and category-specific background colors.

Action buttons appear below the category badge, including Edit, Delete, and View buttons using icon buttons with ghost style, sized 28 pixels by 28 pixels, arranged horizontally with spacing of 8 pixels between them.

The image upload modal or page has a form matching the blog form style, with fields for title, description, alt text, category, tags, year, location, photographer, image type, and image file. The form uses the same styling as the blog form with consistent spacing, padding, and component styling.

### Library Management Page Style

The library management page has a header section with the page title "Library Management" using heading size text-3xl, with bold font weight and primary color. The header includes an "Add New Book" button on the right side using primary button style. The header has padding of 32 pixels on all sides, a bottom border, and a bottom margin of 24 pixels.

Below the header, a search and filter bar appears with search input and filter dropdowns matching the blog management page style.

The library books list displays in a table or card grid layout. If using a table, it matches the blog management table style. If using a card grid, books are displayed in a responsive grid with 3 columns on desktop, 2 columns on tablet, and 1 column on mobile, with gaps of 24 pixels between items.

Each book card uses the Card component with white background, rounded corners of 12 pixels, padding of 16 pixels on all sides, and subtle border. The card displays the cover image on the left side, sized 120 pixels by 160 pixels, rounded corners of 6 pixels, with object cover to maintain aspect ratio. Book details appear on the right side of the cover image, including the title using heading size text-xl with bold font weight, the author using standard text size with muted text color, the category badge, the year if available, the language, and action buttons for Edit, Delete, and View.

The book form page has a form matching the blog form style, with fields for title, author, category, description, year, language, cover image upload, book file upload, ISBN, and pages. The form uses the same styling as the blog form with consistent spacing, padding, and component styling.

## Component Style Specifications

### Sidebar Component Style

The sidebar has a fixed position on the left side of the screen, with a width of 256 pixels on desktop, and a background color matching the main site's sidebar. The sidebar has a border on the right side using the border color, with a width of 1 pixel. The sidebar has a height of 100 percent of the viewport height, with overflow-y auto for scrolling if content exceeds the height.

The sidebar header appears at the top with the admin panel title or logo, using heading size text-xl, with bold font weight and primary color. The header has padding of 24 pixels on all sides, and a bottom border using the border color.

Navigation items are vertically stacked with consistent spacing of 4 pixels between items. Each navigation item has padding of 12 pixels on left and right, padding of 10 pixels on top and bottom, rounded corners of 6 pixels, and uses the same text styling as the main site's navigation items. Navigation items display an icon on the left side, sized 20 pixels by 20 pixels, with a gap of 12 pixels between the icon and text label.

Navigation items have hover effects with background color change to muted color at 50 percent opacity, and text color change to primary color. The active navigation item has a background color of primary color at 10 percent opacity, or a left border indicator with primary color and width of 3 pixels. Active navigation items have text color of primary color and bold font weight.

The logout button appears at the bottom of the sidebar, separated from other items with a top border using the border color, and padding of 16 pixels on all sides. The logout button uses destructive or red color scheme, with the same styling as other navigation items but with different colors to indicate it's a special action.

When the sidebar is collapsed, the width reduces to 64 pixels, showing only icons without text labels. Icons are centered horizontally, and the main content area margin-left adjusts accordingly.

### Header Component Style

The header component appears at the top of each admin page, with a background color matching the main site's background, padding of 32 pixels on all sides, and a bottom border using the border color with a width of 1 pixel. The header has a sticky position at the top of the page when scrolling.

The page title appears on the left side of the header using heading size text-3xl or text-4xl, with bold font weight and primary color. The title has a bottom margin of 0 if there's no subtitle, or 8 pixels if there's a subtitle.

Action buttons appear on the right side of the header, aligned horizontally with spacing of 12 pixels between them. Buttons use the primary button style with appropriate sizing.

Breadcrumbs appear below the title if applicable, using smaller text size and muted text color, with separators between items using a forward slash or chevron icon.

### Card Component Style

All cards use the Card component from the UI components directory with consistent styling. Cards have a white or background color matching the main site, rounded corners of 12 pixels, padding of 24 pixels on all sides, a subtle border using the border color with a width of 1 pixel, and shadow matching the main site's card shadows, typically sm or default shadow.

Card headers use padding of 24 pixels on all sides if there's no image, or no padding if there's an image at the top. Card titles use heading size text-xl or text-2xl, with bold font weight. Card content uses padding of 24 pixels on all sides, with standard text size and line height.

Cards have hover effects with shadow increase from sm to md, and slight elevation change. Clickable cards have cursor pointer on hover, and the entire card area is clickable.

### Button Component Style

All buttons use the Button component from the UI components directory. Primary buttons have the primary background color, white or light text, rounded corners of 6 pixels, padding of 10 pixels on top and bottom, padding of 20 pixels on left and right, bold font weight, and hover effects with darker background color using primary color at 90 percent opacity.

Secondary buttons have outline style with border using border color and width of 1 pixel, transparent background, rounded corners of 6 pixels, same padding as primary buttons, and hover effects with background color change to muted color.

Ghost buttons have no border, transparent background, rounded corners of 6 pixels, same padding as primary buttons, and hover effects with background color change to muted color.

Destructive buttons have destructive or red background color, white text, rounded corners of 6 pixels, same padding as primary buttons, and hover effects with darker red background color.

Button sizes include small with padding of 8 pixels on top and bottom, padding of 16 pixels on left and right, and smaller text size. Default size has standard padding. Large size has padding of 12 pixels on top and bottom, padding of 24 pixels on left and right, and larger text size.

Buttons with icons have the icon positioned before or after the text with a gap of 8 pixels. Icon-only buttons are square with equal padding on all sides.

Buttons have disabled states with reduced opacity to 50 percent, no cursor pointer, and no interaction. Disabled buttons have muted background color or grayed out appearance.

### Input Component Style

All input fields use the Input component from the UI components directory. Inputs have standard height of 40 pixels, padding of 12 pixels on left and right, padding of 10 pixels on top and bottom, rounded corners of 6 pixels, border using the border color with width of 1 pixel, background color matching the input background, and full width by default.

Inputs have focus states with border color changing to primary color, ring effect of 2 pixels with primary color at 20 percent opacity, and outline none. Inputs have placeholder text using muted text color at 70 percent opacity.

Inputs with errors have border color of destructive or red color, and error message appears below the input using red color, standard text size, italic font style, and top margin of 4 pixels.

Inputs with icons have the icon positioned on the left or right side with padding adjustment. Icons are sized 20 pixels by 20 pixels with muted text color.

### Textarea Component Style

Textareas use the Textarea component from the UI components directory. Textareas have minimum height of 100 pixels, padding of 12 pixels on all sides, rounded corners of 6 pixels, border using the border color with width of 1 pixel, background color matching the input background, and full width by default.

Textareas have the same focus states, error states, and styling as input fields. Textareas have resize vertical option to allow users to adjust height. Character counters appear below textareas showing current character count and maximum if applicable, using smaller text size and muted text color.

### Select Component Style

Select dropdowns use the Select component from the UI components directory. Selects have the same height, padding, rounded corners, border, and background color as input fields. Selects have a dropdown arrow indicator on the right side, sized 20 pixels by 20 pixels, with muted text color.

Select dropdown menus appear below the select when opened, with white background, rounded corners of 6 pixels, shadow matching the main site, border using border color, and maximum height of 200 pixels with overflow-y auto. Dropdown options have padding of 12 pixels on all sides, hover effects with background color change to muted color, and selected option has primary background color.

### Badge Component Style

Badges use the Badge component from the UI components directory. Badges have rounded corners of 4 pixels if using default style, or fully rounded if using pill style. Badges have padding of 4 pixels on top and bottom, padding of 8 pixels on left and right, standard text size, and bold font weight.

Badges have different background colors based on their purpose. Published status badges use green or success color with white text. Draft status badges use yellow or warning color with dark text. Category badges use category-specific colors from the design system. Other badges use primary color or muted color as appropriate.

### Modal Component Style

Modals use the Modal component from the shared components directory. Modals have a backdrop overlay with position fixed covering the entire screen, background color of black at 60 percent opacity, and blur effect of 4 pixels. The backdrop has z-index of 50 to appear above other content.

The modal content area is centered both horizontally and vertically on the screen, has a white or background color matching the main site, rounded corners of 12 pixels, maximum width of 600 pixels for standard modals or 800 pixels for large modals, maximum height of 90 percent of viewport height, shadow matching the main site's lg or xl shadow, and z-index of 50 to appear above the backdrop.

Modal headers have padding of 24 pixels on all sides, bottom border using the border color with width of 1 pixel, and flex layout with space between items. The modal title appears on the left using heading size text-2xl, with bold font weight. The close button appears on the right using icon button with ghost style, sized 32 pixels by 32 pixels, with X icon from lucide-react.

Modal content areas have padding of 24 pixels on all sides, overflow-y auto for scrolling if content exceeds the height, and maximum height calculated to fit within the modal with header and footer.

Modal footers have padding of 24 pixels on all sides, top border using the border color with width of 1 pixel, and flex layout with buttons aligned to the right with spacing of 12 pixels between them.

### Table Component Style

Tables use the Table component from the UI components directory. Tables have full width, border collapse separate, and spacing of 0 between cells. Table headers have background color that's slightly lighter than the main background, bold font weight, standard text size, padding of 16 pixels on all sides, bottom border using the border color with width of 1 pixel, and text aligned left.

Table rows have alternating background colors for better readability, with even rows having a subtle background tint using muted color at 10 percent opacity. Table rows have hover effects with background color change to muted color at 50 percent opacity. Table cells have padding of 12 pixels on all sides, standard text size, and text aligned left by default with specific alignment for numbers or actions.

Tables have borders between rows using the border color with width of 1 pixel. Tables are responsive with horizontal scrolling on smaller screens if needed.

### Toast Notification Style

Toast notifications appear in a fixed position at the top-right or bottom-right of the screen, with z-index of 100 to appear above all other content. Toasts have rounded corners of 8 pixels, padding of 16 pixels on all sides, shadow matching the main site's md shadow, maximum width of 400 pixels, and flex layout with icon, message, and close button.

Success toasts have green or success background color with white text. Error toasts have red or destructive background color with white text. Info toasts have blue or primary background color with white text. Warning toasts have yellow or warning background color with dark text.

Toasts include an icon on the left side, sized 20 pixels by 20 pixels, with appropriate icon from lucide-react. The message text appears next to the icon using standard text size. The close button appears on the right side using icon button with ghost style, sized 20 pixels by 20 pixels.

Toasts animate in from the side with slide and fade animation using Framer Motion, with duration of 300 milliseconds. Toasts auto-dismiss after 5 seconds, or when the close button is clicked. Toasts have a progress bar at the bottom showing remaining time, using the background color at 30 percent opacity.

### Loading State Style

Loading states use skeleton loaders or spinners matching the main site's loading indicators. Skeleton loaders have a light gray background color using muted color, rounded corners matching the element being loaded, and pulse animation using Framer Motion with duration of 1.5 seconds.

Spinners use the primary color and rotate animation using Framer Motion with duration of 1 second and infinite repeat. Spinners are sized 40 pixels by 40 pixels for standard size, or 24 pixels by 24 pixels for small size.

Loading states appear in place of content while data is being loaded, maintaining the layout structure to prevent content shifts. Loading text appears below spinners using muted text color and standard text size.

### Empty State Style

Empty states appear when there's no data to display, centered on the page with generous spacing around them. Empty states include a large icon sized 64 pixels by 64 pixels, or 96 pixels by 96 pixels for emphasis, using muted color at 50 percent opacity. The icon has a bottom margin of 16 pixels.

The empty state heading appears below the icon using heading size text-2xl, with bold font weight and primary color. The heading has a bottom margin of 8 pixels. Descriptive text appears below the heading using standard text size, muted text color, and centered alignment. The descriptive text has a bottom margin of 24 pixels.

An action button appears below the descriptive text using primary button style, prompting the user to add the first item. The button has appropriate padding and styling matching other buttons.

### Search and Filter Style

Search inputs are positioned at the top of list views, have a search icon on the left side sized 20 pixels by 20 pixels with muted text color, placeholder text using muted text color, padding of 12 pixels on all sides, rounded corners of 6 pixels, border using border color, and maximum width of 300 pixels. Search inputs have a clear button on the right side when text is entered, using an X icon with ghost style.

Filter dropdowns appear next to search inputs using the Select component with the same styling. Filter dropdowns have labels above them using the Label component.

Filter chips or badges appear below search and filter inputs showing active filters. Filter chips use the Badge component with rounded corners of 4 pixels, padding of 4 pixels on top and bottom, padding of 8 pixels on left and right, primary background color, and a remove button on the right side using an X icon sized 16 pixels by 16 pixels.

### Pagination Style

Pagination controls appear at the bottom of long lists or tables, centered horizontally with spacing of 8 pixels between elements. Pagination shows page number buttons, previous and next buttons, and optional first and last page buttons.

Page number buttons have a width and height of 40 pixels, rounded corners of 6 pixels, border using border color with width of 1 pixel, transparent background, standard text size, and hover effects with background color change to muted color. Active page number has primary background color, white text, and no border.

Previous and next buttons have the same styling as page number buttons, with chevron icons from lucide-react sized 20 pixels by 20 pixels. Buttons are disabled when at the first or last page, with reduced opacity and no interaction.

### Image Upload Area Style

Image upload areas have a dashed border with width of 2 pixels, using the border color, rounded corners of 8 pixels, padding of 24 pixels on all sides, and a light background color that's slightly different from the main background using muted color at 10 percent opacity.

Upload areas show drag and drop states with border color changing to primary color, background color changing to primary color at 5 percent opacity, and border width increasing to 3 pixels. Upload areas display instructions text using muted text color, centered alignment, standard text size, with an upload icon sized 48 pixels by 48 pixels above the text, using muted color.

When files are selected, preview thumbnails appear in a grid below the upload area. Thumbnails are sized 150 pixels by 150 pixels, have rounded corners of 8 pixels, object cover to maintain aspect ratio, and are arranged in a grid with 4 columns on desktop, 3 columns on tablet, and 2 columns on mobile, with gaps of 16 pixels.

Each thumbnail shows the image preview, file name below the image using smaller text size and muted text color, file size below the file name using even smaller text size, and a remove button in the top right corner using an X icon with destructive color and circular background with white color.

### Rich Text Editor Style

Rich text editors have a toolbar at the top with formatting buttons arranged horizontally. Toolbars have padding of 8 pixels on all sides, bottom border using the border color with width of 1 pixel, and background color matching the editor background.

Toolbar buttons are grouped logically with visual separators between groups using vertical lines or spacing. Each toolbar button is sized 32 pixels by 32 pixels, has rounded corners of 4 pixels, transparent background, and hover effects with background color change to muted color. Active formatting buttons have primary background color with white icon color.

The editor content area has a border using the border color with width of 1 pixel, rounded corners of 6 pixels on the bottom corners, padding of 16 pixels on all sides, minimum height of 400 pixels, and background color matching the input background. The editor shows formatting as the user types, with consistent styling matching the main site's typography including font family, sizes, line heights, and colors.

## Color Usage Guidelines

Primary color is used for main actions, links, active states, and important elements. Primary color appears in buttons, navigation active states, icons, and accents. Primary color has sufficient contrast with white or light text for accessibility.

Secondary color is used for secondary actions and accents. Secondary color appears in secondary buttons, secondary text, and supporting elements.

Success color is used for success messages, published status badges, and positive indicators. Success color has sufficient contrast for text readability.

Error or destructive color is used for error messages, delete actions, and negative indicators. Destructive color appears in delete buttons, error text, and warning states.

Warning color is used for warnings, draft status badges, and cautionary indicators. Warning color has sufficient contrast for text readability.

Muted colors are used for secondary text, borders, backgrounds, and subtle elements. Muted colors appear in labels, placeholders, borders, and background tints.

## Typography Guidelines

Headings use the same font family, sizes, and weights as the main site. H1 headings use text-4xl or text-5xl with bold font weight. H2 headings use text-3xl with bold font weight. H3 headings use text-2xl with bold font weight. H4 headings use text-xl with bold font weight.

Body text uses the same font family and size as the main site, typically text-base with normal font weight. Body text uses primary text color for main content, and muted text color for secondary information.

Line heights match the main site's typography settings, typically 1.5 for body text and 1.2 for headings. Letter spacing matches the main site's settings.

## Spacing Guidelines

Spacing uses the Tailwind spacing scale matching the main site. Small gaps use 4 or 8 pixels for tight spacing between related elements. Medium gaps use 12 or 16 pixels for standard spacing between elements. Large gaps use 24 or 32 pixels for section spacing and generous padding.

Padding on cards and containers uses 24 to 32 pixels on all sides for comfortable spacing. Padding on form fields uses 12 to 16 pixels for appropriate input sizing. Margins between sections use 16 to 24 pixels for clear separation.

Consistent spacing is maintained throughout the admin panel to match the main site's spacing patterns and create visual rhythm.

## Border Radius Guidelines

Border radius values match the main site's border radius settings. Small elements like badges use 4 to 6 pixels for subtle rounding. Buttons and inputs use 6 to 8 pixels for standard rounding. Cards and modals use 8 to 12 pixels for noticeable rounding. Consistent border radius creates a cohesive look matching the main site.

## Shadow Guidelines

Shadows use the same shadow values as the main site. Cards have subtle shadows, typically sm or default shadow for depth. Hover states increase shadow slightly, typically md shadow for elevation. Modals have larger shadows, typically lg or xl shadow for emphasis. Shadows provide depth and elevation matching the main site's visual hierarchy.

## Animation Guidelines

Animations use Framer Motion matching the main site's animation patterns. Page transitions use fade and slide animations with duration of 300 to 400 milliseconds. Modal openings use scale and fade animations with duration of 200 to 300 milliseconds. Button hovers use smooth color transitions with duration of 150 to 200 milliseconds. Loading states use pulse or spin animations with duration of 1000 to 1500 milliseconds. All animations have consistent easing functions matching the main site, typically ease-in-out or ease-out.

## Responsive Design Guidelines

The admin panel is fully responsive, working well on desktop and tablet screens. On desktop with width of 1024 pixels and above, the sidebar is full width showing icons and labels, grid layouts use multiple columns, and forms use two-column layouts where appropriate.

On tablet with width of 768 pixels to 1023 pixels, the sidebar can collapse to icon-only mode, grid layouts use fewer columns, and forms stack vertically. On mobile with width below 768 pixels, the sidebar is hidden or collapses completely, grid layouts use single column, and all forms stack vertically.

All breakpoints match the main site's breakpoints using Tailwind's responsive prefixes. Components adjust their sizing, spacing, and layout at each breakpoint to maintain usability and visual appeal.

