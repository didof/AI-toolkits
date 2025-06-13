import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";

interface InjectableTextEmailProps {
  text: string;
}

export const InjectableTextEmail = ({ text }: InjectableTextEmailProps) => (
  <Html>
    <Head />
    <Preview>My newsletter</Preview>
    <Tailwind>
      <Body style={main}>
        <Container style={container}>
          <Text style={paragraph}>{text}</Text>
          <Hr style={divider} />
          <Section style={footer}>
            <Text style={footerText}>
              You're receiving this email because your Stack Overflow activity
              triggered this tip or reminder.
            </Text>
            <Section style={footerLinks}>
              <Link href="#" style={footerLink}>
                Unsubscribe
              </Link>
              <Link href="#" style={footerLink}>
                Email Settings
              </Link>
              <Link href="#" style={footerLink}>
                Contact Us
              </Link>
              <Link href="#" style={footerLink}>
                Privacy Policy
              </Link>
            </Section>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

InjectableTextEmail.PreviewProps = {
  text: "This has been injected into the email body via the --text flag.",
} as InjectableTextEmailProps;

export default InjectableTextEmail;

// Styles
const main: React.CSSProperties = {
  backgroundColor: "#f4f4f7",
  fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
  padding: "40px 0",
};

const container: React.CSSProperties = {
  width: "100%",
  maxWidth: "680px",
  margin: "0 auto",
  backgroundColor: "#ffffff",
  padding: "40px",
  borderRadius: "8px",
};

const paragraph: React.CSSProperties = {
  fontSize: "16px",
  lineHeight: "24px",
  color: "#3c3f44",
};

const divider: React.CSSProperties = {
  margin: "32px 0",
  borderColor: "#e4e4e7",
};

const footer: React.CSSProperties = {
  marginTop: "32px",
};

const footerText: React.CSSProperties = {
  fontSize: "12px",
  lineHeight: "18px",
  color: "#6b7280",
  marginBottom: "12px",
};

const footerLinks: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  gap: "12px",
};

const footerLink: React.CSSProperties = {
  fontSize: "12px",
  color: "#6b7280",
  textDecoration: "underline",
};
