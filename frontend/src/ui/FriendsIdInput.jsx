import { KeyRound, Shield, ShieldAlert } from "lucide-react";

const FriendsidInput = ({ onChange, value }) => {
  return (
    <div className="flex items-center mb-10 w-[100%] justify-between ">
      <label className="input flex items-center w-[100%] rounded-xl ">
        <KeyRound size="15" />
        <input
          type="text"
          required
          placeholder="Type the friends id..."
          minLength="3"
          maxLength="30"
          onChange={onChange}
          name="friendInput"
          value={value}
        />
      </label>
      <ShieldAlert />
    </div>
  );
};

export default FriendsidInput;
