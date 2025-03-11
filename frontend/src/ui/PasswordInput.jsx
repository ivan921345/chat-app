import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

const Passwrodinput = ({ onChange, value }) => {
  const [isShowingPassword, setIsShowingPassword] = useState(false);

  return (
    <label className="input w-[100%] relative">
      <svg
        className="h-[1em] opacity-50"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <g
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="2.5"
          fill="none"
          stroke="currentColor"
        >
          <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
          <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
        </g>
      </svg>
      <input
        type={isShowingPassword ? "text" : "password"}
        required
        name="password"
        placeholder="Password"
        minLength="8"
        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
        onChange={onChange}
        value={value}
        title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
      />
      <button
        type="button"
        className="absolute inset-y-0 right-0 pr-3 flex items-center"
        onClick={() => {
          setIsShowingPassword(() => !isShowingPassword);
        }}
      >
        {isShowingPassword ? (
          <Eye className="size-5  text-base-content/40 hover: cursor-pointer " />
        ) : (
          <EyeClosed className="size-5 text-base-content/40 hover: cursor-pointer" />
        )}
      </button>
    </label>
  );
};

export default Passwrodinput;
