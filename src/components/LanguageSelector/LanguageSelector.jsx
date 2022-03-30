import { useTranslation } from "react-i18next";
import withHover from "../../HOCs/withHover";

const LanguageSelector = ({ on }) => {
  const { i18n } = useTranslation();

  let size = 24;
  if (on) {
    size = 48;
  }

  return (
    <>
      <img
        src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/RU.svg`}
        title="Russian"
        width={size}
        alt="Russian"
        onClick={() => i18n.changeLanguage("ru")}
      />
      <img
        src="http://purecatamphetamine.github.io/country-flag-icons/3x2/GB.svg"
        title="English"
        width={size}
        alt="English"
        onClick={() => i18n.changeLanguage("en")}
      />
    </>
  );
};

export default withHover(LanguageSelector);
