import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Message {
  id: number;
  text: string;
  isSender: boolean;
}

export interface MessagePayload {
  text: string;
  isSender: boolean;
}

interface InitializeConversationPayload {
  message: {
    text: string;
    isSender: boolean;
  };
  conversationId: string;
}

interface MessagesState {
  messages: Message[];
  conversationId: string;
}

const initialState: MessagesState = {
  messages: [],
  conversationId: "",
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    addConversationId: (state, action: PayloadAction<string>) => {
      state.conversationId = action.payload;
    },
    addMessage: (state, action: PayloadAction<MessagePayload>) => {
      const nextId =
        state.messages.length > 0
          ? state.messages[state.messages.length - 1].id + 1
          : 1;

      state.messages.push({
        id: nextId,
        text: action.payload.text,
        isSender: action.payload.isSender,
      });
    },
    initializeConversation: (
      state,
      action: PayloadAction<InitializeConversationPayload>
    ) => {
      state.messages.push({
        id: 1,
        text: action.payload.message.text,
        isSender: action.payload.message.isSender,
      });
      state.conversationId = action.payload.conversationId;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addMessage, addConversationId, initializeConversation } =
  messageSlice.actions;

export default messageSlice.reducer;
