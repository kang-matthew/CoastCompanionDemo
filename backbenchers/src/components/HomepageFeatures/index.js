import React from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import CCLogo from '@site/static/img/coastcompanion-logo-1.svg';
import Admonition from '@theme/Admonition';
import ComputerIcon from '@site/static/img/undraw_docusaurus_tree.svg';
import Link from '@docusaurus/Link';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import version from "../../version"



// Edit the Constants if you are just updating the version number
const preReleaseVersion = version;


// FROM MUI MODAL EXAMPLE
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: '50vw',
  bgcolor: 'var(--ifm-background-color)',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  paddingBottom: '5px',
};

function ChatbotModalButton() {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (
    <>
      <Button onClick={handleOpen} variant="outlined" size="large" style={{ fontFamily: "Coast Sans" }} >
        See Demo
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" style={{ fontFamily: "Coast Sans" }}>
            You are accessing the <span style={{ color: "#0050F8" }}>CoastCompanion</span> Chatbot Demo
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{ fontFamily: "Coast Sans" }}>
            By continuing, you acknowledge that CoastCompanion is <u>not</u> a product or service<br />offered by Coast Capital Savings®.
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{ fontFamily: "Coast Sans" }}>
            To continue, select one of the pages for the Demo:
          </Typography>
          <div className='options-container' style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px", marginTop: "20px" }}>
            <Button onClick={handleClose} href='embed/CCS.html' target='_blank' variant="outlined" size="large" color="primary" style={{ fontFamily: "Coast Sans", width: "22vw" }} >
              Coast Capital Savings Website
            </Button>
            <Button onClick={handleClose} href='embed/wikipedia.html' target="_blank" variant="outlined" size="large" color="primary" style={{ fontFamily: "Coast Sans", width: "22vw" }} >
              Wikipedia Page
            </Button>
            <Button onClick={handleClose} href='embed/blank.html' target="_blank" variant="outlined" size="large" color="primary" style={{ fontFamily: "Coast Sans", width: "22vw" }} >
              Simple HTML Page
            </Button>
          </div>
          <div className='modal-footer' style={{ display: "flex", alignItems: "right", justifyContent: "right", marginTop: "20px" }}>
            <Button color="error" onClick={handleClose}>Return To Main Page</Button>
          </div>
        </Box>
      </Modal>
    </>
  )
}

function AdminPanelModalButton() {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (
    <>
      <Button onClick={handleOpen} variant="outlined" size="large" style={{ fontFamily: "Coast Sans" }} >
        See Demo
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" style={{ fontFamily: "Coast Sans" }}>
            You are accessing the <span style={{ color: "#0050F8" }}>CoastCompanion</span> Admin Panel Demo
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{ fontFamily: "Coast Sans" }}>
            By continuing, you acknowledge that CoastCompanion is <u>not</u> a product or service<br />offered by Coast Capital Savings®.
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{ fontFamily: "Coast Sans" }}>
            To continue, click the button below:
          </Typography>
          <div className='options-container' style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px", marginTop: "20px" }}>
            <Button onClick={handleClose} href='https://dev.d3e8utbvtcc4kx.amplifyapp.com/' target="_blank" variant="outlined" size="large" color="primary" style={{ fontFamily: "Coast Sans" }} >
              Admin Panel
            </Button>
          </div>
          <div className='modal-footer' style={{ display: "flex", alignItems: "right", justifyContent: "right", marginTop: "20px" }}>
            <Button color="error" onClick={handleClose}>Return To Main Page</Button>
          </div>
        </Box>
      </Modal>
    </>
  )

}


export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container" id="demo-container">

        <Admonition type="info" title="new release!">
          <p>Pre-Release Version {preReleaseVersion} has been released. For more information, please refer to the <Link to={`dev/release-notes/${preReleaseVersion}`}>Release Notes</Link></p>
        </Admonition>

        <div className={styles.row}>

          <div className={clsx('col col--4', styles.featureCard)}>
            <div className="text--center">
              <CCLogo className={styles.featureSvg} />
            </div>
            <div className="text--center padding-horiz--md">
              <Heading as="h3">Chatbot (v{preReleaseVersion})</Heading>
              <p>User Friendly and Powerful Chatbot powered by Amazon Bedrock Titan Embeddings <span style={{ whiteSpace: "nowrap" }}>G1 - Text Model</span> </p>
              <ChatbotModalButton />
            </div>
          </div>

          <div className={clsx('col col--4', styles.featureCard)}>
            <div className="text--center">
              <div className={styles.adminLogoContainer}>
                <img src="img/CCadminlogo.png" className={styles.adminLogo} />
              </div>
            </div>
            <div className="text--center padding-horiz--md">
              <Heading as="h3">Admin Panel (v{preReleaseVersion})</Heading>
              <p>Intuitive and Powerful Administrator Panel to manage and gain analytics from CoastCompanion</p>
              <AdminPanelModalButton />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
