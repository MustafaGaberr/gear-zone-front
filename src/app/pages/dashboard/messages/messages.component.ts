import { Component, signal, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked , ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../../features/auth/services/chat.service'; 
@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent implements OnInit, OnDestroy, AfterViewChecked {
  //ID for try (which comming from localStorage in real app)
  // myId = '692bd561cd6fc05d181f9773'; 
  myId = '692bd5a2cd6fc05d181f977a'; 

  conversations: any[] = []; 
  messages: any[] = [];

  selectedConversation = signal<any>(null);
  newMessage = '';

  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

constructor(
    private chatService: ChatService, 
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit() {
    this.chatService.connect(this.myId);
    this.loadConversations();

    this.chatService.getNewMessage().subscribe((data: any) => {
      console.log('Message from socket:', data); 
      this.handleIncomingMessage(data);
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  loadConversations() {
      this.chatService.getMyConversations(this.myId).subscribe({
          next: (res: any) => {
              this.conversations = res.data.map((chat: any) => ({
                  id: chat._id,
                  name: chat.name || 'Unknown',
                  avatar: chat.name ? chat.name.charAt(0).toUpperCase() : 'U',
                  lastMessage: chat.lastMessage,
                  time: this.formatTime(chat.timestamp),
                  unread: false,
                  online: false
              }));
              this.cdr.detectChanges(); 
          }
      });
  }

  selectConversation(conversation: any) {
      this.selectedConversation.set(conversation);
      this.messages = [];
      
      this.chatService.getChatHistory(conversation.id, this.myId).subscribe({
          next: (res: any) => {
              if (res.status === 'success') {
                  this.messages = res.data.map((msg: any) => ({
                      id: msg._id,
                      sender: msg.sender === this.myId ? 'user' : 'support',
                      text: msg.contentMes || msg.content,
                      time: this.formatTime(msg.createdAt)
                  }));
                  
                  this.cdr.detectChanges(); 
                  this.scrollToBottom();
              }
          }
      });
  }


  sendMessage() {
    if (this.newMessage.trim() && this.selectedConversation()) {
      const friendId = this.selectedConversation().id;
      const textToSend = this.newMessage;

      this.messages.push({
        id: Date.now(),
        sender: 'user',
        text: textToSend,
        time: this.formatTime(new Date())
      });

      this.newMessage = '';
      this.cdr.detectChanges(); 
      this.scrollToBottom();

      this.chatService.sendMessage({
        senderId: this.myId,
        recipientId: friendId,
        content: textToSend 
      }).subscribe({
        next: () => {
             this.loadConversations(); 
        }, 
        error: (err) => console.error('Failed to send', err)
      });
    }
  }

  handleIncomingMessage(data: any) {
    const currentChat = this.selectedConversation();
    
    console.log(' Message Detailes:', data);
    console.log(' chat open:', currentChat?.id);

    if (currentChat && (data.senderId === currentChat.id || data.recipientId === currentChat.id)) {
      
      if (data.senderId === this.myId) return; 

      this.messages.push({
        id: Date.now(),
        sender: 'support', 
        text: data.contentMes || data.content,
        time: this.formatTime(data.createdAt || new Date())
      });
      
      console.log('✅ Done: Message added to current chat');
      this.cdr.detectChanges(); 
      this.scrollToBottom();
    }
    
    this.loadConversations();
  }

  
  formatTime(dateString: any): string {
    if (!dateString) return '';
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  scrollToBottom(): void {
    try {
      if(this.scrollContainer) {
          this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
      }
    } catch(err) { }
  }

  get unreadCount() {
    return this.conversations.filter(c => c.unread).length;
  }

  ngOnDestroy() {
    this.chatService.disconnect(); 
  }
}