export class Passenger{
    constructor(
        public passportNumber : string,
        public name : string,
        public age : string,
        public gender : string,
        public flightNo : string,
        public wheelChair : boolean,
        public isInfant : boolean,
        public ancillaryServices : boolean
    ){}
}