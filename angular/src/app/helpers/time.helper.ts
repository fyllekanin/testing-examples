

export class TimeHelper {

	static readonly DAYS: Array<{ label: string, number: 1 }> = [
		{ label: 'Monday', number: 1 },
		{ label: 'Tuesday', number: 2 },
		{ label: 'Wednesday', number: 3 },
		{ label: 'Thursday', number: 4 },
		{ label: 'Friday', number: 5 },
		{ label: 'Saturday', number: 6 },
		{ label: 'Sunday', number: 7 }
	];

	static getDay(day: number): string {
		return this.DAYS.find(day => day.number === day)?.label;
	}

	static getDayWithSuffix (day: number): string {
        	const j = day % 10,
            	    k = day % 100;
        	if (j === 1 && k !== 11) {
            	return day + 'st';
        	}
        	if (j === 2 && k !== 12) {
            	return day + 'nd';
        	}
        	if (j === 3 && k !== 13) {
            	return day + 'rd';
        	}
        	return day + 'th';
    	}

	static getTimeOffset (): number {
        	const offset = new Date().getTimezoneOffset();
        	return offset > 0 ? -offset : Math.abs(offset);
    	}

	static getTimeOffsetInHours (): number {
        	return Math.floor(this.getTimeOffset() / 60);
    	}
}

