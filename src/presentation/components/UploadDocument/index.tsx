import { useRef, useState, useEffect, useMemo } from "react";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { FileRequestDto } from "../../../application/types/file-request.dto";
import { submitFile } from "../../../application/services/service";
import { useAppDispatch } from "../../../application/store/hooks";
import { initializeConversation } from "../../../application/store/slices/messageSlice";

const UploadDocument: React.FC = () => {
  const [file, setFile] = useState<FileRequestDto | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const dispatch = useAppDispatch();

  const phrases = useMemo(
    () => ["ask a doc.", "summarize it.", "translate it."],
    []
  );

  useEffect(() => {
    if (subIndex === phrases[index].length + 1 && !reverse) {
      setTimeout(() => {
        setReverse(true);
      }, 1000);
      return;
    }

    if (subIndex === 0 && reverse) {
      setTimeout(() => {
        setReverse(false);
        setIndex((prev) => (prev + 1) % phrases.length);
      }, 500);
      return;
    }

    const timeout = setTimeout(
      () => {
        setSubIndex((prev) => (reverse ? prev - 1 : prev + 1));
      },
      reverse ? 100 : 200
    );

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, phrases]);

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    try {
      e.preventDefault();
      const files = e.target.files;
      if (!files) return;
      const newFile = files[0];

      setFile({ document: newFile });
      console.log(file);
      if (newFile != null) {
        const res = await submitFile({ document: newFile });

        if (res != null) {
          console.log(res.conversationId);

          dispatch(
            initializeConversation({
              message: {
                text: "Hello, what do you want to ask?",
                isSender: false,
              },
              conversationId: res.conversationId,
            })
          );
        }
      }
    } catch (e) {
      setFile(null);
    }
  }

  function handleButtonClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (!inputRef || !inputRef.current) return;
    inputRef.current.click();
  }

  return (
    <div className={file != null ? "hidden" : "upload-page-container"}>
      <div className="upload-document-screen">
        <span className="border-container">
          <button onClick={handleButtonClick}>
            <FileUploadIcon />
          </button>
        </span>
        <input
          ref={inputRef}
          type="file"
          accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          hidden
          onChange={handleFileUpload}
        />
      </div>
      <div className="upload-document-title">
        Upload a Document to{" "}
        <span className="typewriter-text">
          {phrases[index].substring(0, subIndex)}
        </span>
      </div>
    </div>
  );
};

export default UploadDocument;
