import { Response } from 'express';
import { OrderService } from '../service/service';
import { AuthenticatedRequest } from '../model/model';

export class OrderControllerImpl {
    constructor(private orderService: OrderService) { }

    async placeOrder(req: AuthenticatedRequest, res: Response): Promise<void> {
        const { restaurantID, paymentMode } = req.body;
        if (!req.user?.id) {
            res.status(401).json({ message: 'Unauthorized' });
            return
        }
        const order = await this.orderService.placeOrder(req.user.id, restaurantID, paymentMode);
        res.status(201).json(order);
    }

    async getOrderHistory(req: AuthenticatedRequest, res: Response): Promise<void> {
        if (!req.user?.id) {
            res.status(401).json({ message: 'Unauthorized' });
            return
        }
        const orders = await this.orderService.getOrderHistory(req.user.id);
        res.status(200).json(orders);
    }

    async getActiveOrders(req: AuthenticatedRequest, res: Response): Promise<void> {
        if (!req.user?.id) {
            res.status(401).json({ message: 'Unauthorized' });
            return
        }
        const orders = await this.orderService.getActiveOrders(req.user.id);
        res.status(200).json(orders);
    }

    async trackOrder(req: AuthenticatedRequest, res: Response): Promise<void> {
        const { orderId } = req.params;
        if (!req.user?.id) {
            res.status(401).json({ message: 'Unauthorized' });
            return
        }
        const order = await this.orderService.trackOrder(req.user.id, Number(orderId));
        res.status(200).json(order);
    }

    async verifyDeliveryOTP(req: AuthenticatedRequest, res: Response): Promise<void> {
        const { orderId, otp } = req.body;
        if (!req.user?.id) {
            res.status(401).json({ message: 'Unauthorized' });
            return
        }
        await this.orderService.verifyDeliveryOTP(req.user.id, orderId, otp);
        res.status(200).json({ message: 'Delivery verified' });
    }

    async contactDriver(req: AuthenticatedRequest, res: Response): Promise<void> {
        const { orderId } = req.params;
        const phone = await this.orderService.contactDriver(Number(orderId));
        res.status(200).json({ phone });
    }
}
