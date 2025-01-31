import React from 'react';
import { AdminService } from './admin';
import { DemandsService } from './demands';
import { HeatNetworkService } from './heatNetwork';
import { PasswordService } from './password';
import { SuggestionService } from './suggestion';

type ServiceContextProps = {
  suggestionService: SuggestionService;
  heatNetworkService: HeatNetworkService;
  demandsService: DemandsService;
  passwordService: PasswordService;
  adminService: AdminService;
};
export const ServicesContext = React.createContext<
  ServiceContextProps | undefined
>(undefined);

export const useServices = () => {
  const services = React.useContext(ServicesContext);
  if (!services) {
    throw new Error('App must be wrapped in Provider');
  }
  return services;
};
