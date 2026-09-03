import { LegalPage } from "@/components/legal/LegalPage";

export const metadata = {
  title: "Terms of Service · ChurnRate",
  description: "The terms that govern use of the ChurnRate platform.",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="3 September 2026"
      intro="These terms govern your use of ChurnRate. By creating a workspace you agree to them on behalf of yourself and the organisation you represent."
      sections={[
        {
          heading: "Your account",
          body: [
            "You are responsible for the activity that happens under your workspace, including keeping credentials secure and managing who you invite.",
            "You must be authorised to share any customer data you upload, and to have it processed for the purpose of churn analysis.",
          ],
        },
        {
          heading: "Acceptable use",
          body: [
            "Do not use ChurnRate to store data you have no right to process, to attempt to breach the security of the service, or to resell access without a written agreement.",
            "We may suspend a workspace that puts the service or other customers at risk, and will tell you why when we do.",
          ],
        },
        {
          heading: "Predictions are estimates",
          body: [
            "Churn scores are statistical estimates produced from the data you supply. They are decision support, not guarantees, and should not be the sole basis for decisions with legal or financial consequences for an individual.",
            "Accuracy depends on the quality and completeness of the data you import.",
          ],
        },
        {
          heading: "Trials, billing and cancellation",
          body: [
            "Paid plans are billed in advance for the period you select. Trials convert to a paid plan only if you choose to continue.",
            "You can cancel at any time from your workspace settings; access continues to the end of the period you have paid for.",
          ],
        },
        {
          heading: "Availability",
          body: [
            "We aim to keep ChurnRate available and will give notice of planned maintenance where we reasonably can. The service is provided without warranty of uninterrupted availability.",
          ],
        },
        {
          heading: "Ending the agreement",
          body: [
            "You may stop using ChurnRate and delete your workspace at any time. We may end the agreement with notice if you materially breach these terms.",
            "On termination we delete your workspace data in line with the retention section of our Privacy Policy.",
          ],
        },
      ]}
    />
  );
}
