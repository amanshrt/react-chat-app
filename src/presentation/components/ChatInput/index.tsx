import SendIcon from "@mui/icons-material/Send";
import { ChangeEvent, FormEvent, useState } from "react";
import { submitTextAndFile } from "../../../application/services/service";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../application/store/hooks";
import { addMessage } from "../../../application/store/slices/messageSlice";

const ChatInput: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useAppDispatch();
  const conversationId = useAppSelector((state) => state.conversationId);

  function handleTextChange(event: ChangeEvent<HTMLInputElement>): void {
    event.preventDefault();
    setInputValue(event.target.value);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inputValue.length > 0) {
      dispatch(addMessage({ text: inputValue, isSender: true }));
      const res = await submitTextAndFile(inputValue, conversationId);
      dispatch(addMessage({ text: res.message, isSender: false }));
      setInputValue("");
    }
  }

  return (
    <div className="container-input-section">
      <form className="container-input" onSubmit={onSubmit}>
        <input
          className="input-type-text"
          type="text"
          placeholder="Ask a doc"
          onChange={handleTextChange}
          value={inputValue}
        />
      </form>
      <button className="submit-button" type="submit">
        <SendIcon className="send-icon" />
      </button>
    </div>
  );
};

export default ChatInput;
