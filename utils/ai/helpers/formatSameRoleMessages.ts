// detect two messages in a row with the same role and merge them
const formatSameRoleMessages = (messages: { role: string; content: string }[]) => {
    for (let i = 0; i < messages.length - 1; i++) {
        if (messages[i].role === messages[i + 1].role) {
            messages[i].content += " \n " + messages[i + 1].content;
            messages.splice(i + 1, 1);
            i--;
        }
    }
};

export default formatSameRoleMessages;
