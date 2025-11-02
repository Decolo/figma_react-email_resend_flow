import 'dotenv/config';
import { sendEmail } from '../lib/resend';
import MybitTokenLaunch from '../emails/mybit-token-launch';
import VercelInviteUserEmail from '../emails/vercel-invite-user';

/**
 * Example: Send a Mybit token launch email
 */
async function sendMybitEmail() {
  try {
    const result = await sendEmail({
      to: 'recipient@example.com', // Replace with actual recipient
      from: 'onboarding@resend.dev', // Replace with your verified domain
      subject: 'New Token Launch: Meteora (MET)',
      react: MybitTokenLaunch({
        tokenName: 'Meteora',
        tokenSymbol: 'MET',
        tokenDescription: 'Learn more about Meteora by visiting their website and checking out their details on Solscan.',
        websiteUrl: 'https://meteora.ag',
        explorerUrl: 'https://solscan.io',
        acceptedCurrencies: 'USDT, USDC, SOL, or BBSOL',
        purchaseUrl: 'https://mybit.com/alpha',
      }),
      tags: [
        { name: 'category', value: 'token_launch' },
      ],
    });

    console.log('✅ Email sent successfully!');
    console.log('Email ID:', result.data?.id);
  } catch (error) {
    console.error('❌ Failed to send email:', error);
    process.exit(1);
  }
}

/**
 * Example: Send a Vercel invite email
 */
async function sendVercelInvite() {
  try {
    const result = await sendEmail({
      to: 'recipient@example.com', // Replace with actual recipient
      from: 'onboarding@resend.dev', // Replace with your verified domain
      subject: 'Join our team on Vercel',
      react: VercelInviteUserEmail({
        username: 'john_doe',
        invitedByUsername: 'Jane Smith',
        invitedByEmail: 'jane@example.com',
        teamName: 'Acme Corp',
        inviteLink: 'https://vercel.com/teams/invite/abc123',
        inviteFromIp: '192.168.1.1',
        inviteFromLocation: 'San Francisco, CA',
      }),
      tags: [
        { name: 'category', value: 'team_invite' },
      ],
    });

    console.log('✅ Email sent successfully!');
    console.log('Email ID:', result.data?.id);
  } catch (error) {
    console.error('❌ Failed to send email:', error);
    process.exit(1);
  }
}

/**
 * Main function - choose which example to run
 */
async function main() {
  const example = process.argv[2] || 'mybit';

  console.log(`\n🚀 Sending ${example} email...\n`);

  switch (example) {
    case 'mybit':
      await sendMybitEmail();
      break;
    case 'vercel':
      await sendVercelInvite();
      break;
    default:
      console.log('Usage: npm run send-email [mybit|vercel]');
      process.exit(1);
  }
}

main();
