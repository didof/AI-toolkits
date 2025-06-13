import {
  Body,
  Head,
  Html,
  Preview,
  Text,
  Tailwind,
  Hr,
  Link,
  CodeBlock,
  Font,
  dracula,
  Container,
  Section,
} from "@react-email/components";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface InjectableTextEmailProps {
  text?: string;
}

export const InjectableTextEmail = ({ text }: InjectableTextEmailProps) => (
  <Html>
    <Head>
      <Font
        fallbackFontFamily="monospace"
        fontFamily="CommitMono"
        fontStyle="normal"
        fontWeight={400}
        webFont={{
          url: "https://react.email/fonts/commit-mono/commit-mono-regular.ttf",
          format: "truetype",
        }}
      />
    </Head>
    <Body className="bg-gray-100 my-auto mx-auto font-sans">
      <Tailwind>
        <Container className="border border-solid border-[#eaeaea] rounded-lg my-[40px] mx-auto p-[20px] w-[600px] bg-white">
          <Section className="mt-[22px]">
            <Preview>My newsletter</Preview>

            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ node, children, ...props }) => (
                  <Text
                    {...props}
                    className="text-2xl font-bold text-gray-800 my-4"
                  >
                    {children}
                  </Text>
                ),
                h3: ({ node, children, ...props }) => (
                  <Text
                    {...props}
                    className="text-xl font-semibold text-gray-700 my-3"
                  >
                    {children}
                  </Text>
                ),
                h4: ({ node, children, ...props }) => (
                  <Text
                    {...props}
                    className="text-lg font-medium text-gray-600 my-2"
                  >
                    {children}
                  </Text>
                ),
                p: ({ node, children, ...props }) => (
                  <Text
                    {...props}
                    className="text-base text-gray-600 my-4 leading-7"
                  >
                    {children}
                  </Text>
                ),
                ul: ({ node, children, ...props }) => (
                  <ul {...props} className="list-disc pl-6 my-4">
                    {children}
                  </ul>
                ),
                ol: ({ node, children, ...props }) => (
                  <ol {...props} className="list-decimal pl-6 my-4">
                    {children}
                  </ol>
                ),
                li: ({ node, children, ...props }) => (
                  <li {...props} className="mb-2 text-gray-600">
                    {children}
                  </li>
                ),
                a: ({ node, children, ...props }) => (
                  <Link
                    {...props}
                    className="text-blue-600 underline hover:text-blue-700"
                  >
                    {children}
                  </Link>
                ),
                strong: ({ node, children, ...props }) => (
                  <strong {...props} className="font-bold text-gray-700">
                    {children}
                  </strong>
                ),
                em: ({ node, children, ...props }) => (
                  <em {...props} className="italic text-gray-600">
                    {children}
                  </em>
                ),
                code: ({ children }) => (
                  <div className="overflow-x-auto">
                    <CodeBlock
                      code={String(children).replace(/\n$/, "")}
                      fontFamily="'CommitMono', monospace"
                      language="javascript"
                      theme={dracula}
                      style={{ width: "calc(100% - 20px)", padding: "10px" }}
                    />
                  </div>
                ),
                hr: () => <Hr className="my-6 border-t border-gray-300" />,
              }}
            >
              {text}
            </ReactMarkdown>

            <Hr className="my-8 border-t border-gray-300" />

            <Text className="text-center text-gray-500 text-xs">
              You are receiving this email because you subscribed to our
              newsletter.
            </Text>
            <Text className="text-center text-gray-500 text-xs">
              <Link href="#" className="underline">
                Unsubscribe
              </Link>{" "}
              |{" "}
              <Link href="#" className="underline">
                Manage your preferences
              </Link>
            </Text>
          </Section>
        </Container>
      </Tailwind>
    </Body>
  </Html>
);

InjectableTextEmail.PreviewProps = {
  text: `
## Hello from my newsletter!

This is a sample of what you can do with react-email and react-markdown.

### Features
- **Easy to use:** Write your content in Markdown and let the component do the rest.
- **Customizable:** Override any HTML element with your own React components.
- **Syntax Highlighting:** Beautiful code blocks with the Dracula theme.

\`\`\`javascript
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

#### More details
You can even have different levels of headings and they will be styled accordingly.

1. First item
2. Second item
3. Third item

Check out the [react-email documentation](https://react.email/docs) for more information.

Cheers,
The Team
`,
} as InjectableTextEmailProps;

export default InjectableTextEmail;
