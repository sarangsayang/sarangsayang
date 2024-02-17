import {
  Body,
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

export const WelcomeVendorEmail = () => (
  <Html>
    <Head />
    <Preview>Singapore&#39;s largest malay wedding directory</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          <Img
            src={"https://www.sarangsayang.com/logopng.png"}
            width="100"
            height="100"
            alt="SarangSayang"
          />
          <Hr style={hr} />
          <Text style={paragraph}>Welcome!</Text>
          <Text style={paragraph}>
            Welcome to Sarang Sayang, a platform for all things malay weddings.
          </Text>
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

export default WelcomeVendorEmail;

const main = {
  backgroundColor: "#FDE046",
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
