import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable()

export class GKSalesApi {
    baseUrl = 'http://192.168.49.36:8080';
    validateResult: any;
    portfolio: any;
    coursesCode: any;
    insertflg: any;
    clientList:any;
    userList:any;


    constructor(private http: Http) {

    }


    validateLogin(loginId, pwd): Observable<any> {

        return this.http.post(this.baseUrl + '/checkLogin', {
            email_id: loginId,
            password: pwd
        }).map((res: Response) => {

            this.validateResult = res;
            console.log("inside map : " + this.validateResult);
            return this.validateResult;

        }) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error || 'Server error')); //...errors if any
    }

    getClients(): Observable<any> {

        return this.http.get(this.baseUrl + '/getClients').map((res: Response) => {

            this.clientList = res;
            console.log("inside map clientlist: " + this.clientList);
            return this.clientList;

        }) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error || 'Server error')); //...errors if any
    }

    getUserRequestData(loginId): Observable<any> {

        return this.http.get(this.baseUrl + '/getUserList?email_id='+loginId).map((res: Response) => {

            this.userList = res;
            console.log("inside map userlist: " + this.userList);
            return this.userList;

        }) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error || 'Server error')); //...errors if any
    }

    insertNewRequest(salesData): Observable<any> {
        console.log("reqobject: ", salesData);

        return this.http.post(this.baseUrl + '/insertUpdateSales',
            salesData
        ).map((res: Response) => {

            this.insertflg = res;
            console.log("inside map : iinsertflg" + this.insertflg);
            return this.insertflg;

        }) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error || 'Server error')); //...errors if any
    }

    getPortfolios(): Observable<any> {

        return this.http.get(this.baseUrl + '/getPortfolios').map((res: Response) => {

            this.portfolio = res;
            // console.log("inside map portfolio: " + this.validateResult);
            return this.portfolio;

        }) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error || 'Server error')); //...errors if any
    }

    getcourseCode(): Observable<any> {

        return this.http.get(this.baseUrl + '/getCourseCode').map((res: Response) => {

            this.coursesCode = res;
            console.log("inside map getcourseCode: " + this.coursesCode);
            return this.coursesCode;

        }) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error || 'Server error')); //...errors if any
    }
}