import { FC } from 'react';
import Popup from 'reactjs-popup';

import styles from './DeleteButton.module.sass';

type DeleteButtonProps = {
    onClick: () => void;
    isFeedbackOpen: boolean;
    closeFeedback: () => boolean;
    feedbackText: string;
    className: string;
};

const contentStyle = { background: '#fff', width: 300, padding: 30 };
const overlayStyle = { background: 'rgba(0,0,0,0.5)' };
const arrowStyle = { color: '#000' };

const DeleteButton: FC<DeleteButtonProps> = ({
    onClick,
    isFeedbackOpen,
    closeFeedback,
    feedbackText,
    className,
}: DeleteButtonProps) => (
    <>
        <div
            className={[styles.deleteButton, className].join(' ')}
            role="button"
            onClick={onClick}
            onKeyDown={onClick}
            tabIndex={0}
            id="delete-wrapper"
        >
            <div className={styles.cap}></div>
            <div className={styles.innerDelete}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
        <Popup
            open={isFeedbackOpen}
            closeOnDocumentClick
            onClose={closeFeedback}
            {...{ contentStyle, overlayStyle, arrowStyle }}
        >
            <div className="modal">
                <a className="close" onClick={closeFeedback}>
                    &times;
                </a>
                {feedbackText}
            </div>
        </Popup>
    </>
);

export default DeleteButton;
