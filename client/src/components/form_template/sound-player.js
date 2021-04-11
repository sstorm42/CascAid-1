import React from 'react';
import useSound from 'use-sound';

const SoundPlayer = (props) => {
    const [play] = useSound('/sounds/notification.ogg');
    console.log('play', props, play);
    play();
    return <></>;
};
export const PlayNotification = () => {
    console.log('PLAYNOT');
    return <SoundPlayer notification={true} />;
};
