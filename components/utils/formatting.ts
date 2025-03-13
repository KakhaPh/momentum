export function formatDateGeorgian(dateString: string) {
    const months = [
        "იანვ", "თებ", "მარ", "აპრ", "მაი", "ივნ",
        "ივლ", "აგვ", "სექტ", "ოქტ", "ნოე", "დეკ"
    ];

    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month}, ${year}`;
}

export function truncateText(text: string) {
    return text.length > 100 ? text.slice(0, 100) + "..." : text;
}