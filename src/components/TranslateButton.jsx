import { useEffect } from "react";

const TranslateButton = () => {
  const languages = [
    { code: "en", label: "English" },
    { code: "es", label: "Spanish" },
    { code: "fr", label: "French" },
    // Add more languages as needed.
  ];

  useEffect(() => {
    const googleTranslateScriptId = "google-translate-script";

    // Check if the script is already added
    if (!document.getElementById(googleTranslateScriptId)) {
      const addScript = document.createElement("script");
      addScript.type = "text/javascript";
      addScript.async = true;
      addScript.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      addScript.id = googleTranslateScriptId;
      document.body.appendChild(addScript);
    }

    window.googleTranslateElementInit = googleTranslateElementInit;

    return () => {
      // Cleanup the script when the component unmounts
      document.getElementById(googleTranslateScriptId)?.remove();
    };
  }, []);

  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false,
        multilanguagePage: true,
      },
      "google_translate_element"
    );
  };

  const changeLanguage = (languageCode) => {
    const iframe = document.querySelector("iframe.goog-te-menu-frame");

    if (!iframe) {
      return;
    }

    const selectFieldInsideIframe =
      iframe.contentWindow.document.querySelector(".goog-te-combo");

    if (selectFieldInsideIframe) {
      selectFieldInsideIframe.value = languageCode;
      selectFieldInsideIframe.dispatchEvent(new Event("change"));
    }
  };

  return (
    <>
      <div id="google_translate_element" style={{ display: "none" }}></div>
      <div>
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className="focus:outline-none m-2 p-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {lang.label}
          </button>
        ))}
      </div>
    </>
  );
};

export default TranslateButton;
