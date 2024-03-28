// detect two messages in a row with the same role and merge them
const formatSameRoleMessages = (messages: { role: string; content: string }[]) => {
    const formatted = [...messages];

    for (let i = 0; i < formatted.length - 1; i++) {
        if (formatted[i].role === formatted[i + 1].role) {
            formatted[i].content += " \n " + formatted[i + 1].content;
            formatted.splice(i + 1, 1);
            i--;
        }
    }

    return formatted;
};

export default formatSameRoleMessages;
