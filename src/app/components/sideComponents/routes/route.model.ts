// route.model.ts
export class Route {
  constructor(
    public routeId: number,
    public departureFrom: string,
    public departureTo: string,
    public bus: {busNumber: number},
    public departureDate: Date, // Updated property for date
    public departureTime: string, // Updated property for time
    public cost: number,
    public editMode: boolean
  ) {}
}
