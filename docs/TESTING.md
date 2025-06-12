# Pocket Dial Testing Documentation

## Testing Strategy

### 1. Unit Testing
- **Framework**: Jest
- **Coverage Target**: 80% minimum
- **Key Areas**:
  - Component rendering
  - Redux actions and reducers
  - Utility functions
  - API service functions
  - Form validation

### 2. Integration Testing
- **Framework**: Jest + React Testing Library
- **Coverage Target**: 60% minimum
- **Key Areas**:
  - Component interactions
  - API integration
  - State management
  - Form submissions
  - Navigation flows

### 3. End-to-End Testing
- **Framework**: Cypress
- **Coverage Target**: Critical user flows
- **Key Areas**:
  - User registration/login
  - Watch browsing and search
  - Watchlist management
  - Profile updates
  - Purchase flow

## Test Structure

### Frontend Tests

#### Component Tests
```typescript
// Example: WatchCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import WatchCard from './WatchCard';

describe('WatchCard', () => {
  const mockWatch = {
    id: '1',
    brand: 'Rolex',
    model: 'Submariner',
    price: 9500
  };

  it('renders watch information correctly', () => {
    render(<WatchCard watch={mockWatch} />);
    expect(screen.getByText('Rolex Submariner')).toBeInTheDocument();
    expect(screen.getByText('$9,500')).toBeInTheDocument();
  });

  it('handles add to watchlist click', () => {
    const onAddToWatchlist = jest.fn();
    render(<WatchCard watch={mockWatch} onAddToWatchlist={onAddToWatchlist} />);
    fireEvent.click(screen.getByText('Add to Watchlist'));
    expect(onAddToWatchlist).toHaveBeenCalledWith(mockWatch.id);
  });
});
```

#### Redux Tests
```typescript
// Example: watchSlice.test.ts
import watchReducer, { addToWatchlist, removeFromWatchlist } from './watchSlice';

describe('watchSlice', () => {
  const initialState = {
    watchlist: [],
    loading: false,
    error: null
  };

  it('should handle addToWatchlist', () => {
    const watch = { id: '1', brand: 'Rolex' };
    const nextState = watchReducer(initialState, addToWatchlist(watch));
    expect(nextState.watchlist).toContainEqual(watch);
  });

  it('should handle removeFromWatchlist', () => {
    const watch = { id: '1', brand: 'Rolex' };
    const state = {
      ...initialState,
      watchlist: [watch]
    };
    const nextState = watchReducer(state, removeFromWatchlist('1'));
    expect(nextState.watchlist).not.toContainEqual(watch);
  });
});
```

### Backend Tests

#### API Tests
```typescript
// Example: watch.test.ts
import request from 'supertest';
import app from '../app';
import { connectDB, closeDB } from '../config/db';

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await closeDB();
});

describe('Watch API', () => {
  it('GET /api/watches returns list of watches', async () => {
    const response = await request(app)
      .get('/api/watches')
      .expect(200);
    
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data.watches)).toBe(true);
  });

  it('GET /api/watches/:id returns watch details', async () => {
    const response = await request(app)
      .get('/api/watches/1')
      .expect(200);
    
    expect(response.body.success).toBe(true);
    expect(response.body.data.watch).toHaveProperty('brand');
    expect(response.body.data.watch).toHaveProperty('model');
  });
});
```

#### Service Tests
```typescript
// Example: watchService.test.ts
import WatchService from '../services/watchService';
import Watch from '../models/Watch';

jest.mock('../models/Watch');

describe('WatchService', () => {
  let watchService: WatchService;

  beforeEach(() => {
    watchService = new WatchService();
  });

  it('should create a new watch', async () => {
    const watchData = {
      brand: 'Rolex',
      model: 'Submariner',
      price: 9500
    };

    const mockWatch = new Watch(watchData);
    (Watch.create as jest.Mock).mockResolvedValue(mockWatch);

    const result = await watchService.createWatch(watchData);
    expect(result).toEqual(mockWatch);
    expect(Watch.create).toHaveBeenCalledWith(watchData);
  });
});
```

## E2E Test Scenarios

### User Authentication Flow
```typescript
// Example: auth.spec.ts
describe('Authentication', () => {
  it('should register a new user', () => {
    cy.visit('/register');
    cy.get('[data-testid="email"]').type('test@example.com');
    cy.get('[data-testid="password"]').type('password123');
    cy.get('[data-testid="name"]').type('Test User');
    cy.get('[data-testid="register-button"]').click();
    cy.url().should('include', '/dashboard');
  });

  it('should login existing user', () => {
    cy.visit('/login');
    cy.get('[data-testid="email"]').type('test@example.com');
    cy.get('[data-testid="password"]').type('password123');
    cy.get('[data-testid="login-button"]').click();
    cy.url().should('include', '/dashboard');
  });
});
```

### Watch Browsing Flow
```typescript
// Example: watch-browsing.spec.ts
describe('Watch Browsing', () => {
  beforeEach(() => {
    cy.login(); // Custom command to handle authentication
  });

  it('should filter watches by brand', () => {
    cy.visit('/watches');
    cy.get('[data-testid="brand-filter"]').select('Rolex');
    cy.get('[data-testid="watch-card"]').should('have.length.greaterThan', 0);
    cy.get('[data-testid="watch-card"]').first().should('contain', 'Rolex');
  });

  it('should add watch to watchlist', () => {
    cy.visit('/watches');
    cy.get('[data-testid="watch-card"]').first().click();
    cy.get('[data-testid="add-to-watchlist"]').click();
    cy.get('[data-testid="watchlist-count"]').should('contain', '1');
  });
});
```

## Performance Testing

### Load Testing
- **Tool**: k6
- **Scenarios**:
  - Concurrent user browsing
  - Search performance
  - API response times
  - Database query performance

```javascript
// Example: load-test.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '1m', target: 50 },
    { duration: '30s', target: 0 },
  ],
};

export default function () {
  const response = http.get('http://localhost:5000/api/watches');
  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });
  sleep(1);
}
```

## Test Environment Setup

### Local Development
```bash
# Install dependencies
npm install

# Run unit tests
npm run test

# Run integration tests
npm run test:integration

# Run E2E tests
npm run test:e2e

# Run all tests with coverage
npm run test:coverage
```

### CI/CD Pipeline
```yaml
# Example: .github/workflows/test.yml
name: Test

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run tests
      run: npm run test
      
    - name: Run integration tests
      run: npm run test:integration
      
    - name: Run E2E tests
      run: npm run test:e2e
      
    - name: Upload coverage
      uses: codecov/codecov-action@v2
```

## Test Data Management

### Fixtures
```typescript
// Example: fixtures/watches.ts
export const mockWatches = [
  {
    id: '1',
    brand: 'Rolex',
    model: 'Submariner',
    price: 9500,
    // ... other properties
  },
  // ... more watches
];

export const mockUsers = [
  {
    id: '1',
    email: 'test@example.com',
    name: 'Test User',
    // ... other properties
  },
  // ... more users
];
```

### Test Database
- Use MongoDB in-memory server for tests
- Reset database before each test suite
- Seed test data for integration tests

## Code Coverage Reports

### Coverage Configuration
```json
// jest.config.js
module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/index.tsx',
    '!src/serviceWorker.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
```

## Continuous Testing

### Pre-commit Hooks
```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm run test:staged",
      "pre-push": "npm run test"
    }
  }
}
```

### Test Reports
- Generate HTML coverage reports
- Upload coverage to Codecov
- Track test trends over time
- Monitor test performance 