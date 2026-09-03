import { LegalPage } from "@/components/legal/LegalPage";

export const metadata = {
  title: "Privacy Policy · ChurnRate",
  description: "How ChurnRate collects, uses and protects customer data.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="3 September 2026"
      intro="ChurnRate analyses customer data on behalf of the businesses that use it. This policy explains what we collect, why we collect it, and the choices you have."
      sections={[
        {
          heading: "Information we collect",
          body: [
            "Account information. When you create a workspace we store your name, email address, hashed password and workspace name. Passwords are hashed with bcrypt and are never stored in plain text.",
            "Customer data you upload. To produce churn predictions we process the customer records you import — typically name, email, company, plan, revenue and activity timestamps. This data belongs to you; we act as a processor on your behalf.",
            "Usage data. We record basic operational logs such as request times and error traces so we can keep the service running and diagnose faults.",
          ],
        },
        {
          heading: "How we use it",
          body: [
            "We use your data to provide the service: scoring accounts for churn risk, producing dashboards and reports, and sending the alerts you configure.",
            "We do not sell your data, and we do not use one customer's data to train models offered to another customer.",
          ],
        },
        {
          heading: "Storage and security",
          body: [
            "Data is stored in PostgreSQL and transmitted over TLS. Access to production data is limited to staff who need it to operate the service.",
            "Authentication uses signed JSON Web Tokens scoped to your workspace, and every API request is checked against the workspace it belongs to.",
          ],
        },
        {
          heading: "Retention and deletion",
          body: [
            "We keep your data for as long as your workspace is active. Deleting your workspace removes its users, customers, predictions and events.",
            "You can request an export or deletion at any time by writing to the address below.",
          ],
        },
        {
          heading: "Your rights",
          body: [
            "Depending on where you live you may have the right to access, correct, export or delete personal data we hold about you, and to object to certain processing. We honour these requests for all users regardless of location.",
          ],
        },
        {
          heading: "Changes to this policy",
          body: [
            "If we make a material change we will update the date at the top of this page and notify workspace administrators by email before the change takes effect.",
          ],
        },
      ]}
    />
  );
}
