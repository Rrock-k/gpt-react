const { execSync } = require('child_process');

try {
  console.log('Starting Next.js app...');
  const output = execSync('pnpm run start', { stdio: 'inherit' });
  console.log(output.toString());
} catch (error) {
  console.error('Error starting Next.js app:', error);
  process.exit(1);
}
