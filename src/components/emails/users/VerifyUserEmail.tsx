import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  render,
} from "@react-email/components";
import * as React from "react";

interface VerifyUserEmailProps {
  name: string;
  href: string;
}

export const VerifyUserEmail = ({ name, href }: VerifyUserEmailProps) => (
  <Html>
    <Head />
    <Preview>Verify your account with Sarang Sayang!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          <Img
            src={"https://sarangsayang.up.railway.app/logopng.png"}
            width="100"
            height="100"
            alt="SarangSayang"
          />
          <Hr style={hr} />
          <Text style={paragraph}>Hi {name}!</Text>
          <Text style={paragraph}>
            Welcome to Sarang Sayang, a platform for all things malay weddings.
            Use the button below to verify your account.
          </Text>
          <Button style={button} href={href}>
            Verify Your Account
          </Button>
          <Hr style={hr} />
          <Text style={paragraph}>
            We&apos;ll be here to help you with any step along the way. You can
            find answers to most questions on our{" "}
            <Link style={anchor} href="https://www.sarangsayang.com/faq">
              FAQ page
            </Link>{" "}
            and get in touch with us by replying to this email address.
          </Text>
          <Text style={paragraph}>
            Love, <br /> The Sarang Sayang team
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default VerifyUserEmail;

export const VerifyUserEmailHtml = (props: VerifyUserEmailProps) =>
  render(<VerifyUserEmail {...props} />, { pretty: true });

const main = {
  backgroundColor: "#C8E9F3",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const box = {
  padding: "0 48px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const paragraph = {
  color: "#525f7f",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
};

const anchor = {
  color: "rgb(96 165 250)",
};

const button = {
  backgroundColor: "rgb(59 130 246)",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
  padding: "10px",
};
