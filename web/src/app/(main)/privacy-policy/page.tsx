import Link from "next/link";
import PageContainer from "../../../components/page-containers/page-container";

export default function PrivacyPolicyPage() {
  return (
    <PageContainer className="p-4 pb-14">
      <div className="flex items-center justify-center p-12">
        <h1 className="mt-0 text-center text-5xl">
          Privacy Policy & Terms of Use
        </h1>
      </div>

      <section>
        <p>
          This privacy policy, and the terms of use, will help you understand
          how we use your data you provide to us when you visit and use{" "}
          <Link href="/">{process.env.NEXT_PUBLIC_URL}</Link>.
        </p>
        <p>
          We reserve the right to change this policy at any given time, of which
          you will be promptly updated by email, in case we are still using your
          information(see section <a>Link to section delete data</a>). If you
          want to make sure that you are up to date with the latest changes, we
          advise you to frequently visit this page.
        </p>
        <p>
          While using our app, do not forget it is currently under development,
          and our policy is made to reflect that.
        </p>
      </section>
      <section>
        <h2>What User Data We Collect</h2>
        <p>When you visit the website, we may collect the following data:</p>
        <ul>
          <li>Your IP address.</li>
          <li>Your contact information and email address.</li>
          <li>Data profile regarding your online behavior on our website.</li>
        </ul>
      </section>
      <section>
        <h2>Why We Collect Your Data</h2>
        <p>
          Anything inserted in the app may possibly be viewed by the moderators.
          Please do not insert any sensitive data.
        </p>
        <p>We look at the data in order to:</p>
        <ul>
          <li>Improve our apps.</li>
          <li>Moderate the content.</li>
          <li>Occasionally contact you in urgent matters.</li>
        </ul>
        <p>
          We also reserve the right to delete all your data at any given point.
        </p>
        <p>We could do it for the following reasons:</p>
        <ul>
          <li>Our app is entering a different development stage.</li>
          <li>
            You are identified as a possible threat to someone or the app.
          </li>
        </ul>
      </section>
      <section>
        <h2>Our Cookie Policy</h2>
        <p>
          Once you agree to allow our website to use cookies, you also agree to
          use the data it collects regarding your online behavior (analyze web
          traffic, web pages you visit and spend the most time on).
        </p>
        <p>
          The data we collect by using cookies is used to customize our website
          to your needs. After we use the data for statistical analysis, the
          data is completely removed from our systems.
        </p>
      </section>
      <section>
        <h2>Conditions of Use</h2>
        <p>
          By using this app, you certify that you have read and reviewed this
          agreement and that you agree to comply with its terms.
        </p>
      </section>
      <span className="mt-0">
        <strong>Last updated:</strong> 25/03/2024
      </span>
    </PageContainer>
  );
}
