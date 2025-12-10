import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent {
  orders = [
    {
      id: '#12345',
      status: 'Delivered',
      statusClass: 'status-delivered',
      date: 'Dec 5, 2024',
      items: '1x Premium Brake Disc Set',
      price: '$165.98',
      tracking: 'TR123456789'
    },
    {
      id: '#12344',
      status: 'In Transit',
      statusClass: 'status-transit',
      date: 'Nov 28, 2024',
      items: '2x High Performance Oil Filter',
      price: '$65.97',
      tracking: 'TR987654321'
    },
    {
      id: '#12343',
      status: 'Delivered',
      statusClass: 'status-delivered',
      date: 'Nov 15, 2024',
      items: '1x Car Battery 12V 75Ah',
      price: '$145.98',
      tracking: 'TR456789123'
    },
    {
      id: '#12342',
      status: 'Processing',
      statusClass: 'status-processing',
      date: 'Nov 10, 2024',
      items: '1x Engine Components Kit',
      price: '$315.98',
      tracking: null
    }
  ];

  stats = {
    totalOrders: 4,
    inTransit: 1,
    delivered: 2
  };
}
