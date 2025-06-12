import { Watch } from '../../models/Watch';

describe('Watch Model', () => {
  it('should create a watch with required fields', async () => {
    const watchData = {
      brand: 'Rolex',
      model: 'Submariner',
      reference: '126610LN',
      price: 8000,
      movement: 'Automatic',
      caseSize: 41,
      waterResistance: 300,
      images: ['image1.jpg', 'image2.jpg'],
      specifications: {
        case: 'Stainless Steel',
        bracelet: 'Oyster',
        crystal: 'Sapphire',
      },
    };

    const watch = new Watch(watchData);
    await watch.validate();

    expect(watch.brand).toBe(watchData.brand);
    expect(watch.model).toBe(watchData.model);
    expect(watch.reference).toBe(watchData.reference);
    expect(watch.price).toBe(watchData.price);
    expect(watch.movement).toBe(watchData.movement);
    expect(watch.caseSize).toBe(watchData.caseSize);
    expect(watch.waterResistance).toBe(watchData.waterResistance);
    expect(watch.images).toEqual(watchData.images);
    expect(watch.specifications).toEqual(watchData.specifications);
  });

  it('should validate required fields', async () => {
    const watch = new Watch({});

    let error;
    try {
      await watch.validate();
    } catch (e) {
      error = e;
    }

    expect(error).toBeDefined();
    expect(error.errors.brand).toBeDefined();
    expect(error.errors.model).toBeDefined();
    expect(error.errors.reference).toBeDefined();
    expect(error.errors.price).toBeDefined();
  });

  it('should validate price is positive', async () => {
    const watch = new Watch({
      brand: 'Rolex',
      model: 'Submariner',
      reference: '126610LN',
      price: -1000,
    });

    let error;
    try {
      await watch.validate();
    } catch (e) {
      error = e;
    }

    expect(error).toBeDefined();
    expect(error.errors.price).toBeDefined();
  });

  it('should validate case size is positive', async () => {
    const watch = new Watch({
      brand: 'Rolex',
      model: 'Submariner',
      reference: '126610LN',
      price: 8000,
      caseSize: -41,
    });

    let error;
    try {
      await watch.validate();
    } catch (e) {
      error = e;
    }

    expect(error).toBeDefined();
    expect(error.errors.caseSize).toBeDefined();
  });

  it('should validate water resistance is positive', async () => {
    const watch = new Watch({
      brand: 'Rolex',
      model: 'Submariner',
      reference: '126610LN',
      price: 8000,
      caseSize: 41,
      waterResistance: -300,
    });

    let error;
    try {
      await watch.validate();
    } catch (e) {
      error = e;
    }

    expect(error).toBeDefined();
    expect(error.errors.waterResistance).toBeDefined();
  });

  it('should add a review', async () => {
    const watch = new Watch({
      brand: 'Rolex',
      model: 'Submariner',
      reference: '126610LN',
      price: 8000,
    });

    const review = {
      userId: '123',
      rating: 5,
      comment: 'Great watch!',
    };

    watch.reviews.push(review);

    expect(watch.reviews).toHaveLength(1);
    expect(watch.reviews[0]).toEqual(review);
  });
}); 