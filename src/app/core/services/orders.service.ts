import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface OrderProduct {
    productId: string;
    quantity: number;
}

export interface ShippingAddress {
    street: string;
    city: string;
    country: string;
    postalCode: string;
}

export interface CreateOrderRequest {
    products: OrderProduct[];
    shippingAddress: ShippingAddress;
}

@Injectable({
    providedIn: 'root'
})
export class OrdersService {

    private readonly httpClient = inject(HttpClient);
    private readonly baseUrl = 'https://gear-zone-backend.fly.dev/api/orders';

    createOrder(orderData: CreateOrderRequest): Observable<any> {
        return this.httpClient.post(this.baseUrl, orderData);
    }

    getMyOrders(page: number = 1, limit: number = 10): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}/my-orders`, {
            params: { page: page.toString(), limit: limit.toString() }
        });
    }

    getOrderDetails(orderId: string): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}/${orderId}`);
    }

    updateOrderStatus(orderId: string, status: string, trackingNumber?: string): Observable<any> {
        const body: any = { status };
        if (trackingNumber) {
            body.trackingNumber = trackingNumber;
        }
        return this.httpClient.patch(`${this.baseUrl}/${orderId}`, body);
    }
}
