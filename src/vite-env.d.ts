/// <reference types="vite/client" />

interface ImportMetaEnv {
  // 本地环境端口
  readonly VITE_PORT?: string;
  // 接口
  readonly VITE_API_HOST?: string;
  readonly VITE_API_PREFIX_1?: string;
  readonly VITE_API_PREFIX_2?: string;
  readonly VITE_API_PREFIX_3?: string;
  readonly VITE_API_PREFIX_4?: string;
  readonly VITE_API_PREFIX_5?: string;
  readonly VITE_API_PREFIX_6?: string;
  readonly VITE_API_PREFIX_7?: string;
  readonly VITE_API_PREFIX_8?: string;
  readonly VITE_API_PREFIX_GRAFANA?: string;
  readonly VITE_API_PROXY_HOST_1?: string;
  readonly VITE_API_PROXY_HOST_2?: string;
  readonly VITE_API_PROXY_HOST_3?: string;
  readonly VITE_API_PROXY_HOST_4?: string;
  readonly VITE_API_PROXY_HOST_5?: string;
  readonly VITE_API_PROXY_HOST_6?: string;
  readonly VITE_API_PROXY_HOST_7?: string;
  readonly VITE_API_PROXY_HOST_8?: string;
  readonly VITE_API_PREFIX_GRAFANA?: string;
  readonly VITE_WS_PREFIX?: string;
  readonly VITE_WS_PREFIX_1?: string;
  readonly VITE_WS_PREFIX_2?: string;
  readonly VITE_WS_HOST?: string;
  readonly VITE_WS_HOST_1?: string;
  readonly VITE_WS_HOST_2?: string;
  readonly VITE_WS_IS_SSL?: string;
  // 打包配置
  readonly VITE_CONF_BASE?: string;
  readonly VITE_DROP?: 'true' | 'false' | undefined;
  // 项目
  readonly VITE_APP_TITLE?: string;
  readonly VITE_VIEWPORT?: string;
  readonly VITE_USE_MOCK?: 'true' | 'false' | undefined;
  readonly VITE_USE_JSON_FILE?: 'true' | 'false' | undefined;
  readonly VITE_USER?: string;
  readonly VITE_PSWD?: string;
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
