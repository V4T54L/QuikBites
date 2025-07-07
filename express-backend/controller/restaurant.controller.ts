import { Response } from 'express';
import { AuthenticatedRequest } from '../model/model';
import { RestaurantService } from '../service/service';

export class RestaurantControllerImpl {
    constructor(private restaurantService: RestaurantService) { }

    async getRestaurants(req: AuthenticatedRequest, res: Response): Promise<void> {
        const { lat, long, query } = req.query;
        const results = await this.restaurantService.getRestaurants(Number(lat), Number(long), query as string);
        res.status(200).json(results);
    }

    async getRestaurantDetails(req: AuthenticatedRequest, res: Response): Promise<void> {
        const id = Number(req.params.restaurantID);
        const details = await this.restaurantService.getRestaurantDetails(id);
        res.status(200).json(details);
    }

    async updateRestaurantDetails(req: AuthenticatedRequest, res: Response): Promise<void> {
        if (!req.user?.id) {
            res.status(401).json({ message: 'Unauthorized' });
        }

        if (req.user?.id) {
            await this.restaurantService.updateRestaurantDetails({ ...req.body, id: req.user.id });
            res.status(200).json({ message: 'Restaurant details updated' });
            return
        }
        res.status(404);
    }

    async toggleAvailability(req: AuthenticatedRequest, res: Response): Promise<void> {
        if (!req.user?.id) {
            res.status(401).json({ message: 'Unauthorized' });
        }

        if (req.user?.id) {
            await this.restaurantService.toggleAvailability(req.user.id, req.body.isOpen);
        }
        res.status(200).json({ message: 'Availability toggled' });
    }

    async getMenu(req: AuthenticatedRequest, res: Response): Promise<void> {
        if (!req.user?.id) {
            res.status(401).json({ message: 'Unauthorized' });
        }

        const id = Number(req.params.restaurantID);

        if (req.user?.id) {
            const menu = await this.restaurantService.getMenu(id);
            res.status(200).json(menu);
            return
        }
        res.status(200).json([]);
    }

    async addMenuItem(req: AuthenticatedRequest, res: Response): Promise<void> {
        if (!req.user?.id) {
            res.status(401).json({ message: 'Unauthorized' });
        }

        if (req.user?.id) {
            await this.restaurantService.addMenuItem(req.user.id, req.body);
        }
        res.status(201).json({ message: 'Menu item added' });
    }

    async updateMenuItem(req: AuthenticatedRequest, res: Response): Promise<void> {
        if (!req.user?.id) {
            res.status(401).json({ message: 'Unauthorized' });
        }

        if (req.user?.id) {
            await this.restaurantService.updateMenuItem({ ...req.body, id: req.user.id });
            res.status(200).json({ message: 'Menu item updated' });
        }
        res.status(404);
    }

    async deleteMenuItem(req: AuthenticatedRequest, res: Response): Promise<void> {
        const itemId = Number(req.params.itemId);
        await this.restaurantService.deleteMenuItem(itemId);
        res.status(200).json({ message: 'Menu item deleted' });
    }

    async getRestaurantOrders(req: AuthenticatedRequest, res: Response): Promise<void> {
        if (!req.user?.id) {
            res.status(401).json({ message: 'Unauthorized' });
        }

        if (req.user?.id) {
            const orders = await this.restaurantService.getRestaurantOrders(req.user.id);
            res.status(200).json(orders);
            return
        }
        res.status(200).json([]);
    }

    async updateOrderStatus(req: AuthenticatedRequest, res: Response): Promise<void> {
        if (!req.user?.id) {
            res.status(401).json({ message: 'Unauthorized' });
        }

        const { orderId, status } = req.body;
        if (req.user?.id) {
            await this.restaurantService.updateOrderStatus(orderId, status, req.user?.id);
        }
        res.status(200).json({ message: 'Order status updated' });
    }

    async getAnalytics(req: AuthenticatedRequest, res: Response): Promise<void> {
        if (!req.user?.id) {
            res.status(401).json({ message: 'Unauthorized' });
        }

        if (req.user?.id) {
            const data = await this.restaurantService.getAnalytics(req.user.id);
            res.status(200).json(data);
            return
        }
        res.status(404);
    }
}
