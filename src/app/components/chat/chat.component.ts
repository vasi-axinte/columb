import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'src/app/models/message';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  
  constructor(private chatService: ChatService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.chatService.retrieveMappedObject().subscribe( (receivedObj: Message) => { this.addToInbox(receivedObj);});  // calls the service method to get the new messages sent
                                                     
  }

  public message: Message = new Message(this.getUserName());
  msgInboxArray: Message[] = [];

  send(): void {
    if(this.message) {
      if(!this.message.message){
        return;
      } else {
        this.chatService.broadcastMessage(this.message); // Send the message via a service
        this.message.message="";
      }
    }
  }

  addToInbox(obj: Message) {
    let newObj = new Message(obj.user);
    newObj.message = obj.message;
    this.msgInboxArray.push(newObj);
  }

  getUserId(): string{
    const user = localStorage.getItem("user");

    if(!user){
      this.router.navigate(['/login']);
      return "";
    }

    const userData = JSON.parse(user);

    return userData.userId;
  }

  getUserName(): string{
    const user = localStorage.getItem("user");

    if(!user){
      return "";
    }

    const userData = JSON.parse(user);

    return userData.name;
  }
}
