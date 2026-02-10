# 📋 Lista de Tareas - Backend Comedor App

## 📊 Estado Actual del Proyecto

### ✅ Módulos Completados
- **Autenticación (Auth)**: Implementado con JWT y roles
- **Usuarios (Users)**: Arquitectura hexagonal completa
- **Abastecimiento**:
  - ✅ **Proveedores (Suppliers)**: Completamente implementado
  - ✅ **Compras (Purchases)**: Implementado con lógica de negocio compleja y control de roles

### 🚧 Módulos con Boilerplate (Sin Implementación Real)
- **Inventario**: Alimentos (solo estructura básica)
- **Finanzas**: Fondos, Facturas (solo estructura básica)
- **Nutrición**: Menús, Recetas (solo estructura básica)
- **Reportes**: Estructura básica generada

---

## 🎯 Tareas Pendientes por Prioridad

### 🔴 PRIORIDAD CRÍTICA

#### 1. Módulo Inventario - Alimentos (Foods)
**Dependencia**: Este módulo es crítico porque Compras, Menús y Recetas dependen de él.

- [ ] **Modelo de Dominio**
  - [✔] Crear `Food` model en `domain/model/food.ts`
  - [✔] Incluir: id, name, category, unit, stock, expiration_date
  - [✔] Validaciones de dominio (stock no negativo, fechas válidas)

- [ ] **DTOs**
  - [✔] `CreateFoodDto`: name, category, unit, stock?, expiration_date?
  - [✔] `UpdateFoodDto`: Partial de los campos editables
  - [✔] `FoodResponseDto`: Para respuestas de API
  - [✔] Agregar validaciones con class-validator

- [ ] **Repositorio**
  - [✔] Crear interfaz `FoodRepository` en `domain/contract/`
  - [✔] Implementar `FoodRepositoryImpl` en `infrastructure/`
  - [✔] Métodos: create, findAll, findById, update, delete, findByCategory, checkStock

- [ ] **Servicio**
  - [ ] Migrar de boilerplate a lógica real
  - [ ] Implementar CRUD completo
  - [ ] Lógica de negocio: alertas de stock bajo, validación de vencimientos
  - [ ] Método para actualizar stock (será usado por Compras y Menús)

- [ ] **Controller**
  - [ ] Endpoints REST completos
  - [ ] Guards de autenticación y autorización
  - [ ] Documentación Swagger
  - [ ] Filtros por categoría, stock bajo, próximos a vencer

- [ ] **Migración a Arquitectura Hexagonal**
  - [ ] Crear estructura: `domain/`, `service/`, `presentation/`, `infrastructure/`
  - [ ] Mover archivos a carpetas correspondientes

---

### 🟠 PRIORIDAD ALTA

#### 2. Módulo Finanzas - Fondos (Funds)

- [ ] **Modelo de Dominio**
  - [ ] Crear `Fund` model con: id, month, year, initial_amount, remaining_amount, created_at, fund_type
  - [ ] Enum `FundType` (general, específico)
  - [ ] Validaciones: remaining_amount <= initial_amount

- [ ] **DTOs**
  - [ ] `CreateFundDto`: month, year, initial_amount, fund_type
  - [ ] `UpdateFundDto`: remaining_amount (principalmente)
  - [ ] Validaciones de rango de fechas

- [ ] **Repositorio**
  - [ ] Interfaz y implementación
  - [ ] Métodos: create, findAll, findById, findByMonthYear, updateRemainingAmount

- [ ] **Servicio**
  - [ ] CRUD completo
  - [ ] Lógica: descontar monto al registrar compra
  - [ ] Validar fondos disponibles antes de aprobar compra
  - [ ] Consultas por período

- [ ] **Controller**
  - [ ] Endpoints REST
  - [ ] Solo ADMIN puede crear/editar fondos
  - [ ] Endpoint para consultar saldo disponible

- [ ] **Migración a Arquitectura Hexagonal**

---

#### 3. Módulo Finanzas - Facturas (Invoices)

- [ ] **Modelo de Dominio**
  - [ ] Crear `Invoice` model: id, purchase_id, invoice_number, file_url, date
  - [ ] Relación con Purchase

- [ ] **DTOs**
  - [ ] `CreateInvoiceDto`: purchase_id, invoice_number, file_url?, date
  - [ ] `UpdateInvoiceDto`

- [ ] **Repositorio**
  - [ ] Interfaz y implementación
  - [ ] Métodos: create, findByPurchaseId, findByInvoiceNumber

- [ ] **Servicio**
  - [ ] CRUD completo
  - [ ] Validar que purchase_id exista
  - [ ] Manejo de archivos (upload de PDFs/imágenes)

- [ ] **Controller**
  - [ ] Endpoints REST
  - [ ] Upload de archivos
  - [ ] Guards de autorización

- [ ] **Migración a Arquitectura Hexagonal**

---

#### 4. Integración: Compras → Fondos

- [ ] **En PurchaseService**
  - [ ] Inyectar `FundRepository`
  - [ ] Al crear compra: validar que fund_id tenga saldo suficiente
  - [ ] Descontar `total_amount` de `remaining_amount` del fondo
  - [ ] Usar transacciones para garantizar consistencia

- [ ] **En PurchaseService (Update/Delete)**
  - [ ] Al actualizar compra: ajustar fondos si cambia el monto
  - [ ] Al eliminar compra: devolver monto al fondo

---

#### 5. Integración: Compras → Inventario (Stock)

- [ ] **En PurchaseService**
  - [ ] Inyectar `FoodRepository`
  - [ ] Al crear compra: incrementar stock de cada alimento en purchase_details
  - [ ] Validar que todos los food_id existan
  - [ ] Usar transacciones

- [ ] **En PurchaseService (Update/Delete)**
  - [ ] Al actualizar: ajustar stock según cambios en detalles
  - [ ] Al eliminar: restar stock agregado

---

### 🟡 PRIORIDAD MEDIA

#### 6. Módulo Nutrición - Menús (Menus)

- [ ] **Modelo de Dominio**
  - [ ] Crear `Menu` model: id, fecha, descripcion, nivel_escolar, calorias_totales
  - [ ] Relación con MenuDetails

- [ ] **Modelo MenuDetails**
  - [ ] Crear `MenuDetail` model: id, menu_id, food_id, quantity
  - [ ] Relación con Food

- [ ] **DTOs**
  - [ ] `CreateMenuDto`: fecha, descripcion, nivel_escolar, calorias_totales?, details[]
  - [ ] `MenuDetailDto`: food_id, quantity
  - [ ] `UpdateMenuDto`

- [ ] **Repositorio**
  - [ ] Interfaz y implementación para Menu
  - [ ] Interfaz y implementación para MenuDetail
  - [ ] Métodos: create, findAll, findByDate, findByNivelEscolar

- [ ] **Servicio**
  - [ ] CRUD completo
  - [ ] Validar que todos los food_id existan
  - [ ] Validar stock disponible al crear menú
  - [ ] Calcular calorías totales automáticamente (si tienes datos nutricionales)

- [ ] **Controller**
  - [ ] Endpoints REST
  - [ ] Filtros por fecha, nivel escolar
  - [ ] Guards de autorización

- [ ] **Migración a Arquitectura Hexagonal**

---

#### 7. Módulo Nutrición - Recetas (Recipes)

- [ ] **Modelo de Dominio**
  - [ ] Crear `Recipe` model: id, menu_id, alimento_id, cantidad_requerida
  - [ ] Relación con Menu y Food

- [ ] **DTOs**
  - [ ] `CreateRecipeDto`: menu_id, alimento_id, cantidad_requerida
  - [ ] `UpdateRecipeDto`

- [ ] **Repositorio**
  - [ ] Interfaz y implementación
  - [ ] Métodos: create, findByMenuId, findByAlimentoId

- [ ] **Servicio**
  - [ ] CRUD completo
  - [ ] Validar existencia de menu_id y alimento_id

- [ ] **Controller**
  - [ ] Endpoints REST
  - [ ] Guards de autorización

- [ ] **Migración a Arquitectura Hexagonal**

---

#### 8. Integración: Menús → Inventario (Descuento de Stock)

- [ ] **En MenuService**
  - [ ] Inyectar `FoodRepository`
  - [ ] Al crear/confirmar menú: descontar stock de alimentos según menu_details
  - [ ] Validar stock disponible antes de confirmar
  - [ ] Usar transacciones

- [ ] **Endpoint adicional**
  - [ ] `POST /menus/:id/confirm` - Para confirmar y descontar stock
  - [ ] `POST /menus/:id/cancel` - Para cancelar y devolver stock

---

### 🟢 PRIORIDAD BAJA

#### 9. Módulo Finanzas - Rendiciones (Renditions)

- [ ] **Modelo de Dominio**
  - [ ] Crear `Rendition` model: id, folio, supplier_id, invoice_number, amount, observation, date, position, purchase_id

- [ ] **DTOs**
  - [ ] `CreateRenditionDto`
  - [ ] `UpdateRenditionDto`

- [ ] **Repositorio**
  - [ ] Interfaz y implementación
  - [ ] Métodos: create, findAll, findByFolio, findByPurchaseId

- [ ] **Servicio**
  - [ ] CRUD completo
  - [ ] Validar relaciones con Purchase y Supplier

- [ ] **Controller**
  - [ ] Endpoints REST
  - [ ] Solo ADMIN y ECONOMA pueden gestionar rendiciones

- [ ] **Migración a Arquitectura Hexagonal**

---

#### 10. Módulo Reportes

- [ ] **Definir tipos de reportes necesarios**
  - [ ] Reporte de compras por período
  - [ ] Reporte de stock actual
  - [ ] Reporte de fondos (ingresos/egresos)
  - [ ] Reporte de menús planificados
  - [ ] Reporte de alimentos próximos a vencer

- [ ] **Servicio de Reportes**
  - [ ] Inyectar repositorios necesarios
  - [ ] Implementar lógica de generación de reportes
  - [ ] Exportar a PDF/Excel (opcional)

- [ ] **Controller**
  - [ ] Endpoints para cada tipo de reporte
  - [ ] Filtros por fecha, categoría, etc.
  - [ ] Guards de autorización

---

### 🔵 MEJORAS Y OPTIMIZACIONES

#### 11. Testing

- [ ] **Tests Unitarios**
  - [ ] Tests para cada servicio
  - [ ] Tests para modelos de dominio
  - [ ] Coverage mínimo del 70%

- [ ] **Tests de Integración**
  - [ ] Tests E2E para flujos críticos
  - [ ] Tests de endpoints principales

---

#### 12. Documentación

- [ ] **Swagger/OpenAPI**
  - [ ] Documentar todos los endpoints
  - [ ] Ejemplos de request/response
  - [ ] Esquemas de autenticación

- [ ] **README**
  - [ ] Instrucciones de instalación
  - [ ] Variables de entorno
  - [ ] Guía de desarrollo

---

#### 13. Validaciones y Seguridad

- [ ] **Validaciones**
  - [ ] Revisar todos los DTOs
  - [ ] Validaciones de negocio en servicios
  - [ ] Manejo de errores consistente

- [ ] **Seguridad**
  - [ ] Rate limiting
  - [ ] CORS configurado correctamente
  - [ ] Sanitización de inputs
  - [ ] Logs de auditoría

---

#### 14. Performance

- [ ] **Optimizaciones de Base de Datos**
  - [ ] Índices en campos frecuentemente consultados
  - [ ] Paginación en listados
  - [ ] Eager/Lazy loading optimizado

- [ ] **Caché**
  - [ ] Implementar caché para consultas frecuentes
  - [ ] Redis para sesiones (opcional)

---

## 🚀 Roadmap Sugerido

### Sprint 1 (Semana 1-2): Fundamentos
1. Implementar módulo Inventario (Alimentos) completo
2. Implementar módulo Fondos completo
3. Integrar Compras → Fondos
4. Integrar Compras → Inventario (Stock)

### Sprint 2 (Semana 3-4): Nutrición
1. Implementar módulo Menús completo
2. Implementar módulo Recetas completo
3. Integrar Menús → Inventario (Descuento de Stock)

### Sprint 3 (Semana 5-6): Finanzas y Reportes
1. Implementar módulo Facturas
2. Implementar módulo Rendiciones
3. Implementar módulo Reportes básico

### Sprint 4 (Semana 7-8): Testing y Mejoras
1. Tests unitarios y de integración
2. Documentación completa
3. Optimizaciones de performance
4. Seguridad y validaciones

---

## 📝 Notas Importantes

- **Transacciones**: Usar transacciones de base de datos en operaciones que afecten múltiples tablas (compras, menús, fondos)
- **Validaciones**: Siempre validar existencia de relaciones (foreign keys) antes de crear/actualizar
- **Roles**: Respetar permisos según roles (ADMIN, ECONOMA, DIRECTORA, NUTRICIONISTA)
- **Fechas**: Manejar zonas horarias correctamente
- **Stock**: Implementar alertas cuando el stock esté bajo o alimentos próximos a vencer

---

## 🎯 Siguiente Paso Recomendado

**Empezar con el Módulo de Inventario (Alimentos)** ya que es la base para:
- Completar la funcionalidad de Compras (actualización de stock)
- Implementar Menús (consumo de stock)
- Generar reportes de inventario

Este módulo desbloqueará el desarrollo de los demás módulos dependientes.
