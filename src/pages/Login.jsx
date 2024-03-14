// import LetterLogo from "../assets/icons/letter_logo.png";
import LetterLogo from "../assets/icons/Rectangle.svg";

export default function Login() {
  return (
    <div className="flex">
      <div className="w-1/2">
        <div className="flex flex-col">
          <img src={LetterLogo} alt="letter_logo" />
          <span className="">To continue, sign in to Lurny</span>
        </div>
      </div>
      <div className="w-1/2"></div>
    </div>
  );
}
