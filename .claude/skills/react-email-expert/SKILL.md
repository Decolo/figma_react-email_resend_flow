---
name: "react-email-expert"
description: "Expert guidance for converting designs (especially Figma) to react-email templates and building email-safe HTML. Use when converting Figma to email templates, building/modifying email templates, debugging email rendering, or when user mentions react-email, email templates, or HTML emails."
---

# React Email Expert

Provides specialized knowledge for building production-ready email templates using the react-email framework.

## Core Conversion Rules

### HTML to React Email Component Mapping

When converting designs or HTML to react-email:

```
HTML Element            ’ React Email Component
----------------------------------------------------
<div> (layout)         ’ <Section>, <Container>, <Row>, <Column>
<h1-h6>                ’ <Heading>
<p>                    ’ <Text>
<a> (text link)        ’ <Link>
<a> (button/CTA)       ’ <Button>
<img>                  ’ <Img>
<hr>                   ’ <Hr>
```

**Critical**: Email clients don't support flexbox/grid. Use table-based layouts via `<Row>` and `<Column>`.

### Required Template Structure

Every template must follow this exact pattern:

```tsx
import { Html, Head, Preview, Body, ... } from '@react-email/components';

interface EmailNameProps {
  propName?: string;
}

export const EmailName = ({ propName }: EmailNameProps) => (
  <Html>
    <Head />
    <Preview>Preview text shown in inbox (50-100 chars)</Preview>
    <Body>
      {/* Content */}
    </Body>
  </Html>
);

EmailName.PreviewProps = {
  propName: 'sample value',
} as EmailNameProps;

export default EmailName;
```

### Styling Approaches

**Option 1: Inline Style Objects**
```tsx
const heading = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#333333',
};

<Heading style={heading}>Title</Heading>
```

**Option 2: Tailwind (wraps everything)**
```tsx
<Tailwind>
  <Container className="mx-auto max-w-[600px] px-4">
    <Heading className="text-2xl font-bold text-[#333333]">Title</Heading>
  </Container>
</Tailwind>
```

### Image Handling Pattern

Always use this pattern for images:

```tsx
const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';

<Img
  src={`${baseUrl}/static/image-name.png`}
  width="120"
  height="40"
  alt="Descriptive alt text"
/>
```

- Store images in `emails/static/`
- Always include width, height, and alt
- Use absolute URLs only

## Figma to React Email Workflow

When converting Figma designs:

### 1. Layout Structure
- Max width: 600px for main container
- Use `<Container>` for outer wrapper
- Use `<Section>` for content blocks
- Use `<Row>` + `<Column>` for multi-column layouts

### 2. Extract Design Tokens
- Colors: Convert to hex values
- Fonts: Use web-safe fonts (Arial, Helvetica, Georgia) or specify full fallback stack
- Spacing: Convert auto-layout padding/gaps to px values
- Use padding instead of margin (better email client support)

### 3. Component Priorities
- **Buttons**: Min height 44px, padding `px-5 py-3`, use `<Button>` component
- **Text**: Min 14px for body, use `<Text>` or `<Heading>`
- **Links**: Use `<Link>` for text links, `<Button>` for CTAs
- **Spacing**: Typical vertical spacing: 16px, 24px, 32px, 40px

### 4. Make It Dynamic
- Replace static text with props
- Define TypeScript interface for all props
- Provide realistic PreviewProps for testing

## Email Client Constraints

### Critical Limitations
- **No CSS Grid or Flexbox** - Use tables (`<Row>`/`<Column>`)
- **No complex CSS3** - Avoid transforms, animations, transitions
- **Inline styles preferred** - Some clients strip `<style>` tags
- **Background images unreliable** - Use solid colors
- **File size limit** - Keep total email under 102KB (Gmail clips larger)

### Common Layout Patterns

**Centered Logo:**
```tsx
<Section className="mt-[32px]">
  <Img
    src={`${baseUrl}/static/logo.png`}
    width="120"
    height="40"
    alt="Company Logo"
    className="mx-auto my-0"
  />
</Section>
```

**Primary CTA Button:**
```tsx
<Section className="my-[32px] text-center">
  <Button
    className="rounded bg-[#000000] px-5 py-3 font-semibold text-white"
    href="https://example.com/action"
  >
    Take Action
  </Button>
</Section>
```

**Two-Column Layout:**
```tsx
<Row>
  <Column align="left" style={{ width: '50%' }}>
    <Text>Left column</Text>
  </Column>
  <Column align="right" style={{ width: '50%' }}>
    <Text>Right column</Text>
  </Column>
</Row>
```

**Footer with Divider:**
```tsx
<Hr className="mx-0 my-[26px] border border-[#eaeaea]" />
<Text className="text-[12px] text-[#666666]">
  © 2024 Company. All rights reserved.
</Text>
```

## Conversion Checklist

When creating a new template from design:

- [ ] Create TypeScript props interface
- [ ] Wrap in `<Html><Head/><Preview/><Body>`
- [ ] Use max-width 600px container
- [ ] Convert layout to `<Section>`, `<Row>`, `<Column>`
- [ ] Replace text with `<Text>` or `<Heading>`
- [ ] Replace buttons/links with `<Button>` or `<Link>`
- [ ] Export images to `emails/static/`
- [ ] Use `baseUrl` pattern for image sources
- [ ] Add width/height to all images
- [ ] Use web-safe fonts or full fallback stack
- [ ] Add `.PreviewProps` with sample data
- [ ] Export component as default
- [ ] Test in dev server (`npm run dev`)

## Reference

See existing templates in `emails/` directory for real-world examples.
