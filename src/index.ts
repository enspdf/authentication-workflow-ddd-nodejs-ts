import "reflect-metadata";
import { Container } from "inversify";
import AuthServiceLocator from './configuration/useCases/AuthServiceLocator';
import { TYPES } from './constants/types';
import UserRepository from './infrastructure/FakeUserRepository';
import IUserReadOnlyRepository from './application/repositories/IUserReadOnlyRepository';
import { InversifyExpressServer } from "inversify-express-utils";
import { Application } from "express";
import * as bodyParser from "body-parser";

const container = new Container();
container.bind<AuthServiceLocator>(TYPES.AuthServiceLocator).to(AuthServiceLocator);
container.bind<IUserReadOnlyRepository>(TYPES.IUserReadOnlyRepository).to(UserRepository);

const server = new InversifyExpressServer(container);
server.setConfig((application: Application) => {
    application.use(bodyParser.urlencoded({ extended: true }));
    application.use(bodyParser.json());
});

const app = server.build();

app.listen(5000, () => {
    // tslint:disable-next-line: no-console
    console.info(`Server started at http://localhost:5000`);
});