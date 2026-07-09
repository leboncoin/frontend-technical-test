export const MAX_MESSAGE_LENGTH = 1000;

export type MessageValidation =
  | {
      isValid: true;
      body: string;
      isTooLong: false;
    }
  | {
      isValid: false;
      body: string;
      isTooLong: boolean;
    };

export const sanitizeMessageDraft = (
  draft: string,
  maxLength = MAX_MESSAGE_LENGTH
): MessageValidation => {
  const body = draft.trim();
  const isTooLong = draft.length > maxLength;

  if (body.length === 0 || isTooLong) {
    return {
      isValid: false,
      body,
      isTooLong,
    };
  }

  return {
    isValid: true,
    body,
    isTooLong: false,
  };
};
