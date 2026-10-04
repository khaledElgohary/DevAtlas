import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import session from 'express-session';
import MongoStore from 'connect-mongo';
async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        instrument: ObserveInstrument,
    });
    const config = app.get(ConfigService);
    app.use(session({
        secret: config.getOrThrow('SESSION_SECRET'),
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: config.getOrThrow('MONGODB_URI'),
            collectionName: 'sessions',
        }),
        cookie: {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60 * 24,
        },
    }));
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.enableCors({
        origin: 'http://localhost:5173',
        credentials: true,
    });
    await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
//# sourceMappingURL=main.js.map