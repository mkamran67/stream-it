import { Model, Document } from 'mongoose';
import { getClassForDocument } from '@typegoose/typegoose';
import { MiddlewareFn } from 'type-graphql';

/**
 * Convert MongoDB document to JSON (simple object)
 */

export const TypegooseMiddleware: MiddlewareFn = async (_, next) => {
  const result = await next();

  // Check if response is a mongo document array convert each item
  if (Array.isArray(result)) {
    return result.map((item) =>
      item instanceof Model ? convertDocument(item) : item
    );
  }

  // mongodb model document convert and return
  if (result instanceof Model) {
    return convertDocument(result);
  }

  // Lastly, if not a mongo document return result
  return result;
};

// For converting document to object
function convertDocument(doc: Document) {
  const convertedDocument = doc.toObject();
  const DocumentClass = getClassForDocument(doc)!;
  Object.setPrototypeOf(convertedDocument, DocumentClass.prototype);
  return convertedDocument;
}
