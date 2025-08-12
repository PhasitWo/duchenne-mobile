import useTutorial from "@/hooks/useTutorial";
import { useEffect, useState } from "react";
import SwipeHand from "./SwipeHand";

type Props = {from: number; to: number}
export default function Tutorial(props:Props) {
    const [showTutorial, setShowTutorial] = useState(false);
    // tutorial onmount
    useEffect(() => {
        const { getShowAppointmentTutorial, setShowAppointmentTutorial } = useTutorial();
        getShowAppointmentTutorial().then((value) => setShowTutorial(value));
        setTimeout(() => {
            setShowTutorial(false);
            setShowAppointmentTutorial(false);
        }, 5200);
    }, []);

    return <>{showTutorial && <SwipeHand from={props.from} to={props.to} />}</>;
}
