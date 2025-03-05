import { CacheModuleAsyncOptions } from "@nestjs/cache-manager";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { redisStore } from "cache-manager-redis-store";

export const RedisOptions: CacheModuleAsyncOptions = {
    isGlobal: true,
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => {
        const store = await redisStore({
            socket: {
                host: configService.get<string>(process.env.REDIS_HOST),
                port: parseInt(configService.get<string>(process.env.REDIS_PORT)!),
            },
        })
        return {
            store: () => store
        }
    },
    inject: [ConfigService]
}