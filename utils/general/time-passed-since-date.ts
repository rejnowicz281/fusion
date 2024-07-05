// get the time passed since the message was created - for example, "2 hours ago", "3 days ago", "1 week ago", "2 months ago", "1 year ago"

const timePassedSinceDate = (date: string) => {
    const now = new Date();
    const messageDate = new Date(date);

    const timePassed = now.getTime() - messageDate.getTime();
    const secondsPassed = timePassed / 1000;
    const minutesPassed = secondsPassed / 60;
    const hoursPassed = minutesPassed / 60;
    const daysPassed = hoursPassed / 24;
    const weeksPassed = daysPassed / 7;
    const monthsPassed = daysPassed / 30;
    const yearsPassed = daysPassed / 365;

    if (secondsPassed < 60) return "Just now";

    if (minutesPassed < 60) {
        const count = Math.floor(minutesPassed);
        return `${count} min ago`;
    }

    const pluralizedAgo = (number: number, word: string) => {
        const count = Math.floor(number) || 1;

        const pluralize = () => (count === 1 ? word : `${word}s`);

        return `${count} ${pluralize()} ago`;
    };

    if (hoursPassed < 24) return pluralizedAgo(hoursPassed, "hour");

    if (daysPassed < 7) return pluralizedAgo(daysPassed, "day");

    if (weeksPassed < 4) return pluralizedAgo(weeksPassed, "week");

    if (monthsPassed < 12) return pluralizedAgo(monthsPassed, "month");

    return pluralizedAgo(yearsPassed, "year");
};

export default timePassedSinceDate;
