export function time(date: string): string {
    const now = new Date();
    const postDate = new Date(date);
    const diffTime = Math.abs(now.getTime() - postDate.getTime());

    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    if (diffYears > 0) {
        return `${diffYears} ${diffYears === 1 ? 'year' : 'years'} ago`;
    }

    if (diffMonths > 0) {
        return `${diffMonths} ${diffMonths === 1 ? 'month' : 'months'} ago`;
    }

    if (diffDays > 6) {
        const diffWeeks = Math.floor(diffDays / 7);
        return `${diffWeeks} ${diffWeeks === 1 ? 'week' : 'weeks'} ago`;
    }

    if (diffDays > 0) {
        return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
    }

    return 'Today';
}