import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from '@react-email/components';

interface MybitTokenLaunchProps {
  tokenName?: string;
  tokenSymbol?: string;
  tokenDescription?: string;
  websiteUrl?: string;
  explorerUrl?: string;
  acceptedCurrencies?: string;
  purchaseUrl?: string;
  iconUrl?: string;
  purchaseIconUrl?: string;
  transferIconUrl?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';

export const MybitTokenLaunch = ({
  tokenName = 'Meteora',
  tokenSymbol = 'MET',
  tokenDescription = 'Learn more about Meteora by visiting their website and checking out their details on Solscan.',
  websiteUrl = 'https://meteora.ag',
  explorerUrl = 'https://solscan.io',
  acceptedCurrencies = 'USDT, USDC, SOL, or BBSOL',
  purchaseUrl = 'https://mybit.com',
  iconUrl,
  purchaseIconUrl,
  transferIconUrl,
}: MybitTokenLaunchProps) => {
  return (
    <Html>
      <Head />
      <Preview>New Token Launch: {tokenName} ({tokenSymbol})</Preview>
      <Tailwind>
        <Body className="bg-[#181611] font-sans">
          <Container className="mx-auto max-w-[600px]">
            {/* Header */}
            <Section className="bg-[#181611] p-4">
              <Heading className="m-0 text-center text-2xl font-bold text-[#f2ad0d]">
                Mybit Alpha
              </Heading>
            </Section>

            {/* Main Content */}
            <Section className="px-4 py-4">
              {/* Title */}
              <Heading className="mb-6 text-center text-[32px] font-bold leading-[40px] tracking-[-0.48px] text-white">
                New Token Launch: {tokenName} ({tokenSymbol})
              </Heading>

              {/* Intro Text */}
              <Text className="mb-6 text-center text-base leading-6 text-white">
                We are thrilled to announce the launch of a new token, {tokenName} ({tokenSymbol}), on the Mybit platform!
              </Text>

              {/* Token Details Section */}
              <Section className="mb-6">
                <Heading className="mb-3 text-[22px] font-bold leading-[27.5px] tracking-[-0.33px] text-white">
                  Token Details
                </Heading>

                <Section className="flex gap-4">
                  {iconUrl && (
                    <Section className="flex-none">
                      <Img
                        src={iconUrl}
                        width="28"
                        height="28"
                        alt={`${tokenName} icon`}
                        className="block"
                      />
                    </Section>
                  )}
                  <Section>
                    <Heading className="mb-2 text-base font-semibold leading-6 text-white">
                      {tokenName} ({tokenSymbol})
                    </Heading>
                    <Text className="mb-2 text-sm leading-5 text-gray-400">
                      {tokenDescription}
                    </Text>
                    <Section className="flex gap-4">
                      <Link
                        href={websiteUrl}
                        className="text-sm leading-5 text-[#f2ad0d] underline"
                      >
                        Website
                      </Link>
                      <Link
                        href={explorerUrl}
                        className="text-sm leading-5 text-[#f2ad0d] underline"
                      >
                        Solscan
                      </Link>
                    </Section>
                  </Section>
                </Section>
              </Section>

              {/* How to Purchase Section */}
              <Section className="mb-6">
                <Heading className="mb-3 text-[22px] font-bold leading-[27.5px] tracking-[-0.33px] text-white">
                  How to Purchase
                </Heading>

                {/* Accepted Currencies */}
                <Section className="mb-4 flex gap-4">
                  {purchaseIconUrl && (
                    <Section className="flex-none">
                      <Img
                        src={purchaseIconUrl}
                        width="28"
                        height="28"
                        alt="Purchase icon"
                        className="block"
                      />
                    </Section>
                  )}
                  <Section>
                    <Heading className="mb-2 text-base font-semibold leading-6 text-white">
                      Accepted Currencies
                    </Heading>
                    <Text className="text-sm leading-5 text-gray-400">
                      You can purchase {tokenName} ({tokenSymbol}) using {acceptedCurrencies}.
                    </Text>
                  </Section>
                </Section>

                {/* View and Sell */}
                <Section className="flex gap-4">
                  {transferIconUrl && (
                    <Section className="flex-none">
                      <Img
                        src={transferIconUrl}
                        width="28"
                        height="28"
                        alt="Transfer icon"
                        className="block"
                      />
                    </Section>
                  )}
                  <Section>
                    <Heading className="mb-2 text-base font-semibold leading-6 text-white">
                      View and Sell Your Tokens
                    </Heading>
                    <Text className="text-sm leading-5 text-gray-400">
                      After purchase, your {tokenSymbol} tokens will be visible in your account on both the Mybit app and website. You can sell your tokens directly on the platform.
                    </Text>
                  </Section>
                </Section>
              </Section>

              {/* Important Note */}
              <Section className="mb-4 rounded-lg bg-[#393428] p-4">
                <Text className="m-0 text-sm leading-5 text-white">
                  <strong>Important Note:</strong> On-chain assets like {tokenName} ({tokenSymbol}) are not withdrawable to external wallets. They can only be exchanged within the Mybit platform.
                </Text>
              </Section>

              {/* CTA Button */}
              <Section className="text-center">
                <Button
                  href={purchaseUrl}
                  className="rounded-lg bg-[#f2ad0d] px-3 py-3 text-center text-base font-bold text-black"
                >
                  Purchase {tokenName} ({tokenSymbol}) Now
                </Button>
              </Section>
            </Section>

            {/* Footer */}
            <Section className="p-4">
              <Text className="mb-2 text-center text-xs leading-[18px] text-gray-400">
                © 2023 Mybit Alpha. All rights reserved.
              </Text>
              <Text className="mb-2 text-center text-xs leading-[18px] text-gray-400">
                You are receiving this email because you opted in at our website.
              </Text>
              <Text className="text-center text-xs leading-[18px] text-gray-400">
                <Link href="#" className="text-gray-400 underline">
                  Unsubscribe
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

MybitTokenLaunch.PreviewProps = {
  tokenName: 'Meteora',
  tokenSymbol: 'MET',
  tokenDescription: 'Learn more about Meteora by visiting their website and checking out their details on Solscan.',
  websiteUrl: 'https://meteora.ag',
  explorerUrl: 'https://solscan.io',
  acceptedCurrencies: 'USDT, USDC, SOL, or BBSOL',
  purchaseUrl: 'https://mybit.com/alpha',
  iconUrl: 'https://www.figma.com/api/mcp/asset/48e85a56-c4e0-4ba0-93e0-557a6e4600d6',
  purchaseIconUrl: 'https://www.figma.com/api/mcp/asset/1f8bcdd6-b972-4686-9c80-72c3ffc3e8aa',
  transferIconUrl: 'https://www.figma.com/api/mcp/asset/ba234794-13d8-4e77-8c58-5c237f737a7d',
} as MybitTokenLaunchProps;

export default MybitTokenLaunch;
