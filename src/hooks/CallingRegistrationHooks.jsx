import React, {useEffect} from "react";
import {callingClient} from "../lib/setup";

const useCallingRegistration = () => {
    useEffect(() => {
        console.log('Now its time to register');
        callingClient.register(false);
        console.log('status???????????');
    }, [])

    useEffect(() => {
        callingClient.on("callingClient:registered", (deviceInfo) => {
            deviceInfo = deviceInfo;
            console.log("Registration Success");
        });
    }, [])

    return (
        <></>
    )
}

export default useCallingRegistration;
