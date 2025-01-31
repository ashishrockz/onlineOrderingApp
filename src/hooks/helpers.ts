export const twelveHoursFormat = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const meridian = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${meridian}`;
  };

export  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString?.split('-');
    return `${month}/${day}/${year}`;
  };
export const formatOrderData = (data: any) => {
  const formattedOrder = Array.isArray(data) ? data : [data];

  return formattedOrder.map(order => {
    return {
      Amount: order.total,
      Name: order.customer_details?.name,
      date: order.schedule_date,
      email: order.customer_details?.email,
      id: order.id,
      mobile_no: order.customer_details?.mobile_no,
      status: order.status,
      time: order.schedule_time,
      type: "Pick up"
    };
  })
}