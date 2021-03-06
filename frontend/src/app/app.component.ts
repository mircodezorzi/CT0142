import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Socket } from 'ngx-socket-io';
import { ToastrService } from 'ngx-toastr';
import { HighlightSpanKind } from 'typescript';
import { AppService } from './app.service';
import { BattleshipGameComponent } from './battleship-game/battleship-game.component';
import { BoardService } from './battleship-game/board.service';

import { ChatService } from './chat.service';
import { WebsocketService } from './websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  static token: any;
  static isShown: boolean=false;
  static getToken() {
    return this.token;
  }
  get logged() {
    return AppComponent.logged;
  }
  get isShown(){
    return AppComponent.isShown;
  }
  title = 'c4';
  static logged:boolean= false;
  name:string="";
  username:string="";
  password:string="";
  email:string="";

  
  constructor(private chatService: ChatService, private appService:AppService, private socket:WebsocketService) {
   
   }

  ngOnInit() {
    
    this.chatService.sendMessage('porcodio')

    
  }
  register(){
    this.appService.register({name:this.name,username:this.username,email:this.email,password:this.password}).pipe().subscribe();
  }
  static toggleShow(){
    this.isShown=!this.isShown;
  }
  login(){
    this.appService.login({username:this.username,password:this.password}).pipe().subscribe((data)=>{
      
      AppComponent.token=JSON.parse(JSON.stringify(data)).token;
      this.socket.connection();
    });
  }
  ngOnDestroy() {
  }
  getToken(){
    
  }
}
