import { useCallback } from 'react';
import { Formik, Form, Field, FormikHelpers } from 'formik';

import useMessages from '@/d_messages/list-messages/hooks/useMessages';
import useLoggedUser from '@/d_users/get-connected-user/hooks/useLoggedUser';

import styles from './SendMessage.module.sass';

interface MessageEntered {
    message: string;
}
const SendMessage = () => {
    const initialValues = { message: '' };
    const { sendMessage } = useMessages();
    const { loggedUser } = useLoggedUser();

    const handleSubmit = useCallback(
        ({ message }, { resetForm }: FormikHelpers<MessageEntered>) => {
            sendMessage({ body: message, authorId: loggedUser.id, timestamp: Date.now() });

            resetForm({
                values: {
                    message: '',
                },
            });
        },
        [sendMessage, loggedUser.id]
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
