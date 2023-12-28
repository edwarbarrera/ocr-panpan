import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { ComplexFormValue } from "../models/complex-form-value.model";
import { Observable, catchError, delay, map, mapTo, of } from "rxjs";
import { environment } from "src/environments/environment.development";

@Injectable()
export class ComplexFormService implements OnInit{

constructor(private http:HttpClient){}

  ngOnInit(): void {
  }


  saveUserInfo(formValue: ComplexFormValue):Observable<boolean>{
    return this.http.post(`${environment.apiURL}/users`, formValue).pipe(
      map(() => true),
      delay(1000),
      catchError(()=> of(false).pipe(
        delay(1000)
      ))
    );


  }
}
