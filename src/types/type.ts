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
 
  export interface StatusOption  {
    label: string;
    value: string
};
  export interface OrderOption {
    label: string;
    value: string
};
 
export interface StatusStyles {
    [key: string]: {
      fontSize: number;
      color: string;
      fontWeight: "bold" | "normal" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";
    };
  };
  
  export interface PromotionsData {
    discount_code:string;
    discount_percentage:string;
    email:string;
    end_date:string;
    id:number;
    name:string;
    phone_number:string;
    promo_code:string;
    promo_name:string;
    start_date:string;
    used_at:null
}
export interface StatusContainerStyles  {
  [key: string]: {
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
    width: number;
    fontSize: number;
    color: string;
    display: "flex";
    flexDirection: "column";
    justifyContent: "center";
    alignItems: "center";
    height: number;
    borderRadius: number;
  };
};