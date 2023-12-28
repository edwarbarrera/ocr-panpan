import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name:'userIdentifer'})
export class UserIdentifier implements PipeTransform{

  transform(value:{firstName: string, lastName:string}, locale:'fr'):string {

   return locale=== 'fr' ?`${ value.lastName.toUpperCase()  + ' '+ value.firstName.substring(0,5) }` : `${ value.firstName.substring(0,5)  + ' '+  value.lastName.toUpperCase() }`;

  }

}
