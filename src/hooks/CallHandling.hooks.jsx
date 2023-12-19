import {useCallback} from 'react';

import ringbackAudio from '../static/Ringback.mp3';
import {callInfoClient, disconnectCall} from '../callingSdk';
import {setRemoteMediaStream} from '../lib/media'

export const useCallProgress = (remoteAudioRef, handleCallStatus) => {
    const handleProgress = useCallback(
        () => {
            if (remoteAudioRef !== null && remoteAudioRef.current !== null) {
                // eslint-disable-next-line no-param-reassign
                remoteAudioRef.current.src = ringbackAudio;
                //alert("Call is connecting...")
                handleCallStatus("Connecting")
            }
        },
        [callInfoClient, remoteAudioRef]
    );

    return handleProgress;
};

export const useCallConnect = (handleCallStatus) => {
    const handleConnect = useCallback(
        () => {
            //alert("Call is connected...")
            handleCallStatus("Connected")
        },
        [callInfoClient]
    );

    return handleConnect;
};

export const useRemoteMedia = (handleCallStatus) => {
    const handleRemoteMedia = useCallback(
        (track) => {
            const mediaStream = new MediaStream([track]);

            if (callInfoClient) {
                setRemoteMediaStream(mediaStream);
            }
            //alert("Media is established...")
            handleCallStatus("Media Connected")
        },
        [callInfoClient]
    );

    return handleRemoteMedia;
};

export const useCallDisconnect = (handleCallType, handleCallStatus) => {
    const handleDisconnect = useCallback(
        () => {
            if (callInfoClient) {
                disconnectCall();
                //alert("Call is disconnected...")
                handleCallType(null)
                handleCallStatus("Disconnected")
            }
        },
        [callInfoClient]
    );

    return handleDisconnect;
};
