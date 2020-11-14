import { isString } from '@nestjs/common/utils/shared.utils';
import { ClassType } from '@nestjs/graphql/dist/enums/class-type.enum';
import { LazyMetadataStorage } from '@nestjs/graphql/dist/schema-builder/storages/lazy-metadata.storage';
import { TypeMetadataStorage } from '@nestjs/graphql/dist/schema-builder/storages/type-metadata.storage';
import { addClassTypeMetadata } from '@nestjs/graphql/dist/utils/add-class-type-metadata.util';
import { prefixTypeExtension } from '../CustomSchemaPrinter';

export const ObjectExtendType = (name?: string): ClassDecorator => (target) => {
  const typeName = isString(name)
    ? name
    : target.name;

  const addObjectTypeMetadata = () =>
    TypeMetadataStorage.addObjectTypeMetadata({
      name: typeName,
      target,
      description: prefixTypeExtension,
    });

  addObjectTypeMetadata();
  LazyMetadataStorage.store(addObjectTypeMetadata);

  addClassTypeMetadata(target, ClassType.OBJECT);
};
