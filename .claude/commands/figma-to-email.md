# Figma to React Email

Convert a Figma design to a react-email template.

## Usage

```
/figma-to-email <figma-url> [template-name]
```

## Steps

1. **Parse the Figma URL** to extract:
   - `fileKey`: The file identifier from the URL path
   - `nodeId`: The node-id parameter (convert dashes to colons, e.g., `1-2` → `1:2`)

2. **Get design context** using `mcp__figma__get_design_context`:
   - Pass the extracted fileKey and nodeId
   - Set clientLanguages to "typescript"
   - Set clientFrameworks to "react"

3. **Transform to react-email**:
   - Convert HTML elements to `@react-email/components`
   - Replace `<div>` with `<Section>`, `<Container>`, or `<Column>` as appropriate
   - Replace `<h1-h6>` with `<Heading>`
   - Replace `<p>` with `<Text>`
   - Replace `<a>` with `<Link>` or `<Button>`
   - Replace `<img>` with `<Img>`
   - Wrap layout in `<Html><Head/><Body>...</Body></Html>`
   - Add `<Preview>` tag with appropriate preview text
   - Convert inline styles to style objects or Tailwind classes
   - Handle responsive design with proper table-based layouts

4. **Create the template file**:
   - Determine template name from second argument or generate from Figma node name
   - Create file at `emails/{template-name}.tsx`
   - Define TypeScript interface for props
   - Export component as default
   - Add `.PreviewProps` with sample data

5. **Verify and inform**:
   - Read the created file to verify
   - Tell user how to preview: `npm run dev` and navigate to the template
   - Suggest any manual refinements needed (e.g., data props, interactive elements)

## Example

```
/figma-to-email https://figma.com/design/abc123/Newsletter?node-id=1-2 weekly-newsletter
```

Creates `emails/weekly-newsletter.tsx` with the converted design.
