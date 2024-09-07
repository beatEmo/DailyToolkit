import logoSvg from "../icons/logo.svg"; // /src/ReactPlayground/components/icons/logo.svg
import styles from "./index.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <section className={styles.logo}>
        <img alt="logo" src={logoSvg} />
        <span>React Playground</span>
      </section>
    </header>
  );
};

export default Header;
