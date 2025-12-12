import { useState } from "react";
import axios from "axios";

export default function useImpExpRegister() {
    const [loading, setLoading] = useState(false);
    const [dgftData, setDgftData] = useState(null);

    const fetchDgftDetails = async (iec_code) => {
        setLoading(true);
        try {
            const res = await axios.get(
                "http://127.0.0.1:8000/api/retrivedgft/users/v2",
                { params: { iec: iec_code } }
            );
            setDgftData(res.data.data);
            return res.data.data;
        } catch (error) {
            console.error("DGFT fetch error:", error);
            setDgftData(null);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const submitIecCode = async (iec_code) => {
        const res = await axios.post(
            "http://127.0.0.1:8000/api/impexp/submit/users/v2",
            { iec_code }
        );
        return res.data;
    };

    // const finalRegistration = async (payload) => {
    //     const res = await axios.post(
    //         "http://127.0.0.1:8000/api/impexp/user/register",
    //         payload
    //     );
    //     return res.data;
    // };

    const finalRegistration = async (payload) => {
        const res = await axios.post(
            "http://127.0.0.1:8000/api/impexp/user/register",
            payload,
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
        );
    };

    return {
        loading,
        dgftData,
        fetchDgftDetails,
        submitIecCode,
        finalRegistration,
    };
}

