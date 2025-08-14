export type ApiErrorResponse = {
    error: string;
};

export type ApiLoginResponse = {
    token: string;
};

export interface VaccineHistory {
    id: string;
    vaccineName: string;
    vaccineLocation: string | null;
    vaccineAt: number;
    complication: string | null;
}

export interface Medicine {
    id: string;
    medicineName: string;
    dose: string | null;
    frequencyPerDay: string | null;
    instruction: string | null;
    quantity: string | null;
}

export type ApiPatientModel = {
    id: number;
    hn: string;
    firstName: string;
    middleName: string | null;
    lastName: string;
    email: string;
    phone: string;
    birthDate: number;
    verified: boolean;
    weight: number | null;
    height: number | null;
    medicine: Medicine[] | null;
    vaccineHistory: VaccineHistory[] | null;
};

export type ApiDoctorModel = {
    id: number;
    firstName: string;
    middleName: string | null;
    lastName: string;
    specialist: string | null;
};

export type ApiAppointmentModel = {
    id: number;
    createAt: number;
    date: number;
    patient: ApiPatientModel;
    doctor: ApiDoctorModel;
    approveAt: number | null;
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
    doctor: ApiDoctorModel | null;
    patient: ApiPatientModel;
};

export type ApiDeviceModel = {
    id: number;
    loginAt: number;
    deviceName: string;
    expoToken: string;
    patientId: number;
};

export type ApiJwtClaimModel = {
    deviceId: number;
    exp: number;
    patientId: number;
};

export type ApiContentModel = {
    id: number;
    createAt: number;
    updateAt: number;
    title: string;
    body: string;
    isPublished: boolean;
    order: number;
    coverImageURL: string | null;
};
