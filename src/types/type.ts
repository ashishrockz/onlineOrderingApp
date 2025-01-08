export interface MyObjectType {
    label: string;
    color: string;
};

export interface orderType {
    id: number;
    mobile_no: string;
    Name: string;
    Amount: string;
    status: number;
    time: string;
    date: string;
    email: string;
    type: string;
}

export interface LoginTokenContextType {
    token: boolean;
    setToken: (val: boolean) => void;
  }