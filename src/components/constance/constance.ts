import { MyObjectType } from "../../types/type";

export const statusOptions = [
    { label: "All", value: "all" },
    { label: "Paid", value: "2" },
    { label: "Completed", value: "3" },
    { label: "Refund Initiated", value: "4" },
    { label: "Cancelled", value: "5" },
    { label: "Refunded", value: "6" },
];

export const statusContainerStyles:any = {
    6: { backgroundColor:"white",borderColor:"green",borderWidth:2,width:100,fontSize: 16,color: "black",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",height:28,borderRadius:10 },
    3: { backgroundColor:"white",borderColor:"green",borderWidth:2,width:100,fontSize: 16,color: "black",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",height:28,borderRadius:10 },
    2: { backgroundColor:"white",borderColor:"blue",borderWidth:2,width:100,fontSize: 16,color: "black",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",height:28,borderRadius:10 },
    4: { backgroundColor:"orange",borderColor:"green",borderWidth:2,width:100,fontSize: 16,color: "black",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",height:28,borderRadius:10 },
    5: { backgroundColor:"white",borderColor:"red",borderWidth:2,width:100,fontSize: 16,color: "black",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",height:28,borderRadius:10 },
  };

  export const statusStyles :any = {
    6: { fontSize: 16, color: "green", fontWeight: "bold" },
    3: { fontSize: 16, color: "green", fontWeight: "bold" },
    2: { fontSize: 16, color: "blue", fontWeight: "bold" },
    4: { fontSize: 16, color: "orange", fontWeight: "bold" },
    5: { fontSize: 16, color: "red", fontWeight: "bold" },
  }

export const STATUS_MAP: { [key: number]: MyObjectType } = {
    2: { label: "Paid", color: "primary" },
    3: { label: "Completed", color: "success" },
    4: { label: "Refunded Initiated", color: "warning" },
    5: { label: "Cancelled", color: "danger" },
    6: { label: "Refunded", color: "success" },
};



