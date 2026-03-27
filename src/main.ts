import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS — origen configurable por variable de entorno (para prod y dev)
  const corsOrigins = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',')
    : ['http://localhost:5173', 'http://127.0.0.1:5173'];

  app.enableCors({
    origin: corsOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Validación global de DTOs
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    transformOptions: { enableImplicitConversion: true },
  }));

  // Swagger / OpenAPI — disponible en /api/docs
  const swaggerConfig = new DocumentBuilder()
    .setTitle('ComedorApp API')
    .setDescription('API para el sistema de gestión del comedor escolar')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'JWT'
    )
    .addTag('auth', 'Autenticación de usuarios')
    .addTag('alimentos', 'Gestión de inventario de alimentos')
    .addTag('compras', 'Registro y control de compras')
    .addTag('fondos', 'Administración de fondos presupuestarios')
    .addTag('menus', 'Planificación de menús escolares')
    .addTag('usuarios', 'Gestión de usuarios del sistema')
    .addTag('reportes', 'Reportes y estadísticas')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`🚀 Servidor corriendo en: http://localhost:${port}`);
  console.log(`📖 Documentación API en:  http://localhost:${port}/api/docs`);
}
bootstrap();
