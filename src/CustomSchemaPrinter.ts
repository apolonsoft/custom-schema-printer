import { NestFactory } from "@nestjs/core";
import { GraphQLSchemaHost } from "@nestjs/graphql";
import { printSchema } from "./lib/schemaPrinter";
import { promises as fs} from 'fs';

const prefixTypeExtension = "___specialPrefixForTypeExtensions";

class CustomSchemaPrinter {
  static async createSchemaFile(module: any, filepath: string): Promise<void> {
    const schema = await CustomSchemaPrinter.getSchema(module);

    await fs.writeFile(filepath, printSchema(schema));
  };

  private static async getSchema(module: any): Promise<any> {
    const app = await NestFactory.create(module);
    try {
      await app.init();
      const schemaHost = app.get<GraphQLSchemaHost>(GraphQLSchemaHost);

      return schemaHost.schema;
    } finally {
      await app.close()
    }
  }
}

export { CustomSchemaPrinter, prefixTypeExtension }
