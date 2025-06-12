import { Request, Response } from 'express';
import { Watch } from '../models/Watch';

export const getWatches = async (req: Request, res: Response) => {
  try {
    const {
      page = 1,
      limit = 10,
      brand,
      priceMin,
      priceMax,
      movement,
    } = req.query;

    const query: any = {};

    if (brand) query.brand = brand;
    if (movement) query.movement = movement;
    if (priceMin || priceMax) {
      query.price = {};
      if (priceMin) query.price.$gte = Number(priceMin);
      if (priceMax) query.price.$lte = Number(priceMax);
    }

    const watches = await Watch.find(query)
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .sort({ createdAt: -1 });

    const total = await Watch.countDocuments(query);

    res.json({
      success: true,
      data: {
        watches,
        pagination: {
          total,
          page: Number(page),
          limit: Number(limit),
          pages: Math.ceil(total / Number(limit)),
        },
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching watches' });
  }
};

export const getWatchById = async (req: Request, res: Response) => {
  try {
    const watch = await Watch.findById(req.params.id).populate('reviews.userId', 'name');

    if (!watch) {
      return res.status(404).json({ error: 'Watch not found' });
    }

    res.json({
      success: true,
      data: { watch },
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching watch' });
  }
};

export const createWatch = async (req: Request, res: Response) => {
  try {
    const watch = new Watch(req.body);
    await watch.save();

    res.status(201).json({
      success: true,
      data: { watch },
    });
  } catch (error) {
    res.status(500).json({ error: 'Error creating watch' });
  }
};

export const updateWatch = async (req: Request, res: Response) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = [
      'brand',
      'model',
      'reference',
      'price',
      'movement',
      'caseSize',
      'waterResistance',
      'images',
      'specifications',
    ];

    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).json({ error: 'Invalid updates' });
    }

    const watch = await Watch.findById(req.params.id);

    if (!watch) {
      return res.status(404).json({ error: 'Watch not found' });
    }

    updates.forEach((update) => {
      watch[update] = req.body[update];
    });

    await watch.save();

    res.json({
      success: true,
      data: { watch },
    });
  } catch (error) {
    res.status(500).json({ error: 'Error updating watch' });
  }
};

export const deleteWatch = async (req: Request, res: Response) => {
  try {
    const watch = await Watch.findByIdAndDelete(req.params.id);

    if (!watch) {
      return res.status(404).json({ error: 'Watch not found' });
    }

    res.json({
      success: true,
      data: { watch },
    });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting watch' });
  }
};

export const addReview = async (req: Request, res: Response) => {
  try {
    const { rating, comment } = req.body;
    const watch = await Watch.findById(req.params.id);

    if (!watch) {
      return res.status(404).json({ error: 'Watch not found' });
    }

    watch.reviews.push({
      userId: req.user._id,
      rating,
      comment,
    });

    await watch.save();

    res.status(201).json({
      success: true,
      data: { watch },
    });
  } catch (error) {
    res.status(500).json({ error: 'Error adding review' });
  }
}; 