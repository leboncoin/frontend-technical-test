import { FC } from 'react';
import Image from 'next/image';

import styles from './Picture.module.sass';

type PictureProps = {
    src: string;
    alt: string;
    className?: string;
};

const Picture: FC<PictureProps> = ({ src, alt, className }: PictureProps) => (
    <div className={[styles.picture, className].join(' ')}>
        <Image src={src} alt={alt} layout="fill" objectFit="cover" />
    </div>
);

export default Picture;
