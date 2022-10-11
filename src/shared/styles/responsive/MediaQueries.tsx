import { FC } from 'react';
import { useMediaQuery } from 'react-responsive';

import styles from '../variables/breakpoints-variables.module.sass';

interface ChildrenProps {
    children: React.ReactNode;
}

export const MobileAndTablet: FC<ChildrenProps> = ({ children }: ChildrenProps) => {
    const isMobileAndTablet = useMediaQuery({ maxWidth: styles.mobileAndTablet });
    return isMobileAndTablet ? <>{children}</> : null;
};

export const Desktop: FC<ChildrenProps> = ({ children }: ChildrenProps) => {
    const isDesktop = useMediaQuery({ minWidth: styles.desktop });
    return isDesktop ? <>{children}</> : null;
};
