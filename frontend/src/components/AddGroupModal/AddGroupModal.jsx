import { Captions } from "lucide-react";
import { useState } from "react";
import useGroupStore from "../../zustand/useGroupStore";
const AddGroupModal = () => {
  const [titleInputValue, setTitleInputValue] = useState("");
  const createGroup = useGroupStore((state) => state.createGroup);

  return (
    <>
      <button
        className="btn w-[100%] mb-10"
        onClick={() => document.getElementById("addGroupModal").showModal()}
      >
        Add group
      </button>
      <dialog id="addGroupModal" className="modal ">
        <div className="modal-box flex flex-col justify-center bg-base-300 rounded-2xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <input
            type="text"
            placeholder="Enter group title"
            className="input input-secondary w-[100%] mt-10"
            onChange={(e) => setTitleInputValue(e.target.value)}
            value={titleInputValue}
          />

          {/* todo: users to add to group cards */}

          <button
            className="btn w-[100%] mt-10"
            onClick={() => createGroup(titleInputValue)}
          >
            Create group
          </button>
        </div>
      </dialog>
    </>
  );
};

export default AddGroupModal;
