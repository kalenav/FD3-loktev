import type { Middleware } from "@reduxjs/toolkit";
import { untrackSymbol } from "./selected-symbols.slice";
import { deleteSymbolData } from "./symbol-data.slice";

function createCleanupAfterSymbolDeleteMiddleware(): Middleware {
  return store => next => action => {
    if (!untrackSymbol.match(action)) {
      return next(action);
    }
    store.dispatch(deleteSymbolData(action.payload));
    return next(action);
  };
}

export const cleanupAfterSymbolDeleteMiddleware = createCleanupAfterSymbolDeleteMiddleware();