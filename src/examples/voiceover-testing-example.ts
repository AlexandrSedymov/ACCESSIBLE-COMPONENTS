/**
 * Example: Testing VoiceOver Focus Management
 * 
 * Before the fix:
 * 1. Navigate between pages using navigation links
 * 2. VoiceOver announces: "heading level 1" 
 * 3. No context about what page you're on
 * 
 * After the fix:
 * 1. Navigate between pages using navigation links  
 * 2. VoiceOver announces: "Welcome to accessible components playground, heading level 1"
 * 3. Clear context about the page content
 * 
 * How it works:
 * - useFocusManagement hook detects route changes
 * - Finds the H1 element within the main content area
 * - Sets tabindex="-1" on the H1 to make it programmatically focusable
 * - Calls focus() on the H1 element
 * - VoiceOver reads the H1 content instead of just announcing the role
 */

// Test this manually:
// 1. Enable VoiceOver (Cmd + F5)
// 2. Open the app in Safari
// 3. Navigate between: Home → Modal Dialog → Links vs Buttons → Input Fields
// 4. Listen for the full page title announcements

export {};