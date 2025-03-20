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
          value={value}
          className=""
        />
      </label>
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_4").showModal()}
      >
        <ShieldAlert />
      </button>
      <dialog id="my_modal_4" className="modal ">
        <div className="modal-box rounded-2xl w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            You might have a question! How should i get an id of my friend???
            Thats easy! you just need to ask him for copying his id and sending
            it to another messenger or.. I WIIL IMPLEMENT IT SOON, OK?
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default FriendsidInput;
