import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as SockJS from 'sockjs-client';
import { ChatMessage } from 'src/app/interface/chat-message';
import { ChatService } from 'src/app/service/chat.service';
import * as Stomp from 'stompjs'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  private stompClient : any

  private CHANNEL = '/topic/chat'
  private ENPOINT = 'http://localhost:8080/socket'

  messages: ChatMessage[] = []

  isConnected = false

  chatFormGroup : FormGroup = new FormGroup({
    message: new FormControl('', Validators.required)
  });

  constructor(private chatService: ChatService) {

  }

  ngOnInit(): void {
    this.connectWebsocket()
  }

  private connectWebsocket() {
    let ws = new SockJS(this.ENPOINT)
    this.stompClient = Stomp.over(ws)

    let that = this
    this.stompClient.connect({}, function() {
      that.isConnected = true
      that.subscribeToGlobalChat()
    })
  }

  private subscribeToGlobalChat() {
    let that = this

    this.stompClient.subscribe(this.CHANNEL, function (message: any) {
      let newMessage = JSON.parse(message.body) as ChatMessage
      that.messages.push(newMessage)
    })
  }

  onSubmit() {
    let message = this.chatFormGroup.controls['message'].value

    if (!this.isConnected) {
      alert('Please connect to Websocket')
      return
    }

    // validate message
    this.chatService.postMessage(message).subscribe((response) => {

    }, (error) => {
      console.log(error);
    })
  }

}


