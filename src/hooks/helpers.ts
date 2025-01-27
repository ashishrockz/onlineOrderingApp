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
