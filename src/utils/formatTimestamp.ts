import {Conversation} from "../types/conversation";
import moment from "moment"

export const formatTimestamp = (timestamp: Conversation['lastMessageTimestamp']) => moment.unix(timestamp)
