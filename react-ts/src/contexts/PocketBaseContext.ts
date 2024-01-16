import React from "react";
import PocketBase from "pocketbase";
import { TypedPocketBase } from "../pocketbase-types";

const pb = new PocketBase("http://127.0.0.1:8090") as TypedPocketBase;

const PocketBaseContext = React.createContext(pb);

export { PocketBaseContext };
