import {useEffect, useRef, useState} from "react";
import {makeCall, disconnectCall} from "./callingSdk";
import useCallingRegistration from './hooks/CallingRegistrationHooks'
import {EVENT_KEYS} from "@webex/web-calling-sdk";
import {useCallProgress, useCallConnect, useCallDisconnect, useRemoteMedia} from "./hooks/CallHandling.hooks";
import {getRemoteMediaStream} from "./lib/media";
import IncomingCallContainer from "./IncomingCallContainer";
import {callingClient} from "./lib/setup";

const CallingWidget = () => {
    useCallingRegistration();

    const [stateCallInfoClient, setCallInfoClient] = useState(null)
    const [register, setRegister] = useState(false)
    const [callType, setCallType] = useState(null)
    const [callStatus, setCallStatus] = useState(null)
    const [callDetail, setCallDetail] = useState(null)
    const remoteAudioRef = useRef(true);

    const remoteMediaStream = getRemoteMediaStream();

    // Updating remoteAudioRef current with correct remote media stream received for the call
    if (
        remoteMediaStream &&
        remoteAudioRef !== null &&
        remoteAudioRef.current !== null &&
        remoteAudioRef.current.srcObject !== remoteMediaStream
    ) {
        console.log("Remote media coming from other side", remoteMediaStream);
        remoteAudioRef.current.srcObject = remoteMediaStream;
    }

    const handleCallStatus = (status) => {
        setCallStatus(status)
    }

    const handleCallType = (type) => {
        setCallType(type)
    }

    const handleProgress = useCallProgress(remoteAudioRef, handleCallStatus);
    const handleConnect = useCallConnect(handleCallStatus);
    const handleRemoteMedia = useRemoteMedia(handleCallStatus);
    const handleDisconnect = useCallDisconnect(handleCallType, handleCallStatus);

    useEffect(() => {
        if (stateCallInfoClient) {
            stateCallInfoClient.on(EVENT_KEYS.PROGRESS, handleProgress);

            stateCallInfoClient.on(EVENT_KEYS.CONNECT, handleConnect);

            stateCallInfoClient.on(EVENT_KEYS.REMOTE_MEDIA, handleRemoteMedia);

            stateCallInfoClient.on(EVENT_KEYS.DISCONNECT, handleDisconnect);
        }
    }, [stateCallInfoClient])

    useEffect(() => {
        if (callingClient) {
            callingClient.on('callingClient:registered', (deviceInfo) => {
                setRegister(true)
            });
        }
    })

    const handleMakeCall = async (number) => {
        handleCallType("Outgoing")
        handleCallStatus("Call initiated")
        const callInfoClient = await makeCall(number);
        setCallInfoClient(callInfoClient);
        setCallDetail(callInfoClient)
    }

    const handleDisconnectCall = async () => {
        disconnectCall(stateCallInfoClient);
        setCallInfoClient(null);
        handleCallType(null)
        handleCallStatus(null)
        setCallDetail(null)
    }

    const handleCallDetail = (detail) => {
        setCallDetail(detail)
    }

    return (
        <div className="bg-primary me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden h-100">
            <div className="my-3 py-3">
                <h2 className="display-5">Calling Widget</h2>
                <p className="lead">Details</p>
            </div>
            <div>
                {
                    // eslint-disable-next-line jsx-a11y/media-has-caption
                    <audio ref={remoteAudioRef} autoPlay />
                }
            </div>
            <div>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <div>
                        <h2>Outgoing Call</h2>
                        <div style={{display: "flex", justifyContent: "space-evenly", margin: "auto", width: "50%"}}>
                            <button onClick={() => handleMakeCall("5008")}>Dial</button>
                            <button onClick={handleDisconnectCall}>End</button>
                        </div>
                    </div>
                    <div>
                        <IncomingCallContainer
                            remoteAudioRef={remoteAudioRef}
                            handleCallType={handleCallType}
                            handleCallStatus={handleCallStatus}
                            handleCallDetail={handleCallDetail}
                        />
                    </div>
                    <div>
                        <h2>Call Stats</h2>

                        <div style={{display: "flex"}}><h3>{`Device Registration Status - `}{register ? 'Registered' : 'Not Registered'}</h3></div>
                        <div style={{display: "flex"}}><h3>{`Call Type : -  `}</h3><h3>{callType === null ? 'No Active Call' : callType}</h3></div>
                        <div style={{display: "flex"}}><h3>{`Call Details : -  `}</h3><h3>{callDetail !== null ? callType === "Outgoing" ? `Dialing to ${stateCallInfoClient.getCallerInfo().name}` : `Call from ${callDetail}` : 'No Active Call'}</h3></div>
                        <div style={{display: "flex"}}><h3>{`Call Status : -  `}</h3><h3>{callStatus === null ? 'No Active Call' : callStatus}</h3></div>

                    </div >
                </div >
            </div >
            <div className="bg-light shadow-sm mx-auto" style={{width: "80%;", height: "600px;", borderRadius: "21px 21px 0 0;"}}></div>
        </div >
    );
}

export default CallingWidget;
