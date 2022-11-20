import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { HttpClient,HttpParams } from '@angular/common/http';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'keycloak-demo';
   process_key =new FormControl('');
   taskId =new FormControl('');  
   payload =new FormControl('');
  response:any;
  constructor(private keycloakService: KeycloakService,private http: HttpClient) {}
  logout() {
    this.keycloakService.logout();
	
  } 

  getEngineList(){
    this.http.get(`/camunda/engine-rest/engine`).subscribe((data: any) => {
     this.response=data;
      console.log(data);
    });
	}

  getTaskList(){
 let params = new HttpParams();
let user = this.keycloakService.loadUserProfile();
let id = user?.__zone_symbol__value?.username;
    // Begin assigning parameters
console.log(id);
    params = params.append('assignee', id);
    this.http.get(`/camunda/engine-rest/task`,{ params: params }).subscribe((data: any) => {
this.response=data;
      console.log(data);
    });
	}

  getProcessList(){
    this.http.get(`/camunda/engine-rest/process-definition`).subscribe((data: any) => {
this.response=data;
      console.log(data);
    });
	}


  startProcessByKey(){
    this.http.post(`/camunda/engine-rest/process-definition/key/${this.process_key.value}/start`,{}).subscribe((data: any) => {
    this.response=data;
      console.log(data);
    });
	}

  completeTask(){
console.log(JSON.parse(this.payload.value));
    this.http.post(`/camunda/engine-rest/task/${this.taskId.value}/complete`,JSON.parse(this.payload.value)).subscribe((data: any) => {
    this.response=data;
      console.log(data);
    });
	}


  getTaskVariables(){
    this.http.get(`/camunda/engine-rest/task/${this.taskId.value}/variables`).subscribe((data: any) => {
    this.response=data;
      console.log(data);
    });
	}


  getTaskForm(){
    this.http.get(`/camunda/engine-rest/task/${this.taskId.value}/form`).subscribe((data: any) => {
    this.response=data;
      console.log(data);
    });
	}

  getUserInfo(){

let user = this.keycloakService.loadUserProfile();
let id = user?.__zone_symbol__value?.username;
    // Initialize Params Object
    let params = new HttpParams();

    // Begin assigning parameters
    params = params.append('id', id);
    this.http.get(`/camunda/engine-rest/user`,{ params: params }).subscribe((data: any) => {
this.response=data;
      console.log(data);
    });
	}

getAcceptedRequests(){
    this.http.get(`http://localhost:10000/accepted-requests`).subscribe((data: any) => {
    this.response=data;
      console.log(data);
    });
	}

getRejectedRequests(){
    this.http.get(`http://localhost:10000/rejected-requests`).subscribe((data: any) => {
    this.response=data;
      console.log(data);
    });
	}
}
