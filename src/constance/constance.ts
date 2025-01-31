import { MyObjectType, OrderOption, StatusContainerStyles, StatusOption, StatusStyles } from "../types/type";
import { API_URL ,CHEFGA_API_URL, MAINWEB_TOKEN } from '@env';
export const statusOptions: StatusOption[] = [
  { label: "All", value: "all" },
  { label: "Paid", value: "2" },
  { label: "Completed", value: "3" },
  { label: "Refund", value: "4" },
  { label: "Cancelled", value: "5" },
  { label: "Refunded", value: "6" },
];
export  const moreActionsForPaid = [
  {id: 'View Order', title: 'View Order', titleColor: '#007AFF'},
  {id: 'Mark as completed', title: 'Mark as complete', titleColor: '#007AFF'},
  {id: 'Cancel order', title: 'Cancel Order', titleColor: 'red'},
]

export const moreActionsForOther = [
  {id: 'View Order', title: 'View Order', titleColor: '#007AFF'},
]
 
export const statusContainerStylesForRecentOrders: StatusContainerStyles = {
  Refunded: {
    backgroundColor: "#FFFDE7", 
    borderColor: "#FFEB3B", 
    borderWidth: 2,
    width: 110,
    fontSize: 16,
    color: "#F9A825",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 32,
    borderRadius: 8,
  },
  Completed: {
    backgroundColor: "#E8F5E9", 
    borderColor: "#4CAF50", 
    borderWidth: 2,
    width: 110,
    fontSize: 16,
    color: "#2E7D32", 
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 32,
    borderRadius: 8,
  },
  Paid: {
    backgroundColor: "#E3F2FD", 
    borderColor: "#2196F3", 
    borderWidth: 2,
    width: 110,
    fontSize: 16,
    color: "#1565C0", 
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 32,
    borderRadius: 8,
  },
  "Refund Initiated": {
    backgroundColor: "#FFF3E0",
    borderColor: "#FF9800", 
    borderWidth: 2,
    width: 110,
    fontSize: 16,
    color: "#EF6C00", 
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 32,
    borderRadius: 8,
  },
  Cancelled: {
    backgroundColor: "#FFEBEE",
    borderColor: "#F44336", 
    borderWidth: 2,
    width: 110,
    fontSize: 16,
    color: "#C62828", 
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 32,
    borderRadius: 8,
  },
};

export const statusStylesForRecentOrders: StatusStyles = {
  Refunded: { fontSize: 16, color: "#F9A825", fontWeight: "bold" }, 
  Completed: { fontSize: 16, color: "#2E7D32", fontWeight: "bold" },
  Paid: { fontSize: 16, color: "#1565C0", fontWeight: "bold" }, 
  "Refund Initiated": { fontSize: 16, color: "#EF6C00", fontWeight: "bold" }, 
  Cancelled: { fontSize: 16, color: "#C62828", fontWeight: "bold" },
};

export const orderOptions: OrderOption[] = [
  { label: "ID", value: "id" },
  { label: "Status", value: "status" },
  { label: "Mode", value: "mode" },
];

export const statusContainerStyles: StatusContainerStyles = {
  6: {
    backgroundColor: "#FFFDE7",
    borderColor: "#FFEB3B", 
    borderWidth: 2,
    width: 110,
    fontSize: 16,
    color: "#F9A825",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 32,
    borderRadius: 8,
  },
  3: {
    backgroundColor: "#E8F5E9", 
    borderColor: "#4CAF50", 
    borderWidth: 2,
    width: 110,
    fontSize: 16,
    color: "#2E7D32",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 32,
    borderRadius: 8,
  },
  2: {
    backgroundColor: "#E3F2FD",
    borderColor: "#2196F3", 
    borderWidth: 2,
    width: 110,
    fontSize: 16,
    color: "#1565C0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 32,
    borderRadius: 8,
  },
  4: {
    backgroundColor: "#FFF3E0", 
    borderColor: "#FF9800",
    borderWidth: 2,
    width: 110,
    fontSize: 16,
    color: "#EF6C00",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 32,
    borderRadius: 8,
  },
  5: {
    backgroundColor: "#FFEBEE",
    borderColor: "#F44336", 
    borderWidth: 2,
    width: 110,
    fontSize: 16,
    color: "#C62828", 
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 32,
    borderRadius: 8,
  },
};

export const statusStyles: StatusStyles = {
  6: { fontSize: 16, color: "#F9A825", fontWeight: "bold" }, 
  3: { fontSize: 16, color: "#2E7D32", fontWeight: "bold" }, 
  2: { fontSize: 16, color: "#1565C0", fontWeight: "bold" }, 
  4: { fontSize: 16, color: "#EF6C00", fontWeight: "bold" }, 
  5: { fontSize: 16, color: "#C62828", fontWeight: "bold" }, 
};

export const STATUS_MAP: { [key: number]: MyObjectType } = {
  2: { label: "Paid", color: "primary" },
  3: { label: "Completed", color: "success" },
  4: { label: "Refund", color: "warning" },
  5: { label: "Cancelled", color: "danger" },
  6: { label: "Refunded", color: "warning" },
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
  cancel:"cancel",
  complete:"complete",
  localhostUrl:"http://10.0.2.2:3000",
  localhostSocketUrl:"http://10.0.2.2:9001",
  localDatabaseToken:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6MX0sImlhdCI6MTczODI5MjUwM30.lvfInPOIb_I6GAU9E46h8uIm5eT_HVTMIXb8AIryEEo",
  socketKeyWord:"order_details"
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