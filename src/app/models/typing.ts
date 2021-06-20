import ModelProperties from '../../assets/data/model-properties.json';
import * as Models from './index';
import * as Entities from './entities/index';
import { Type } from '@angular/core';

/**
 * The structure of an property of a {@link ModelPropertiesMap}.
 * It should tell of what type the property is.
 * It should also tell if the properties holds multiple values (a list/array).
 */
interface ModelProperty {

  name: string;

  type: string | null;

  multiple: boolean;
}

/**
 * The structure of an entry in the models-properties.json {@link ModelProperties}.
 * It should tell whether it extends another class to also include their properties and it should also
 * specify which properties it itself has.
 */
interface ModelPropertiesMap {

  extends: string | null;

  properties: ModelProperty[];
}

/**
 * An index type definition for the models- and entities modules.
 */
type ModelsIndex = { [model: string]: Type<unknown> };

/**
 * An JSON object which maps all properties of all class models.
 * The classes themselves are declared in the ../models/ or ../models/entities folder.
 */
const MODEL_PROPERTIES = ModelProperties as { [model: string]: ModelPropertiesMap };

/**
 * The module which exports models for classes that are only used client side.
 */
const MODELS_MODULE = Models as ModelsIndex;

/**
 * The module which exports all the models for classes that are being processed
 * by the server and stored in the database.
 */
const ENTITIES_MODULE = Entities as ModelsIndex;

/**
 * Tries to provide a type to an array of values.
 * see {@link typeValue}
 */
export function typeAll<E>(values: unknown[], type: string): E[] {
  const typedValues: E[] = [];

  values.forEach(entry => typedValues.push(typeValue(entry, type)));

  return typedValues;
}

/**
 * Provides a type to a value, if possible.
 * Numbers, Strings, or Booleans are returned normally, array values will have all its entries converted,
 * and object values are given a type if possible as mapped in the {@link MODEL_PROPERTIES}.
 */
export function typeValue<E>(value: any, type: string): E {
  if (type == null || value == null) {
    return value as E;
  }
  const typeProperties = findModelProperties(type);
  const typedModel: any = instantiateNewTypedModel(type);

  for (const property of typeProperties) {
    // Skip nullish values
    if (value[property.name] == null) continue;

    // Handle simple values (strings, numbers, booleans)
    if (property.type == null) {
      typedModel[property.name] = value[property.name];
    }

    // Handle array values
    else if (property.multiple) {
      typedModel[property.name] = typeAll(value[property.name], property.type);
    }

    // Handle object values
    else if (typeof value[property.name] === 'object') {
      typedModel[property.name] = typeValue(value[property.name], property.type);
    }
  }

  return typedModel;
}

/**
 * Returns the properties of the provided model type and that of the model it's extending (if necessary).
 */
function findModelProperties(type: string): ModelProperty[] {
  const propertiesMap = MODEL_PROPERTIES[type];
  const properties: ModelProperty[] = propertiesMap.properties;

  if (propertiesMap == null) throw new Error(`Cannot find mapped model properties of type: '${type}'`);

  if (propertiesMap.extends != null) {
    properties.push(...findModelProperties(propertiesMap.extends));
  }

  return properties;
}

/**
 * Tries to instantiate a new typed object of the provided type.
 */
function instantiateNewTypedModel<E>(type: string): E {
  let typedModel = null;

  try {
    typedModel = new MODELS_MODULE[type]();

  } catch (error) {}

  try {
    if (typedModel != null) {
      typedModel = new ENTITIES_MODULE[type]();
    }

  } catch (error) {}

  if (typedModel == null) {
    throw new Error(`Could not instantiate a new typed model of type: '${type}'`);
  }

  return typedModel as E;
}
