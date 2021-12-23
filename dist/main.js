"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const cookieParser = require("cookie-parser");
const app_module_1 = require("./app.module");
const http_exceoption_filter_1 = require("./http-exceoption.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: [`${process.env.FRONTEND}`],
        methods: 'OPTIONS,GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    app.use(cookieParser());
    app.useGlobalFilters(new http_exceoption_filter_1.HttpExceptionFilter());
    await app.listen(3030);
}
bootstrap();
//# sourceMappingURL=main.js.map