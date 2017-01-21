export class Query {
    private _startDate: string;

    constructor(startDate: Date, public startTime: number) {
        this._startDate = startDate.getMonth() + 1 + '/' + startDate.getDate() + '/' + startDate.getFullYear();
    }

    get startDate(): string {
        return this._startDate;
    }

}
