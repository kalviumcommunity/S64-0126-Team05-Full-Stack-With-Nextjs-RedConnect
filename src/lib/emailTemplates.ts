export const welcomeTemplate = (userName: string) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.6;">
    <h2>Welcome to TrustMail, ${userName}!</h2>
    <p>We’re thrilled to have you onboard.</p>
    <p>
      Get started by visiting
      <a href="https://app.kalvium.community">Kalvium Portal</a>.
    </p>
    <hr />
    <small>This is an automated email. Please do not reply.</small>
  </div>
`;
