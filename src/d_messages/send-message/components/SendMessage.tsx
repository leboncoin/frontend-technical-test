import { useCallback } from 'react';
import { Formik, Form, Field, FormikHelpers } from 'formik';

import useMessages from '@/d_messages/list-messages/hooks/useMessages';
import useLoggedUser from '@/d_users/get-connected-user/hooks/useLoggedUser';
import useConversations from '@/d_conversations/list-conversations/hooks/useConversations';

import styles from './SendMessage.module.sass';
import callAPI from '@/shared/http/callAPI';

interface MessageEntered {
    message: string;
}
const SendMessage = () => {
    const initialValues = { message: '' };
    const { sendMessage } = useMessages();
    const { loggedUser } = useLoggedUser();
    const { currentConversationId } = useConversations();

    const handleSubmit = useCallback(
        ({ message }, { resetForm }: FormikHelpers<MessageEntered>) => {
            const messageRetrieved = {
                id: Math.floor(Math.random() * Infinity),
                body: message,
                timestamp: Date.now(),
                conversationId: currentConversationId,
                authorId: loggedUser.id,
            };
            const { id, ...messageToSend } = messageRetrieved;

            callAPI.post(`/messages/${currentConversationId}`, messageToSend).then((response) => {
                sendMessage({
                    ...messageToSend,
                    conversationId: currentConversationId,
                    id: response.data.id,
                    authorId: loggedUser.id,
                });
            });

            resetForm({
                values: {
                    message: '',
                },
            });
        },
        [sendMessage, loggedUser.id, currentConversationId]
    );

    return (
        <div className={styles.sendMessage}>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {() => (
                    <Form>
                        <Field type="text" name="message" placeholder="Write a message..." />
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default SendMessage;
