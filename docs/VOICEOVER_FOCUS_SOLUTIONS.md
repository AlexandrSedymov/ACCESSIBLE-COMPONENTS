# VoiceOver Focus Management Solutions

## The Problem

When using programmatic focus management in single-page applications, VoiceOver on macOS often announces only "heading level 1" instead of reading the actual heading text content. This happens because:

1. **VoiceOver treats programmatic focus differently** than natural focus
2. **Container elements** (like `<main>`) don't provide meaningful content to announce  
3. **Focus timing** may occur before VoiceOver is ready to read the content

## Solutions Implemented

### 1. Focus H1 Directly (Primary Solution)

The `useFocusManagement` hook now prioritizes focusing the H1 element:

```typescript
// Focus the H1 - VoiceOver will read the heading content
const h1Element = mainElement.querySelector('h1') as HTMLElement;

if (h1Element) {
  if (!h1Element.hasAttribute('tabindex')) {
    h1Element.setAttribute('tabindex', '-1');
  }
  h1Element.focus();
}
```

**Why this works:**
- VoiceOver announces heading content when the heading itself is focused
- `tabindex="-1"` makes elements programmatically focusable without adding them to tab order
- Provides clear context about page content

### 2. Alternative Solutions

If the H1 focus approach doesn't work in all cases, here are additional options:

#### Option A: ARIA Live Regions
```html
<div id="page-announcement" aria-live="polite" aria-atomic="true" class="sr-only">
  <!-- JavaScript will update this with page title -->
</div>
```

#### Option B: Document Title + Delay
```typescript
// Update document title and use longer delay
document.title = `${pageTitle} - Your App Name`;
setTimeout(() => {
  h1Element.focus();
}, 300); // Longer delay for VoiceOver
```

#### Option C: Multiple Focus Strategies
```typescript
// Try multiple approaches in sequence
h1Element.focus();
setTimeout(() => {
  // Blur and refocus if needed
  h1Element.blur();
  setTimeout(() => h1Element.focus(), 50);
}, 100);
```

## CSS Support

Added focus styles for H1 elements:

```css
/* H1 focus styles for VoiceOver navigation */
h1[tabindex="-1"]:focus {
  outline: 2px solid #007acc;
  outline-offset: 2px;
  border-radius: 2px;
}
```

## Testing VoiceOver

### Enable VoiceOver
1. **System Preferences** → **Accessibility** → **VoiceOver** → **Enable VoiceOver**
2. Or use shortcut: **Cmd + F5**

### Test Navigation Focus
1. Navigate to your app in Safari
2. Use navigation links to move between pages
3. Listen for VoiceOver announcements:
   - ✅ **Good**: "Welcome to accessible components playground, heading level 1"
   - ❌ **Bad**: "heading level 1" (without content)

### VoiceOver Commands
- **Ctrl + Option + →**: Move to next element
- **Ctrl + Option + Cmd + H**: Navigate by headings
- **Ctrl + Option + Space**: Activate/click element

## Browser-Specific Notes

### Safari (Recommended for VoiceOver)
- Best VoiceOver compatibility
- Most accurate focus behavior
- Native macOS integration

### Chrome/Firefox
- May have slight delays in VoiceOver announcements
- Generally compatible but test thoroughly

## Troubleshooting

### Issue: Still hearing "heading level 1" only
**Solutions:**
1. Increase focus delay to 200-300ms
2. Ensure H1 has text content when focused
3. Check for CSS that might hide content
4. Verify no other scripts are interfering with focus

### Issue: Focus outline too prominent
**Solutions:**
1. Reduce outline width or use subtle colors
2. Add shorter timeout for outline removal
3. Use `:focus-visible` for keyboard-only focus

### Issue: Works in some browsers but not others
**Solutions:**
1. Test primarily in Safari for VoiceOver
2. Add browser-specific delays if needed
3. Consider user-agent detection for different strategies

## Resources

- [VoiceOver Web Rotor](https://support.apple.com/en-ie/guide/voiceover/vo27960/mac)
- [WebAIM VoiceOver Testing](https://webaim.org/articles/voiceover/)
- [Apple VoiceOver Documentation](https://developer.apple.com/documentation/accessibility/supporting_voiceover_in_your_app)
- [MDN Focus Management](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Focus_management)

## Implementation Status

✅ **Completed:**
- Modified `useFocusManagement` to focus H1 elements
- Added H1 focus CSS styles
- Updated documentation with VoiceOver-specific guidance
- Maintained fallback to main element focus

🔄 **Next Steps:**
- Test with actual VoiceOver users
- Consider ARIA live regions for complex page updates
- Monitor for browser compatibility issues