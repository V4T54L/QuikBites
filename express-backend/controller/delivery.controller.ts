import { Response } from 'express';
import { DeliveryService } from '../service/service';
import { AuthenticatedRequest } from '../model/model';

export class DeliveryControllerImpl {
    constructor(private deliveryService: DeliveryService) { }

    async getAvailableOrders(req: AuthenticatedRequest, res: Response): Promise<void> {
        if (!req.user?.id) {
            res.status(401).json({ message: 'Unauthorized' });
            return
        }
        const orders = await this.deliveryService.getAvailableOrders(req.user.id);
        res.status(200).json(orders);
    }

    async acceptOrder(req: AuthenticatedRequest, res: Response): Promise<void> {
        const { orderID } = req.body;
        if (!req.user?.id) {
            res.status(401).json({ message: 'Unauthorized' });
            return
        }
        await this.deliveryService.acceptOrder(req.user.id, orderID);
        res.status(200).json({ message: 'Order accepted' });
    }

    async getActiveOrders(req: AuthenticatedRequest, res: Response): Promise<void> {
        if (!req.user?.id) {
            res.status(401).json({ message: 'Unauthorized' });
            return
        }
        const orders = await this.deliveryService.getActiveOrders(req.user.id);
        res.status(200).json(orders);
    }

    async updateOrderStatus(req: AuthenticatedRequest, res: Response): Promise<void> {
        const { orderID, status } = req.body;
        if (!req.user?.id) {
            res.status(401).json({ message: 'Unauthorized' });
            return
        }
        await this.deliveryService.updateOrderStatus(req.user.id, orderID, status);
        res.status(200).json({ message: 'Order status updated' });
    }

    async verifyDeliveryCompletion(req: AuthenticatedRequest, res: Response): Promise<void> {
        const { orderID, otp } = req.body;
        if (!req.user?.id) {
            res.status(401).json({ message: 'Unauthorized' });
            return
        }
        await this.deliveryService.verifyDeliveryCompletion(req.user.id, orderID, otp);
        res.status(200).json({ message: 'Delivery completed' });
    }

    async getOrderHistory(req: AuthenticatedRequest, res: Response): Promise<void> {
        if (!req.user?.id) {
            res.status(401).json({ message: 'Unauthorized' });
            return
        }
        const history = await this.deliveryService.getOrderHistory(req.user.id);
        res.status(200).json(history);
    }

    async getAnalytics(req: AuthenticatedRequest, res: Response): Promise<void> {
        if (!req.user?.id) {
            res.status(401).json({ message: 'Unauthorized' });
            return
        }
        const analytics = await this.deliveryService.getAnalytics(req.user.id);
        res.status(200).json(analytics);
    }

    async contactCustomer(req: AuthenticatedRequest, res: Response): Promise<void> {
        const { orderID } = req.params;
        const phone = await this.deliveryService.contactCustomer(Number(orderID));
        res.status(200).json({ phone });
    }

    async updateLocation(req: AuthenticatedRequest, res: Response): Promise<void> {
        const { lat, long } = req.body;
        if (!req.user?.id) {
            res.status(401).json({ message: 'Unauthorized' });
            return
        }
        await this.deliveryService.updateLocation(req.user.id, lat, long);
        res.status(200).json({ message: 'Location updated' });
    }
}
