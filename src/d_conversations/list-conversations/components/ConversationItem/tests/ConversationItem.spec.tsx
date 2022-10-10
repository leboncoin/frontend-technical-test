import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ConversationItem from '../ConversationItem';
import { conversationInfo } from './fixtures';

let conversationItem: HTMLElement;

describe('ConversationItem', () => {
    beforeEach(() => {
        render(<ConversationItem {...conversationInfo} />);
        conversationItem = screen.getByRole('link');
    });

    it('should render correctly a conversation item', () => {
        expect(conversationItem).toBeInTheDocument();
    });

    it('should display contact nickname', () => {
        const nickname = within(conversationItem).getByText(conversationInfo.nickname);

        expect(nickname).toBeVisible();
    });

    it('should display contact picture', () => {
        const picture = within(conversationItem).getByAltText(conversationInfo.nickname);

        expect(picture).toBeVisible();
    });

    it('should display date of last message of (or to) contact', () => {
        const date = within(conversationItem).getByText(conversationInfo.date);

        expect(date).toBeVisible();
    });

    it('should be clickable', async () => {
        await userEvent.click(conversationItem);

        expect(conversationInfo.onClick).toHaveBeenCalled();
    });
});
