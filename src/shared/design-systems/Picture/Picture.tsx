import { FC } from 'react';
import Image from 'next/image';

import styles from './Picture.module.sass';

type PictureProps = {
    picture: string;
    alt: string;
    className: string;
};

const Picture: FC<PictureProps> = ({ picture, alt, className }: PictureProps) => (
    <div className={[styles.picture, className].join(' ')}>
        <Image src={picture} alt={alt} layout="fill" objectFit="cover" />
    </div>
);

export default Picture;
