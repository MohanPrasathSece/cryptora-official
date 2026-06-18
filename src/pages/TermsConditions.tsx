import { LegalLayout } from "@/components/LegalLayout";

const sections = [
  { id: "acceptance", title: "Acceptance of Terms" },
  { id: "eligibility", title: "Eligibility" },
  { id: "purpose", title: "Website Purpose" },
  { id: "responsibilities", title: "User Responsibilities" },
  { id: "acceptable-use", title: "Acceptable Use" },
  { id: "prohibited", title: "Prohibited Activities" },
  { id: "intellectual-property", title: "Intellectual Property" },
  { id: "accuracy", title: "Accuracy of Information" },
  { id: "no-advice", title: "No Financial, Investment, Tax, or Legal Advice" },
  { id: "crypto-risk", title: "Cryptocurrency Risk Disclosure" },
  { id: "no-guarantee", title: "No Guarantee of Investment Returns" },
  { id: "liability", title: "Limitation of Liability" },
  { id: "indemnification", title: "Indemnification" },
  { id: "third-party", title: "Third-Party Links" },
  { id: "privacy", title: "Privacy Policy Reference" },
  { id: "suspension", title: "Suspension or Termination of Access" },
  { id: "governing-law", title: "Governing Law" },
  { id: "dispute", title: "Dispute Resolution" },
  { id: "severability", title: "Severability" },
  { id: "changes", title: "Changes to These Terms" },
  { id: "contact", title: "Contact Information" },
];

export function TermsConditions() {
  return (
    <LegalLayout
      title="Terms & Conditions"
      lastUpdated={new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
      sections={sections}
    >
      <section id="acceptance">
        <h2>Acceptance of Terms</h2>
        <p>
          By accessing or using the Crypto AI website and platform ("Services"), you agree to be bound by these Terms and Conditions ("Terms"). If you disagree with any part of the terms, then you may not access the Service. These Terms apply to all visitors, users, and others who access or use the Service.
        </p>
      </section>

      <section id="eligibility">
        <h2>Eligibility</h2>
        <p>
          You must be at least 18 years of age to use our Services. By using our Services, you warrant and represent that you are at least 18 years of age and possess the legal authority, right, and freedom to enter into a binding agreement based on these Terms.
        </p>
      </section>

      <section id="purpose">
        <h2>Website Purpose</h2>
        <p>
          Crypto AI provides an artificial intelligence-driven analytics and portfolio tracking interface. Our platform is designed to aggregate market data, surface trading insights, and provide organizational tools for digital asset tracking. The platform operates strictly as an informational and organizational tool.
        </p>
      </section>

      <section id="responsibilities">
        <h2>User Responsibilities</h2>
        <p>
          You are responsible for safeguarding the password and credentials that you use to access the Service. You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account. You assume total responsibility and risk for your use of the platform.
        </p>
      </section>

      <section id="acceptable-use">
        <h2>Acceptable Use</h2>
        <p>
          You agree to use the Service only for lawful purposes and in accordance with these Terms. You are permitted to use the platform for personal, non-commercial portfolio tracking and market analysis as provided by our intended functionality.
        </p>
      </section>

      <section id="prohibited">
        <h2>Prohibited Activities</h2>
        <p>
          You agree not to engage in any of the following prohibited activities:
        </p>
        <ul>
          <li>Using the Service in any way that violates any applicable national or international law or regulation.</li>
          <li>Attempting to interfere with, compromise the system integrity or security, or decipher any transmissions to or from the servers running the Service.</li>
          <li>Taking any action that imposes an unreasonable or disproportionately large load on our infrastructure.</li>
          <li>Uploading invalid data, viruses, worms, or other software agents through the Service.</li>
          <li>Impersonating another person or otherwise misrepresenting your affiliation with a person or entity.</li>
        </ul>
      </section>

      <section id="intellectual-property">
        <h2>Intellectual Property</h2>
        <p>
          The Service and its original content, features, and functionality are and will remain the exclusive property of Crypto AI and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Crypto AI.
        </p>
      </section>

      <section id="accuracy">
        <h2>Accuracy of Information</h2>
        <p>
          While we strive to provide accurate, up-to-date market data and insights via our AI tools, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the data presented on the Platform. Any reliance you place on such information is therefore strictly at your own risk.
        </p>
      </section>

      <section id="no-advice">
        <h2>No Financial, Investment, Tax, or Legal Advice</h2>
        <p>
          <strong>All content and insights provided by Crypto AI, including AI-generated suggestions, are for informational purposes only.</strong> They do not constitute financial, investment, tax, or legal advice. You should not construe any such information or other material as a solicitation, recommendation, endorsement, or offer by Crypto AI to buy or sell any digital assets or other financial instruments.
        </p>
      </section>

      <section id="crypto-risk">
        <h2>Cryptocurrency Risk Disclosure</h2>
        <p>
          Trading and investing in cryptocurrencies and digital assets involve significant risk. Prices are highly volatile, and you can lose all of your invested capital. You should carefully consider whether trading or holding digital assets is suitable for you in light of your financial condition. Crypto AI does not execute trades on your behalf and assumes no responsibility for your trading decisions.
        </p>
      </section>

      <section id="no-guarantee">
        <h2>No Guarantee of Investment Returns</h2>
        <p>
          Past performance of any trading strategy, asset, or insight surfaced by our AI is not indicative of future results. Crypto AI provides no guarantees whatsoever regarding investment returns, profit, or the avoidance of loss.
        </p>
      </section>

      <section id="liability">
        <h2>Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by applicable law, in no event shall Crypto AI, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use, or alteration of your transmissions or content.
        </p>
      </section>

      <section id="indemnification">
        <h2>Indemnification</h2>
        <p>
          You agree to defend, indemnify, and hold harmless Crypto AI and its licensee and licensors, and their employees, contractors, agents, officers, and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees), resulting from or arising out of a) your use and access of the Service, or b) a breach of these Terms.
        </p>
      </section>

      <section id="third-party">
        <h2>Third-Party Links</h2>
        <p>
          Our Service may contain links to third-party web sites or services that are not owned or controlled by Crypto AI. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party web sites or services. You further acknowledge and agree that Crypto AI shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods, or services available on or through any such web sites or services.
        </p>
      </section>

      <section id="privacy">
        <h2>Privacy Policy Reference</h2>
        <p>
          Your use of the Service is also governed by our Privacy Policy. Please review our Privacy Policy, which outlines our data collection, usage, and storage practices, including our integration with CRM databases and secure storage facilities.
        </p>
      </section>

      <section id="suspension">
        <h2>Suspension or Termination of Access</h2>
        <p>
          We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.
        </p>
      </section>

      <section id="governing-law">
        <h2>Governing Law</h2>
        <p>
          These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which our primary business operations are located, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
        </p>
      </section>

      <section id="dispute">
        <h2>Dispute Resolution</h2>
        <p>
          Any dispute, controversy, or claim arising out of or relating to these Terms, or the breach, termination, or invalidity thereof, shall be settled by arbitration in accordance with the standard commercial arbitration rules of our jurisdiction. The language to be used in the arbitral proceedings shall be English.
        </p>
      </section>

      <section id="severability">
        <h2>Severability</h2>
        <p>
          If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service, and supersede and replace any prior agreements we might have between us regarding the Service.
        </p>
      </section>

      <section id="changes">
        <h2>Changes to These Terms</h2>
        <p>
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
        </p>
      </section>

      <section id="contact">
        <h2>Contact Information</h2>
        <p>
          If you have any questions about these Terms, please contact us through the available forms on our website or by reaching out to our official support channels.
        </p>
      </section>
    </LegalLayout>
  );
}
