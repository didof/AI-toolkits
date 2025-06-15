import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { renderEmailTemplate } from "./render-email";

dotenv.config();

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_SECURE,
  SMTP_USER,
  SMTP_PASS,
  SMTP_FROM,
  EMAIL_TO,
} = process.env;

// Uncomment the following lines to log the SMTP configuration for debugging
// console.log({
//   SMTP_HOST,
//   SMTP_PORT,
//   SMTP_SECURE,
//   SMTP_USER,
//   SMTP_FROM,
//   EMAIL_TO,
// })

if (
  !SMTP_HOST ||
  !SMTP_PORT ||
  !SMTP_USER ||
  !SMTP_PASS ||
  !SMTP_FROM ||
  !EMAIL_TO
) {
  console.error(
    "Please ensure all required SMTP environment variables are set in your .env file."
  );
  process.exit(1);
}

const nodemailerTransport = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT ? Number(SMTP_PORT) : 587,
  secure: SMTP_SECURE === "true",
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

const TEMPLATES = ["simple", "newsletter"] as const;

const GET_EMAIL_TEMPLATES_TOOL: Tool = {
  name: "getEmailTemplates",
  description: "Returns a list of available email templates.",
  inputSchema: {
    type: "object",
    properties: {},
    required: [],
  },
};

const SEND_EMAIL_TOOL: Tool = {
  name: "sendEmail",
  description: "Sends an email using the specified template, subject, and content.",
  inputSchema: {
    type: "object",
    properties: {
      template: {
        type: "string",
        enum: TEMPLATES as unknown as string[],
        description: "The name of the template to use.",
      },
      subject: {
        type: "string",
        description: "The subject of the email.",
      },
      textOrMarkdown: {
        type: "string",
        description: "The body content of the email, as plain text or markdown.",
      },
    },
    required: ["template", "subject", "textOrMarkdown"],
  },
};

const server = new Server(
  {
    name: "mailer",
    version: "0.0.2",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [GET_EMAIL_TEMPLATES_TOOL, SEND_EMAIL_TOOL],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "getEmailTemplates") {
    return {
      content: TEMPLATES.map((text) => ({
        type: "text",
        text,
      })),
    };
  }

  if (request.params.name === "sendEmail") {
    const { template, subject, textOrMarkdown } = request.params.arguments as {
      template: string;
      subject: string;
      textOrMarkdown: string;
    };

    if (!TEMPLATES.includes(template as any)) {
      return {
        content: [
          {
            type: "text",
            text: `Invalid template: ${template}`,
          },
        ],
        isError: true,
      };
    }

    try {
      const emailContent = await renderEmailTemplate(template, {
        text: textOrMarkdown,
      });
      const mailOptions = {
        from: SMTP_FROM,
        to: EMAIL_TO,
        subject,
        text: emailContent.text,
        html: emailContent.html,
      };
      await nodemailerTransport.sendMail(mailOptions);

      return {
        content: [
          {
            type: "text",
            text: `Email sent successfully using template "${template}" with subject "${subject}".`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Failed to send email: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
        isError: true,
      };
    }
  }

  return {
    content: [
      {
        type: "text",
        text: `Unknown tool: ${request.params.name}`,
      },
    ],
    isError: true,
  };
});

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Mailer MCP Server running on stdio");
}

runServer().catch((error) => {
  console.error("Fatal error running server:", error);
  process.exit(1);
});