import { Response } from 'express';
import { CartService } from '../service/service';
import { AuthenticatedRequest } from '../model/model';

export class CartControllerImpl {
    constructor(private cartService: CartService) { }

    async getCart(req: AuthenticatedRequest, res: Response): Promise<void> {
        const { restaurantID } = req.query;
        if (!req.user?.id) {
            res.status(401).json({ message: 'Unauthorized' });
            return
        }
        const cart = await this.cartService.getCart(req.user.id, Number(restaurantID));
        res.status(200).json(cart);
    }

    async addItemToCart(req: AuthenticatedRequest, res: Response): Promise<void> {
        const { restaurantID, itemId } = req.body;
        if (!req.user?.id) {
            res.status(401).json({ message: 'Unauthorized' });
            return
        }
        await this.cartService.addItemToCart(req.user.id, restaurantID, itemId);
        res.status(200).json({ message: 'Item added to cart' });
    }

    async removeItemFromCart(req: AuthenticatedRequest, res: Response): Promise<void> {
        const { restaurantID, itemId } = req.body;
        if (!req.user?.id) {
            res.status(401).json({ message: 'Unauthorized' });
            return
        }
        await this.cartService.removeItemFromCart(req.user.id, restaurantID, itemId);
        res.status(200).json({ message: 'Item removed from cart' });
    }

    async clearCart(req: AuthenticatedRequest, res: Response): Promise<void> {
        const { restaurantID } = req.body;
        if (!req.user?.id) {
            res.status(401).json({ message: 'Unauthorized' });
            return
        }
        await this.cartService.clearCart(req.user.id, restaurantID);
        res.status(200).json({ message: 'Cart cleared' });
    }
}
