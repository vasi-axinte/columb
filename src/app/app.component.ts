import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'columb';

  constructor(){
    let content = JSON.stringify({"name":"admin admin",
    "email":"admin@admin.com",
    "state":"Active",
    "roles":"Admin",
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4gYWRtaW4iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJhZG1pbkBhZG1pbi5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3VzZXJkYXRhIjoiQWN0aXZlIiwianRpIjoiNWRiNTQwYjItNmFkYS00MDlmLWI3NjctZTBhZTFjODNhNjkzIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJleHAiOjE2ODY1Mjk0MjAsImlzcyI6IndlYmNoZWNrYXBpLmF6dXJld2Vic2l0ZXMubmV0IiwiYXVkIjoiaHR0cHM6Ly95ZWxsb3ctdHJlZS0wMGE1NmE3MDMuMy5henVyZXN0YXRpY2FwcHMubmV0In0.pEMdRqp7mttaG-MYGPVyzMyB3XSLBz3vz_pW4SH13gU"
    })
    localStorage.setItem("user", content);
  }
}
