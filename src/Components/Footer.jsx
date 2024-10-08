import React from "react";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h2 className={styles.footerLogo}>LOGO</h2>
          <p className={styles.footerDescription}>
            NN is simply dummy text of the printing and typesetting industry.
          </p>
          <p className={styles.footerCopyright}>@Nankie</p>
        </div>
        <nav className={styles.footerNav}>
          <h3 className={styles.footerNavTitle}>About us</h3>
          <ul className={styles.footerNavList}>
            <li>
              <a href="#zeux">Zeux</a>
            </li>
            <li>
              <a href="#portfolio">Portfolio</a>
            </li>
            <li>
              <a href="#careers">Careers</a>
            </li>
            <li>
              <a href="#contact">Contact us</a>
            </li>
          </ul>
        </nav>
        <div className={styles.footerContact}>
          <h3 className={styles.footerContactTitle}>Contact us</h3>
          <p className={styles.footerContactDescription}>
            NN is simply dummy text of the printing and typesetting industry.
          </p>
          <div className={styles.footerContactInfo}>
            <p className={styles.footerPhone}>+123 456 7890</p>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/197fea26c957c08173051d2b17ab6f74eb78452684f06e21007e89d1c676bf42?placeholderIfAbsent=true&apiKey=69cce3e37c2b45db9f522a94a61877ff"
              alt="Social media icons"
              className={styles.footerSocialIcons}
            />
          </div>
        </div>
      </div>
      <div className={styles.footerDivider}></div>
      <p className={styles.footerLegal}>
        Copyright ® 2024 prodesigner All rights Reserved
      </p>
    </footer>
  );
};

export default Footer;