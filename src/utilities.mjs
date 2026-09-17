export function formatDate(dateObj){
    /**
     * Formats the date object obtained from the queries
     */
    const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const months = ["January","Febuary","March","April","May","June","July","August","September","October","November","December"];


    return `${weekdays[dateObj.getDay()]}, ${months[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()}`;
};