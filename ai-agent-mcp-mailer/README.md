# AI Agent with Mailer MCP

This project allows you to create, preview, and send beautiful, dynamic emails using [React Email](https://react.email/) and Nodemailer. It features a live development preview studio and a powerful command-line interface for sending emails.

## Features

  - **Live Preview:** Develop your email templates with a live preview in your browser.
  - **Dynamic Templates:** Create email templates with React and inject content dynamically.
  - **Markdown Support:** Write email content in Markdown and have it beautifully rendered in your templates.
  - **CLI for Sending:** A simple and powerful command-line interface to send your emails.

## Getting Started

Follow these steps to get the project up and running on your local machine.

### 1\. Installation

First, clone the repository and install the dependencies using `pnpm`:

```sh
git clone <your-repo-url>
cd ai-agent-mcp-mailer
pnpm install
```

### 2\. Environment Configuration

The application requires environment variables to connect to your SMTP server and send emails.

**Create a `.env` file** by copying the example file:

```sh
cp .env.example .env
```

Now, open the `.env` file and fill in the required values.

```env
# Your SMTP server host (e.g., smtp.gmail.com)
SMTP_HOST=
# The port for your SMTP server (e.g., 587)
SMTP_PORT=
# Whether to use a secure connection (true or false)
SMTP_SECURE=
# Your SMTP username
SMTP_USER=
# Your SMTP password or App Password
SMTP_PASS=
# The "from" address for your emails
SMTP_FROM=
# The recipient's email address
EMAIL_TO=
```

#### How to get an App Password for Gmail

If you are using Gmail, it's highly recommended to use an "App Password" instead of your regular password for security reasons.

Watch this video to learn how to generate an App Password for your Google Account:
**[VIDEO\_URL\_PLACEHOLDER]**

### 3\. Running the Development Studio

To preview your email templates, run the development server:

```sh
pnpm run dev
```

This will start the React Email development studio. Open [localhost:3000](https://www.google.com/search?q=http://localhost:3000) with your browser to see your email templates and preview any changes in real-time.

## Sending Emails

The `send.ts` script provides a command-line interface for sending your emails. Below are some examples of how to use it.

### Sending a Simple Text Email

To send a simple plain-text email without a template, use the `--subject` and `--text` flags:

```bash
npx ts-node src/send.ts --subject "Hello from the command line" --text "This is a simple text email sent directly from the terminal."
```

### Sending a Template Email with Markdown

You can use the `newsletter` template and pass Markdown content to it.

#### Option 1: Using Inline Text

Pass your Markdown content directly using the `--text` flag. The script will render it inside the template.

```bash
npx ts-node src/send.ts --template newsletter --subject "My Awesome Newsletter" --text "## Hello World! \nThis is **Markdown** rendered in a React Email template."
```

#### Option 2: Using a Content File

For longer content, you can use a Markdown file from the `content` directory. Use the `--content` flag with the name of the file (without the `.md` extension).

For example, to send the content from `content/hello_world.md`:

```bash
npx ts-node src/send.ts --template newsletter --subject "The Dev Drop - Vol. 01" --content hello_world
```

## Creating Your Own Templates

To create a new email template, follow these steps:

1.  **Create a new `.tsx` file** inside the `emails/` directory (e.g., `emails/my-new-template.tsx`).
2.  **Build your template** using React and the components from `@react-email/components`.
3.  **Make sure your component accepts a `text` prop** of type `string` to receive the injectable Markdown content.
4.  **Export the component** as the default export.

Here is a simple boilerplate to get you started:

```jsx
// emails/my-new-template.tsx

import {
  Body,
  Container,
  Html,
  Text,
  Tailwind,
} from "@react-email/components";
import ReactMarkdown from "react-markdown";

interface MyTemplateProps {
  text: string;
}

export const MyNewTemplate = ({ text }: MyTemplateProps) => (
  <Html>
    <Body className="bg-white font-sans">
      <Tailwind>
        <Container className="p-8">
          <Text className="text-2xl font-bold">My New Template</Text>
          <ReactMarkdown>{text}</ReactMarkdown>
        </Container>
      </Tailwind>
    </Body>
  </Html>
);

export default MyNewTemplate;
```

Once you save the file, the development studio (`pnpm run dev`) will automatically pick it up, and you can start sending emails with it using the `--template` flag:

```bash
npx ts-node src/send.ts --template my-new-template --subject "Testing my new template" --text "This is content for my new template."
```

You can also use the `--content` flag to inject Markdown content from a file in the `content` directory.  
For example, write markdown in `content/my-new-content.md` using your custom template:

```bash
npx ts-node src/send.ts --template my-new-template --subject "Testing my new template" --content my-new-content
```

## Learn More

To learn more about React Email and explore all the available components, check out the official documentation.

  - [**React Email Documentation**](https://react.email/docs)
  - [**Available Components**](https://www.google.com/search?q=https://react.email/docs/components/overview)

## License

This project is licensed under the MIT License.