# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React Email project for building and previewing email templates using React components. The project uses the `react-email` framework which provides a component-based approach to creating HTML emails with live preview capabilities.

## Development Commands

- **Start development server**: `bun run dev` - Launches preview server at http://localhost:3000
- **Build emails**: `bun run build` - Compiles email templates to production-ready HTML
- **Export emails**: `bun run export` - Exports email templates as static HTML files
- **Send test email**: `bun run send-email [mybit|vercel]` - Send a test email using Resend

## Custom Workflows

### Figma to Email Conversion

Use `/figma-to-email <figma-url> [template-name]` to convert Figma designs to react-email templates. This command:
1. Extracts design context from Figma using MCP tools
2. Transforms HTML to react-email components
3. Creates a new template file in `emails/` with proper structure and preview props
4. See `.claude/commands/figma-to-email.md` for detailed workflow

### Sending Emails with Resend

The project integrates with [Resend](https://resend.com) for sending emails programmatically:

**Setup:**
1. Get API key from https://resend.com/api-keys
2. Add to `.env`: `RESEND_API_KEY=re_your_api_key_here`
3. Verify your domain in Resend dashboard (or use `onboarding@resend.dev` for testing)

**Programmatic Usage:**
```typescript
import { sendEmail } from './lib/resend';
import MybitTokenLaunch from './emails/mybit-token-launch';

const result = await sendEmail({
  to: 'user@example.com',
  from: 'noreply@yourdomain.com',
  subject: 'New Token Launch',
  react: MybitTokenLaunch({ tokenName: 'Meteora', tokenSymbol: 'MET' }),
});
```

**Testing via CLI:**
```bash
bun run send-email mybit   # Send Mybit token launch email
bun run send-email vercel  # Send Vercel invite email
```

See `examples/send-email.ts` and `lib/resend.ts` for implementation details.

## Architecture

### Project Structure

- **`emails/`**: Email template components (`.tsx` files)
  - Each template exports a React component
  - Static assets stored in `emails/static/`
- **`lib/`**: Utility modules
  - `lib/resend.ts`: Resend integration for sending emails
- **`examples/`**: Example scripts and usage demonstrations
  - `examples/send-email.ts`: CLI script for testing email sending

### Component Pattern

Each email template follows this pattern:

1. **Interface**: Define props interface for template data
2. **Component**: Export main component using `@react-email/components`
3. **PreviewProps**: Attach `.PreviewProps` to the component with sample data for preview
4. **Default Export**: Export the component as default

Example structure:
```tsx
interface EmailProps {
  username?: string;
}

export const EmailTemplate = ({ username }: EmailProps) => (
  <Html>
    <Head />
    <Preview>Preview text</Preview>
    <Body>{/* content */}</Body>
  </Html>
);

EmailTemplate.PreviewProps = {
  username: 'example',
} as EmailProps;

export default EmailTemplate;
```

### Environment Variables

The project uses `.env` for configuration:
- **RESEND_API_KEY**: Required for sending emails via Resend. Get from https://resend.com/api-keys
- **VERCEL_URL**: Used for base URL resolution in templates. Templates access static assets via:
  ```tsx
  const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '';
  // Then use: src={`${baseUrl}/static/image.png`}
  ```
- Custom Anthropic API configuration (ANTHROPIC_AUTH_TOKEN, ANTHROPIC_BASE_URL) may be present

See `.env.example` for all available environment variables.

### React Email Components

The project uses components from `@react-email/components`:
- Layout: `Html`, `Head`, `Body`, `Container`, `Section`, `Row`, `Column`
- Typography: `Heading`, `Text`, `Preview`
- Interactive: `Button`, `Link`
- Media: `Img`
- Styling: `Tailwind` (for Tailwind CSS support)
- Structure: `Hr`

### Styling Approaches

Templates use two styling methods:
1. **Inline styles**: Object-based styles (e.g., `style={main}`)
2. **Tailwind CSS**: Using the `<Tailwind>` wrapper component with className (e.g., `className="text-center"`)

## Technology Stack

- **React**: Version 19.x (latest stable)
- **TypeScript**: Strict mode enabled (`strict: true`, `strictNullChecks: true`)
- **JSX**: `react-jsx` mode (automatic JSX runtime, no need to import React)
- **Build Tool**: `react-email` CLI (version 4.3.2)

TypeScript targets all `.ts` and `.tsx` files except `node_modules` and `.react-email`

## Reference Materials

The project includes the `react-email` repository as a git submodule for reference when building templates.
