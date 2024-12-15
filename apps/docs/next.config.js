/** @type {import('next').NextConfig} */

assertEnv();

const nextConfig = {};

export default nextConfig;

/** 환경변수 검증 */
function assertEnv() {
  const variables = [
    "EXAMPLE_DB_URL",
  ];

  const missingVariables = variables.filter((v) => !process.env[v]);

  if (missingVariables.length > 0) {
    throw new Error(`Missing environment variables: ${missingVariables.join(", ")}`);
  }
}