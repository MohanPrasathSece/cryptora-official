import { LegalLayout } from "@/components/LegalLayout";

const sections = [
  { id: "introduction", title: "Introduction" },
  { id: "definitions", title: "Definitions" },
  { id: "info-we-collect", title: "Information We Collect" },
  { id: "info-you-provide", title: "Information You Voluntarily Provide" },
  { id: "auto-collected-info", title: "Automatically Collected Information" },
  { id: "purpose", title: "Purpose of Data Collection" },
  { id: "legal-basis", title: "Legal Basis for Processing" },
  { id: "how-we-use", title: "How We Use Personal Information" },
  { id: "crm-third-party", title: "CRM and Third-Party Service Providers" },
  { id: "cookies", title: "Cookies and Tracking Technologies" },
  { id: "security", title: "Data Security Measures" },
  { id: "retention", title: "Data Retention" },
  { id: "international", title: "International Data Transfers" },
  { id: "user-rights", title: "User Rights" },
  { id: "marketing", title: "Marketing Communications" },
  { id: "childrens-privacy", title: "Children’s Privacy" },
  { id: "third-party", title: "Third-Party Websites" },
  { id: "policy-updates", title: "Policy Updates" },
  { id: "contact", title: "Contact Information" },
];

export function PrivacyPolicy() {
  return (
    <LegalLayout
      title="Privacy Policy"
      lastUpdated={new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
      sections={sections}
    >
      <section id="introduction">
        <h2>Introduction</h2>
        <p>
          Welcome to Cryptora ("we," "our," or "us"). We are committed to protecting your privacy and ensuring you have a positive experience on our platform. This Privacy Policy outlines how we collect, use, process, and disclose your personal information when you use our website, services, and associated applications (collectively, the "Services").
        </p>
        <p>
          By accessing or using our Services, you consent to the practices described in this Privacy Policy. If you do not agree with this Privacy Policy, please do not use our Services.
        </p>
      </section>

      <section id="definitions">
        <h2>Definitions</h2>
        <ul>
          <li><strong>Personal Information:</strong> Information that identifies, relates to, describes, or is reasonably capable of being associated with a particular individual or household.</li>
          <li><strong>Platform:</strong> The digital infrastructure provided by Cryptora, including web applications and mobile interfaces.</li>
          <li><strong>CRM:</strong> Customer Relationship Management systems used to organize and manage interactions with current and potential users.</li>
        </ul>
      </section>

      <section id="info-we-collect">
        <h2>Information We Collect</h2>
        <p>
          We collect information to provide, maintain, and improve our Services. The types of information we collect depend on how you interact with our Platform and the Services you use.
        </p>
      </section>

      <section id="info-you-provide">
        <h2>Information You Voluntarily Provide</h2>
        <p>
          We collect Personal Information that you voluntarily provide to us when you:
        </p>
        <ul>
          <li><strong>Register for an Account:</strong> When you sign up, we collect your full name, email address, and phone number.</li>
          <li><strong>Contact Us:</strong> When you submit an enquiry via our contact forms, we collect your full name, email address, phone number, and any optional message or description you choose to provide.</li>
          <li><strong>Authenticate:</strong> When you log into your account, we utilize your email address to verify your credentials against our secure Blob storage system.</li>
        </ul>
      </section>

      <section id="auto-collected-info">
        <h2>Automatically Collected Information</h2>
        <p>
          When you access or use our Platform, we may automatically collect certain information about your device and usage patterns, including:
        </p>
        <ul>
          <li><strong>Log Data:</strong> IP addresses, browser type, operating system, referring URLs, pages viewed, and access times.</li>
          <li><strong>Device Information:</strong> Hardware models, device identifiers, and mobile network information.</li>
          <li><strong>Analytics Data:</strong> Interactions with platform features, click-stream data, and performance metrics.</li>
        </ul>
      </section>

      <section id="purpose">
        <h2>Purpose of Data Collection</h2>
        <p>
          We collect and use your Personal Information to:
        </p>
        <ul>
          <li>Provide, operate, and maintain our Services.</li>
          <li>Process and manage your account registrations and authentication.</li>
          <li>Respond to your inquiries, customer service requests, and support needs.</li>
          <li>Send administrative information, such as updates, security alerts, and support messages.</li>
          <li>Improve our platform functionality and user experience.</li>
        </ul>
      </section>

      <section id="legal-basis">
        <h2>Legal Basis for Processing</h2>
        <p>
          Depending on your location (such as the European Economic Area or the UK), our legal basis for collecting and using the Personal Information described above will depend on the context in which we collect it. We normally collect Personal Information from you only where:
        </p>
        <ul>
          <li>We need the Personal Information to perform a contract with you.</li>
          <li>The processing is in our legitimate interests and not overridden by your data protection interests or fundamental rights and freedoms.</li>
          <li>We have your consent to do so.</li>
        </ul>
      </section>

      <section id="how-we-use">
        <h2>How We Use Personal Information</h2>
        <p>
          Your Personal Information is strictly used for the purposes outlined in this policy. We do not sell, rent, or trade your Personal Information to third parties for commercial purposes. Data is utilized primarily to ensure secure authentication, personalize your trading dashboard, and facilitate direct communication regarding your account.
        </p>
      </section>

      <section id="crm-third-party">
        <h2>CRM and Third-Party Service Providers</h2>
        <p>
          To manage user relationships and provide seamless support, we integrate with third-party Customer Relationship Management (CRM) systems and storage providers. 
        </p>
        <ul>
          <li><strong>CRM Integration:</strong> When you sign up or submit a contact form, your provided details (Name, Email, Phone Number, and Message) are securely transmitted to our CRM database to register you as a lead and facilitate support. Login events do not transmit data to the CRM.</li>
          <li><strong>Vercel Blob Storage:</strong> We utilize Vercel Blob storage to securely maintain user credential structures. Upon signup, your non-sensitive profile identifiers are provisioned in our blob storage environment to enable subsequent passwordless or email-based login flows.</li>
        </ul>
        <p>
          These third-party providers are contractually obligated to protect your data and are prohibited from using your Personal Information for any purpose other than providing services to us.
        </p>
      </section>

      <section id="cookies">
        <h2>Cookies and Tracking Technologies</h2>
        <p>
          We use cookies, web beacons, and similar tracking technologies to track the activity on our Platform and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
        </p>
      </section>

      <section id="security">
        <h2>Data Security Measures</h2>
        <p>
          We implement appropriate technical and organizational measures to protect the Personal Information we collect and process. This includes encryption of data in transit and at rest, secure API integrations for our CRM, and strict access controls. While we strive to use commercially acceptable means to protect your Personal Information, no method of transmission over the Internet or method of electronic storage is 100% secure.
        </p>
      </section>

      <section id="retention">
        <h2>Data Retention</h2>
        <p>
          We will retain your Personal Information only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your Personal Information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our legal agreements and policies.
        </p>
      </section>

      <section id="international">
        <h2>International Data Transfers</h2>
        <p>
          Your information, including Personal Information, may be transferred to—and maintained on—computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ from those of your jurisdiction. By utilizing our Services, you consent to the transfer of your data to our secure servers and third-party providers internationally.
        </p>
      </section>

      <section id="user-rights">
        <h2>User Rights</h2>
        <p>
          Depending on your jurisdiction, you may have the following rights regarding your Personal Information:
        </p>
        <ul>
          <li>The right to access, update, or delete the information we have on you.</li>
          <li>The right of rectification if your information is inaccurate or incomplete.</li>
          <li>The right to object to our processing of your Personal Information.</li>
          <li>The right to request the restriction of processing.</li>
          <li>The right to data portability.</li>
          <li>The right to withdraw consent at any time where we relied on your consent to process your Personal Information.</li>
        </ul>
      </section>

      <section id="marketing">
        <h2>Marketing Communications</h2>
        <p>
          With your consent, we may use your Personal Information to contact you with newsletters, marketing, or promotional materials. You may opt-out of receiving any, or all, of these communications from us by following the unsubscribe link or instructions provided in any email we send.
        </p>
      </section>

      <section id="childrens-privacy">
        <h2>Children’s Privacy</h2>
        <p>
          Our Services do not address anyone under the age of 18. We do not knowingly collect personally identifiable information from anyone under the age of 18. If you are a parent or guardian and you are aware that your child has provided us with Personal Information, please contact us.
        </p>
      </section>

      <section id="third-party">
        <h2>Third-Party Websites</h2>
        <p>
          Our Platform may contain links to other websites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
        </p>
      </section>

      <section id="policy-updates">
        <h2>Policy Updates</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy. You are advised to review this Privacy Policy periodically for any changes.
        </p>
      </section>

      <section id="contact">
        <h2>Contact Information</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us via the contact form on our website or by reaching out to our support team directly.
        </p>
      </section>
    </LegalLayout>
  );
}
