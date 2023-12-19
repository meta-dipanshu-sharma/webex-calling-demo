import {useEffect, useState, useCallback} from "react";
import {disconnectCall} from "./callingSdk";
import {EVENT_KEYS} from "@webex/web-calling-sdk";
import {callingClient} from './lib/setup'
import {getMediaStreamAudioTrack} from './lib/media';
import ringtoneAudio from './static/Ringback.mp3';

const IncomingCallContainer = (props) => {
    const [incomingCallInfoClient, setIncomingCallInfoClient] = useState(null)
    const [show, setShow] = useState(true)
    const {remoteAudioRef, handleCallType, handleCallStatus, handleCallDetail} = props;

    const handleIncomingCall = useCallback(
        async (call) => {
            if (call && call !== incomingCallInfoClient) {
                if (show) {
                    // eslint-disable-next-line no-param-reassign
                    //remoteAudioRef.current.src = ringtoneAudio;
                    //alert(`Incoming call from ${call.getCallerInfo().name}...`);
                    handleCallType("Incoming");
                    handleCallStatus("Ringing")
                    setIncomingCallInfoClient(call);
                    handleCallDetail(call.getCallerInfo().name)
                    setShow(false);
                }
            }
        },
        []
    );

    const handleDisconnectCall = (call) => {
        setIncomingCallInfoClient(null);
        setShow(true);
        handleCallStatus(null)
        handleCallType(null)
        disconnectCall(call);
        handleCallDetail(null);
    }

    useEffect(() => {
        callingClient.on(EVENT_KEYS.INCOMING_CALL, handleIncomingCall);
    }, [callingClient, handleIncomingCall])

    const answerCall = async () => {
        if (incomingCallInfoClient) {
            let localAudioTrack = await getMediaStreamAudioTrack();
            incomingCallInfoClient.answer({localAudioTrack})
            handleCallStatus("Connected")
        }
    }

    return (
        <>
            <h2>Incoming Calls</h2>
            <div style={{display: "flex", justifyContent: "space-evenly", margin: "auto", width: "50%"}}>
                <button onClick={() => answerCall()}>Answer</button>
                <button onClick={() => handleDisconnectCall(incomingCallInfoClient)}>Reject</button>
            </div>
        </>
    );
}

export default IncomingCallContainer;
