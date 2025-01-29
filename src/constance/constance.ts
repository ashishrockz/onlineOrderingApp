import { MyObjectType, OrderOption, StatusContainerStyles, StatusOption, StatusStyles } from "../types/type";
import { API_URL ,CHEFGA_API_URL, MAINWEB_TOKEN } from '@env';
export const statusOptions: StatusOption[] = [
  { label: "All", value: "all" },
  { label: "Paid", value: "2" },
  { label: "Completed", value: "3" },
  { label: "Refund Initiated", value: "4" },
  { label: "Cancelled", value: "5" },
  { label: "Refunded", value: "6" },
];
 
export const statusContainerStylesForRecentOrders: StatusContainerStyles = {
  Refunded: {
    backgroundColor: "white",
    borderColor: "green",
    borderWidth: 2,
    width: 80,
    fontSize: 15,
    color: "black",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 24,
    borderRadius: 10,
  },
  Completed: {
    backgroundColor: "white",
    borderColor: "green",
    borderWidth: 2,
    width: 80,
    fontSize: 15,
    color: "black",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 24,
    borderRadius: 10,
  },
  Paid: {
    backgroundColor: "white",
    borderColor: "blue",
    borderWidth: 2,
    width: 80,
    fontSize: 16,
    color: "black",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 24,
    borderRadius: 10,
  },
  "Refund Initiated": {
    backgroundColor: "orange",
    borderColor: "green",
    borderWidth: 2,
    width: 80,
    fontSize: 16,
    color: "black",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 24,
    borderRadius: 10,
  },
  Cancelled: {
    backgroundColor: "white",
    borderColor: "red",
    borderWidth: 2,
    width: 80,
    fontSize: 16,
    color: "black",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 24,
    borderRadius: 10,
  },
};
 
export const statusStylesForRecentOrders: StatusStyles = {
  Refunded: { fontSize: 13, color: "green", fontWeight: "bold" },
  Completed: { fontSize: 13, color: "green", fontWeight: "bold" },
  Paid: { fontSize: 13, color: "blue", fontWeight: "bold" },
  "Refund Initiated": { fontSize: 13, color: "orange", fontWeight: "bold" },
  Cancelled: { fontSize: 13, color: "red", fontWeight: "bold" },
};
 
export const orderOptions: OrderOption[] = [
  { label: "ID", value: "id" },
  { label: "Status", value: "status" },
  { label: "Mode", value: "mode" },
];
 
export const statusContainerStyles: StatusContainerStyles = {
  6: {
    backgroundColor: "white",
    borderColor: "green",
    borderWidth: 2,
    width: 100,
    fontSize: 16,
    color: "black",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 28,
    borderRadius: 10,
  },
  3: {
    backgroundColor: "white",
    borderColor: "green",
    borderWidth: 2,
    width: 100,
    fontSize: 16,
    color: "black",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 28,
    borderRadius: 10,
  },
  2: {
    backgroundColor: "white",
    borderColor: "blue",
    borderWidth: 2,
    width: 100,
    fontSize: 16,
    color: "black",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 28,
    borderRadius: 10,
  },
  4: {
    backgroundColor: "orange",
    borderColor: "green",
    borderWidth: 2,
    width: 100,
    fontSize: 16,
    color: "black",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 28,
    borderRadius: 10,
  },
  5: {
    backgroundColor: "white",
    borderColor: "red",
    borderWidth: 2,
    width: 100,
    fontSize: 16,
    color: "black",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 28,
    borderRadius: 10,
  },
};
 
export const statusStyles: StatusStyles = {
  6: { fontSize: 16, color: "green", fontWeight: "bold" },
  3: { fontSize: 16, color: "green", fontWeight: "bold" },
  2: { fontSize: 16, color: "blue", fontWeight: "bold" },
  4: { fontSize: 16, color: "orange", fontWeight: "bold" },
  5: { fontSize: 16, color: "red", fontWeight: "bold" },
};
 
export const STATUS_MAP: { [key: number]: MyObjectType } = {
    2: { label: "Paid", color: "primary" },
    3: { label: "Completed", color: "success" },
    4: { label: "Refunded Initiated", color: "warning" },
    5: { label: "Cancelled", color: "danger" },
    6: { label: "Refunded", color: "success" },
};

export const ApiUrlConstance: { [key: string]: string } = {
  chefgaApiUrl: CHEFGA_API_URL,
  apiUrl:API_URL,
  order: 'order',
  promotion: 'promotion/users',
  login: 'auth/login',
  webToken:MAINWEB_TOKEN,
  firstOutlet:'69',
  secondOutlet:'70',
  dummyDataApi:'http://10.0.2.2:8000/dummyData',
  bearer:'Bearer',
};
 export const methods={
  get:"GET",
  post:"POST",
  put :"PUT",
  delete :'DELETE'
}
export const statusmode ={
  all :'all',
  status:'status',
  id :'id',
  mode:'mode',
}
export const imageUrl: { [key: string]: string } = {
  into: 'https://static-00.iconduck.com/assets.00/cross-mark-emoji-256x256-5xa7ff4l.png',
  search: 'https://img.icons8.com/ios7/600/search.png',
  moreOption: 'https://cdn-icons-png.flaticon.com/512/7066/7066144.png',
  vegIcon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Veg_symbol.svg/2048px-Veg_symbol.svg.png',
};
 
export const errorMessage: { [key: string]: string } = {
  order_details_not_found: 'Order details not found.',
  order_details_not_found_for_id: 'Order details of this id not found.',
  unauthorized_access: 'Unauthorized access. Please log in again.',
  something_went_wrong: 'Server error. Please try again later.',
  promotion_details_not_found: 'Promotion details not found.',
  incorrect_password:"Incorrect Password",
  incorrect_mail:"Username and Password miss match",
  catch_error:'Something went wrong... Please try again',
};
export const errorMessageConstants :{ [key: string]: string } = {
  incorrect_password:"incorrect_password",
  incorrect_mail:"incorrect_mail"
 
}