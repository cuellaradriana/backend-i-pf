import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

export const config = {
    DATABASE_URL: process.env.DATABASE_URL,
    PORT: process.env.PORT || 3000,
};
