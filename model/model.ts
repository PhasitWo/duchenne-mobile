export type ApiErrorResponse = {
    error: string;
};

export type ApiLoginResponse = {
    token: string;
};

export type ApiPatientModel = {
    id: number;
    hn: string;
    firstName: string;
    middleName: string | null;
    lastName: string;
    email: string;
    phone: string;
    verified: boolean;
};

export type ApiDoctorModel = {
    id: number;
    firstName: string;
    middleName: string | null;
    lastName: string;
};

export type ApiAppointmentModel = {
    id: number;
    createAt: number;
    date: number;
    patient: ApiPatientModel;
    doctor: ApiDoctorModel;
};

export type ApiQuestionModel = {
    id: number;
    topic: string;
    question: string;
    createAt: number;
    patient: ApiPatientModel;
    doctor: ApiDoctorModel | null;
    answer: string | null;
    answerAt: number | null;
};

export type ApiQuestionTopicModel = {
    id: number;
    topic: string;
    createAt: number;
    answerAt: number | null;
};
