import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import styles from './index.module.css';
import CCLogo from '@site/static/img/coastcompanion-logo-1.svg';
import Button from '@mui/material/Button';


function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBannerMain)}>
      <div className="container">
        <div className={styles.animationContainer}>
          <div className={styles.headingDescriptor}>
            <CCLogo className={styles.headerLogo}/>
            <p className={styles.headerSubtext}>a chatbot that's for real</p>
            <Button onClick={() => document.getElementById('demo-container').scrollIntoView({ behavior: 'smooth' })} variant="contained" size="large" color="primary" sx={{background: "white", color: "var(--header-bg-color)", fontFamily: "Coast Sans"}}>
              See Newest Pre-Release
            </Button>
          </div>
          <img src="img/chat-sample.png" className={styles.chatImage} />
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main className={styles.main}>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
