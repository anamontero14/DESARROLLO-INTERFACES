// src/core/types.ts

export const TYPES = {
  // DataSources
  PersonaBDAPI: Symbol.for("PersonaBDAPI"),

  // Repositories
  IPersonaRepository: Symbol.for("IPersonaRepository"),
  IDepartamentoRepository: Symbol.for("IDepartamentoRepository"),

  // UseCases
  IPersonaUseCase: Symbol.for("IPersonaUseCase"),
  IDepartamentoUseCase: Symbol.for("IDepartamentoUseCase"),

  // ViewModels
  PersonaViewModel: Symbol.for("PersonaViewModel"),
  DepartamentoViewModel: Symbol.for("DepartamentoViewModel"),
};