export type NewsletterResponse = {
    status: boolean;
    message: string;
    data: Newsletter[];
    meta: Meta;
};

export type Newsletter = {
    _id: string;
    email: string;
    createdAt?: string;
    fullName?: string;
    __v?: number;
};

export type NewsletterDataResponse = {
    status: boolean;
    message: string;
    data: NewsletterData[];
    meta?: Meta;
};

export type NewsletterData = {
    _id: string;
    emailSubject: string;
    emailText: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
};

type Meta = {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
};
