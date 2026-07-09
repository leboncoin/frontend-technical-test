import { MAX_MESSAGE_LENGTH, sanitizeMessageDraft } from '../messageSafety';

describe('sanitizeMessageDraft', () => {
  it('trims valid message drafts before sending', () => {
    expect(sanitizeMessageDraft('  Bonjour  ')).toEqual({
      isValid: true,
      body: 'Bonjour',
      isTooLong: false,
    });
  });

  it('rejects empty drafts', () => {
    expect(sanitizeMessageDraft('   ')).toEqual({
      isValid: false,
      body: '',
      isTooLong: false,
    });
  });

  it('rejects drafts over the maximum length', () => {
    expect(sanitizeMessageDraft('a'.repeat(MAX_MESSAGE_LENGTH + 1))).toEqual({
      isValid: false,
      body: 'a'.repeat(MAX_MESSAGE_LENGTH + 1),
      isTooLong: true,
    });
  });
});
