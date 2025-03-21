declare module 'react-circular-progressbar' {
    import { FC } from 'react';

    interface CircularProgressbarProps {
        value: number;
        text?: string;
        className?: string;
        styles?: {
            root?: object;
            trail?: object;
            path?: object;
            text?: object;
            background?: object;
        };
    }

    export const CircularProgressbar: FC<CircularProgressbarProps>;

    export function buildStyles(styles: {
        rotation?: number;
        strokeLinecap?: 'butt' | 'round' | 'square';
        textSize?: string;
        pathTransitionDuration?: number;
        pathColor?: string;
        textColor?: string;
        trailColor?: string;
        backgroundColor?: string;
    }): CircularProgressbarProps['styles'];
}

declare module 'react-circular-progressbar/dist/styles.css'; 