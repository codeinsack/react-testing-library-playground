import { useTranslation } from "react-i18next";
import withHover from "../../HOCs/withHover";

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  return (
    <>
      <img
        src="http://purecatamphetamine.github.io/country-flag-icons/3x2/RU.svg"
        title="Russian"
        width="50"
        alt="Russian"
        onClick={() => i18n.changeLanguage("ru")}
      />
      <img
        src="http://purecatamphetamine.github.io/country-flag-icons/3x2/GB.svg"
        title="English"
        width="50"
        alt="English"
        onClick={() => i18n.changeLanguage("en")}
      />
    </>
  );
};

export default withHover(LanguageSelector);
