// Packages
import _ from 'lodash';
import { Request, Response, NextFunction } from 'express';
import router from '../../router';
// Components
import Reviews from './';
// Helpers
import { APIError, Callout} from '../../utils';
// Review GET route
router.get('/review', async (req: Request, res: Response, next: NextFunction) => {
    const { title, authors } = _.pick(req.query, 'title', 'authors');
    const [err, response] = await Callout(Reviews.reviewBook({ title: `${title}`, authors: `${authors}` }));
    if (err) {
        return next(new APIError(err.message, err.status, true));
    }
    // Return the model's response to the client
    res.json(response);
});
// Export router
export default router;
