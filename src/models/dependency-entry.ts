
export interface OsInstallationConfig {
  name: string;
  command?: string;
}


export interface DependencyConf {
  os: OsInstallationConfig[];
}

export interface DependencyEntry {
  [key: string]: string | DependencyConf | string[] [];
}



