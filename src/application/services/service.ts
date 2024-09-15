import { FileRequestDto } from "../types/file-request.dto";
import {
  ConversationInitializationResponseDto,
  MessageResponseDto,
} from "../types/response.dto";

const API_URL = process.env.REACT_APP_API_BASE_URL;

export async function submitFile(
  fileRequest: FileRequestDto | null
): Promise<ConversationInitializationResponseDto> {
  console.log(fileRequest);
  const formData = new FormData();
  if (fileRequest?.document != null)
    formData.append("document", fileRequest.document);

  const response: ConversationInitializationResponseDto = await fetch(
    API_URL + "conversations",
    {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    }
  )
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error fetching data:", error);
      alert(
        "Unable to fetch data, please check your network connection or try again later."
      );
    });

  return response;
}

export async function submitTextAndFile(
  textRequest: String,
  conversationId: String
): Promise<MessageResponseDto> {
  const request = {
    prompt: textRequest,
  };

  const response: MessageResponseDto = await fetch(
    API_URL + "conversations/" + conversationId + "/messages",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    }
  )
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error fetching data:", error);
      alert(
        "Unable to fetch data, please check your network connection or try again later."
      );
    });
  return response;
}
