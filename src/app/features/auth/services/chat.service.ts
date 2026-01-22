import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: Socket | undefined;
  
  // تأكدي إن البورت مطابق للباك اند بتاعك
  private readonly BASE_URL = 'http://localhost:4000'; 
  private readonly API_URL = `${this.BASE_URL}/api/chat`;

  constructor(private http: HttpClient) { }

  // 1. الاتصال بالسوكيت (Handshake)
  connect(userId: string) {
    // لو فيه اتصال مفتوح، اقفليه الأول عشان ميبقاش فيه تضارب
    if (this.socket) {
        this.socket.disconnect();
    }

    this.socket = io(this.BASE_URL, {
      query: { id: userId }
    });
  }

  // 2. الاستماع للرسائل القادمة (Live)
  getNewMessage(): Observable<any> {
    return new Observable(observer => {
      this.socket?.on('private_message', (data) => {
        observer.next(data);
      });
    });
  }

  // 3. جلب رسائل محادثة معينة (History)
  getChatHistory(friendId: string, myId: string) {
    return this.http.get(`${this.API_URL}/history/${friendId}?myId=${myId}`);
  }

  getMyConversations(myId: string) {
    return this.http.get(`${this.API_URL}/conversations/${myId}`);
  }

  sendMessage(data: any) {
    return this.http.post(`${this.API_URL}/send`, data);
  }

  disconnect() {
    this.socket?.disconnect();
  }
}