#!/usr/bin/env node

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import minimist from 'minimist';
import { renderEmailTemplate } from './render-email';
import fs from 'fs';
import path from 'path';

dotenv.config();

const args = minimist(process.argv.slice(2));

const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_SECURE,
    SMTP_USER,
    SMTP_PASS,
    SMTP_FROM,
    EMAIL_TO
} = process.env;

if (!SMTP_USER || !SMTP_PASS || !EMAIL_TO) {
    console.error('Please set SMTP_USER, SMTP_PASS, and EMAIL_TO in your .env file.');
    process.exit(1);
}

async function main() {
    const { template, subject, text: mailText, content: contentName } = args;

    let html: string | undefined;
    let text: string | undefined;
    let templateText: string | undefined;

    // Ensure only one of --text or --content is provided
    if (mailText && contentName) {
        console.error('Please provide only one of --text or --content.');
        process.exit(1);
    }

    if (contentName) {
        // Read markdown file from content folder
        const contentPath = path.resolve(__dirname, '../content', `${contentName}.md`);
        if (!fs.existsSync(contentPath)) {
            console.error(`Content file not found: ${contentPath}`);
            process.exit(1);
        }
        templateText = fs.readFileSync(contentPath, 'utf8');
    } else if (mailText) {
        templateText = mailText;
    }

    const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT ? Number(SMTP_PORT) : 587,
        secure: SMTP_SECURE === 'true',
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASS,
        },
    });

    if (template) {
        if (!subject) {
            console.error('Usage for template email: --template <template> --subject <subject> [--text <text> | --content <content>]');
            process.exit(1);
        }
        if (!templateText) {
            console.error('You must provide either --text or --content for the template.');
            process.exit(1);
        }
        const rendered = await renderEmailTemplate(template, { text: templateText });
        html = rendered.html;
        text = rendered.text;
    } else {
        if (!subject || !templateText) {
            console.error('Usage for simple email: --subject <subject> [--text <text> | --content <content>]');
            process.exit(1);
        }
        text = templateText;
    }

    await transporter.sendMail({
        from: SMTP_FROM,
        to: EMAIL_TO,
        subject,
        text,
        html,
    });

    console.log('Email sent!');
}

main().catch((err) => {
    console.error('Failed to send email:', err);
    process.exit(1);
});