export default function formatMessageDate(date: string) {
    const now = new Date();
    const messageDate = new Date(date);

    const isToday =
        now.getDate() === messageDate.getDate() &&
        now.getMonth() === messageDate.getMonth() &&
        now.getFullYear() === messageDate.getFullYear();

    const formatted = isToday ? formatTime(messageDate) : `${formatDate(messageDate)}, ${formatTime(messageDate)}`;

    return formatted;
}

function formatTime(date: Date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${singleDigit(hours)}:${singleDigit(minutes)}`;
}

function formatDate(date: Date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${singleDigit(day)}.${singleDigit(month)}.${year}`;
}

function singleDigit(number: number) {
    return number < 10 ? "0" + number : number;
}
