import { useEffect } from "react";

function TranslateComponent() {
  useEffect(() => {
    // Add the Google Translate script to the page
    var googleTranslateScript = document.createElement("script");
    googleTranslateScript.type = "text/javascript";
    googleTranslateScript.async = true;
    googleTranslateScript.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";

    document.body.appendChild(googleTranslateScript);

    // Define the callback function that the Google Translate script will invoke
    window.googleTranslateElementInit = function () {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,hi,bn,te,mr,ta,gu,kn,ml,pa",
        },
        "google_translate_element"
      );
    };
  }, []);

  return (
    <div className="text-white mt-[4rem]" id="google_translate_element"></div>
  );
}

export default TranslateComponent;
