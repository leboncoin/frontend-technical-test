import { formatConversationTimestamp } from '../messagingView';

const toTimestamp = (date: Date): number => {
  return Math.floor(date.getTime() / 1000);
};

describe('formatConversationTimestamp', () => {
  it('shows only the time for conversations updated today', () => {
    const currentDate = new Date(2026, 6, 9, 18, 30);
    const timestamp = toTimestamp(new Date(2026, 6, 9, 11, 4));

    expect(formatConversationTimestamp(timestamp, currentDate)).toBe('11:04');
  });

  it('shows only the date for conversations updated earlier this year', () => {
    const currentDate = new Date(2026, 6, 9, 18, 30);
    const timestamp = toTimestamp(new Date(2026, 6, 7, 11, 4));

    expect(formatConversationTimestamp(timestamp, currentDate)).toBe('7 juil.');
  });

  it('shows the year for conversations updated in a previous year', () => {
    const currentDate = new Date(2026, 6, 9, 18, 30);
    const timestamp = toTimestamp(new Date(2025, 6, 7, 11, 4));

    expect(formatConversationTimestamp(timestamp, currentDate)).toBe(
      '7 juil. 2025'
    );
  });
});
