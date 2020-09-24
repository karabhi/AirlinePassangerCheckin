import { Injectable, ViewChild, OnInit } from "@angular/core";
import { Passenger } from '../model/passenger.model';
import { Subject } from 'rxjs';
import { AncillaryService } from '../model/ancillary-service.model';
import { HttpClient } from "@angular/common/http";
import { UselessInfo } from '../model/useless-info.model';


// const passengers2 : Passenger[] = [
//     {passportNumber: '344416785', name : 'test', age : '33', gender: 'FEMALE', checkedIn: true, isInfant : false, wheelChair: true, ancillaryServices:false} 
// ]

@Injectable()
export class PassengerService implements OnInit{
    
    passengerSeatChanged = new Subject<String>();
    //passengersChanged = new Subject<Passenger[]>();
    
    passengers:Passenger[]=[];
    ancillaryServices:AncillaryService[] = [];
    uselessInfo : UselessInfo[] = [];

    constructor(private http : HttpClient){}

    ngOnInit(){}

    getPassengers():Passenger[]{
        return this.passengers.slice();
    }

    getPassenger(passportNumber : string){
        console.log(this.passengers.find(passenger => passenger.passportNumber == passportNumber))
        return this.passengers.find(passenger => passenger.passportNumber == passportNumber)
    }

    getPassengersOfFlight(flightNo : string):Passenger[]{
       return this.passengers.filter(passanger => passanger.flightNo === flightNo);
    }

    getPassengerSeat(passId : string):string{
        return this.passengers.find(passenger => passenger.passportNumber === passId).seatNo;
    }

    checkWheelchairOrInfant(seat : string, flightNo : string) : string{
        let passenger = this.passengers.find(passenger => passenger.flightNo == flightNo && passenger.seatNo == seat);
        if(passenger == null){
            return null
        }
        else if(passenger.wheelChair&&passenger.isInfant){
            return "BOTH";
        }
        else if(passenger.wheelChair){
            return "WHEELCHAIR";
        }
        else if(passenger.isInfant){
            return "INFANT"
        }
        else return null;
    }

    getUselessInfo():UselessInfo[]{
        return this.uselessInfo.slice();
    }

    // -------------------------Update Operation--------------------------------
    setPassengerSeat(passengerId:string,newSeat:string){
        let passengerSeatAssigned = this.passengers.find(passenger => passenger.passportNumber === passengerId);
        passengerSeatAssigned.seatNo = newSeat;
        this.passengerSeatChanged.next(newSeat);

        this.http.put("http://localhost:3000/passengers/"+passengerId,{
            "id": passengerSeatAssigned.passportNumber,
            "name": passengerSeatAssigned.name,
            "age": passengerSeatAssigned.age,
            "gender": passengerSeatAssigned.gender,
            "flightNo": passengerSeatAssigned.flightNo,
            "wheelChair": passengerSeatAssigned.wheelChair,
            "isInfant": passengerSeatAssigned.isInfant,
            "ancillaryServices": passengerSeatAssigned.ancillaryServices,
            "seatNo": passengerSeatAssigned.seatNo
        }).subscribe((res)=>console.log("set seat entered"));
    }

    clearPassengerSeat(passengerId : string){
        let passengerSeatAssigned = this.passengers.find(passenger => passenger.passportNumber === passengerId);
        passengerSeatAssigned.seatNo = null;
        this.passengerSeatChanged.next(null);

        this.http.put("http://localhost:3000/passengers/"+passengerId,{
            "id": passengerSeatAssigned.passportNumber,
            "name": passengerSeatAssigned.name,
            "age": passengerSeatAssigned.age,
            "gender": passengerSeatAssigned.gender,
            "flightNo": passengerSeatAssigned.flightNo,
            "wheelChair": passengerSeatAssigned.wheelChair,
            "isInfant": passengerSeatAssigned.isInfant,
            "ancillaryServices": passengerSeatAssigned.ancillaryServices,
            "seatNo": passengerSeatAssigned.seatNo
        }).subscribe((res)=>console.log("passenger seat cleared"));
    }

    getAncillaryServices(){
        return this.ancillaryServices.slice();
    }

    getAncillaryService(passNo:string){
        return this.ancillaryServices.find(service => service.passportNumber == passNo)
    }

    getAncillaryServiceByFlightAndSeatNo(flightNo : string, seatNo : string){
        var passportNumber = this.passengers.find(x => (x.flightNo == flightNo)&&(x.seatNo == seatNo)).passportNumber
        return this.ancillaryServices.find(x => x.passportNumber == passportNumber)
    }


    //----------------------------------------POST/DELETE OPERATIONS----------------------------------------------------------
    addPassenger(passenger : Passenger ){
        this.passengers.push(passenger);
        
        this.http.post("http://localhost:3000/passengers",{
            "id": passenger.passportNumber,
            "name": passenger.name,
            "age": passenger.age,
            "gender": passenger.gender,
            "flightNo": passenger.flightNo,
            "wheelChair": passenger.wheelChair,
            "isInfant": passenger.isInfant,
            "ancillaryServices": passenger.ancillaryServices,
            "seatNo": passenger.seatNo
        }).subscribe((res)=>console.log("add passenger entered"));
        
    }

    addPassengerServices(service : AncillaryService){
        this.ancillaryServices.push(service);
        this.http.post("http://localhost:3000/ancillaryservices",{
            "id": service.passportNumber.toString(),
            "specialMeal": service.specialMeal,
            "extraLuggage": service.extraLuggage,
            "extraLegSpace": service.extraLegSpace
        }).subscribe((res)=>console.log("add ancillary service entered"));
    }

    addUselessInfo(info : UselessInfo){
        this.uselessInfo.push(info);
        this.http.post("http://localhost:3000/uselessInfo",{
            "id": info.passportNumber,
            "dateOfBirth": info.dateOfBirth,
            "address": info.address
        }).subscribe((res)=>console.log("nullable info entered"));
    }

    editUselessInfo(passNo:string,dob:string,address:string){
        this.uselessInfo.find(x=>x.passportNumber == passNo).dateOfBirth = dob;
        this.uselessInfo.find(x=>x.passportNumber == passNo).address = address;
        this.http.put("http://localhost:3000/uselessInfo/"+passNo,{
            "id": passNo,
            "dateOfBirth": dob,
            "address": address
        }).subscribe((res)=>console.log("nullable info edited"));
    }

    deletePassenger(passportNumber:string){
        var passengerExists = this.passengers.find(x=>x.passportNumber==passportNumber);
        if(passengerExists){
            var index = this.passengers.indexOf(passengerExists);
            this.passengers.splice(index,1);
            this.http.delete("http://localhost:3000/passengers/"+passportNumber).subscribe((res)=>console.log("delete passenger entered"));
            //console.log(passengerExists);
        }
        var ancillaryExists = this.ancillaryServices.find(x=>x.passportNumber==passportNumber);
        if(ancillaryExists){
            var index = this.ancillaryServices.indexOf(ancillaryExists);
            this.ancillaryServices.splice(index,1);
            this.http.delete("http://localhost:3000/ancillaryservices/"+passportNumber).subscribe((res)=>console.log("delete service entered"));
            //console.log(ancillaryExists);
        }
    }

}