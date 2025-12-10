import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {
  conversations = [
    {
      id: 1,
      name: 'GearZone Support',
      avatar: 'GS',
      lastMessage: 'Your refund has been processed successfully.',
      time: '10 min ago',
      unread: true,
      online: true
    },
    {
      id: 2,
      name: 'Order Updates',
      avatar: 'OU',
      lastMessage: 'Your order #12345 is out for delivery.',
      time: '2 hours ago',
      unread: true,
      online: false
    },
    {
      id: 3,
      name: 'Technical Support',
      avatar: 'TS',
      lastMessage: 'Thank you for contacting us. How can we help?',
      time: '1 day ago',
      unread: false,
      online: true
    },
    {
      id: 4,
      name: 'Sales Team',
      avatar: 'ST',
      lastMessage: 'Special offer just for you! 20% off on your next order.',
      time: '3 days ago',
      unread: false,
      online: false
    }
  ];

  selectedConversation = signal<any>(null);
  newMessage = '';

  messages = [
    { id: 1, sender: 'support', text: 'Hello! How can I help you today?', time: '10:30 AM' },
    { id: 2, sender: 'user', text: 'Hi, I need help with my recent order refund.', time: '10:32 AM' },
    { id: 3, sender: 'support', text: 'Of course! Could you please provide your order number?', time: '10:33 AM' },
    { id: 4, sender: 'user', text: 'It\'s #12340. I returned the item last week.', time: '10:35 AM' },
    { id: 5, sender: 'support', text: 'Thank you! Let me check that for you...', time: '10:36 AM' },
    { id: 6, sender: 'support', text: 'Your refund has been processed successfully. It should reflect in your account within 3-5 business days.', time: '10:38 AM' },
  ];

  selectConversation(conversation: any) {
    this.selectedConversation.set(conversation);
    conversation.unread = false;
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({
        id: this.messages.length + 1,
        sender: 'user',
        text: this.newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      this.newMessage = '';
    }
  }

  get unreadCount() {
    return this.conversations.filter(c => c.unread).length;
  }
}

